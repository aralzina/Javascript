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

let url =
    'https://AZSHWEB.intel.com/AZAnalysis$/1274_MAODATA/AZFSM_Production/COS_DB/Combined/CEID.TXT',
  func = data => {
    console.log('debug')
  }

request(url, func)
