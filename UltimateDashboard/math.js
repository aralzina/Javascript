function getMean (numbers, decimals) {
  if (typeof decimals === 'undefined') {
    decimals = 2
  }
  let sum = 0.0
  numbers.forEach(number => {
    if (typeof number === 'string') {
      number = parseFloat(number)
    }
    sum += number
  })
  return (sum / numbers.length).toFixed(decimals)
}

// Returns float  of x divided by y. Decimal place specification defaults to 1
function getPercentage (x, y, decimals) {
  if (typeof decimals === 'undefined') {
    decimals = 1
  }
  if (typeof x === 'strings' || typeof y === 'strings') {
    x = parseFloat(x)
    y = parseFloat(y)
  }
  return ((x / y) * 100).toFixed(decimals)
}

// Returns difference in two dates
function monthDiff (d1, d2) {
  var months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

function daysDiff (d1, d2) {
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24))
}

var daysInMonth = (year, month) => new Date(year, month, 0).getDate()

var getQtr = function (month) {
  let test = (month + 1) / 12
  let qtr
  test <= 0.25
    ? (qtr = 1)
    : test <= 0.5
    ? (qtr = 2)
    : test <= 0.75
    ? (qtr = 3)
    : (qtr = 4)
  return qtr
}

var daysInQtr = function (qtr) {
  let months = [1, 2, 3]
  for (let i = 0; i < qtr - 1; i++) {
    months[i] = months[i] + (qtr - 1) * 3
  }
  let totalDays = 0
  let year = new Date().getYear() + 1900
  months.forEach(month => {
    totalDays += daysInMonth(year, month)
  })
  return totalDays
}

var daysIntoQtr = function () {
  let d = new Date()
  let qtr = getQtr(d.getMonth())
  let startMonth = (qtr - 1) * 3
  let startDate = new Date(d.getYear() + 1900, startMonth)
  return daysDiff(startDate, new Date())
}

/**
 * Linear regression takes in x and y series data and returns the linear
 * regression values of m and b. y = m (x) + b
 *
 * @param {*} args args.x and args.y are the charted x,y series data
 * @returns m, b for linear regression formula
 */
function linearRegression (args) {
  // validate params
  if (!args.x || !args.y) {
    throw EXCEPTIONS.PARAMETERS
  }

  // make sure both args are the same in length
  if (args.x.length !== args.y.length) {
    throw EXCEPTIONS.SERIES_LENGTH
  }

  let length = args.x.length
  let sumX = 0.0
  let sumY = 0.0
  let sumXSquared = 0.0
  let sumXY = 0.0

  for (let i = 0; i < length; i++) {
    let x = args.x[i]
    let y = args.y[i]
    sumX += x
    sumY += y
    sumXSquared += Math.pow(x, 2)
    sumXY += x * y
  }
  let a =
    (sumY * sumXSquared - sumX * sumXY) /
    (length * sumXSquared - Math.pow(sumX, 2))
  let b =
    (length * sumXY - sumX * sumY) / (length * sumXSquared - Math.pow(sumX, 2))

  return { m: b, b: a, n: length }
}

/**
 * linear fit takes in linear regression formula and predicts values
 *
 * @param {*} args needs m,b, and n of index values
 * @returns series of predicted values
 */
function linearFit (args) {
  const ae = {
    name: 'Parameter Error',
    level: 'End Function',
    message: 'args is missing a necessary definition',
    toString: function () {
      return this.name + ': ' + this.message
    }
  }
  // args
  // m
  // b
  // n
  if (!args.m || !args.b || !args.n) {
    throw ae
  }
  let m = args.m
  let b = args.b

  // assuming that x axis is going to be an index
  // x: 1, 2, 3...
  let series = []
  for (let x = 1; x <= n; x++) {
    series.push(m * x + b)
  }
  return series
}

/**
 * intercept calculates an upper or lower control intercept within
 * the the range of n
 *
 * @param {*} args
 * @returns ...
 */
function intercept (args) {}
