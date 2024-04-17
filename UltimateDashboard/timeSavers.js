/**
 * Predefined sort function instead of having to
 * @param {HTMLCollection|Map} data a dictionary to sort
 * @param {String} col the column to sort by
 * @param {boolean} asc (optional) - defaults to true
 * @returns {HTMLCollection|Map} returns sorted dictionary/HTML collection
 * even though the dict is already sorted
 */
function sortBy (data, col, asc) {
  // make sure asc is a boolean even if not provided
  asc ? (asc = true) : (asc = false)

  // sort
  data.sort((a, b) => {
    if (asc) {
      return a[col] < b[col] ? -1 : a[col] > b ? 1 : 0
    } else {
      return a[col] < b[col] ? 1 : a[col] > b ? -1 : 0
    }
  })
  return data
}

/**
 *
 * @param {Array} data
 * @param {boolean} asc - optional - defaults to true
 * @returns
 */
function sort (data, asc) {
  // make sure asc is a boolean even if not provided
  asc ? (asc = true) : (asc = false)

  // sort
  data.sort(a, b => {
    if (asc) {
      return a < b ? -1 : a > b ? 1 : 0
    } else {
      return a < b ? 1 : a > b ? -1 : 0
    }
  })
  return data
}

function getClass (className) {
  return document.getElementsByClassName(className)
}

function getId (Id) {
  return document.getElementById(Id)
}

function getOffset (el) {
  var _x = 0
  var _y = 0
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft
    _y += el.offsetTop - el.scrollTop
    el = el.offsetParent
  }
  return { top: _y, left: _x }
}

/**
 * Quick create an HTML element
 * @param {string} type type of element to create
 * @param {Map | Dict} args id, className, style, etc.
 * @returns
 */
function create (type, args) {
  // make the element
  let element = document.createElement(type)

  // if any args are inclucded, assign them
  if (typeof args !== 'undefined') {
    Object.keys(args).forEach(key => {
      try {
        element[key] = args[key]
      } catch (e) {
        console.log('Error assigning args to ' + type + ' element')
      }
    })
  }
  return element
}

function log (text) {
  console.log(text)
}
