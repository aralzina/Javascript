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
            DATA_NOTES.GC = [
              'Data last refreshed on ' + data.value[0]['REFRESH_DATE'],
              'Percentage reflects current % vs days left in qtr'
            ]
            PARSE_FUNCTIONS.GOOD_CATCH(cleanData(data.value))
            LOAD_STATUS.GC = true
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

        // break data apart by shift
        let newData = loop(data, ['MANAGER_NAME', 'area', 'SHIFT'])
        Object.keys(newData).forEach(shift => {
          Object.keys(newData[shift]).forEach(area => {
            Object.keys(newData[shift][area]).forEach(manager => {
              let filteredData = dataEquals(
                DATASETS.EMPLOYEE,
                'MANAGER_NAME',
                manager
              )
              filteredData = dataEquals(filteredData, 'SHIFT', shift)
              let employees = unique(filteredData, 'FULL_NAME')
              newData[shift][area][manager] = {}
              employees.forEach(employee => {
                newData[shift][area][manager][employee] = dataEquals(
                  data,
                  'FULL_NAME',
                  employee
                )
              })
            })
          })
        })
        return newData
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
  }
}