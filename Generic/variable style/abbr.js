/**
 * Easier way to append multiple childen using an ordered list
 * @param {HTMLElement} parent element to append children to
 * @param {Array<HTMLElement> | HTMLElement} children Array of children to append
 */
let appendChildren = (parent, children) => {
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
 * @param {Map | undefined} attrs any attributes using the setAttributes let
 * @returns
 */
let create = (type, args, attrs) => {
  // make the element
  let element = document.createElement(type)

  // if any args are included, assign them
  if (typeof args !== 'undefined') {
    Object.keys(args).forEach(key => {
      try {
        element[key] = args[key]
      } catch (e) {
        console.log('Error assigning args to ' + type + ' element')
      }
    })
  }

  //if any attributes are included, set them
  if (typeof attrs !== 'undefined') {
    Object.keys(attrs).forEach(attr => {
      try {
        element.setAttribute(attr, attrs[attr])
      } catch (e) {
        log('Error adding attr ' + attr.toString() + ' to element')
      }
    })
  }
  return element
}

let getClass = className => {
  return document.getElementsByClassName(className)
}

let getOffset = el => {
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
 * Simple let  to return element by id without
 * having to type the full js out
 * @param {string} id string of type to create
 * @returns {HTMLElement} returns element of type input
 */
let id = id => {
  return document.getElementById(id)
}

/**
 * Because I hate typing cosole.log(...)
 * @param {*} text anything really...
 */
let log = text => {
  console.log(text)
}

/**
 * Get rid of duplicate rows within an array
 * @param {Array} data array to remove duplicates from
 * @returns {Array} array with no duplicates
 */
let removeDuplicates = data => {
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
let sort = (data, asc) => {
  // make sure asc is a boolean even if not provided
  asc = typeof asc !== 'undefined' ? asc : true

  // sort
  data.sort(a, b => {
    return asc ? (a < b ? -1 : a > b ? 1 : 0) : a < b ? 1 : a > b ? -1 : 0
  })

  return data
}

/**
 * Predefined sort let  instead of having to
 * @param {Dict|Map} data a dictionary to sort
 * @param {String} col the column to sort by
 * @param {boolean|undefined} asc (optional) - defaults to true
 * @returns {Dict|Map} returns sorted dictionary/HTML collection even though the dict is already sorted
 */
let sortBy = (data, col, asc) => {
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
