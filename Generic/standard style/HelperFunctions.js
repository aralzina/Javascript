/**
 * Easier way to append multiple childen using an ordered list
 * @param {HTMLElement} parent element to append children to
 * @param {Array<HTMLElement> | HTMLElement} children Array of children to append
 */
function appendChildren (parent, children) {
  // if a single element is passed, make it an array anyways
  if (!Array.isArray(children)) {
    children = [children]
  }

  children.forEach(child => {
    try {
      parent.appendChild(child)
    } catch (e) {
      console.log(
        'Failed to append ' + child.toString() + ' to ' + parent.toString()
      )
    }
  })
}

/**
 * Quick create an HTML element
 * @param {string} type type of element to create
 * @param {Map | undefined} args id, className, style, etc.
 * @param {Map | undefined} attrs any attributes using the setAttributes function
 * @returns
 */
function create (type, args, attrs) {
  // make the element
  let element = document.createElement(type)

  // if any args are included, assign them
  if (typeof args !== 'undefined') {
    element = addProp(element, args)
  }

  //if any attributes are included, set them
  if (typeof attrs !== 'undefined') {
    element = addAttr(element, attrs)
  }
  return element
}

function getClass (className) {
  return document.getElementsByClassName(className)
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
 * Simple function to return element by id without
 * having to type the full js out
 * @param {string} id string of type to create
 * @returns {HTMLElement} returns element of type input
 */
function id (id) {
  return document.getElementById(id)
}

/**
 * Because I hate typing cosole.log(...)
 * @param {*} text anything really...
 */
function log (text) {
  console.log(text)
}

/**
 * Get rid of duplicate rows within an array
 * @param {Array} data array to remove duplicates from
 * @returns {Array} array with no duplicates
 */
function removeDuplicates (data) {
  let results = []
  data.forEach(row => {
    let found = false
    let rowData = JSON.stringify(row)
    results.forEach(result => {
      let resultData = JSON.stringify(result)
      if (rowData === resultData) {
        found = true
      }
    })
    if (found === false) {
      results.push(row)
    }
  })
  return results
}

/**
 * Simple sort
 * @param {Array} data
 * @param {boolean|undefined} asc - optional - defaults to true
 * @returns {Array}
 */
function sort (data, asc) {
  // make sure asc is a boolean even if not provided
  asc = typeof asc !== 'undefined' ? asc : true

  // sort
  data.sort(a, b => {
    return asc ? (a < b ? -1 : a > b ? 1 : 0) : a < b ? 1 : a > b ? -1 : 0
  })

  return data
}

/**
 * Predefined sort function instead of having to
 * @param {Dict|Map} data a dictionary to sort
 * @param {String} col the column to sort by
 * @param {boolean|undefined} asc (optional) - defaults to true
 * @returns {Dict|Map} returns sorted dictionary/HTML collection even though the dict is already sorted
 */
function sortBy (data, col, asc) {
  // make sure asc is a boolean even if not provided
  asc = typeof asc !== 'undefined' ? asc : true

  // sort
  data.sort((a, b) => {
    return asc
      ? a[col] < b[col]
        ? -1
        : a[col] > b
        ? 1
        : 0
      : a[col] < b[col]
      ? 1
      : a[col] > b
      ? -1
      : 0
  })
  return data
}

/**
 * Quick way to add multpile attributes to an HTML element
 * ex. element.addAttribute('key','val')
 * @param {HTMLElement} element the element to add the attribures
 * @param {*} args a dict|map of attrs to be added
 * @returns {HTMLElement}
 */
function addAttr (element, args) {
  Object.keys(args).forEach(key => {
    try {
      element[key] = args[key]
    } catch (e) {
      console.log('Error assigning' + key + ' to element')
    }
  })
  return element
}

/**
 * Quick way to add multiple properties to an HTML element
 * ex. element[key] = val
 * @param {HTMLElement} element
 * @param {*} attr
 * @returns {HTMLElement}
 */
function addProp (element, args) {
  Object.keys(args).forEach(key => {
    try {
      element.setAttribute(key, args[key])
    } catch (e) {
      log('Error adding attr ' + key.toString() + ' to element')
    }
  })
  return element
}

function basicTable () {
  results = {
    table: create('table'),
    thead: create('thead'),
    tbody: create('tbody')
  }
  appendChildren(results.table, [results.thead, results.tbody])
  return results
}
