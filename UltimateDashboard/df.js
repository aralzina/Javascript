/**
 * Remove the useless ID data from data received from PBI
 * @param {Array<Map>} data
 * @returns {Array<Map>}
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

/**
 *   return a list of data where the key provided matches the value provided exactly
 * @param {*} data
 * @param {string} key key to filter on
 * @param {*} val value to filter on
 * @param {string}dataType if datatype is a month... specific usecase
 * @returns {*}
 */
function dataEquals (data, key, val, dataType) {
  let results = []
  for (let i = 0; i < data.length; i++) {
    if (typeof dataType === 'undefined') {
      if (data[i][key] === val) {
        results.push(data[i])
      }
    } else {
      if (dataType === 'month') {
        if (data[i][key].getMonth() === val) {
          results.push(data[i])
        }
      }
    }
  }
  return results
}

/**
   * Return a list of data where the key provided matches at least one of the values
      provided in the array *values
      Input is the raw data from an XMLHttpRequest
   * @param {*} data 
   * @param {string} key key name to filter on
   * @param {Array|*} values values to include
   * @returns {*}
   */
function dataIn (data, key, values) {
  // fix simple error of values not being an array
  values = !Array.isArray(values) ? [values] : values
  //let BreakException = {}
  let results = []
  data.forEach(row => {
    let check = row[key]
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

/**
 * Return a list of data where the key value does not
 * equal the supplied value
 * @param {Array<Map>|*} data
 * @param {string} key name of key with data to be excluded
 * @param {*} val specific value of data to be excluded
 * @returns
 */
function dataNotEquals (data, key, val) {
  let results = []
  data.forEach(row => {
    if (row[key].toString().toUpperCase() !== val.toString().toUpperCase()) {
      results.push(row)
    }
  })
  return results
}

/**
 * Returns only data that doens't match the value proved
 * @param {*} data
 * @param {*} key key name to filter on
 * @param {*} value value to exclude
 * @returns {Dict|Map}
 */
function dataNotLike (data, key, value) {
  let results = []
  data.forEach(row => {
    if (!row[key].toUpperCase().includes(value)) {
      results.push(row)
    }
  })
  return results
}

/**
 * Takes in data and column name and returns how many unique values are in the column
 * Function expects that the data from JSON.parse() 'data.value' will be supplied and that
 * the function only needs to reference data instead of data.value
 * @param {*} data data to get unique values from
 * @param {*} key key with values that need to be unique
 * @returns {Array} array of unique values
 */
function unique (data, key) {
  // if data has nothing in it... return
  if (data.length === 0) {
    return []
  }

  // make a deep copy of the data so that the initial data isn't sorted
  data = JSON.parse(JSON.stringify(data))

  //sort data by key provided
  data.sort(function (a, b) {
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
  })

  // push the first key in and save it in variable for loop comparison
  let results = []
  let val = data[0][key]
  results.push(val)

  for (let i = 1; i < data.length; i++) {
    let newVal = data[i][key]
    if (val !== newVal) {
      val = newVal
      results.push(val)
    }
  }
  return results
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

function CustomException (message) {
  const error = new Error(message)
  return error
}
CustomException.prototype = Object.create(Error.prototype)

/**
 * Perform a union join on two dict/map type datasets
 * @param {*} data1 first dataset
 * @param {*} data2 second dataset
 * @param {String} sortColumn column name to sort by
 * @param {boolean | undefined} asc Optional - defaults to true
 * @returns {*} first dataset with second appended
 * @throws Error if datasets dont have the same columns
 */
function union (data1, data2, sortColumn, asc) {
  let keys1, keys2

  keys1 = Object.keys(data1[0])
  keys2 = Object.keys(data2[0])

  /* Removing for this report
  // check for header continuity - checks if data2 columns are in data1
  keys1.forEach(k1 => {
    if (!keys2.includes(k1)) {
      // Throw exception if mismatch
      throw CustomException(
        `Column mismatch: ${k1} not found in second dataset`
      )
    }
  })

  // check for header continuity - checks if data1 columns are in data2
  keys2.forEach(k2 => {
    if (!keys1.includes(k2)) {
      // Throw exception if mismatch
      throw CustomException(
        `Column mismatch: '${k2}' not found in first dataset`
      )
    }
  })*/

  // add rows to initial data
  data2.forEach(row => {
    data1.push(row)
  })

  if (typeof sortColumn !== 'undefined') {
    return sortBy(data1, sortColumn, asc)
  }

  return data1
}

/**
 * Returns only data that matches the value provided
 * @param {*} data
 * @param {*} key key name to filter on
 * @param {*} value value to include
 * @returns {Dict|Map}
 */
function dataLike (data, key, value) {
  let results = []
  data.forEach(row => {
    if (row[key].toUpperCase().includes(value)) {
      results.push(row)
    }
  })
  return results
}
