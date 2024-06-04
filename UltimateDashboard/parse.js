function buildParameters (_enum, _p, _r) {
  if (typeof _p === 'undefined') _p = ''
  if (typeof _r === 'undefined') _r = false
  return {
    DATASET: _enum.DS_URL,
    PARAMETER_NAME: _enum.PARAMETER_NAME,
    PARAMETERS: _p,
    QUERY: _enum.QUERY_TYPE,
    RETRY_COUNT: _enum.RETRY_COUNT,
    RETRY: _r
  }
}

//xml request to pull in data from shared dataset. Response is in JSON form.
function query (p) {
  let _pConcat = ''
  try {
    p.PARAMETER_NAME.length > 0
      ? (_pConcat = p.PARAMETER_NAME + '=' + p.PARAMETERS)
      : (_pConcat = '')
  } catch (e) {
    console.log(e)
  }

  //do not change this
  var URL =
    'https://' +
    PAGE_BASE_URL +
    "/reports/api/v2.0/datasets(path='" +
    p.DATASET +
    "')/Data?" +
    _pConcat

  // new XMLHttp object
  let request = new XMLHttpRequest()

  //open up get with URL from above
  request.open('GET', URL)

  //need credentials
  request.withCredentials = true

  //event listener on load for URL
  request.addEventListener('load', function (event) {
    //make sure page loads
    if (request.status >= 200 && request.status < 300) {
      //data parsed from JSON response
      let data = JSON.parse(request.responseText)
      let keys = Object.keys(data.value[0])
      //we want query with data that will be > 1
      if (data.value.length > 0) {
        let q = p.QUERY

        // setup date for legend
        let d = new Date()
        let dt = { month: d.getMonth() + 1, year: d.getYear() + 1900 }

        // case for query
        switch (q) {
          //cached datasets
          /*//query the settings data * NOT YET AVAILABLE*
            case SHARED_DATASETS.QUERY.SETTINGS:
              settings(data.value);
              break;*/
          case SHARED_DATASETS.EMPLOYEE.QUERY_TYPE:
            //do stuff
            PARSE_FUNCTIONS.EMPLOYEES(cleanData(data.value))
            LOAD_STATUS.EMPLOYEE = true
            break

          case SHARED_DATASETS.QDO.QUERY_TYPE:
            let qdoTarget = (
              (d.getDate() / daysInMonth(dt.year, dt.month)) *
              100
            ).toFixed(1)
            let qdoLegend =
              '<table style="margin: auto;"><tbody><tr><th>Goal for ' +
              dt.month.toString() +
              '/' +
              d.getDate().toString() +
              '/' +
              dt.year.toString() +
              '</th></tr><tr><td style="background-color: lime;"><span>&gt;' +
              (qdoTarget * 0.75).toFixed(1).toString() +
              '%</span></td></tr><td style="background-color: yellow;"><span>&lt;=' +
              (qdoTarget * 0.75).toFixed(1).toString() +
              '% and &gt;' +
              (qdoTarget * 0.5).toFixed(1).toString() +
              '%</span></td></tr><td style="background-color: red;"><span>&lt;=' +
              (qdoTarget * 0.5).toFixed(1).toString() +
              '%</span></td></tr></tbody></table>'
            if (DATA_NOTES.QDO[DATA_NOTES.QDO.length - 1] !== qdoLegend) {
              DATA_NOTES.QDO.push(qdoLegend)
            }
            PARSE_FUNCTIONS.QDO(cleanData(data.value))
            LOAD_STATUS.QDO = true
            break

          case SHARED_DATASETS.UE.QUERY_TYPE:
            DATA_NOTES.UE = [
              '4 week avg as of ' + data.value[0]['DATA_REFRESHED'],
              'Goal is >= 80%',
              'Tools with <= 10% availability average over 4 weeks are filtered out.'
            ]
            PARSE_FUNCTIONS.UE(cleanData(data.value))
            LOAD_STATUS.UE = true
            break

          case SHARED_DATASETS.GOOD_CATCH.QUERY_TYPE:
            let gcTarget = (
              (daysIntoQtr() / daysInQtr(getQtr(d.getMonth()))) *
              100
            ).toFixed(1)
            let gcLegend =
              '<table style="margin: auto;"><tbody><tr><th>Goal for ' +
              dt.month.toString() +
              '/' +
              d.getDate().toString() +
              '/' +
              dt.year.toString() +
              '</th></tr><tr><td style="background-color: lime;"><span>&gt;' +
              (gcTarget * 0.75).toFixed(1).toString() +
              '%</span></td></tr><td style="background-color: yellow;"><span>&lt;=' +
              (gcTarget * 0.75).toFixed(1).toString() +
              '% and &gt;' +
              (gcTarget * 0.5).toFixed(1).toString() +
              '%</span></td></tr><td style="background-color: red;"><span>&lt;=' +
              (gcTarget * 0.5).toFixed(1).toString() +
              '%</span></td></tr></tbody></table>'
            DATA_NOTES.GC = [
              'Data last refreshed on ' + data.value[0]['REFRESH_DATE'],
              'Percentage reflects current % vs days left in qtr'
            ]
            if (DATA_NOTES.GC[DATA_NOTES.GC.length - 1] !== gcLegend) {
              DATA_NOTES.GC.push(gcLegend)
            }
            PARSE_FUNCTIONS.GOOD_CATCH(cleanData(data.value))
            LOAD_STATUS.GC = true
            break

          case SHARED_DATASETS.REQUEST.QUERY_TYPE:
            DATASETS.REQUEST = cleanData(data.value)
            buildOpenItemBox(DATASETS.REQUEST)
            break

          case SHARED_DATASETS.COS_CEID_1270.QUERY_TYPE:
            PARSE_FUNCTIONS.COS_CEID(data.value)
            break

          case SHARED_DATASETS.COS_CEID_1274.QUERY_TYPE:
            PARSE_FUNCTIONS.COS_CEID(data.value)
            break

          case SHARED_DATASETS.COS_LINEVIEW_1270.QUERY_TYPE:
            PARSE_FUNCTIONS.COS_LINEVIEW(data.value)
            break

          case SHARED_DATASETS.COS_LINEVIEW_1274.QUERY_TYPE:
            PARSE_FUNCTIONS.COS_LINEVIEW(data.value)
            break

          case SHARED_DATASETS.COS_COMMENTS.QUERY_TYPE:
            PARSE_FUNCTIONS.COS_COMMENTS(data.value)
            break

          case SHARED_DATASETS.COS_ENTITY_STATUS_1270.QUERY_TYPE:
            PARSE_FUNCTIONS.COS_ENTITY_STATUS(data.value)
            break

          case SHARED_DATASETS.COS_ENTITY_STATUS_1274.QUERY_TYPE:
            PARSE_FUNCTIONS.COS_ENTITY_STATUS(data.value)
            break

          case SHARED_DATASETS.TRACERS.QUERY_TYPE:
            PARSE_FUNCTIONS.TRACERS(data.value)
            break
          default:
            console.log('Error switching on query name')
            break
        }
      } else {
        console.log('No data for ' + p.QUERY + ' query.')
      }
    } else {
      //if page returns error on load
      console.log(p.QUERY + ' query failed.')
      if (p.RETRY_COUNT <= MAX_QUERY_RETRIES && p.RETRY) {
        p.RETRY_COUNT++
        setTimeout(function () {
          query(p)
        }, 5000)
      }
    }
  })

  //initiate XMLHttpRequest
  request.send()
}

/*
 * Parsing functions put the data from the query function in the data structure
 */
var PARSE_FUNCTIONS = {
  QDO: function (data) {
    if (!EMPLOYEES_LOADED) {
      setTimeout(function () {
        PARSE_FUNCTIONS.QDO(data)
      }, 1000)
    } else {
      // subfunction for readability
      function groupQDO (data) {
        // Testing - filter out shift 1 and shift 8
        data = dataNotEquals(data, 'SHIFT', 1)
        data = dataNotEquals(data, 'SHIFT', 8)
        data = dataNotEquals(
          data,
          'BUSINESS_TITLE',
          'Module Equipment Technician'
        )

        return loop(data, ['FULL_NAME', 'MANAGER_NAME', 'area', 'SHIFT'])
      }

      // filter QDO dataset with employee dataset then
      // filter employee dataset with qdo dataset
      let ds = JSON.parse(JSON.stringify(DATASETS.EMPLOYEE))
      let two_datasets = doubleFilter(data, ds, 'wwid', 'WWID')
      let qdods = two_datasets[0]
      let empds = two_datasets[1]

      // join sets of data
      qdods = joinData(qdods, empds, 'wwid', 'WWID')

      // turn the created column into actual dates for sorting
      qdods.forEach(row => {
        row['created'] = new Date(row['created'])
      })

      // sort by date asc
      sortBy(qdods, 'created')

      // Filter out technician submitted QDOs
      qdods = dataNotLike(qdods, 'BUSINESS_TITLE', 'TECHNICIAN')

      // create a column that sums up the date for column headers later on
      // 01/01/2024 would show as 1/24
      qdods.forEach(row => {
        row['HEADER'] =
          (row['created'].getMonth() + 1).toString() +
          '/' +
          (row['created'].getYear() - 100).toString()
        row['min_date'] = new Date(qdods[0]['created'])
      })

      // add to datastructure
      DATASETS.QDO = qdods

      // tell the console
      log('DATASETS.QDO has been acquired.')
      let QDOds = groupQDO(DATASETS.QDO)
      fillCells(CATEGORY_KEYS.PEOPLE, CATEGORIES.People[0], QDOds)
    }
  },
  UE: function (data) {
    log('DATASETS.UE has been acquired.')
    DATASETS.UE = data
    let processes = { 1270: [], 1274: [] }
    let pKeys = Object.keys(processes)
    data.forEach(row => {
      pKeys.forEach(key => {
        if (
          row['TECHNOLOGY'].includes(key) ||
          (key === '1270' && row['TECHNOLOGY'] === 'Shared')
        ) {
          processes[key].push(row)
        }
      })
    })
    pKeys.forEach(key => {
      let UEds = loop(processes[key], ['ENTITY', 'CEID', 'AREA', 'SHIFT_NAME'])
      fillCells('Velocity', 'Availability (' + key + ')', UEds)
    })
  },
  EMPLOYEES: function (data) {
    // Make a new column 'FULL_ NAME'
    data.forEach(row => {
      row['FULL_NAME'] = row['FIRST_NAME'] + ' ' + row['LAST_NAME']
    })

    // add data to master dataset
    DATASETS.EMPLOYEE = data
    console.log('DATASETS.EMPLOYEE acquired')
    EMPLOYEES_LOADED = true
  },
  GOOD_CATCH: function (data) {
    if (!EMPLOYEES_LOADED) {
      setTimeout(function () {
        PARSE_FUNCTIONS.GOOD_CATCH(data)
      }, 1000)
    } else {
      let employeeFilter = dataEquals(
        DATASETS.EMPLOYEE,
        'BUSINESS_TITLE',
        'Module Equipment Technician'
      )

      data.forEach(row => {
        try {
          row['SHIFT'] = dataEquals(
            employeeFilter,
            'FULL_NAME',
            row['employee_name']
          )[0]['SHIFT']
        } catch (e) {
          row['SHIFT'] = 'unknown'
        }
      })
      data = dataIn(data, 'SHIFT', ['4', '5', '6', '7'])
      DATASETS.GOOD_CATCH = data
      log('DATASETS.GOOD_CATCH acquired')
      let GCds = loop(data, [
        'employee_name',
        'mgr_name',
        'org_level_desc8',
        'SHIFT'
      ])
      fillCells(CATEGORY_KEYS.PEOPLE, CATEGORIES.People[1], GCds)
    }
  },
  COS_CEID: function (data) {
    let pid = data[0].PROCESS_ID
    DATASETS.COS_CEID =
      DATASETS.COS_CEID.length === 0 ? data : union(DATASETS.COS_CEID, data)
    pid === '1270'
      ? (LOAD_STATUS.COS_CEID_1270 = true)
      : (LOAD_STATUS.COS_CEID_1274 = true)
  },
  COS_LINEVIEW: function (data) {
    let pid = data[0].PROCESS_ID
    DATASETS.COS_LINEVIEW =
      DATASETS.COS_LINEVIEW.length === 0
        ? data
        : union(DATASETS.COS_LINEVIEW, data)
    pid === '1270'
      ? (LOAD_STATUS.COS_LINEVIEW_1270 = true)
      : (LOAD_STATUS.COS_LINEVIEW_1274 = true)
  },
  COS_COMMENTS: function (data) {
    DATASETS.COS_COMMENTS = data
    LOAD_STATUS.COS_COMMENTS = true
  },
  COS_ENTITY_STATUS: function (data) {
    let pid = data[0].PROCESS_ID
    DATASETS.COS_ENTITY_STATUS =
      DATASETS.COS_ENTITY_STATUS.length === 0
        ? data
        : union(DATASETS.COS_ENTITY_STATUS, data)
    pid === '1270'
      ? (LOAD_STATUS.COS_ENTITY_STATUS_1270 = true)
      : (LOAD_STATUS.COS_ENTITY_STATUS_1274 = true)
  },
  TRACERS: function (data) {
    LOAD_STATUS.TRACERS = true
    DATASETS.TRACERS = data
  }
}
