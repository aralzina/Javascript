// recursive counting and table creation
function countRecursion (dataset, func) {
  let results = [0, 0, []]

  if (!Array.isArray(dataset)) {
    let keys = Object.keys(dataset)
    if (Array.isArray(dataset[keys[0]])) {
      results[1] = keys.length
    }
    keys.forEach(k => {
      if (dataset[k].length === 0) {
        // delete empty datasets
        delete dataset[k]
      } else {
        //let depth = getDepth(dataset[k])
        let val = countRecursion(dataset[k], func)
        if (!Array.isArray(dataset[k])) {
          // Build any Level 2+ tables here
          results[0] += val[0]
          results[1] += val[1]
          results[2].push(val[2])
        } else {
          // Build Level 1 tables here
          val[0] > 0 ? results[0]++ : (results[0] += 0)
          results[2].push(val[2][0])
          if (results.length === 3) {
            results.push(val[3])
          }
        }
      }
    })
    results = func(dataset, results)
  } else {
    // This results in a row of L0 data
    // That returns to the parent table
    try {
      results = func(dataset, results)
    } catch (e) {
      // No data here
    }
  }
  return results
}

// recursive counting and table creation
function otherRecursion (dataset, func) {
  let results = [null, null]

  if (!Array.isArray(dataset)) {
    let keys = Object.keys(dataset)
    keys.forEach(k => {
      if (dataset[k].length === 0) {
        // delete empty datasets
        delete dataset[k]
      } else {
        let val = otherRecursion(dataset[k], func)
        if (!Array.isArray(dataset[k])) {
          // Build any Level 2+ tables here
          /*
            L2 Returns
            val[1] - td for the area 
            */
          results[0] === null
            ? (results[0] = [val[0]])
            : results[0].push(val[0])
          results[1] === null
            ? (results[1] = [val[1]])
            : results[1].push(val[1])
        } else {
          /*
            L1 returns
            val[0] = mean avail for CEID
            val[0] = td for the CEID tables
            */
          results[0] === null
            ? (results[0] = [val[0]])
            : results[0].push(val[0])
          results[1] === null
            ? (results[1] = [val[1]])
            : results[1].push(val[1])
        }
      }
    })
    results = func(dataset, results)
  }
  /* 
      Testing - remove this part and let the table function do this
    else {
      // This results in a row of L0 data
      // That returns to the parent table
      try {
        results = func(dataset, results)
      } catch (e) {
        // No data here
      }
    }*/
  return results
}

// Create table components from datasets
var TABLE_FUNCTIONS = {
  UE: function (data, input) {
    let UE_GOALS = { GREEN: 80, YELLOW: 75 }
    let L0 = function (data, input) {
      //console.log(data)
      input[0].push(data[0]['AVG_AVAIL'])
      return input
    }
    let L1 = function (data, input) {
      // Build L0 and L1 data here
      //keys will be entities
      let keys = Object.keys(data)
      let entityData = []
      keys.forEach(key => {
        data[key].forEach(row => {
          let avail = parseFloat(row['AVG_AVAIL']) * 100
          entityData.push(avail)
        })
      })
      let cellVal = getMean(entityData, 1)
      let cellData = cellVal.toString() + '%'
      let clr = ''
      cellVal > UE_GOALS.GREEN
        ? (clr = 'lime')
        : cellVal > UE_GOALS.YELLOW
        ? (clr = 'yellow')
        : (clr = 'red')

      let td = create('td')
      // add inner table for ceid's data
      let classMod = 'sub-sub-'
      td.innerHTML =
        "<div class='" +
        classMod +
        "cell-content'><div class='" +
        classMod +
        "cell-header'>" +
        cellData +
        "</div><div class='" +
        classMod +
        "cell-body hidden'></div></div>"

      td.className = classMod + 'td-content'
      td.style.backgroundColor = clr

      // inner table data
      let table = create('table')
      table.setAttribute('style', 'border-collapse: collapse;')
      td.childNodes[0].childNodes[1].appendChild(table)
      let thead = create('thead')
      let tbody = create('tbody')
      let hdRow = create('tr')

      table.appendChild(thead)
      table.appendChild(tbody)

      thead.appendChild(hdRow)

      // Make headers
      hdRow.innerHTML = '<th>Entity</th><th>Availability</th>'

      // make rows
      keys.forEach(key => {
        let numbers = []
        data[key].forEach(dataRow => {
          numbers.push(parseFloat(dataRow['AVG_AVAIL']) * 100)
        })
        avail = getMean(numbers, 1)
        let bodyRow = create('tr')
        tbody.appendChild(bodyRow)
        let th = create('th')
        th.textContent = key
        bodyRow.appendChild(th)
        let rowTD = create('td')
        let tdclr = ''
        avail > UE_GOALS.GREEN
          ? (tdclr = 'lime')
          : avail > UE_GOALS.YELLOW
          ? (tdclr = 'yellow')
          : (tdclr = 'red')
        rowTD.style.backgroundColor = tdclr
        bodyRow.appendChild(rowTD)
        rowTD.textContent = avail.toString() + '%'
      })

      input[0] = getMean(entityData, 1)
      input[input.length - 1] = td
      return input
    }
    let L2 = function (data, input) {
      let keys = Object.keys(data)

      let cellVal = getMean(input[0], 1)
      let cellData = cellVal.toString() + '%'
      let td = create('td')
      let clr = ''
      cellVal > UE_GOALS.GREEN
        ? (clr = 'lime')
        : cellVal > UE_GOALS.YELLOW
        ? (clr = 'yellow')
        : (clr = 'red')
      // add inner table for Area's data
      let classMod = 'sub-'
      td.innerHTML =
        "<div class='" +
        classMod +
        "cell-content'><div class='" +
        classMod +
        "cell-header'>" +
        cellData +
        "</div><div class='" +
        classMod +
        "cell-body hidden'></div></div>"

      td.className = classMod + 'td-content'
      td.style.backgroundColor = clr

      // inner table data
      let table = create('table')
      table.setAttribute('style', 'border-collapse: collapse;')
      td.childNodes[0].childNodes[1].appendChild(table)
      let thead = create('thead')
      let tbody = create('tbody')
      let hdRow = create('tr')

      table.appendChild(thead)
      table.appendChild(tbody)

      thead.appendChild(hdRow)

      // Make headers
      hdRow.innerHTML = '<th>CEID</th><th>Availability</th>'

      // make rows
      for (let i = 0; i < keys.length; i++) {
        let bodyRow = create('tr')
        tbody.appendChild(bodyRow)
        let th = create('th')
        th.textContent = keys[i]
        bodyRow.appendChild(th)
        bodyRow.appendChild(input[input.length - 1][i])
      }

      input[0] = cellVal
      input[input.length - 1] = td

      return input
    }
    let L3 = function (data, input) {
      let keys = Object.keys(data)

      let cellVal = getMean(input[0], 1)
      let cellData = cellVal.toString() + '%'
      let td = create('td')
      // add inner table for Shift data
      let classMod = ''
      td.innerHTML =
        "<div class='" +
        classMod +
        "cell-content'><div class='" +
        classMod +
        "cell-header'>" +
        cellData +
        "</div><div class='" +
        classMod +
        "cell-body hidden'></div></div>"

      td.className = classMod + 'td-content'
      let clr = ''
      cellVal > UE_GOALS.GREEN
        ? (clr = 'lime')
        : cellVal > UE_GOALS.YELLOW
        ? (clr = 'yellow')
        : (clr = 'red')
      td.style.backgroundColor = clr

      // inner table data
      let table = create('table')
      table.setAttribute('style', 'border-collapse: collapse;')
      td.childNodes[0].childNodes[1].appendChild(table)
      let thead = create('thead')
      let tbody = create('tbody')
      let hdRow = create('tr')

      table.appendChild(thead)
      table.appendChild(tbody)

      thead.appendChild(hdRow)

      // Make headers
      hdRow.innerHTML = '<th>Area</th><th>Availability</th>'

      for (let i = 0; i < keys.length; i++) {
        let bodyRow = create('tr')
        tbody.appendChild(bodyRow)
        let th = create('th')
        th.textContent = keys[i]
        bodyRow.appendChild(th)
        bodyRow.appendChild(input[input.length - 1][i])
      }

      // for some reason i've determined that input[2] is going to be the td data.
      input[0] = cellVal
      typeof input[2] === 'undefined' ? input.push(td) : (input[2] = td)
      return input
    }
    switch (getDepth(data)) {
      case 0:
        return L0(data, input)
        break

      case 1:
        return L1(data, input)
        break

      case 2:
        return L2(data, input)
        break

      case 3:
        return L3(data, input)
        break

      default:
        log('Error ?')
        break
    }
  },
  QDO: function (data, input) {
    function L0 (data, input) {
      // create row for employee data
      let row = create('tr')
      input[2].push(row)

      // employee name
      let th = create('th')
      th.textContent = data[0]['FULL_NAME']

      // add to row
      row.appendChild(th)

      // setup columnNames for data
      let columns = {}
      input.push(columns)

      /*
      // how many months between min date and now
      let total_columns = monthDiff(data[0]['min_date'], d)
      let colDate = new Date(data[0]['min_date'])
      */

      // Updated 4/10/24
      // Pre-determine the max amount of data presented
      // Let's start with last 3 months including current month
      let total_columns = 3
      // loop and create column name map
      // and set default value to 0
      for (let i = total_columns - 1; i >= 0; i--) {
        let colDate = new Date()
        colDate.setMonth(colDate.getMonth() - i)
        let month = (colDate.getMonth() + 1).toString()
        let year = (colDate.getYear() - 100).toString()
        let hdr = month + '/' + year
        columns[hdr] = 0
      }

      /*
      // loop and create column name map
      // and set default value to 0
      for (let i = 0; i <= total_columns; i++) {
        let tempDate = new Date(colDate)
        tempDate.setMonth(tempDate.getMonth() + i)
        let month = (tempDate.getMonth() + 1).toString()
        let year = (tempDate.getYear() - 100).toString()
        let hdr = month + '/' + year
        columns[hdr] = 0
      }*/

      // tally up how many QDOs for each month
      let increaseBy = 0
      data.forEach(row => {
        row['created'].getMonth() === new Date().getMonth()
          ? increaseBy === 0
            ? increaseBy++
            : (increaseBy += 0)
          : (increaseBy += 0)
        // column data here
        let hdr = row['HEADER']
        if (columns[hdr]) {
          columns[hdr]++
        }
      })
      input[0] += increaseBy

      // create cells for each column and apply value
      Object.keys(columns).forEach(k => {
        let td = create('td')
        td.textContent = columns[k]
        columns[k] > 0
          ? (td.style.backgroundColor = 'lime')
          : (td.style.backgroundColor = 'red')
        row.appendChild(td)
      })

      return input
    }
    function L1 (data, input) {
      // input[0] = total employees meeting goal
      // input[1] = total employees
      // input[2] = all the rows of prebuilt data that go into tbody
      // input[3] = column names for input[2]

      // parent table data
      let cellVal = 0
      let clr = ''

      // if at least 1 employee meeting goal then calculate percentage
      input[0] > 0
        ? (cellVal = parseFloat(getPercentage(input[0], input[1])))
        : (cellVal = 0)
      // create limits in regards to how many
      // days in the month are left
      let d = new Date()
      let dt = { month: d.getMonth() + 1, year: d.getYear() + 1900 }
      let target = (
        (d.getDay() / daysInMonth(dt.year, dt.month)) *
        100
      ).toFixed(1)
      let lw = (0.75 * target).toFixed(1)
      let ll = (0.5 * target).toFixed(1)
      // color by percentage
      cellVal <= ll
        ? (clr = 'red')
        : cellVal <= lw
        ? (clr = 'yellow')
        : (clr = 'lime')
      let td = create('td')

      // convert data
      let cellData = cellVal.toString() + '%'

      // style td
      td.style.backgroundColor = clr

      // add inner table for manager's data
      let classMod = 'sub-sub-'
      td.innerHTML =
        "<div class='" +
        classMod +
        "cell-content'><div class='" +
        classMod +
        "cell-header'>" +
        cellData +
        "</div><div class='" +
        classMod +
        "cell-body hidden'></div></div>"
      td.className = classMod + 'td-content'

      // inner table data
      let table = create('table')
      table.setAttribute('style', 'border-collapse: collapse;')
      td.childNodes[0].childNodes[1].appendChild(table)
      let thead = create('thead')
      let tbody = create('tbody')
      let hdRow = create('tr')

      table.appendChild(thead)
      table.appendChild(tbody)

      thead.appendChild(hdRow)

      let th1 = create('th')
      hdRow.appendChild(th1)
      th1.textContent = 'Employee'

      let columns = Object.keys(input[3])
      columns.forEach(col => {
        let th = create('th')
        th.textContent = col
        hdRow.appendChild(th)
      })

      input[2].forEach(row => {
        tbody.appendChild(row)
      })
      input[2] = td
      return input
    }
    function L2 (data, input) {
      // parent table data
      let cellVal = 0
      let clr = ''

      // if at least 1 meeting goal then calculate percentage
      input[0] > 0
        ? (cellVal = parseFloat(getPercentage(input[0], input[1])))
        : (cellVal = 0)

      // create limits in regards to how many
      // days in the month are left
      let d = new Date()
      let dt = { month: d.getMonth() + 1, year: d.getYear() + 1900 }
      let target = (
        (d.getDay() / daysInMonth(dt.year, dt.month)) *
        100
      ).toFixed(1)
      let lw = (0.75 * target).toFixed(1)
      let ll = (0.5 * target).toFixed(1)
      // color by percentage
      cellVal <= ll
        ? (clr = 'red')
        : cellVal <= lw
        ? (clr = 'yellow')
        : (clr = 'lime')

      let tdOuter = create('td')

      // convert data
      let cellData = cellVal.toString() + '%'

      // style td
      tdOuter.style.backgroundColor = clr

      let th1 = create('th')
      let classMod = ''
      let names = Object.keys(data)
      let subKey = Object.keys(data[names[0]])
      try {
        if (names[0] === data[names[0]][subKey[0]][0]['MANAGER_NAME']) {
          th1.textContent = 'Manager'
          classMod = 'sub-'
        } else {
          th1.textContent = 'Area'
          classMod = ''
        }
      } catch (e) {
        th1.textContent = 'Area'
        classMod = ''
      }

      // add inner table for manager's data
      tdOuter.innerHTML =
        "<div class='" +
        classMod +
        "cell-content'><div class='" +
        classMod +
        "cell-header'>" +
        cellData +
        "</div><div class='" +
        classMod +
        "cell-body hidden'></div></div>"
      tdOuter.className = classMod + 'td-content'

      // inner table data
      let table = create('table')
      table.setAttribute('style', 'border-collapse: collapse;')
      tdOuter.childNodes[0].childNodes[1].appendChild(table)
      let thead = create('thead')
      let tbody = create('tbody')
      let hdRow = create('tr')

      table.appendChild(thead)
      table.appendChild(tbody)

      thead.appendChild(hdRow)

      hdRow.appendChild(th1)

      let th2 = create('th')
      hdRow.appendChild(th2)
      th2.textContent = 'Percentage'

      for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let tr = create('tr')
        tbody.appendChild(tr)
        let th = create('th')
        tr.appendChild(th)
        th.textContent = name

        let td = input[2][i]
        tr.appendChild(td)
      }
      input[2] = tdOuter

      return input
    }
    switch (getDepth(data)) {
      case 0:
        return L0(data, input)
        break

      case 1:
        return L1(data, input)
        break

      case 2:
        return L2(data, input)
        break

      default:
        return L2(data, input)
        break
    }
  },
  GOOD_CATCH: function (data, input) {
    function L0 (data, input) {
      // create row for employee data
      let row = create('tr')
      input[2].push(row)

      // employee name
      let th = create('th')
      th.textContent = data[0]['employee_name']

      // add to row
      row.appendChild(th)

      // setup columnNames for data
      let columns = {}
      input.push(columns)

      // how many months between min date and now
      let uniqueVals = unique(DATASETS.GOOD_CATCH, 'qtr')
      let total_columns = uniqueVals.length
      let start = total_columns - 4
      start < 0 ? (start = 0) : (start = start)

      // loop and create column name map
      // and set default value to 0
      for (let i = start; i < total_columns; i++) {
        columns[uniqueVals[i]] = 0
      }

      sortBy(data, 'qtr')

      // tally up how many good catches for each qtr
      data.forEach(row => {
        if (typeof columns[row['qtr']] !== 'undefined') {
          columns[row['qtr']] = row['Quarter_GC_Count']
        }
      })

      input[0] += columns[uniqueVals[uniqueVals.length - 1]]

      // create cells for each column and apply value
      Object.keys(columns).forEach(k => {
        let td = create('td')
        td.textContent = columns[k]
        columns[k] > 0
          ? (td.style.backgroundColor = 'lime')
          : (td.style.backgroundColor = 'red')
        row.appendChild(td)
      })
      return input
    }
    function L1 (data, input) {
      // input[0] = total employees meeting goal
      // input[1] = total employees
      // input[2] = all the rows of prebuilt data that go into tbody
      // input[3] = column names for input[2]

      // parent table data
      let cellVal = 0
      let clr = ''

      // if at least 1 employee meeting goal then calculate percentage
      input[0] > 0
        ? (cellVal = parseFloat(getPercentage(input[0], input[1])))
        : (cellVal = 0)

      // create limits in regards to how many
      // days in the month are qtr
      let d = new Date()
      let target = (
        (daysIntoQtr() / daysInQtr(getQtr(d.getMonth()))) *
        100
      ).toFixed(1)
      //let target = 100
      let lw = (0.75 * target).toFixed(1)
      let ll = (0.5 * target).toFixed(1)
      // color by percentage
      cellVal <= ll
        ? (clr = 'red')
        : cellVal <= lw
        ? (clr = 'yellow')
        : (clr = 'lime')
      let td = create('td')

      // convert data
      let cellData = cellVal.toString() + '%'

      // style td
      td.style.backgroundColor = clr

      // add inner table for manager's data
      let classMod = 'sub-sub-'
      td.innerHTML =
        "<div class='" +
        classMod +
        "cell-content'><div class='" +
        classMod +
        "cell-header'>" +
        cellData +
        "</div><div class='" +
        classMod +
        "cell-body hidden'></div></div>"
      td.className = classMod + 'td-content'

      // inner table data
      let table = create('table')
      table.setAttribute('style', 'border-collapse: collapse;')
      td.childNodes[0].childNodes[1].appendChild(table)
      let thead = create('thead')
      let tbody = create('tbody')
      let hdRow = create('tr')

      table.appendChild(thead)
      table.appendChild(tbody)

      thead.appendChild(hdRow)

      let th1 = create('th')
      hdRow.appendChild(th1)
      th1.textContent = 'Employee'

      let columns = Object.keys(input[3])
      columns.forEach(col => {
        let th = create('th')
        th.textContent = col
        hdRow.appendChild(th)
      })

      input[2].forEach(row => {
        tbody.appendChild(row)
      })
      input[2] = td
      return input
    }
    function L2 (data, input) {
      // parent table data
      let cellVal = 0
      let clr = ''

      // if at least 1 meeting goal then calculate percentage
      input[0] > 0
        ? (cellVal = parseFloat(getPercentage(input[0], input[1])))
        : (cellVal = 0)

      // create limits in regards to how many
      // days in the month are qtr
      let d = new Date()
      let target = (
        (daysIntoQtr() / daysInQtr(getQtr(d.getMonth()))) *
        100
      ).toFixed(1)
      //let target = 100
      let lw = (0.75 * target).toFixed(1)
      let ll = (0.5 * target).toFixed(1)
      // color by percentage
      cellVal <= ll
        ? (clr = 'red')
        : cellVal <= lw
        ? (clr = 'yellow')
        : (clr = 'lime')

      let tdOuter = create('td')

      // convert data
      let cellData = cellVal.toString() + '%'

      // style td
      tdOuter.style.backgroundColor = clr

      let th1 = create('th')
      let classMod = ''
      let names = Object.keys(data)
      let subKey = Object.keys(data[names[0]])
      try {
        if (names[0] === data[names[0]][subKey[0]][0]['mgr_name']) {
          th1.textContent = 'Manager'
          classMod = 'sub-'
        } else {
          th1.textContent = 'Area'
          classMod = ''
        }
      } catch (e) {
        th1.textContent = 'Area'
        classMod = ''
      }

      // add inner table for manager's data
      tdOuter.innerHTML =
        "<div class='" +
        classMod +
        "cell-content'><div class='" +
        classMod +
        "cell-header'>" +
        cellData +
        "</div><div class='" +
        classMod +
        "cell-body hidden'></div></div>"
      tdOuter.className = classMod + 'td-content'

      // inner table data
      let table = create('table')
      table.setAttribute('style', 'border-collapse: collapse;')
      tdOuter.childNodes[0].childNodes[1].appendChild(table)
      let thead = create('thead')
      let tbody = create('tbody')
      let hdRow = create('tr')

      table.appendChild(thead)
      table.appendChild(tbody)

      thead.appendChild(hdRow)

      hdRow.appendChild(th1)

      let th2 = create('th')
      hdRow.appendChild(th2)
      th2.textContent = 'Percentage'

      for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let tr = create('tr')
        tbody.appendChild(tr)
        let th = create('th')
        tr.appendChild(th)
        th.textContent = name

        let td = input[2][i]
        tr.appendChild(td)
      }
      input[2] = tdOuter

      return input
    }

    switch (getDepth(data)) {
      case 0:
        return L0(data, input)
        break

      case 1:
        return L1(data, input)
        break

      case 2:
        return L2(data, input)
        break

      default:
        return L2(data, input)
        break
    }
  }
}

/* 
    Use this function instead of nested loops. It works
    and there are no worries about having to nest loops
    via manual coding.
  
    args = data,columns
    data: XMLHTTPRequest data
    columns: list of column names in reverse order ["col3","col2","col1"]
  */
function loop (data, columns) {
  let dictionary = {}
  let column = columns.pop()
  let values = unique(data, column)

  for (let i = 0; i < values.length; i++) {
    let newData = dataEquals(data, column, values[i])
    if (columns.length > 0) {
      dictionary[values[i]] = loop(newData, JSON.parse(JSON.stringify(columns)))
    } else {
      dictionary[values[i]] = newData
    }
  }
  return dictionary
}

/*
    joinData takes in 2 datasets and joins dataset2 to dataset1
    where column1 = column2 and returns a single joined dataset
  */
function joinData (dataset1, dataset2, column1, column2) {
  /*
    used to verify name doesn't already exist. Adds a number
    to the end of the column name if it does
    */
  function checkColumnName (row, key, num) {
    let result = ''
    if (typeof row[key] !== 'undefined') {
      if (typeof num === 'undefined') {
        let num = 1
        result = checkColumnName(row, key, num)
      } else {
        if (typeof row[key + num.toString()] !== 'undefined') {
          num += 1
          result = checkColumnName(row, key, num)
        } else {
          result = key + num.toString()
        }
      }
    } else {
      result = key
    }
    return result
  }

  dataset1.forEach(row1 => {
    dataset2.forEach(row2 => {
      if (row1[column1] === row2[column2]) {
        let keys = Object.keys(row2)
        keys.forEach(key => {
          row1[checkColumnName(row1, key)] = row2[key]
        })
      }
    })
  })
  return dataset1
}

/*
    The purpose of getDepth() is to return the number of dictionaries
    until the array of data is reached
  */
function getDepth (dataset) {
  let depth = 0
  if (!Array.isArray(dataset)) {
    depth += 1
    let keys = Object.keys(dataset)
    depth += getDepth(dataset[keys[0]])
  } else {
    return 0
  }
  return depth
}

function compareDicts (dict1, dict2) {
  let keys1 = Object.keys(dict1)
  let keys2 = Object.keys(dict2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (let i = 0; i < keys1.length; i++) {
    if (dict1[keys1[i]] !== dict2[keys1[i]]) {
      return false
    }
  }
  return true
}
