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

function addFilterChosen (name, data, column) {
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
  let select = create(
    'select',
    { className: 'select-multiple', id: column + '-select' },
    {
      name: column + '[]',
      multiple: 'multiple',
      'data-placeholder': 'Select an option...'
    }
  )
  select.setAttribute('multiple', '')
  select.setAttribute('class', 'chosen-select')
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

function updateFiltersChosen (caller) {
  let data = global_filter_data
  let callerName = caller.id
  let callerIndex = FILTER_ORDER.indexOf(callerName.split('-')[0])
  // Filter out dataset first
  if (FILTER[FILTER_ORDER[0]].length > 0) {
    // only filter the data for the filter order and each one before it.

    for (let i = 0; i <= (callerIndex !== 0 ? callerIndex - 1 : 0); i++) {
      if (FILTER[FILTER_ORDER[i]].length > 0) {
        data = dataIn(data, FILTER_ORDER[i], FILTER[FILTER_ORDER[i]])
      }
    }
  }

  // Iterate selects and update the options
  for (let i = callerIndex; i < FILTER_ORDER.length; i++) {
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
      let field = document.querySelector('#' + name + '_select_chosen > ul')
      let addBackIn = Array.prototype.slice(
        document.querySelectorAll(
          '#' + name + '_select_chosen > ul > li.search-choice'
        )
      )

      //replace what the user has already selected if it is in the option names
      select.trigger('chosen:updated')
      // just update it for now

      let last = field.childNodes[field.childNodes.length - 1]
      addBackIn.push(last)
      field.removeChild(last)
      appendChildren(field, addBackIn)
    }
  }
}

// Select 2 version

function select2DataFormat (data, key) {
  let unique_vals = unique(data, key)
  let s2data = []
  unique_vals.forEach(v => {
    s2data.push({
      id: unique_vals.indexOf(v),
      text: v
    })
  })
  return s2data
}

function addFilter (name, key) {
  if (typeof FILTER === 'undefined') {
    FILTER = {}
  }
  if (typeof FILTER[key] === 'undefined') {
    FILTER[key] = new Array()
  }

  // add to filter order This will determine in what order the data is filtered
  FILTER_ORDER.push(key)

  let form = $('#report-filter-form')[0]

  let span = create('span', { textContent: name, className: 'form-span' })
  let select = create(
    'select',
    {
      className: 'select-multiple',
      id: key + '-select'
    },
    {
      multiple: 'multiple',
      'data-placeholder': 'Select an option...',
      style: 'width: 160px'
    }
  )
  appendChildren(form, [span, select])
}

function updateFilter () {}

/*Example code that was working
 $('#select2-1').on('change',function(e){
  try{
  $('#select2-2').select2('destroy')
  }catch(e){console.log('cant destroy')}
  	let results = $('#select2-1').select2('data')
    let select22data = []
    for(let i=0; i < results.length;i++){
    	switch(results[i].id){
      case "1":
      select22data.push(data1)
      break;
      case "2":
      select22data.push(data2)
      break;
      case "3":
      select22data.push(data3)
      break;
      }
    	$('#select2-2').select2({data:select22data})
    }
  })
*/
