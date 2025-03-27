// noinspection DuplicatedCode

/**
 * xml request to pull in data from shared dataset. Response is in JSON form.
 * @param {string} URL a string with the URL to get data from
 * @param {Function} func a function to do something with that data
 */
function request (URL, func) {
  // new XMLHttp object
  let request = new XMLHttpRequest()

  //open up get with URL from above
  request.open('GET', URL)

  //need credentials
  request.withCredentials = true

  //event listener on load for URL
  request.addEventListener('load', function (event) {
    //make sure page loads
    if (request.status >= 200 && request.status < 300) {
      //data parsed from JSON response
      let data = JSON.parse(request.responseText)

      // send data off to do something with provided function
      try {
        func(data)
      } catch (e) {
        console.log(e)
      }
    }
  })

  //initiate XMLHttpRequest
  request.send()
}

function createConfig () {
  /**
   * SKYNET Key Config
   * PK1 - Component:                     'CONFIG'
   * PK2 - ID:                            'Date.getTime()'
   * PK3 - NA:                            -------------------------------------
   * PK4 - NA:                            -------------------------------------
   * PK5 - NA:                            -------------------------------------
   * OF1 - Creator                        'IDSID'
   * OF2 - Config Name                    'User Input'
   * OF3 - NA:                            -------------------------------------
   * OF4 - NA:                            -------------------------------------
   * OF5 - NA:                            -------------------------------------
   * OF6 - NA:                            -------------------------------------
   * OF7 - NA:                            -------------------------------------
   * OF8 - NA:                            -------------------------------------
   * OF9 - NA:                            -------------------------------------
   * OF10 - NA:                           -------------------------------------
   * COMMENT:                             'User Config Description'
   * PK_NAMES:                            'COMPONENT|DATE_CREATED|na|na|na'
   * OF_NAMES:                            'CREATOR|CONFIG_NAME|na|na|na|na|na|na|na|na'
   */

  let args = DEFAULT_SKYNET_ARGS()
  args.PK1 = 'CONFIG'
  args.PK2 = new Date().getTime()
  args.PK3 = ''
  args.PK4 = ''
  args.PK5 = ''
  args.OF1 = document.cookie.split('IDSID=')[1].split(';')[0]
  args.OF2 = '' // USER INPUT NEEDED
  args.PK_NAMES = 'COMPONENT|DATE_CREATED|na|na|na'
  args.OF_NAMES = 'CREATOR|CONFIG_NAME|na|na|na|na|na|na|na|na'
  args.COMMENT = '' // USER INPUT NEEDED

  // need to delimit the data that goes in comment
  // separate out tab data by |
  /**
   * example
   * filter tab first then other settings
   * process=...;area=...;ceid=...;|othersettings=...; etc
   */
}
