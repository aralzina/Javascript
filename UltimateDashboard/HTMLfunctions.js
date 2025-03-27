// GLOBAL VARS
const MODAL_CSS = '.modal {display: block; position: fixed; z-index: 20; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4);}\n.modal-content{background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 80%;}\n.modal-close{ color: #aaa; float: right; font-size: 28px; font-weight: bold;}\n.modal-close:hover, .modal-close:focus {color: black; text-decoration: none; cursor: pointer;}'

function addStyle(css) {

  // make sure style doesn't already exist
  let styles = document.getElementsByTagName('style')
  for(let i = 0; i < styles.length; i++){
    let s = style[i]
 if (css === s.textContent) {
      // it exists
      log('Attempted to add a stylesheet that already exists. Return without adding duplicate stylesheet.')
      return
    }

  }

  // continue on to create the style
  var style = document.createElement('style');

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName('head')[0].appendChild(style);
}


// Main HTML functions
function moduleTableOutline() {
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

function factoryTableOutline(category, subCategories) {
  // make 4 columns ( 4 shifts)
  let colNum = 4

  let rows = []
  // make total number of rows needed
  for (let i = 0; i < subCategories.length; i++) {
    rows.push(create('tr'))
  }
  // make category 'header'
  let rowHeader = create('th', {}, { rowspan: subCategories.length.toString() })
  rowHeader.textContent = category

  // assign it to the first row
  rows[0].appendChild(rowHeader)

  // loop and build cells for each row
  for (let i = 0; i < subCategories.length; i++) {
    let row = rows[i]
    // make and add subcat column
    let hdr = create(
      'th',
      { textContent: subCategories[i] },
      { style: 'padding: 0px 1px;' }
    )
    hdr.textContent = subCategories[i]
    // for adding graph buttons
    if (subCategories[i] === CATEGORIES.People[0]) {
      // original
      hdr.innerHTML = ''
      let btn = create(
        'button',
        { title: 'Click for graph' },
        { style: 'width:100%;height:100%;' }
      )
      hdr.appendChild(btn)
      let newTitle = subCategories[i]
      //btn.title = 'QDO (Monthly PAS[Progression Against Schedule])'
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
      hdr.innerHTML = ''
      let btn = create('button')
      btn.setAttribute('style', 'width:100%;height:100%;')
      btn.title = 'Click for graph'
      hdr.appendChild(btn)
      let newTitle = subCategories[i]
      btn.innerHTML = newTitle + ' Quarterly PAS'
      btn.title = 'Good Catch (Quarterly PAS[Progression Against Schedule])'
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
      hdr.innerHTML = ''
      let btn = create(
        'button',
        { title: 'Click for graph' },
        { style: 'width:100%;height:100%;' }
      )
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

function fillCells(category, subcategory, dataset) {
  // removing end hyphen
  let base_id = category.toLowerCase() + '-' + subcategory.toLowerCase() + '-'
  let keys = Object.keys(dataset)
  keys.forEach(key => {
    try {
      let id = base_id + key.toString()
      let element = document.getElementById(id)
      let mainFunc = null
      let func = null
      let footer = null
      // make footer data and set function to use
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
    } catch (e) {
      log(`Error - Cat:${category}\nSubCat: ${subcategory}\nError:${e}`)
    }
  })

  configureClickables()
  scrubEmptyTextNodes(document.getElementsByTagName('body')[0])
}
function configureClickables(modifier) {
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
function makeModal(content) {
  // Add stylesheet
  addStyle(MODAL_CSS)

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
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.parentNode.removeChild(modal)
    }
  }

  // attach it to the page
  document.getElementsByTagName('body')[0].appendChild(modal)
}
function makeGraph(chartData) {
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

function addLoader(element) {
  element.appendChild(create('div', { className: 'on-demand-loader' }))
}

function buildOpenItemBox(openItemsData) {
  function openDetails(rid) {
    let details = document.getElementById('open-item-details')
    details.innerHTML = ''

    // get all list items and toggle the active class if they triggered this
    let refBtns = document.getElementsByClassName('open-items-list-item')
    for (let i = 0; i < refBtns.length; i++) {
      if (refBtns[i].classList.contains('active')) {
        refBtns[i].classList.toggle('active')
      }
      if (refBtns[i].id === rid) {
        refBtns[i].classList.toggle('active')
      }
    }

    // make table
    let table = create('table')
    let data = dataEquals(DATASETS.REQUEST, 'REQUEST_ID', rid)
    let tableData = ''
    data.forEach(row => {
      if (row['ACTION_TYPE'] === 'SUBMISSION') {
        let stat
        if (typeof data[1] !== 'undefined') {
          data[1]['ASSIGNED_TO'].trim().length === 0
            ? (stat = row['STATUS'] + ' - not reviewed')
            : (stat = row['STATUS'] + ' - reviewed')
        } else {
          stat = row['STATUS'] + ' - not reviewed'
        }
        tableData +=
          '<tr><th><span class="span-label">Request Type</span></th><td><span class="span-field">' +
          row['TYPE'] +
          '</span></td></tr>'
        tableData +=
          '<tr><th><span class="span-label">Request ID</span></th><td><span class="span-field">' +
          row['REQUEST_ID'] +
          '</span></td></tr>'
        tableData +=
          '<tr><th><span class="span-label">Requester</span></th><td><span class="span-field">' +
          row['REQUESTER'] +
          '</span></td></tr>'
        tableData +=
          '<tr><th><span class="span-label">Status</span></th><td><span class="span-field">' +
          stat +
          '</span></td></tr>'
        tableData +=
          '<tr><th><span class="span-label">Original Request</span></th><td><span class="span-field">' +
          row['COMMENT'].trim() +
          '</span></td></tr>'
      } else {
        let reviewedBy

        row['ASSIGNED_TO'].trim().length > 0
          ? (reviewedBy = row['ASSIGNED_TO'].trim())
          : (reviewedBy = 'Not Reviewed')
        if (reviewedBy !== 'Not Reviewed') {
          tableData +=
            '<tr><th><span class="span-label">Last Reviewed By</span></th><td><span class="span-field">' +
            reviewedBy +
            '</span></td></tr>'
          tableData +=
            '<tr><th><span class="span-label">Update</span></th><td><span class="span-field">' +
            row['COMMENT'] +
            '</span></td></tr>'
          tableData +=
            '<tr><th><span class="span-label">ECD</span></th><td><span class="span-field">' +
            row['ECD'] +
            '</span></td></tr>'
        }
      }
    })
    table.innerHTML = tableData

    details.appendChild(table)
  }

  function adminView() {
    // only to be used for anyone in the admin const
  }

  //vars
  let TEXT_VALUES = {
    title: 'Open Item Tracker',
    list_header: 'Open Items'
  }

  let container,
    box,
    title,
    wrapper,
    list,
    details,
    list_header,
    ul,
    listItems,
    elements
  container = document.getElementById('Open Items')
  container.innerHTML = ''

  // parent
  box = create('div', { id: 'open-items-box' })

  container.appendChild(box)

  //children
  title = create('h2', { textContent: TEXT_VALUES.title })
  wrapper = create('div', { id: 'open-items-wrapper' })

  // append children to parent
  appendChildren(box, [title, wrapper])

  // wrapper children
  list = create('div', { id: 'open-items-list' })
  details = create('div', { id: 'open-item-details' })

  //append wrapper children to wrapper
  appendChildren(wrapper, [list, details])

  // list children
  list_header = create('span', { textContent: TEXT_VALUES.list_header })
  ul = create('ul')

  //append list children
  appendChildren(list, [list_header, ul])

  //some function to add items to list and wire them
  listItems = data => {
    let results = {
      li: [],
      details: {}
    }

    //filter data to only include SUBMISSION items
    let subData = dataEquals(data, 'ACTION_TYPE', 'SUBMISSION')
    subData.forEach(row => {
      let li = create('li', {
        id: row['REQUEST_ID'],
        className: 'open-items-list-item',
        textContent:
          'ID #' + row['REQUEST_NUM'].toString() + ' - ' + row['TYPE']
      })
      li.onclick = function () {
        openDetails(this.id)
      }
      results.li.push(li)
    })

    return results
  }

  elements = listItems(openItemsData)

  appendChildren(ul, elements.li)

  try {
    elements.li[0].click()
  } catch (e) { }
}

/**
 * End main loading animation
 */
function loadingEnd() {
  if (!doneLoading) {
    setTimeout(function () {
      document
        .getElementsByClassName('loader-wrapper')[0]
        .classList.toggle('vanish')
      id('body-wrapper').classList.toggle('zoom-out')
    }, 2000)
  }
}

// Utility Functions
/**
 * Easier way to append multiple childen using an ordered list
 * @param {HTMLElement} parent element to append children to
 * @param {Array<HTMLElement> | HTMLElement} children Array of children to append
 */
function appendChildren(parent, children) {
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

function cleanChildNodes(element) {
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

function scrubEmptyTextNodes(element) {
  // remove all junk from current element's childrens
  cleanChildNodes(element)

  // recurse down and clean all
  let children = element.childNodes
  for (let i = 0; i < children.length; i++) {
    scrubEmptyTextNodes(children[i])
  }
}

// Maybe use a dict of true/false values
var CUSTOM_OPTIONS = {
  AVAILABILITY: {
    1270: false,
    1274: false,
    5053: false
  },
  GOOD_CATCH: false,
  QDO: false
}
// Custom Table

function customOutline(args) {
  let table, head, body, tr, th, span, td

  table = id('custom-table')
  head = create('thead')
  body = create('tbody')
  appendChildren(table, [head, body])

  tr = create('tr')
  appendChildren(head, tr)

  th = create('th', { className: 'title-th' }, { colspan: '3' })
  appendChildren(tr, th)

  span = create('span', { textContent: 'COS Dashboard Data' })
  appendChildren(th, span)

  args['ROW'].forEach(row => {
    tr = create('tr')
    appendChildren(body, tr)

    td = [
      //create('th', { textContent: row['TITLE'] }),
      create('td', { innerHTML: row['CONTENT'] })
    ]
    appendChildren(tr, td)
  })
}

/**
 *
 * @param {*} args
 * @returns
 */
const default_gauge_opts = args => {
  /* advanced options
                
                    // Colors by percentage
                    percentColors = [
                        [0.0, '#a9d70b'],
                        [0.5, '#f9c802'],
                        [1.0, '#ff0000']
                    ]
                
                    // value labels
                    staticLabels: {
                        font: "10px sans-serif",  // Specifies font
                        labels: [100, 130, 150, 220.1, 260, 300],  // Print labels at these values
                        color: "#000000",  // Optional: Label text color
                        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
                    },
                                 
                    // static zones
                    staticZones: [
                        {strokeStyle: "rgb(255,0,0)", min: 0, max: 500, height: 1.4},
                        {strokeStyle: "rgb(200,100,0)", min: 500, max: 1000, height: 1.2},
                        {strokeStyle: "rgb(150,150,0)", min: 1000, max: 1500, height: 1},
                        {strokeStyle: "rgb(100,200,0)", min: 1500, max: 2000, height: 0.8},
                        {strokeStyle: "rgb(0,255,0)", min: 2000, max: 3100, height: 0.6}
                    ], 
                    
                    // Varying heights to above example
                    {strokeStyle: "rgb(80,80,80)", min: 2470, max: 2530, height: 1.3}
                          
                    // tick marks
                    renderTicks: {
                        divisions: 5,
                        divWidth: 1.1,
                        divLength: 0.7,
                        divColor: #333333,
                        subDivisions: 3,
                        subLength: 0.5,
                        subWidth: 0.6,
                        subColor: #666666
                    }
                
                    // gauge pointer tip icon
                    pointer: {
                        // Extra optional pointer options:
                        iconPath: 'myicon.png',  // Icon image source
                        iconScale: 1,    // Size scaling factor
                        iconAngle: 90.0  // Rotation offset angle, degrees
                    },
                    */

  var opts = {
    angle: 0.0, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 0.75, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: '#6F6EA0', // Colors
    colorStop: '#C0C0DB', // just experiment with them
    strokeColor: '#E0E0E0', // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true // High resolution support
  }
  if (typeof args !== 'undefined') {
    Object.keys(args).forEach(key => {
      opts[key] = args[key]
    })
  }
  return opts
}

function gaugeIt(elementId, optArgs, gaugeArgs) {
  let opts = default_gauge_opts(optArgs)
  var target = document.getElementById(elementId) // your canvas element
  var gauge = new Gauge(target).setOptions(opts) // create sexy gauge!
  gauge.maxValue = gaugeArgs.maxValue // set max gauge value
  gauge.setMinValue(gaugeArgs.minValue) // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 8 // set animation speed (32 is default value)
  gauge.set(gaugeArgs.actualValue) // set actual value
}

///////////////////////////
// COS DASHBOARD SECTION //
///////////////////////////

function COS_Table(args) {
  // functions

  function historicalAvailAvg(pid, ceid) {
    let data, div, h3, table, tr, td, change, symbol, color, closeButton

    data = dataEquals(
      dataEquals(DATASETS.CEID_MA, 'process', pid),
      'ceid',
      ceid
    )[0]

    change = parseFloat(data.ma_7d) - parseFloat(data.ID13w_ma)

    symbol = change > 0 ? '&#8599;' : change < 0 ? '&#8600;' : '&#8594;'
    color = change > 0 ? 'lime' : change < 0 ? 'red' : 'white'

    change = (Math.abs(change) * 100).toFixed(2)

    div = create('div', { className: 'popout hidden' })

    h3 = create('h3', {
      textContent: `${pid} ${ceid} Availability Average Trends (Current Week, 7 Week, 13 Week)`
    })
    table = basicTable()
    closeButton = create('button', {
      textContent: 'Close',
      onclick: function (e) {
        div.classList.toggle('hidden')
      }
    })

    div.append(h3, table.table, closeButton)

    tr = create('tr')
    table.thead.append(tr)

    tr.append(
      create(
        'th',
        { textContent: 'Process' },
        { style: 'background-color: darkblue; color:white;' }
      ),
      create(
        'th',
        { textContent: 'Ceid' },
        { style: 'background-color: darkblue; color:white;' }
      ),
      create(
        'th',
        { textContent: '7D vs 13W Trend' },
        { style: 'background-color: darkblue; color:white;' }
      ),
      create(
        'th',
        { textContent: '7D Avail Avg' },
        { style: 'background-color: darkblue; color:white;' }
      ),
      create(
        'th',
        { textContent: '7W Avail Avg' },
        { style: 'background-color: darkblue; color:white;' }
      ),
      create(
        'th',
        { textContent: '13w Avail Avg' },
        { style: 'background-color: darkblue; color:white;' }
      )
    )

    tr = create('tr')
    table.tbody.append(
      create('td', { textContent: data.process }),
      create('td', { textContent: data.ceid }),
      create(
        'td',
        {
          innerHTML: `<span style='font-size: 2em;'>${symbol}</span><br><span>${change}%</span>`
        },
        { style: `background-color: ${color};` }
      ),
      create('td', {
        textContent: `${(parseFloat(data.ma_7d) * 100).toFixed(2)}%`
      }),
      create('td', {
        textContent: `${(parseFloat(data.ID7w_ma) * 100).toFixed(2)}%`
      }),
      create('td', {
        textContent: `${(parseFloat(data.ID13w_ma) * 100).toFixed(2)}%`
      })
    )

    //makeModal(table.table)
    return div
  }

  function cleanupSTGSteps(data) {
    // Fix staging naming convention
    data.forEach(row => {
      let ceid, slice, space

      // check to make sure length of ceid is more than 3 characters
      ceid = row['CEID']
      if (ceid.length > 3) {
        slice = ceid.slice(-3).toUpperCase()
        if (slice === 'STG') {
          spaceCheck = ceid[ceid.length - 4]
          row['CEID'] =
            spaceCheck === ' '
              ? ceid
              : `${ceid.substr(0, ceid.length - 3)} ${slice}`
        }
      }
    })
    return data
  }

  function AvailabilityGauge(data) {
    let pid,
      ceid,
      up,
      down,
      total,
      pct,
      goal,
      idName,
      gaugeId,
      hdrId,
      numTest,
      boolTest,
      areqReq,
      style
    pid = data['PROCESS_ID']
    ceid = data['CEID']
    idName = 'avail'
    gaugeId = `${pid}-${ceid}-${idName}-gauge`
    hdrId = `${pid}-${ceid}-${idName}-hdr`

    goal = parseFloat(data['AREQ_GOAL'])
    goal = Number.isNaN(goal) ? 0 : goal
    up = parseInt(data.UP)
    down = parseInt(data.DOWN)
    total = up + down

    // configure style of header
    style =
      up / total >= goal
        ? 'border-radius: 12px;'
        : 'background-color: #ff000042; border-radius: 12px;'

    areqReq =
      goal === 0
        ? 'No A<sub>Req</sub>'
        : `Min A<sub>Req</sub> = ${Math.ceil(goal * total).toString()}/${total}`

    let steps = (100 - goal * 100) / 4

    let optArgs = {
      percentColors: [
        [0.0, '#ff0000'],
        [goal - 0.01, '#ff0000'],
        [goal, '#32CD32'],
        [1.0, '#32CD32']
      ],
      staticZones: [
        { strokeStyle: 'rgb(255,0,0)', min: 0, max: goal * 100, height: 1 },
        {
          strokeStyle: 'rgb(158, 243, 20)',
          min: goal * 100,
          max: goal * 100 + steps * 1,
          height: 1
        },
        {
          strokeStyle: 'rgb(126, 231, 33)',
          min: goal * 100 + steps * 1,
          max: goal * 100 + steps * 2,
          height: 1
        },
        {
          strokeStyle: 'rgb(92, 218, 42)',
          min: goal * 100 + steps * 2,
          max: goal * 100 + steps * 3,
          height: 1
        },
        {
          strokeStyle: 'rgb(50, 205, 50)',
          min: goal * 100 + steps * 3,
          max: goal * 100 + steps * 4,
          height: 1
        }
      ],
      limitMax: true,
      limitMin: true,
      staticLabels: {
        font: '10px sans-serif', // Specifies font
        labels: [goal * 100], // Print labels at these values
        color: '#000000', // Optional: Label text color
        fractionDigits: 0 // Optional: Numerical precision. 0=round off.
      },
      renderTicks: {
        divisions: 10,
        divWidth: 1,
        divLength: 0.5,
        divColor: '#333333',
        subDivisions: 1,
        subLength: 0.25,
        subWidth: 0.5,
        subColor: '#666666'
      }
    }
    let gaugeArgs = {
      maxValue: 100,
      minValue: 0,
      actualValue: (up / total) * 100
    }

    boolTest = false
    numTest = [up, down, total]
    numTest.forEach(num => {
      if (Number.isNaN(num)) {
        boolTest = true
      }
    })
    if (boolTest) {
      return
    }

    pct = ((up / total) * 100).toFixed(1).toString() + '%'
    goal = (goal * 100).toFixed(1).toString() + '%'
    id(
      hdrId
    ).innerHTML = `U/D: ${up}/${down}<br>${areqReq}<br>${pct} vs Goal: ${goal}`
    id(gaugeId).setAttribute('title', pct)

    id(hdrId).setAttribute('style', style)

    gaugeIt(gaugeId, optArgs, gaugeArgs)
  }

  function ceidLineview(data) {
    let parentDiv,
      childDiv,
      hdr,
      table,
      thead,
      tbody,
      tr,
      th,
      td,
      invCounter = 0,
      button,
      title,
      pid,
      ceid,
      rowCounter = 1,
      backgroundColor,
      closeButton
    const COLUMN_NAMES = [
      'Day',
      'Oper',
      'Oper Desc',
      'Inv',
      'Inv IP',
      'CS Outs',
      'DB',
      'Inc 12hr',
      'Inc 24hr',
      'WTD Pace'
    ]
    const COLUMN_KEYS = [
      'SEGMENT_DAY',
      'OPERATION',
      'OPER_SHORT_DESC',
      'INV_PROD',
      'INV_IP',
      'CS_OUTS_PROD',
      'DRUM_BEAT',
      'INV_INC_12HR',
      'INV_INC_24HR',
      'CW_PACE'
    ]

    // setup naming vars
    pid = data[0]['PROCESS_ID']
    ceid = data[0]['CEID']
    title = `${pid} ${ceid} Inventory`

    parentDiv = create('div', { className: 'inv-hdr-div' })

    // make parentdivs children
    childDiv = create('div', { className: 'popout hidden' })
    button = create('button', {
      onclick: function (e) {
        childDiv.classList.toggle('hidden')
        childDiv.scrollIntoView({ behavior: 'auto', block: 'end' })
      }
    })

    // append parent div's children
    appendChildren(parentDiv, [button, childDiv])

    // make childdivs children
    hdr = create('h3', { textContent: title })
    table = create('table', { className: 'ind-table' })
    closeButton = create('button', {
      textContent: 'Close',
      onclick: function (e) {
        childDiv.classList.toggle('hidden')
      }
    })

    // append to childDiv
    appendChildren(childDiv, [hdr, table, closeButton])

    // create table parts
    thead = create('thead')
    tbody = create('tbody')

    // add into table
    appendChildren(table, [thead, tbody])

    // create and append header row
    tr = create('tr')
    thead.appendChild(tr)

    // add in column names
    COLUMN_NAMES.forEach(col => {
      th = create(
        'th',
        { textContent: col },
        { style: 'background-color: darkblue; color:white;' }
      )
      tr.appendChild(th)
    })

    // loop data and add in rows
    data.forEach(row => {
      let wtdPaceCheck = row['CW_PACE']
      let skipRow = false
      if (!Number.isNaN(parseInt(wtdPaceCheck))) {
        wtdPaceCheck = parseInt(wtdPaceCheck)
        skipRow = wtdPaceCheck === 0 ? true : false
      }

      // if no data for this row, skip it
      if (!skipRow) {
        invCounter += parseInt(row['INV_PROD'])
        backgroundColor = rowCounter % 2 === 0 ? '#b0c4de6e' : 'white'
        rowCounter++
        // create this rows tr for the data
        // apply every other row coloring
        tr = create(
          'tr',
          {},
          { style: `background-color: ${backgroundColor};` }
        )
        tbody.appendChild(tr)

        // loop through needed keys to get the data for each cell
        COLUMN_KEYS.forEach(key => {
          let cellData = row[key]
          cellData = Number.isNaN(parseInt(cellData))
            ? cellData
            : parseInt(cellData) === 0
              ? ''
              : cellData
          td = create('td', { textContent: cellData })
          tr.appendChild(td)
        })
      }
    })
    button.textContent = invCounter.toString()

    return parentDiv
  }

  function InventoryGauge(data) {
    let inventoryGoal,
      currentInventory,
      inventoryScore,
      inventoryGrowth,
      bosInventory,
      inventoryIP,
      barColor,
      titleText,
      pid,
      ceid,
      idName,
      gaugeId,
      hdrId,
      GROWTH_MID,
      GROWTH_MAX,
      lvData = JSON.parse(JSON.stringify(DATASETS.COS_LINEVIEW))

    GROWTH_MID = 1.15
    GROWTH_MAX = 1.75

    pid = data['PROCESS_ID']
    ceid = data['CEID']
    idName = 'inv'
    gaugeId = `${pid}-${ceid}-${idName}-gauge`
    hdrId = `${pid}-${ceid}-${idName}-hdr`

    inventoryIP = data['INV_IP']
    currentInventory = data['INV_PROD']
    inventoryGoal = data['INV_GOAL']
    bosInventory = data['INV_CS_BOS']

    inventoryScore = currentInventory / inventoryGoal
    inventoryGrowth = currentInventory / bosInventory

    barColor =
      inventoryScore <= 1
        ? '#32cd32'
        : inventoryGrowth >= GROWTH_MAX
          ? '#ff0000'
          : inventoryGrowth >= GROWTH_MID
            ? '#FFA800'
            : inventoryGoal < currentInventory && currentInventory < bosInventory
              ? '#f5f5dc'
              : '#FFA800'

    let optArgs = {
      percentColors: [
        [0.0, barColor],
        [1.0, barColor]
      ],
      limitMax: true,
      limitMin: true,
      /*
                    staticLabels: {
                        font: '10px sans-serif', // Specifies font
                        labels: [drumBeat], // Print labels at these values
                        color: '#000000', // Optional: Label text color
                        fractionDigits: 0 // Optional: Numerical precision. 0=round off.
                    },
                    */
      renderTicks: {
        divisions: 10,
        divWidth: 1,
        divLength: 0.75,
        divColor: '#333333',
        subDivisions: 1,
        subLength: 0.25,
        subWidth: 0.5,
        subColor: '#666666'
      }
    }

    let gaugeArgs = {
      maxValue: inventoryGoal,
      minValue: 0,
      actualValue: currentInventory
    }

    inventoryGrowth = (inventoryGrowth * 100).toFixed(1).toString() + '%'
    titleText = `In process: ${inventoryIP}\nInv: ${currentInventory}\nGoal: ${inventoryGoal}\nBOS Inv: ${bosInventory}\nCurrent Inv vs BOS Inv: ${inventoryGrowth}`

    if (Number.isNaN(inventoryScore) || !Number.isFinite(inventoryScore)) {
      return
    }

    inventoryScore = (inventoryScore * 100).toFixed(1).toString() + '%'

    lvData = dataEquals(lvData, 'PROCESS_ID', pid)
    lvData = dataEquals(lvData, 'CEID', ceid)

    let span = create('span', { textContent: `Inv: ${inventoryScore} of goal` })
    appendChildren(id(hdrId), [ceidLineview(lvData), span])
    id(gaugeId).setAttribute('title', titleText)

    gaugeIt(gaugeId, optArgs, gaugeArgs)
  }

  function STG(data) {
    const COLUMN_NAMES = [
      'CEID',
      'Operation',
      'Op Description',
      'Inventory',
      'CS Outs',
      'DB',
      'Inc 12hr',
      'Inc 24hr',
      'WTD Pace'
    ]
    const COLUMN_VALUES = [
      'CEID',
      'OPERATION',
      'OPER_SHORT_DESC',
      'INV_PROD',
      'CS_OUTS',
      'DRUM_BEAT',
      'INV_INC_12HR',
      'INV_INC_24HR',
      'CW_PACE'
    ]
    let div,
      table,
      thead,
      tbody,
      tr,
      th,
      td,
      idName,
      pid,
      ceid,
      results = { TOTAL: 0, DIV: null },
      rowCounter = 1,
      backgroundColor

    // set up naming vars
    pid = data[0]['PROCESS_ID']
    ceid = data[0]['CEID'].split(' ')[0]
    type = 'stg'

    // create staghing table parent
    div = create('div', {
      id: `${pid}-${ceid}-${type}-div`,
      className: 'popout hidden'
    })
    results.DIV = div

    table = create('table', { className: 'pop-ind-table' })
    appendChildren(div, [table])

    thead = create('thead')
    tbody = create('tbody')

    appendChildren(table, [thead, tbody])

    tr = create('tr')
    thead.appendChild(tr)

    // set up column names
    COLUMN_NAMES.forEach(col => {
      th = create(
        'th',
        { textContent: col },
        {
          style:
            'background-color: darkblue; color: white; border: 1px solid black; padding: 10px;'
        }
      )
      tr.appendChild(th)
    })

    data.forEach(row => {
      backgroundColor = rowCounter % 2 === 0 ? '#b0c4de6e' : 'white'
      rowCounter++
      results.TOTAL += parseInt(row['INV_PROD'])

      tr = create('tr', {}, { style: `background-color: ${backgroundColor};` })
      tbody.appendChild(tr)
      // push in values
      COLUMN_VALUES.forEach(val => {
        td = create(
          'td',
          { textContent: row[val] },
          { style: 'border: 1px solid black;padding: 4px 10px;' }
        )
        tr.appendChild(td)
      })
    })
    return results
  }

  function Outs(data) {
    let text = `CS: ${data['CS_OUTS']}<br>EOS: ${data['CS_PACE']}<br>PS: ${data['PS_OUTS']}<br>WTD: ${data['CW_OUTS']}`
    return create('div', { innerHTML: text }, { style: 'text-align: left;' })
  }

  function WSPWPace(data) {
    let text = `CS: ${data['CS_WSPW_PACE']}<br>PS: ${data['PS_WSPW_PACE']}<br>WTD: ${data['CW_WSPW_PACE']}`
    return create('div', { innerHTML: text }, { style: 'text-align: left;' })
  }

  function CosCeid(data) {
    // return an HTMLElement
    let pDiv,
      hdr,
      cDiv,
      table,
      baggedTable,
      tr,
      th,
      td,
      ceidButton,
      ceid,
      pid,
      closeButton,
      toggle,
      entity_status,
      bagged_entity_status
    const COLUMN_NAMES = ['Entity', 'Fab', 'State', 'Availability']
    const COLUMN_VALUES = [
      'ENTITY',
      'CURRENT_SITE',
      'STATE',
      'ENTITY_AVAILABILITY'
    ]

    pid = data['PROCESS_ID']
    ceid = data['CEID']

    // filter entity status dataset
    entity_status = JSON.parse(JSON.stringify(DATASETS.COS_ENTITY_STATUS))
    entity_status = dataEquals(entity_status, 'PROCESS_ID', pid)
    entity_status = dataEquals(entity_status, 'CEID', ceid)

    // breakout the bagged tools
    bagged_entity_status = dataEquals(entity_status, 'STATE', 'Bagged')

    // remove bagged tools from entity status
    entity_status = dataNotEquals(entity_status, 'STATE', 'Bagged')

    toggle = () => {
      cDiv.classList.toggle('hidden')
      cDiv.scrollIntoView({ behavior: 'auto', block: 'end' })
    }

    // parent div
    pDiv = create('div')

    ceidButton = create('button')
    cDiv = create('div', { className: 'popout hidden' })

    appendChildren(pDiv, [ceidButton, cDiv])

    addProp(ceidButton, { textContent: ceid, onclick: toggle })

    hdr = create('h3', { textContent: `${pid} ${ceid} Tool Status` })
    hdr2 = create('h3')
    table = basicTable()
    table.table.className = 'ind-table'
    baggedTable = basicTable()
    baggedTable.table.className = 'ind-table'
    closeButton = create('button', { textContent: 'Close', onclick: toggle })

    // fill first table
    tr = create('tr')
    table.thead.appendChild(tr)
    // header content
    COLUMN_NAMES.forEach(col => {
      th = create(
        'th',
        { textContent: col },
        { style: 'background-color: darkblue; color: white;' }
      )
      tr.appendChild(th)
    })

    // body content
    entity_status.forEach(row => {
      let rowColor, textColor

      rowColor =
        row['ENTITY_AVAILABILITY'].toUpperCase() === 'DOWN'
          ? 'rgba(255, 105, 105, 0.5)'
          : 'white'
      textColor = rowColor === 'white' ? 'black' : 'black'
      tr = create(
        'tr',
        {},
        { style: `background-color: ${rowColor}; color: ${textColor};` }
      )
      table.tbody.appendChild(tr)

      COLUMN_VALUES.forEach(col => {
        td = create('td', { textContent: row[col] })
        tr.appendChild(td)
      })
    })

    // fill the second table
    if (bagged_entity_status.length > 0) {
      hdr2.textContent = `${pid} ${ceid} Bagged Tools`
      // header content
      tr = create('tr')
      baggedTable.thead.appendChild(tr)
      COLUMN_NAMES.forEach(col => {
        th = create(
          'th',
          { textContent: col },
          { style: 'background-color: darkblue; color: white;' }
        )
        tr.appendChild(th)
      })

      // body content
      bagged_entity_status.forEach(row => {
        let rowColor, textColor

        rowColor =
          row['ENTITY_AVAILABILITY'].toUpperCase() === 'DOWN'
            ? 'rgba(255, 105, 105, 0.5)'
            : 'white'
        textColor = rowColor === 'white' ? 'black' : 'black'
        tr = create(
          'tr',
          {},
          { style: `background-color: ${rowColor}; color: ${textColor};` }
        )
        baggedTable.tbody.appendChild(tr)

        COLUMN_VALUES.forEach(col => {
          td = create('td', { textContent: row[col] })
          tr.appendChild(td)
        })
      })
    }

    appendChildren(cDiv, [
      hdr,
      table.table,
      hdr2,
      baggedTable.table,
      closeButton
    ])

    return pDiv
  }

  function Tracers(data) {
    let pid,
      ceid,
      entityList,
      tracers,
      openTable,
      acceptedTable,
      otherTable,
      div,
      button,
      closeButton,
      childDiv,
      toggleFunc,
      openTracers,
      acceptedTracers,
      otherTracers,
      hdr
    const COLUMN_NAMES = [
      'Created On',
      'Entity',
      'Work Order',
      'Rule',
      'Defect Type',
      'Status',
      'Description',
      'Root Cause'
    ]
    const COLUMN_VALUES = [
      'CREATEDON',
      'TOOLNAME',
      'WORKORDERID',
      'RULENAME',
      'DEFECTTYPE',
      'STATUSOPTIONNAME',
      'DESCRIPTION',
      'TRACERROOTCAUSE'
    ]
    function makeTable(data, cols, keys) {
      let rowColor,
        rowCounter = 1,
        tr,
        th,
        td,
        table = basicTable()

      table.table.className = 'ind-table'
      // headers
      tr = create('tr')
      table.thead.appendChild(tr)

      cols.forEach(col => {
        th = create(
          'th',
          { textContent: col },
          { style: 'background-color: darkblue; color: white;' }
        )
        tr.appendChild(th)
      })

      // build table data
      data.forEach(row => {
        // set row color
        rowColor = rowCounter % 2 === 0 ? '#b0c4de6e' : 'white'
        rowCounter++

        // create and append row
        tr = create('tr', {}, { style: `background-color: ${rowColor};` })
        table.tbody.appendChild(tr)

        keys.forEach(key => {
          let cellData = row[key]
          cellData =
            key === 'WORKORDERID'
              ? `<a href='https://f32-apps-fuzion.f32prod.mfg.intel.com/EditWorkOrderPage.aspx?WorkOrderID=${cellData}' target='_blank'>${cellData}</a>`
              : cellData
          td = create('td', { innerHTML: cellData })
          tr.appendChild(td)
        })
      })

      return table.table
    }
    toggleFunc = function () {
      childDiv.classList.toggle('hidden')
      childDiv.scrollIntoView({ behavior: 'auto', block: 'end' })
    }

    div = create('div')

    button = create('button', { textContent: '', onclick: toggleFunc })
    childDiv = create(
      'div',
      { className: 'popout hidden' },
      { style: 'right:0;' }
    )

    appendChildren(div, [button, childDiv])
    pid = data['PROCESS_ID']
    ceid = data['CEID']
    entityList = JSON.parse(JSON.stringify(DATASETS.COS_ENTITY_STATUS))
    entityList = dataEquals(entityList, 'PROCESS_ID', pid)
    entityList = dataEquals(entityList, 'CEID', ceid)

    // loop dataset and add a field with the parent entity for use in next step
    entityList.forEach(row => {
      row['PARENT'] = row['ENTITY'].substring(0, 6)
    })

    // get a list of entities
    entityList = unique(entityList, 'PARENT')

    // get all tracers related to the above entities
    tracers = dataIn(DATASETS.TRACERS, 'PARENT', entityList)

    openTracers = dataEquals(tracers, 'STATUSOPTIONNAME', 'Open')
    acceptedTracers = dataEquals(tracers, 'STATUSOPTIONNAME', 'Accepted')
    otherTracers = dataNotEquals(
      dataNotEquals(tracers, 'STATUSOPTIONNAME', 'Accepted'),
      'STATUSOPTIONNAME',
      'Open'
    )

    if (openTracers.length > 0) {
      hdr = create(
        'h3',
        { textContent: `${pid} ${ceid} Open Tracers!! Accept ASAP` },
        { style: 'color: red;' }
      )
      openTable = makeTable(openTracers, COLUMN_NAMES, COLUMN_VALUES)
      appendChildren(childDiv, [hdr, openTable])
    }

    if (acceptedTracers.length > 0) {
      hdr = create('h3', { textContent: `${pid} ${ceid} Accepted Tracers` })
      acceptedTable = makeTable(acceptedTracers, COLUMN_NAMES, COLUMN_VALUES)
      appendChildren(childDiv, [hdr, acceptedTable])
    }

    if (otherTracers.length > 0) {
      hdr = create('h3', { textContent: `${pid} ${ceid} Misc. Tracers` })
      otherTable = makeTable(otherTracers, COLUMN_NAMES, COLUMN_VALUES)
      appendChildren(childDiv, [hdr, otherTable])
    }

    closeButton = create('button', {
      textContent: 'Close',
      onclick: toggleFunc
    })
    childDiv.appendChild(closeButton)

    button.textContent = `${tracers.length.toString()}`
    return tracers.length > 0 ? div : create('div')
  }

  function ILM(data) {
    let clickFunc, pid, ceid, pDiv, cDiv, hdr, button, closeButton, ilmData
    const COLUMN_NAMES = [
      'Date Created',
      'Type',
      'Status',
      'Link',
      'Title',
      '# Lots Affected',
      '# Wafers Scrapped'
    ]
    const COLUMN_VALUES = [
      'CREATED_DATE',
      'TYPE',
      'STATUS',
      'FAB_EVENT_HTML',
      'TITLE',
      'SUM_LOTS_AFFECTED',
      'SUM_SCRAP_QTY'
    ]

    function makeTable(data, cols, keys) {
      let table,
        tr,
        th,
        td,
        rowCount = 1,
        rowColor
      table = basicTable()
      table.table.className = 'ind-table'

      tr = create('tr')
      table.thead.appendChild(tr)

      th = create(
        'th',
        { textContent: `Data Last Refreshed: ${data[0]['FILE_REFRESH_DATE']}` },
        { colspan: cols.length.toString() }
      )
      tr.appendChild(th)

      tr = create('tr')
      table.thead.appendChild(tr)

      // headers
      cols.forEach(col => {
        th = create(
          'th',
          { textContent: col },
          { style: 'background-color: darkblue;color:white;' }
        )
        tr.appendChild(th)
      })

      // data rows
      data.forEach(row => {
        rowColor = rowCount % 2 === 0 ? '#b0c4de6e' : 'white'
        rowCount++

        tr = create('tr', {}, { style: `background-color: ${rowColor};` })
        table.tbody.appendChild(tr)

        // cells
        keys.forEach(key => {
          let cellData = row[key]
          // change these null values to 0s
          if (key === 'SUM_LOTS_AFFECTED' || key === 'SUM_SCRAP_QTY') {
            cellData = cellData.length === 0 ? '0' : cellData
          }
          td = create('td', { innerHTML: cellData })
          if (key === 'CREATED_DATE') {
            td.setAttribute('style', 'white-space: nowrap;')
          }
          if (key === 'FAB_EVENT_HTML') {
            try {
              td.childNodes[0].setAttribute('target', '_blank')
            } catch (e) {
              log(`ILM link attribute error: ${e}`)
            }
          }
          tr.appendChild(td)
        })
      })
      return table.table
    }

    clickFunc = function () {
      cDiv.classList.toggle('hidden')
      cDiv.scrollIntoView({ behavior: 'auto', block: 'end' })
    }

    pid = data['PROCESS_ID']
    ceid = data['CEID']
    hdr = create('h3', {
      textContent: `${pid} ${ceid} QEF/DRB from last 48 hours`
    })

    pDiv = create('div')

    button = create('button', { onclick: clickFunc })
    cDiv = create('div', { className: 'popout hidden' }, { style: 'right:0;' })

    appendChildren(pDiv, [button, cDiv])

    closeButton = create('button', { textContent: 'Close', onclick: clickFunc })

    // filter data for popout table
    ilmData = dataEquals(DATASETS.ILM, 'PROCESS_ID', pid)
    ilmData = dataEquals(ilmData, 'TOOLSET', ceid)
    button.textContent = ilmData.length.toString()

    if (ilmData.length > 0) {
      appendChildren(cDiv, [
        hdr,
        makeTable(ilmData, COLUMN_NAMES, COLUMN_VALUES),
        closeButton
      ])
    }

    return ilmData.length > 0 ? pDiv : create('div')
  }

  function EFIT(data) {
    let pid,
      ceid,
      pDiv,
      cDiv,
      button,
      closeButton,
      hdr,
      clickFunc,
      table,
      eFits,
      entities,
      impacted = false
    const COLUMN_NAMES = [
      'Work Order',
      'Category',
      'Location',
      'Description',
      'Impact',
      'Times',
      'Tools Impacted'
    ]
    const COLUMN_VALUES = [
      'WORKORDERID',
      'APPROVALTYPECATEGORY',
      'LOCATION',
      'DESCRIPTION',
      'IMPACTCOMMENT',
      'TIMES',
      'TOOLSIMPACTED'
    ]
    clickFunc = function () {
      cDiv.classList.toggle('hidden')
      cDiv.scrollIntoView({ behavior: 'auto', block: 'end' })
    }

    function makeTable(data, cols, keys) {
      let table = basicTable(),
        tr,
        th,
        td,
        rowCount = 1,
        rowColor

      data = Array.isArray(data) ? data : [data]
      table.table.className = 'ind-table'

      tr = create('tr')
      table.thead.appendChild(tr)

      cols.forEach(col => {
        th = create(
          'th',
          { textContent: col },
          { style: 'background-color: darkblue; color: white;' }
        )
        tr.appendChild(th)
      })

      data.forEach(row => {
        rowColor = rowCount % 2 === 0 ? '#b0c4de6e' : 'white'
        rowCount++
        tr = create('tr', {}, { style: `background-color: ${rowColor};` })
        table.tbody.appendChild(tr)
        keys.forEach(key => {
          let cellData
          td = create('td')
          switch (key) {
            case 'TIMES':
              td.setAttribute('style', 'white-space: nowrap;')
              cellData = `Start: ${row['START']}<br>End: ${row['END']}`
              break

            case 'WORKORDERID':
              cellData = `<a href='https://f32-apps-fuzion.f32prod.mfg.intel.com/EditWorkOrderPage.aspx?WorkOrderID=${row[key]}' target='_blank'>${row[key]}</a>`
              break

            case 'TOOLSIMPACTED':
              cellData = ''
              row[key].split(',').forEach(e => {
                cellData = cellData + e + '<br>'
              })
              break
            default:
              cellData = row[key]
              break
          }
          td.innerHTML = cellData
          tr.appendChild(td)
        })
      })

      return table.table
    }

    pid = data['PROCESS_ID']
    ceid = data['CEID']

    pDiv = create('div')

    button = create('button', { textContent: '', onclick: clickFunc })
    cDiv = create('div', { className: 'popout hidden' }, { style: 'right:0;' })

    appendChildren(pDiv, [button, cDiv])

    entities = unique(
      dataEquals(DATASETS.COS_ENTITY_STATUS, 'CEID', ceid),
      'ENTITY'
    )
    efitTableData = []
    eFits = DATASETS.EFIT
    eFits.forEach(efit => {
      impacted = false
      entities.forEach(entity => {
        if (efit['TOOLSIMPACTED'].split(',').includes(entity.substring(0, 6))) {
          impacted = true
        }
      })
      if (impacted === true) {
        efitTableData.push(efit)
      }
    })
    impacted = efitTableData.length > 0 ? true : false
    if (impacted === true) {
      button.textContent = 'EFits'
      hdr = create('h3', { textContext: `${pid} ${ceid} EFits` })
      table = makeTable(efitTableData, COLUMN_NAMES, COLUMN_VALUES)
      closeButton = create('button', {
        textContent: 'Close',
        onclick: clickFunc
      })
      appendChildren(cDiv, [hdr, table, closeButton])
    }

    return impacted === true ? pDiv : create('div')
  }

  // Not using this yet
  function COSComments(data) {
    let commentData, pid, ceid
    pid = data['PROCESS_ID']
    ceid = data['CEID']
    commentData = JSON.parse(JSON.stringify(SHARED_DATASETS.COS_COMMENTS))
    commentData = dataEquals(commentData, 'PROCESS', pid)
    commentData = dataEquals(commentData, 'CEID', ceid)
    return create(
      'p',
      { textContent: `${commentData[0]['COMMENTS']}` },
      { style: 'text-align: left;' }
    )
  }

  // vars
  let ceids,
    processIds,
    table,
    thead,
    tbody,
    tr,
    th,
    td,
    STGData,
    noSTGData,
    data,
    lineviewdata,
    backgroundColor,
    button,
    rowCounter = 1

  const GAUGE_FUNCTIONS = ['AvailabilityGauge', 'InventoryGauge']
  const COLUMN_NAMES = [
    'Process',
    'Ceid',
    'Availability',
    'Inventory',
    'STG',
    'Inc 12hr',
    'Outs',
    'WSPW Pace',
    'DB',
    //, 'Comments'
    'Tracers',
    'ILM',
    'EFIT'
  ]
  const COLUMN_VALUES = [
    'PROCESS_ID',
    CosCeid,
    AvailabilityGauge,
    InventoryGauge,
    STG,
    'INV_INC_12HR',
    Outs,
    WSPWPace,
    'DRUM_BEAT',
    //, COSComments
    Tracers,
    ILM,
    EFIT
  ]
  const EASY_FUNCTION_LIST = [
    'CosCeid',
    'Outs',
    'WSPWPace',
    'COSComments',
    'Tracers',
    'ILM',
    'EFIT'
  ]
  const TABLE_PARENT = id('cos-table')

  data = cleanupSTGSteps(args.ceidData)
  lineviewdata = cleanupSTGSteps(args.lineViewData)

  noSTGData = dataNotLike(data, 'CEID', ' STG')
  noSTGData = dataNotEquals(noSTGData, 'CEID', 'STG')
  STGData = dataLike(lineviewdata, 'CEID', ' STG')

  // Attempt to get the table if it was made before
  table = getClass('ind-table')[0]

  // If table doens't exist, create it
  table =
    typeof table === 'undefined'
      ? create('table', { className: 'ind-table' })
      : table

  // Remove the data inside the table
  table.innerHTML = ''

  // attach the table to the parent
  TABLE_PARENT.appendChild(table)

  // create table children
  thead = create('thead')
  tbody = create('tbody')

  // append both to table
  appendChildren(table, [thead, tbody])

  // Create headers
  tr = create('tr')
  thead.appendChild(tr)

  // Button to refresh
  th = create('th', {}, { colspan: COLUMN_NAMES.length.toString() })
  button = create('button', {
    textContent: 'Refresh Data',
    onclick: function () {
      button.disabled = !button.disabled
      queryCOS()
      setTimeout(function () {
        button.disabled = !button.disabled
      }, 60000)
    }
  })
  tr.appendChild(th)
  th.appendChild(button)

  // Make a new row
  tr = create('tr')
  thead.appendChild(tr)

  // File refresh header
  tr.appendChild(
    create(
      'th',
      {
        textContent: `COS File Date: ${new Date(
          noSTGData[0]['FILE_UPDATE_DATE']
        ).toLocaleString()} | Last Refreshed: ${new Date().toLocaleString()}`
      },
      {
        colspan: COLUMN_NAMES.length.toString(),
        style: 'background-color: #ffd70052;'
      }
    )
  )

  // New Tr for headers
  tr = create('tr', {}, { style: 'position:sticky; top:0;' })
  thead.appendChild(tr)
  COLUMN_NAMES.forEach(col => {
    th = create('th', { textContent: col })
    tr.appendChild(th)
  })

  // Loop through process ids to fill the table
  processIds = unique(noSTGData, 'PROCESS_ID')
  processIds.forEach(processId => {
    // Filter PID
    let pidNoSTGData = dataEquals(noSTGData, 'PROCESS_ID', processId)
    let pidSTGData = dataEquals(STGData, 'PROCESS_ID', processId)

    // Get all Ceids
    ceids = unique(pidNoSTGData, 'CEID')

    // Loop through Ceids to fill the table
    ceids.forEach(ceid => {
      backgroundColor = rowCounter % 2 === 0 ? '#b0c4de6e' : 'white'
      rowCounter++

      // Fill table with values
      tr = create('tr', {}, { style: `background-color: ${backgroundColor};` })
      tbody.appendChild(tr)
      COLUMN_VALUES.forEach(value => {
        // create elements
        td = create('td')
        tr.appendChild(td)

        // filter data
        ceidData = dataEquals(pidNoSTGData, 'CEID', ceid)

        // data check
        if (ceidData.length > 1) {
          // exit for unexpected data
          log(`${processId} ${ceid} extra data found\n${ceidData}`)
          return false
        }

        // pull data out of array
        ceidData = ceidData[0]

        // Handles columns with gauges
        if (typeof value === 'function') {
          try {
            if (GAUGE_FUNCTIONS.includes(value.name)) {
              // vars
              let div1, div2, canvas, pid, type, idName

              // create id
              pid = ceidData['PROCESS_ID']
              type =
                value.name === 'AvailabilityGauge'
                  ? 'avail'
                  : value.name === 'InventoryGauge'
                    ? 'inv'
                    : 'error'
              idName = `${pid}-${ceid}-${type}`

              // create elements
              div1 = create('div')
              div2 = create('div', { id: `${idName}-hdr` })
              canvas = create('canvas', {
                className: 'ind-gauge',
                id: `${idName}-gauge`
              })

              // append elements
              td.appendChild(div1)
              appendChildren(div1, [div2, canvas])

              if (value.name === 'AvailabilityGauge') {
                try {
                  let buttonContainer = create('div')
                  let availTrend = historicalAvailAvg(pid, ceid)
                  historicalButton = create('button', {
                    textContent: 'Availability Averages',
                    onclick: function (e) {
                      availTrend.classList.toggle('hidden')
                      availTrend.scrollIntoView({
                        behavior: 'auto',
                        block: 'end'
                      })
                    }
                  })
                  buttonContainer.append(historicalButton, availTrend)
                  div1.append(buttonContainer)
                } catch (e) {
                  // no data for this pid + ceid
                }
              }

              // fill canvas
              value(ceidData)
            } else {
              // Functions that aren't gauges
              if (value.name === 'STG') {
                let ceidSTGdata, test

                // check to see if stg data
                test = dataEquals(pidSTGData, 'CEID', ceid + ' STG')
                ceidSTGdata =
                  test.length > 0
                    ? test
                    : dataEquals(pidSTGData, 'CEID', ceid.substr(0, 3) + ' STG')
                if (ceidSTGdata.length > 0) {
                  let results = value(ceidSTGdata)
                  let button = create('button', {
                    textContent: results.TOTAL.toString(),
                    onclick: function (e) {
                      results.DIV.classList.toggle('hidden')
                    }
                  })
                  appendChildren(td, [button, results.DIV])
                }
              }
              if (EASY_FUNCTION_LIST.includes(value.name)) {
                td.appendChild(value(ceidData))
              }
            }
          } catch (e) {
            log(e)
          }
        } else {
          td.textContent = ceidData[value]
        }
      })
    })
  })

  return true
}
