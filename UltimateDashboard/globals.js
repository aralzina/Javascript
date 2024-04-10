const PROJECT_TITLE = 'Ultimate Dashboard(Beta)'
const MAX_QUERY_RETRIES = 5
var PAGE_BASE_URL = ''
var FAB = 'F32'
var BASE_URL = '/' + FAB + '_FAB/P1272/Users/aralzina/Test/'
var SKYNET_URL = '/ReportServer?/Shared/CommentingFramework/Skynet_Add'
var PBI_DATASET_URL =
  'https://' +
  FAB +
  '-pbi.' +
  FAB +
  "prod.mfg.intel.com/reports/api/v2.0/datasets(path='"
var EMPLOYEES_LOADED = false

var SHARED_DATASETS = {
  QDO: {
    DS_URL: BASE_URL + 'QDO',
    PARAMETER_NAME: '',
    QUERY_TYPE: 'QDO',
    RETRY_COUNT: 0
  },
  EMPLOYEE: {
    DS_URL: BASE_URL + 'EMPLOYEES',
    PARAMETER_NAME: '',
    QUERY_TYPE: 'EMPLOYEES',
    RETRY_COUNT: 0
  },
  UE: {
    DS_URL: BASE_URL + 'UE',
    PARAMETER_NAME: '',
    QUERY_TYPE: 'UE',
    RETRY_COUNT: 0
  },
  GOOD_CATCH: {
    DS_URL: BASE_URL + 'GOOD_CATCHES',
    PARAMETER_NAME: '',
    QUERY_TYPE: 'GOOD_CATCH',
    RETRY_COUNT: 0
  }
}
var DATA_NOTES = {
  QDO: [
    "** <a href='https://f32-pbi.f32prod.mfg.intel.com/reports/powerbi/F32_FAB/SharedTechnologies/DryEtch/TelEtch/jgiovann/PQGC/Proactive%20Quality%20Good%20Catch%20Dashboard' target='_blank'>Detailed Report</a> can be found here.",
    'Color based on progress vs days left in current month.'
  ],
  UE: [''],
  GC: ['']
}
var CATEGORIES = {
  People: ['QDO', 'Good Catch'],
  Velocity: ['Availability (1270)', 'Availability (1274)']
}
var CATEGORY_KEYS = {
  PEOPLE: 'People',
  VELOCITY: 'Velocity'
}
var DATASETS = {
  EMPLOYEE: [],
  QDO: [],
  GC: [],
  UE: []
}
var doneLoading = false

var LOAD_STATUS = {
  EMPLOYEE: false,
  GC: false,
  QDO: false,
  UE: false
}

var EXCEPTIONS = {
  SERIES_LENGTH: {
    name: 'Series Error',
    level: 'End Function',
    message: 'Input series do not match eacth other in length.',
    toString: function () {
      return this.name + ': ' + this.message
    }
  },
  PARAMETERS: {
    name: 'Parameter Error',
    level: 'End Function',
    message: 'Error passing parameters in to function.',
    toString: function () {
      return this.name + ': ' + this.message
    }
  }
}
