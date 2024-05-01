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

/**
 *  Convert csv file into JSON
 * @param {string} csv
 * @returns {JSON}
 */
function csvJSON (csv) {
  // split lines out
  var lines = csv.split('\n')

  var result = []

  // set headers from first row
  var headers = lines[0].split(',')

  // loop the rest to get data
  for (var i = 1; i < lines.length; i++) {
    var obj = {}
    var currentline = lines[i].split(',')

    for (var j = 0; j < headers.length; j++) {
      try {
        if (typeof currentline[j] !== 'undefined') {
          if (currentline[j].length > 0) {
            obj[headers[j]] = currentline[j].replace('\r', '')
          }
        }
      } catch (e) {}
    }
    result.push(obj)
  }

  try {
    throw {}
  } catch (e) {}
  //return result as JSON
  return JSON.parse(JSON.stringify(result))
}
