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
function submitRequest (oFormElement) {
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
