window.onload = function () {
  // config global vars
  PAGE_BASE_URL = window.location.host
  document.title = PROJECT_TITLE
  getId('header').textContent = PROJECT_TITLE

  // build table outline
  Object.keys(CATEGORIES).forEach(key => {
    factoryTableOutline(key, CATEGORIES[key])
  })

  query(buildParameters(SHARED_DATASETS.EMPLOYEE, '', false))
  query(buildParameters(SHARED_DATASETS.QDO, '', false))
  query(buildParameters(SHARED_DATASETS.UE, '', false))
  query(buildParameters(SHARED_DATASETS.GOOD_CATCH, '', false))

  loadStatus()
}

function loadStatus () {
  let retry = false

  Object.keys(LOAD_STATUS).forEach(status => {
    if (LOAD_STATUS[status] === false) {
      retry = true
    }
  })
  if (retry === true) {
    //log('Not loaded yet...')
    setTimeout(function () {
      loadStatus()
    }, 1000)
  } else {
    //log('Loaded!')
    loadingEnd()
    doneLoading = true
  }
}

// Not used yet
function gcrollup (data) {
  let columns = ['SHIFT']
  return loop(data, columns)
}
/*
    Rollup E3 data into a dictionary.
  
    accepts: XMLHTTPRequest data []
    returns: e3 data structure {}
  */
function e3rollup (data) {
  // Columns listed in reverse order of
  // how they appear in the dictionary
  // ex. {process:{ceid:{},ceid:{}}} etc.
  let columns = [
    'VARIABLE',
    'STATISTIC',
    'SUBENTITY',
    'ENTITY',
    'CEID',
    'TECHNOLOGY',
    'SHIFT'
  ]

  return loop(data, columns)
}
