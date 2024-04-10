/* 
  Takes in data and column name and returns how many unique values are in the column 
  Function expects that the data from JSON.parse() 'data.value' will be supplied and that
  the function only needs to reference data instead of data.value
  */
function unique (data, col) {
  //sort data by column for good measure
  data.sort(function (a, b) {
    if (a[col] < b[col]) {
      return -1
    }
    if (a[col] > b[col]) {
      return 1
    }
    return 0
  })

  let results = []
  let val = data[0][col]
  results.push(val)

  for (let i = 1; i < data.length; i++) {
    let newVal = data[i][col]
    if (val !== newVal) {
      val = newVal
      results.push(val)
    }
  }
  return results
}

/*
  return a list of data where the column provided matches the value provided exactly
  */
function dataEquals (data, col, val, dataType) {
  let results = []
  for (let i = 0; i < data.length; i++) {
    if (typeof dataType === 'undefined') {
      if (data[i][col] === val) {
        results.push(data[i])
      }
    } else {
      if (dataType === 'month') {
        if (data[i][col].getMonth() === val) {
          results.push(data[i])
        }
      }
    }
  }
  return results
}

/*
    Return a list of data where the column value does not
    equal the supplied value
  */
function dataNotEquals (data, col, val) {
  let results = []
  data.forEach(row => {
    if (row[col].toString().toUpperCase() !== val.toString().toUpperCase()) {
      results.push(row)
    }
  })
  return results
}

/*
    Return a list of data where the column provided matches at least one of the values
    provided in the array *values
    Input is the raw data from an XMLHttpRequest
  */
function dataIn (data, col, values) {
  //let BreakException = {}
  let results = []
  data.forEach(row => {
    let check = row[col]
    //try {
    values.forEach(val => {
      if (val === check) {
        results.push(row)
        //throw BreakException
      }
    })
    //} catch (e) {
    // if (e !== BreakException) throw e
    //}
  })
  return results
}

/*
    Returns only data that doens't match the value proved
  */
function dataNotLike (data, col, value) {
  let results = []
  data.forEach(row => {
    if (!row[col].toUpperCase().includes(value)) {
      results.push(row)
    }
  })
  return results
}

/*
  Remove the useless ID data from data received from PBI
  */
function cleanData (data) {
  let result = []

  let keys = Object.keys(data[0])
  for (let i = 0; i < data.length; i++) {
    let row = {}
    for (let j = 1; j < keys.length; j++) {
      row[keys[j]] = data[i][keys[j]]
    }
    result.push(row)
  }
  return result
}

function doubleFilter (dataset1, dataset2, column1, column2) {
  // get unique values from dataset2
  let u = unique(dataset2, column2)

  // filter dataset1 by unique values from dataset2
  dataset1 = dataIn(dataset1, column1, u)

  // get unique values from dataset1
  u = unique(dataset1, column1)

  // filter dataset 2 by unique values from dataset2
  dataset2 = dataIn(dataset2, column2, u)

  return [dataset1, dataset2]
}
