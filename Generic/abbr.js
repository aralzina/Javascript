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
 * @returns
 */
function create (type, args) {
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
  return element
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
 * Simple sort
 * @param {Array} data
 * @param {boolean|undefined} asc - optional - defaults to true
 * @returns {Array}
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

/**
 * Predefined sort function instead of having to
 * @param {Dict|Map} data a dictionary to sort
 * @param {String} col the column to sort by
 * @param {boolean|undefined} asc (optional) - defaults to true
 * @returns {Dict|Map} returns sorted dictionary/HTML collection even though the dict is already sorted
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
