/**
 * Keys used for building SKYNET form
 */
const SKYNET_KEYS = [
  'FACILITY',
  'REPORT_NAME',
  'PROCESS',
  'LOT',
  'OPERATION',
  'ENTITY',
  'MODULE',
  'CEID',
  'PK1',
  'PK2',
  'PK2',
  'PK3',
  'PK4',
  'PK5',
  'PK_NAMES',
  'OF1',
  'OF2',
  'OF3',
  'OF4',
  'OF5',
  'OF6',
  'OF7',
  'OF8',
  'OF9',
  'OF10',
  'OF_NAMES',
  'COMMENTS'
]

/**
 * Default Args for skynet form
 * REPORT_NAME - Name of this report:   'ULTIMATE_DASHBOARD'
 * @returns
 */
const DEFAULT_SKYNET_ARGS = () => {
  return {
    FACILITY: 'F32',
    REPORT_NAME: 'ULTIMATE_DASHBOARD'
  }
}

/**
 *
 * @param {*} oFormElement the form being sent off
 * @returns
 */
function submitForm (oFormElement) {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // empty the form and switch tabs to open items after pulling the data
      // todo: setup script to email distribution list that a new request exists
    } else {
      alert('Error saving to database. Please, try again.')
    }
  }
  xhr.withCredentials = true
  xhr.open(oFormElement.method, oFormElement.getAttribute('action'), true)
  xhr.send(new FormData(oFormElement))
  return false
}

/**
 *
 * @returns
 */
function requestForm () {
  /**
   * SKYNET Key Config
   * PK1 - Component:                     'TRACKER'
   * PK2 - Type:                          'REQUEST' | 'BUG-REPORT'
   * PK3 - Request ID:                    '...'  // DATE OF REQUEST(Date.getTime())
   * OF1 - Requester                      'IDSID'
   * OF2 - Last Action                    'CREATE'
   * OF3 - Status:                        'OPEN'
   * OF4 - Assigned To                    '' // will get added later
   * OF5 - ECD:                           '' // will get added later
   * COMMENTS:                            'USER REQUEST'
   * PK_NAMES:                            'PK1=COMPONENT;PK2=TYPE;PK3=REQUEST_ID'
   * OF_NAMES:                            'OF1=REQUESTER;OF2=LAST_ACTION;OF3=STATUS;OF4=ASSIGNED_TO;OF5=ECD;'
   */

  let args = DEFAULT_SKYNET_ARGS()
  args.PK1 = 'TRACKER'
  args.PK2 = document.getElementById('tracker-type').selectedOptions[0].value
  args.PK3 = new Date().getTime()
  args.OF1 = document.cookie.split('IDSID=')[1].split(';')[0]
  args.OF2 = 'CREATE'
  args.OF3 = 'OPEN'
  args.PK_NAMES = 'PK1=COMPONENT;PK2=TYPE;PK3=REQUEST_ID'
  args.OF_NAMES =
    'OF1=REQUESTER;OF2=LAST_ACTION;OF3=STATUS;OF4=ASSIGNED_TO;OF5=ECD;'
  args.COMMENTS = document.getElementById('request-form').value.trim()

  // logic tests for this submission
  // length of request type
  if (args.PK2 === '') {
    alert('Please select a request type before submitting.')
    return false
  }

  // length of comments needs to be more than 0
  if (args.COMMENTS.length === 0) {
    alert('Please type a request before submitting.')
    return false
  }
  return buildForm(args, 'submitRequest')
}

function excludeForm () {
  /**
   * SKYNET Key Config
   * PK1 - :                          ''
   * PK2 - :                          '' | ''
   * PK3 - :                          '...'  // DATE OF REQUEST(Date.getTime())
   * OF1 - :                          ''
   * OF2 - :                          ''
   * OF3 - :                          ''
   * OF4 - :                          '' // will get added later
   * OF5 - :                          '' // will get added later
   * COMMENTS:                        ''
   * PK_NAMES:                        'PK1=;PK2=;PK3=;'
   * OF_NAMES:                        'OF1=;OF2=;OF3=;OF4=;OF5=;'
   */

  let args = DEFAULT_SKYNET_ARGS()

  return buildForm(args, 'submitForm')
}

/**
 *
 * @param {Dict | Map} args form arguments
 * @param {string} func function name
 * @returns
 */
function buildForm (args, func) {
  // create the form
  let form = document.createElement('form')

  //form.className = 'hidden_form'
  form.setAttribute('name', 'COMMENTS_FORM')
  form.setAttribute('method', 'post')
  form.setAttribute('action', 'https://' + PAGE_BASE_URL + SKYNET_URL)
  form.setAttribute('enctype', 'multipart/form-data')
  //form.setAttribute('target', 'COMMENTS_FRAME')

  // Generate all inputs and append them to the form
  SKYNET_KEYS.forEach(key => {
    let val
    typeof args[key] !== 'undefined' ? (val = args[key]) : (val = '')
    form.appendChild(createInput('hidden', key, val))
  })

  // create button
  let submitButton = createInput('submit', 'submit', 'submit')

  // append the final input for no toolbar
  form.appendChild(createInput('hidden', 'rc:Toolbar', 'false'))

  // append submit button
  form.appendChild(submitButton)

  form.setAttribute('onSubmit', 'return ' + func + '(this)')

  try {
    // click the button
    submitButton.click()
  } catch (e) {
    console.log('Error submitting ' + type + ' - ' + comment)
    console.log(e)
    return false
  }
  return true
}

/**
 * Create an input element
 * @param {string} type
 * @param {string} name
 * @param {string} value
 * @returns
 */
function createInput (type, name, value) {
  let input = document.createElement('input')
  input.setAttribute('type', type)
  input.setAttribute('name', name)
  input.setAttribute('value', value)
  return input
}

function html_tracker_window () {
  // config
  const BUTTON_CONFIG = [
    {
      className: 'tablinks',
      textContent: 'Open Items',
      onclick: event => {
        changeTab(event, 'Open Items')
      }
    },
    {
      className: 'tablinks',
      textContent: 'Closed Items',
      onclick: event => {
        changeTab(event, 'Closed Items')
      }
    },
    {
      className: 'tablinks',
      id: 'defaultOpen',
      textContent: 'Submit Request',
      onclick: event => {
        changeTab(event, 'Submit Request')
      }
    }
  ]

  const TAB_CONFIG = [
    {
      id: 'Open Items',
      className: 'tabcontent',
      innerHTML: '<h3>Open Issues/Requests</h3>'
    },
    {
      id: 'Closed Items',
      className: 'tabcontent',
      innerHTML: '<h3>Closed Items</h3>'
    },
    {
      id: 'Submit Request',
      className: 'tabcontent',
      innerHTML:
        '<div class="request-box"> <h2>New Request</h2> <form> <div class="user-box"> <select style="margin-bottom: 25px;" id="tracker-type" required> <option value="">--Please choose a request type--</option> <option value="REQUEST">Feature Request/Suggestion</option> <option value="BUG-REPORT">Bug Report</option> </select> </div> <div class="user-box"> <textarea id="request-form" rows="4" cols="40" style="resize: none;" required></textarea> <label for="request-form">Request</label> </div> <a href="#"> <span></span> <span></span> <span></span> <span></span> Submit </a> </form> </div>'
    }
  ]

  // parent div
  let parent = create('div', { className: 'tracker-window' })

  // tab wrapper
  let tab_div = create('div', { className: 'tab' })
  parent.appendChild(tab_div)

  // add buttons
  BUTTON_CONFIG.forEach(btn => {
    tab_div.appendChild(create('button', btn))
  })

  // tab content
  TAB_CONFIG.forEach(tab => {
    tab_div.appendChild(create('div', tab))
  })

  // request form
  // change width of modal-content to better fit request box
  setTimeout(() => {
    let mc = document.getElementsByClassName('modal-content')[0]
    mc.style.transition = '0.3s'
    mc.style.width = 'max-content'
    document.getElementById('defaultOpen').click()
    try {
      document.getElementById('idsid').value = document.cookie
        .split('IDSID=')[1]
        .split(';')[0]
    } catch (e) {}
  }, 2)

  makeModal(parent)
}

//function html_exclusion_window () {}

// Comment this out later

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