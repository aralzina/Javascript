/**
 * If all legend items are visible, hide all others except the clicked item
 * If the selected item isn't visible, hide all others and show only the clicked item
 * If all other items are hidden and the selected item already is, show all again
 * @param {t} e
 * @param {t} legendItem
 * @param {t} legend
 */
const legendHideAllHandler = (e, legendItem, legend) => {
  const index = legendItem.datasetIndex
  const ci = legend.chart

  // this will go one of two ways...
  // if the item clicked is already shown, then undo the filter entirely
  // otherwise only show the clicked item
  let selected = false
  let others = true

  legend.chart.data.datasets.forEach((d, i) => {
    if (i === index) {
      if (ci.isDatasetVisible(index)) {
        selected = true
      }
    } else {
      if (!ci.isDatasetVisible(i)) {
        others = false
      }
    }
  })
  // if this is already visible and other aren't
  // make all visible
  if (selected && !others) {
    legend.chart.data.datasets.forEach((d, i) => {
      ci.show(i)
      d.hidden = false
    })
  } else {
    //otherwise only show the clicked item
    legend.chart.data.datasets.forEach((d, i) => {
      if (i !== index) {
        ci.hide(i)
        d.hidden = true
      }
    })

    ci.show(index)
    legendItem.hidden = false
  }

  ci.update()
}

/**
 *
 * @param {*} dataset
 * @param {*} axes
 * @param {*} chartBy
 * @param {*} xAxisDataType
 * @param {*} titles
 * @returns
 */
var chart_data_args = function (dataset, axes, chartBy, xAxisDataType, titles) {
  let xName = ''
  let yName = ''
  let mainTitle = ''

  typeof titles.x === 'undefined' ? (xName = axes.x) : (xName = titles.x)
  typeof titles.y === 'undefined' ? (yName = axes.y) : (yName = titles.y)
  typeof titles.main === 'undefined'
    ? (mainTitle = '')
    : (mainTitle = titles.main)

  return {
    DATASET: dataset,
    X_AXIS_NAME: axes.x,
    X_AXIS_TITLE: xName,
    Y_AXIS_NAME: axes.y,
    Y_AXIS_TITLE: yName,
    CHART_BY: chartBy,
    X_AXIS_DATA_TYPE: xAxisDataType,
    CHART_CONFIG: {
      type: 'line',
      data: {
        datasets: [],
        labels: []
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: yName,
              font: {
                size: 16
              }
            }
          },
          x: {
            title: {
              display: true,
              text: xName,
              font: {
                size: 16
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Interactive Legend',
              font: {
                size: 16
              }
            }
          },
          title: {
            display: true,
            text: mainTitle,
            font: {
              size: 20
            }
          }
        }
      }
    }
  }
}

/**
 * All chart Data functions
 */
var CHART_DATA = {
  /**
   * Availability graphs
   * @param {*} args
   * @returns
   */
  AVAILABILITY: function (args) {
    // pull data out of args
    //  args
    //    DATASET
    //    X_AXIS_NAME
    //    Y_AXIS_NAME
    //    X_AXIS_TITLE
    //    Y_AXIS_TITLE
    //    CHART_BY
    //    X_AXIS_DATA_TYPE
    //    CHART_CONFIG
    let inputDataset = args.DATASET
    let xAxisName = args.X_AXIS_NAME
    let yAxisName = args.Y_AXIS_NAME
    let chartBy = args.CHART_BY
    let xAxisDataType = args.X_AXIS_DATA_TYPE
    let results = args.CHART_CONFIG

    let categorizedData = loop(inputDataset, [xAxisName, chartBy])

    // get unique values for xAxis
    let xAxisNames = unique(inputDataset, xAxisName)

    // get unique yAxisNames
    let series = Object.keys(categorizedData)

    // iterate through data and make datasets unique to
    // those yAxisNames
    let order = 1
    series.forEach(dataset => {
      let map = {}

      // set basic variables for chart
      map['order'] = order
      order++
      map['label'] = dataset
      map['data'] = []

      // aggregate data and
      // Fill up the array
      let keys = Object.keys(categorizedData[dataset])
      keys.forEach(key => {
        let ds = categorizedData[dataset][key]
        let avg = []
        ds.forEach(dsRow => {
          avg.push(dsRow[yAxisName] * 100)
        })
        map['data'].push(getMean(avg, 1))
      })

      // push this into the chart dataset
      results['data']['datasets'].push(map)
    })

    if (typeof xAxisDataType === 'undefined') {
      // Run the sort function without editing the data
    } else {
      // Attempt to edit the data then sort
      try {
        for (let i = 0; i < xAxisNames.length; i++) {
          if (xAxisDataType === 'int') {
            xAxisNames[i] = float(xAxisNames[i]).toFixed(0)
          }
          if (xAxisDataType === 'float') {
            xAxisNames[i] = float(xAxisNames[i])
          }
          if (xAxisDataType === 'string') {
            xAxisNames[i] = xAxisNames[i].toString()
          }
        }
      } catch (e) {
        log(
          'configureChartData: Failed to apply xAxisDataType to xAxisValues\n' +
            e.toString()
        )
      }
    }
    // perform sort
    xAxisNames.sort((a, b) => {
      let val = 0
      a < b ? (val = -1) : a > b ? (val = 1) : (val = 0)
      return val
    })

    // add labels to results
    results['data']['labels'] = xAxisNames
    results.options.plugins.legend.onClick = legendHideAllHandler
    // good riddance
    return results
  },
  /**
   * QDO Graph
   * @param {*} args
   * @returns
   */
  QDO: function (args) {
    // pull data out of args
    //  args
    //    DATASET
    //    X_AXIS_NAME
    //    Y_AXIS_NAME
    //    X_AXIS_TITLE
    //    Y_AXIS_TITLE
    //    CHART_BY
    //    X_AXIS_DATA_TYPE
    //    CHART_CONFIG
    let cfg = args.CHART_CONFIG
    let chartBy = args.CHART_BY
    //let dataset = dataIn(args.DATASET, 'SHIFT', ['4', '5', '6', '7'])
    let dataset = args.DATASET
    let employeeDataset = dataIn(DATASETS.EMPLOYEE, 'SHIFT', [
      '4',
      '5',
      '6',
      '7'
    ])
    employeeDataset = dataNotLike(
      employeeDataset,
      'BUSINESS_TITLE',
      'TECHNICIAN'
    )
    dataset = loop(args.DATASET, [chartBy])

    let labels = Object.keys(dataset)
    let series = {}

    // create 3 datasets based on this months and
    // last months data
    let d = new Date()

    // get actual names of month
    let monthName1 = d.toLocaleString('default', { month: 'long' })

    // current month
    let header1 =
      (d.getMonth() + 1).toString() + '/' + (d.getYear() - 100).toString()

    // previous month
    // set month of current date - 1 instead of just getting value and subracting by one
    // this will prevent problems if current month is January
    d.setMonth(d.getMonth() - 1)
    let header2 =
      (d.getMonth() + 1).toString() + '/' + (d.getYear() - 100).toString()
    let monthName2 = d.toLocaleString('default', { month: 'long' })

    d.setMonth(d.getMonth() - 1)
    let header3 =
      (d.getMonth() + 1).toString() + '/' + (d.getYear() - 100).toString()
    let monthName3 = d.toLocaleString('default', { month: 'long' })

    series[header1] = []
    series[header2] = []
    series[header3] = []

    // Filter dataset to include only last 3 months
    labels.forEach(label => {
      filteredDataset = dataIn(dataset[label], 'HEADER', Object.keys(series))
      filteredDataset = dataIn(filteredDataset, 'SHIFT', ['4', '5', '6', '7'])
      if (filteredDataset.length > 0) {
        dataset[label] = filteredDataset
      } else {
        //log('Deleting ' + label)
        delete dataset[label]
      }
    })

    // apply filter to dictionary
    labels = Object.keys(dataset)

    labels.forEach(label => {
      // filter dataset to the area only
      let tempDataset = dataset[label]

      // get all manager names from this area
      let managers = unique(tempDataset, 'MANAGER_NAME')

      // reference employee dataset to get all those manager's employees
      let employees = dataIn(employeeDataset, 'MANAGER_NAME', managers)

      // count all employees
      let totalEmployees = employees.length

      Object.keys(series).forEach(header => {
        // filter through all employees for this current month's data
        let monthDataset = dataEquals(tempDataset, 'HEADER', header)
        let count = 0
        employees.forEach(emp => {
          let individualData = dataEquals(
            monthDataset,
            'FULL_NAME',
            emp['FULL_NAME']
          )
          if (individualData.length > 0) {
            count++
          } else {
            //log(header)
            //log('No data for: ' + emp['FULL_NAME'])
            //log('')
          }
        })
        series[header].push(((count / totalEmployees) * 100).toFixed(1))
      })
    })

    cfg.type = 'radar'
    cfg.data.labels = labels
    cfg.data.datasets = [
      {
        label: monthName1,
        data: series[header1],
        fill: true
      },
      {
        label: monthName2,
        data: series[header2],
        fill: false
      },
      {
        label: monthName3,
        data: series[header3],
        fill: false
      }
    ]
    //cfg.options = { elements: { line: { borderwidth: 3 } } }

    cfg.options = {
      elements: { line: { borderwidth: 3 } },
      // scales: {
      //  y: { title: { display: true, text: 'yTest', font: { size: 16 } } },
      //  x: { title: { display: true, text: 'xTest', font: { size: 16 } } }
      // },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          title: {
            display: true,
            text: 'Interactive Legend',
            font: {
              size: 16
            }
          }
        },
        title: {
          display: true,
          text: '% QDO Goal vs Area (Last 3 Months)',
          font: {
            size: 20
          }
        }
      }
    }
    return cfg
  },
  /**
   * Good Catch graph
   * @param {*} args
   * @returns
   */
  GOOD_CATCH: function (args) {
    // pull data out of args
    //  args
    //    DATASET
    //    X_AXIS_NAME
    //    Y_AXIS_NAME
    //    X_AXIS_TITLE
    //    Y_AXIS_TITLE
    //    CHART_BY
    //    X_AXIS_DATA_TYPE
    //    CHART_CONFIG
    let cfg = args.CHART_CONFIG
    let chartBy = args.CHART_BY
    let dataset = args.DATASET
    dataset = loop(args.DATASET, [chartBy])

    let labels = Object.keys(dataset)
    let series = {}

    // create 3 datasets based on 'qtr' column
    // column is configured like 2024 Q1
    // easier with this dataset because they're already column names
    let hdrs = unique(args.DATASET, 'qtr')
    let l = hdrs.length
    hdrs = hdrs.slice(l - 3, l)
    hdrs.forEach(hdr => {
      series[hdr] = []
    })

    // apply filter to dictionary
    labels = Object.keys(dataset)

    labels.forEach(label => {
      // filter dataset to the area only
      let tempDataset = dataset[label]

      let employees = unique(tempDataset, 'employee_name')

      // count all employees
      let totalEmployees = employees.length
      let count = [0, 0, 0]

      employees.forEach(emp => {
        let empData = dataEquals(tempDataset, 'employee_name', emp)
        let qtrs = Object.keys(series)
        let qtrDataset = dataIn(empData, 'qtr', qtrs)
        qtrDataset = loop(qtrDataset, ['qtr'])
        for (let i = 0; i < qtrs.length; i++) {
          qtrDataset[qtrs[i]][0]['Fufilled_Req'] === '1'
            ? count[i]++
            : (count[i] = count[i])
        }
      })

      cfg.type = 'radar'
      cfg.data.labels = labels
      cfg.data.datasets = []
      for (let i = 0; i < count.length; i++) {
        series[hdrs[i]].push(((count[i] / totalEmployees) * 100).toFixed(1))
        let fillVal = false
        i === hdrs.length - 1 ? (fillVal = true) : (fillVal = false)
        cfg.data.datasets.push({
          label: hdrs[i],
          data: series[hdrs[i]],
          fill: fillVal
        })
      }
    })

    //cfg.options = { elements: { line: { borderwidth: 3 } } }

    cfg.options = {
      elements: { line: { borderwidth: 3 } },
      // scales: {
      //  y: { title: { display: true, text: 'yTest', font: { size: 16 } } },
      //  x: { title: { display: true, text: 'xTest', font: { size: 16 } } }
      // },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          title: {
            display: true,
            text: 'Interactive Legend',
            font: {
              size: 16
            }
          }
        },
        title: {
          display: true,
          text: '% Good Catch Goal vs Area (Last 3 Quarters)',
          font: {
            size: 20
          }
        }
      }
    }
    return cfg
  }
  // other types :function(){},
}
