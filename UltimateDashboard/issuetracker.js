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

function submitRequest () {
  let requester
  let request = getId('request-form').value
}

//form
function submitRequest () {
  /**
   * SKYNET Key Config
   * REPORT_NAME - Name of this report:   'ULTIMATE_DASHBOARD'
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
  let args = {
    REPORT_NAME: 'ULTIMATE_DASHBOARD',
    PK1: 'TRACKER',
    PK2: document.getElementById('tracker-type').selectedOptions[0].value,
    PK3: new Date().getTime(),
    OF1: document.cookie.split('IDSID=')[1].split(';')[0],
    OF2: 'CREATE',
    OF3: 'OPEN',
    PK_NAMES: 'PK1=COMPONENT;PK2=TYPE;PK3=REQUEST_ID',
    OF_NAMES:
      'OF1=REQUESTER;OF2=LAST_ACTION;OF3=STATUS;OF4=ASSIGNED_TO;OF5=ECD;',
    COMMENTS: document.getElementById('request-form').value.trim()
  }

  // logic tests
  if (args.PK2 === '') {
    alert('Please select a request type before submitting.')
    return
  }

  if (args.COMMENTS.length === 0) {
    alert('Please type a request before submitting.')
    return
  }

  // create the form
  let div = document.createElement('div')
  let form = document.createElement('form')
  let frame = document.createElement('iframe')
  let br = document.createElement('br')
  let submitButton = document.createElement('input')

  submitButton.setAttribute('type', 'submit')
  submitButton.setAttribute('value', 'Submit')
  submitButton.setAttribute('onsubmit', 'return submitComments()')

  div.className = 'hidden_div'
  div.setAttribute('name', 'COMMENTS_DIV')
  div.setAttribute('id', 'COMMENTS_DIV')

  frame.className = 'hidden_frame'
  frame.setAttribute('id', 'COMMENTS_FRAME')
  frame.setAttribute('name', 'COMMENTS_FRAME')
  frame.setAttribute('src', '')

  form.className = 'hidden_form'
  form.setAttribute('name', 'COMMENTS_FORM')
  form.setAttribute('method', 'post')
  form.setAttribute('action', 'https://' + PAGE_BASE_URL + SKYNET_URL)
  form.setAttribute('enctype', 'multipart/form-data')
  form.setAttribute('target', 'COMMENTS_FRAME')

  //append all to div
  div.appendChild(form)
  div.appendChild(br)
  div.appendChild(frame)

  form.appendChild(createInput('hidden', 'PROCESS', ''))
  form.appendChild(createInput('hidden', 'LOT', ''))
  form.appendChild(createInput('hidden', 'OPERATION', ''))
  form.appendChild(createInput('hidden', 'MODULE', ''))
  form.appendChild(createInput('hidden', 'CEID', ''))
  form.appendChild(createInput('hidden', 'PK_NAMES', ''))
  form.appendChild(createInput('hidden', 'OF_NAMES', ''))
  form.appendChild(createInput('hidden', 'rc:Toolbar', 'false'))
  form.appendChild(createInput('hidden', 'FACILITY', 'F32'))
  form.appendChild(createInput('hidden', 'ENTITY', ''))
  form.appendChild(createInput('hidden', 'PK1', PK1))
  form.appendChild(createInput('hidden', 'PK2', PK2))
  form.appendChild(createInput('hidden', 'PK3', PK3))
  form.appendChild(createInput('hidden', 'PK4', ''))
  form.appendChild(createInput('hidden', 'PK5', ''))
  form.appendChild(createInput('hidden', 'OF1', OF1))
  form.appendChild(createInput('hidden', 'OF1', OF2))
  form.appendChild(createInput('hidden', 'OF1', OF3))
  form.appendChild(createInput('hidden', 'REPORT', REPORT_NAME))
  form.appendChild(createInput('hidden', 'COMMENT', COMMENTS))
  form.appendChild(submitButton)

  document.getElementsByTagName('body')[0].appendChild(div)

  try {
    submitButton.click()
    setTimeout(function () {
      div.parentNode.removeChild(div)
    }, 60 * 1000)
  } catch (e) {
    console.log('Error submitting ' + type + ' - ' + comment)
    console.log(e)
  }
}
