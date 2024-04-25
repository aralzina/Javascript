var FILTER_ORDER = []

/**
 *
 * @param {Array} arr initial array
 * @param {*} element element to be removed
 * @returns {Array} array with element removed
 */
function removeElement (arr, element) {
  // get index number
  let index = arr.indexOf(element)

  // delete the item
  delete arr[index]

  //rebuild the array
  let temp = new Array()
  arr.forEach(ele => {
    if (typeof ele !== 'undefined') {
      temp.push(ele)
    }
  })

  //sort the array
  if (arr.length > 0) {
    temp.sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0
    })
  }
  arr = temp
  //return the new array
  return arr
}

/**
 *
 * @param {Array} arr initial array
 * @param {*} element element to be added
 * @returns {Array} the initial array
 */
function addElement (arr, element) {
  if (!arr.includes(element)) {
    // add the element
    arr.push(element)

    //sort the array
    arr.sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0
    })
  }
  // return the initial array
  return arr
}

function addFilter (name, data, column) {
  if (typeof FILTER === 'undefined') {
    FILTER = {}
  }
  if (typeof FILTER[column] === 'undefined') {
    FILTER[column] = new Array()
  }

  // add to filter order This will determine in what order the data is filtered
  FILTER_ORDER.push(column)

  let form = $('#report-filter-form')

  let span = create('span')
  span.textContent = name
  span.className = 'form-span'
  let select = create('select')
  select.setAttribute('data-placeholder', 'Type here to filter...')
  select.setAttribute('multiple', '')
  select.setAttribute('class', 'chosen-select')
  select.setAttribute('name', column)
  select.setAttribute('id', column + '-select')
  let text = '<option value=""></option>'
  let uniqueVals = unique(data, column)
  uniqueVals.forEach(val => {
    text += '<option>' + val + '</option>'
  })
  select.innerHTML = text
  form.append(span)
  form.append(select)
  $('#' + column + '-select').trigger('chosen:updated')
  $('.chosen-select').chosen({
    no_results_text: 'Oops, nothing found!'
  })

  $('#' + column + '-select').on('change', function (evt, params) {
    //log(evt)
    //log(params)
    if (typeof params.selected !== 'undefined') {
      FILTER[column] = addElement(FILTER[column], params.selected)
    }
    if (typeof params.deselected !== 'undefined') {
      FILTER[column] = removeElement(FILTER[column], params.deselected)
    }

    if (column === 'FunctionalArea') {
      updateFilters(evt.target)
    }
  })
}

function updateFilters (caller) {
  let data = global_filter_data
  let callerName = caller.id
  let callerIndex = FILTER_ORDER.indexOf(callerName)
  // Filter out dataset first
  if (FILTER[FILTER_ORDER[0]].length > 0) {
    // only filter the data for the filter order and each one before it.

    for (let i = 0; i < callerIndex === 0 ? -1 : callerIndex; i++) {
      if (FILTER[FILTER_ORDER[i]].length > 0) {
        data = dataIn(data, FILTER_ORDER[i], FILTER[FILTER_ORDER[i]])
      }
    }
  }

  // Iterate selects and update the options
  for (let i = callerIndex; i < FILTER_ORDER.length - 1; i++) {
    let name = FILTER_ORDER[i]
    let select = $('#' + name + '-select')
    if (select.attr('id') !== caller.id) {
      let optionNames = unique(data, name)
      console.log(name)
      console.log(optionNames)
      select[0].innerHTML = ''
      let oList = []
      oList.push(create('option'))
      oList[0].setAttribute('value', '')
      optionNames.forEach(op => {
        oList.push(create('option', { textContent: op }))
      })
      appendChildren(select[0], oList)
      select.trigger('chosen:updated')
    }
  }
}
