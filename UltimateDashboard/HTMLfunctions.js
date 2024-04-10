// Main HTML functions
function moduleTableOutline () {
  // Table of Tables?
  // Plan
  // SPC OOCs
  // EP/E3 OOCs
  // Tracers
  // Tool Errors
  // QEF/DRBs
  // PM Schedule/ Planned work "EFITS etc"
  // QEF ARs
  // Pending SIFs
  // Safety, PQGC ARs
  // SCANDO
  // PCSA
}

function factoryTableOutline (category, subCategories) {
  // make 4 columns ( 4 shifts)
  let colNum = 4
  let rows = []
  // make total number of rows needed
  for (let i = 0; i < subCategories.length; i++) {
    rows.push(create('tr'))
  }
  // make category 'header'
  let rowHeader = create('th')
  rowHeader.textContent = category
  // span rows = to subcategory number
  rowHeader.setAttribute('rowspan', subCategories.length.toString())

  // assign it to the first row
  rows[0].appendChild(rowHeader)

  // loop and build cells for each row
  for (let i = 0; i < subCategories.length; i++) {
    let cellNum = 4
    let row = rows[i]
    // make and add subcat column
    let hdr = create('th')
    hdr.textContent = subCategories[i]
    if (subCategories[i] === CATEGORIES.People[0]) {
      hdr.setAttribute('style', 'padding: 0px 1px;')
      hdr.innerHTML = ''
      let btn = create('button')
      btn.setAttribute('style', 'width:100%;height:100%;')
      btn.title = 'Click for graph'
      hdr.appendChild(btn)
      let newTitle = subCategories[i]
      btn.innerHTML = newTitle
      btn.onclick = function (event) {
        try {
          let args = chart_data_args(DATASETS.QDO, {}, 'area', undefined, {})

          // Build the graph
          makeGraph(CHART_DATA.QDO(args))
        } catch (e) {
          log(e)
        }
      }
    }
    if (subCategories[i] === CATEGORIES.People[1]) {
      hdr.setAttribute('style', 'padding: 0px 1px;')
      hdr.innerHTML = ''
      let btn = create('button')
      btn.setAttribute('style', 'width:100%;height:100%;')
      btn.title = 'Click for graph'
      hdr.appendChild(btn)
      let newTitle = subCategories[i]
      btn.innerHTML = newTitle
      btn.onclick = function (event) {
        try {
          let args = chart_data_args(
            DATASETS.GOOD_CATCH,
            {},
            'org_level_desc8',
            undefined,
            {}
          )

          // Build the graph
          makeGraph(CHART_DATA.GOOD_CATCH(args))
        } catch (e) {
          log(e)
        }
      }
    }
    if (subCategories[i] === CATEGORIES.Velocity[0]) {
      hdr.setAttribute('style', 'padding: 0px 1px;')
      hdr.innerHTML = ''
      let btn = create('button')
      btn.setAttribute('style', 'width:100%;height:100%;')
      btn.title = 'Click for graph'
      hdr.appendChild(btn)
      let subCatSplit = subCategories[i].split(' ')
      let newTitle = subCatSplit[1] + '<br>' + subCatSplit[0]
      btn.innerHTML = newTitle
      btn.onclick = function (event) {
        let args = chart_data_args(
          // Filter Dataset
          dataEquals(DATASETS.UE, 'TECHNOLOGY', 'Shared'),
          { x: 'WW', y: 'AVG_AVAIL' },
          'AREA',
          'string',
          { y: 'Average Availability', main: '1270 Availability' }
        )

        // Build the graph
        makeGraph(CHART_DATA.AVAILABILITY(args))
      }
    }
    if (subCategories[i] === CATEGORIES.Velocity[1]) {
      hdr.setAttribute('style', 'padding: 0px 1px;')
      hdr.innerHTML = ''
      let btn = create('button')
      btn.setAttribute('style', 'width:100%;height:100%;')
      hdr.appendChild(btn)
      btn.title = 'Click for graph'
      let subCatSplit = subCategories[i].split(' ')
      let newTitle = subCatSplit[1] + '<br>' + subCatSplit[0]
      btn.innerHTML = newTitle
      btn.onclick = function (event) {
        let args = chart_data_args(
          // Filter Data
          dataEquals(DATASETS.UE, 'TECHNOLOGY', 'P1274'),
          { x: 'WW', y: 'AVG_AVAIL' },
          'AREA',
          'string',
          { y: 'Average Availability', main: '1274 Availability' }
        )
        makeGraph(CHART_DATA.AVAILABILITY(args))
      }
    }
    row.appendChild(hdr)
    for (let j = 0; j < colNum; j++) {
      let cell = create('td')
      cell.className = 'td-content'
      cell.id =
        category.toLowerCase() +
        '-' +
        subCategories[i].toLowerCase() +
        '-' +
        (j + 4).toString()
      cell.innerHTML =
        "<div class='cell-content'> <div class='cell-header'></div> <div class='cell-body hidden'></div></div>"
      row.appendChild(cell)
    }
  }
  let tbody = document.getElementById('report-table')
  rows.forEach(row => {
    tbody.appendChild(row)
  })
}
function fillCells (category, subcategory, dataset) {
  let base_id = category.toLowerCase() + '-' + subcategory.toLowerCase() + '-'
  let keys = Object.keys(dataset)
  keys.forEach(key => {
    let id = base_id + key.toString()
    let element = document.getElementById(id)
    let mainFunc = null
    let func = null
    let footer = null
    if (category === CATEGORY_KEYS.PEOPLE) {
      if (subcategory === CATEGORIES.People[0]) {
        mainFunc = countRecursion
        func = TABLE_FUNCTIONS.QDO
        let notes = DATA_NOTES.QDO
        footer = create('tfoot')
        notes.forEach(note => {
          footer.innerHTML =
            footer.innerHTML + "<tr><td colspan='2'>" + note + '</td></tr>'
        })
      }
      if (subcategory === CATEGORIES.People[1]) {
        mainFunc = countRecursion
        func = TABLE_FUNCTIONS.GOOD_CATCH
        let notes = DATA_NOTES.GC
        footer = create('tfoot')
        notes.forEach(note => {
          footer.innerHTML =
            footer.innerHTML + "<tr><td colspan='2'>" + note + '</td></tr>'
        })
      }
    }
    if (category === CATEGORY_KEYS.VELOCITY) {
      if (subcategory.includes('Availability')) {
        mainFunc = otherRecursion
        func = TABLE_FUNCTIONS.UE
        let notes = DATA_NOTES.UE
        footer = create('tfoot')
        notes.forEach(note => {
          footer.innerHTML =
            footer.innerHTML + "<tr><td colspan='2'>" + note + '</td></tr>'
        })
      }
    }
    let data = mainFunc(dataset[key], func)
    element.innerHTML = data[2].innerHTML
    element.style.backgroundColor = data[2].style.backgroundColor
    if (footer !== null) {
      element.childNodes[0].childNodes[1].childNodes[0].appendChild(footer)
    }

    let childData = element.childNodes[0].childNodes[1].innerHTML
    element.childNodes[0].childNodes[1].innerHTML = ''

    window.localStorage.setItem(id, childData)
  })

  configureClickables()
  scrubEmptyTextNodes(document.getElementsByTagName('body')[0])
}
function configureClickables (modifier) {
  if (typeof modifier === 'undefined') {
    modifier = ''
  }
  // Get elements to apply clicky functions to
  let elements = document.getElementsByClassName(modifier + 'td-content')
  let children = document.getElementsByClassName(modifier + 'cell-body')
  // Loop through them and apply the same onclick function
  for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = function (event) {
      if (
        event.target !== this &&
        event.target !== this.childNodes[0].childNodes[0]
      ) {
        return
      }
      if (!modifier) {
        if (!this.classList.contains('jump')) {
          let cih = window.localStorage.getItem(this.id)
          this.childNodes[0].childNodes[1].innerHTML = cih
          // configure clickables for the child elements
          configureClickables('sub-')
          configureClickables('sub-sub-')
        } else {
          this.childNodes[0].childNodes[1].innerHTML = ''
        }
      }
      // Toggle the jump forward animation
      this.classList.toggle('jump')
      //let offset = getOffset(this)
      //console.log(offset)

      // Cancel out the fade class if element
      // is clicked when it is in the background

      if (this.classList.contains('fade')) {
        this.classList.toggle('fade')
      }

      // hidden div content will now become visible
      // TODO
      for (let j = 0; j < children.length; j++) {
        // Check to make sure 'this' IS the parent
        if (this === children[j].parentNode.parentNode) {
          children[j].classList.toggle('hidden')
          children[j].scrollIntoView({ behavior: 'auto', block: 'end' })
        } else {
          // Not the parent!
          // child should be hidden otherwise
          if (!children[j].classList.contains('hidden')) {
            children[j].classList.toggle('hidden')
          }
        }
      }

      // Go through all other elements and apply the animation
      // to make them out of focus and make sure that their children
      // have the proper classes to hide contents
      for (let k = 0; k < elements.length; k++) {
        // Don't do this to the element that we wanted
        // to bring forward

        if (elements[k] !== this) {
          elements[k].classList.toggle('fade')

          // if there is an element pushed forward
          // then we need to send it back
          if (elements[k].classList.contains('jump')) {
            elements[k].classList.toggle('jump')
          }
        }
      }
    }
  }
}

// modal section
function makeModal (content) {
  // Modal
  let modal = create('div')
  modal.className = 'modal'

  // Modal Content Wrapper
  let modalContent = create('div')
  modalContent.className = 'modal-content'

  // modal close button
  let span = create('span')
  span.className = 'modal-close'
  span.innerHTML = '&times;'

  // assemble
  modal.appendChild(modalContent)
  modalContent.appendChild(span)
  modalContent.appendChild(content)

  // wire up the close button
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.parentNode.removeChild(modal)
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.parentNode.removeChild(modal)
    }
  }

  // attach it to the page
  document.getElementsByTagName('body')[0].appendChild(modal)
}
function makeGraph (chartData) {
  // test
  chartData.options['responsive'] = true
  chartData.options['maintainAspectRatio'] = false

  // make some content
  let content = create('div')
  content.setAttribute(
    'style',
    'width: 90% !important; height: 90% !important; margin: auto;'
  )
  let canvas = create('canvas')
  canvas.id = 'graph'
  content.appendChild(canvas)

  new Chart(canvas, chartData)
  // send to a modal
  makeModal(content)
}

// Functions that change HTML animations
function loadingStart () {}
function loadingEnd () {
  if (!doneLoading) {
    setTimeout(function () {
      //let cloudL = [getClass('cloud-container-left')[0], getId('small-cloud1'), getId('small-cloud2')]
      //let cloudR = [getClass('cloud-container-right')[0], getId('small-cloud3'), getId('small-cloud4')]
      /*
            for (let i = 0; i < 3; i++) {
              cloudL[i].classList.toggle('vanish')
              cloudR[i].classList.toggle('vanish')
            }
            */

      document
        .getElementsByClassName('loader-wrapper')[0]
        .classList.toggle('vanish')
      getId('body-wrapper').classList.toggle('zoom-out')
    }, 2000)
  }
}

// Utility Functions
function cleanChildNodes (element) {
  let children = element.childNodes
  let removeList = []
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeName === '#text') {
      if (children[i].data.trim().length === 0) {
        removeList.push(children[i])
      }
    }
  }
  removeList.forEach(item => {
    //log('Removing ' + item)
    element.removeChild(item)
  })
}
function scrubEmptyTextNodes (element) {
  // remove all junk from current element's childrens
  cleanChildNodes(element)

  // recurse down and clean all
  let children = element.childNodes
  for (let i = 0; i < children.length; i++) {
    scrubEmptyTextNodes(children[i])
  }
}
