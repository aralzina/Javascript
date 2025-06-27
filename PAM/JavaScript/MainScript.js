/**
 * Constants used throughout the script.
 */
const PBI_SERVER = 'https://f32-pbi.f32prod.mfg.intel.com/'
const DATASET_PATH = `${PBI_SERVER}reports/api/v2.0/datasets(path='/F32_FAB/SharedTechnologies/WetEtch/PAM/DATASETS/`;
const PAM_HEADER_EXPAND_DELAY_MS = 2000;
var RETRY_DELAY = 4000;
var MAX_RETRIES = 60
var retry_counter = 0;
const ERROR_MESSAGES = {
    "1": "Error #1 - No CEIDs selected. Opening CEID modal for selection.", // no CEID console message
    "2": "Error #2 - Exception occurred when checking for CEIDs. Please escalate this to the report owner by clicking email at the bottom of this page.",  // error message that pops up prompt
    "3": "Error #3 - Error creating table for " // error message when table fails to create
}


// CEID JSON list
const CEID_LIST = ['A6Ect', 'AERca', 'AMEcn', 'AMEct', 'AMEcz', 'AMEgn', 'ANTde', 'ANTpa', 'ANTpb', 'ANTpd', 'APTcu', 'APTde', 'ASHcu', 'AURwe', 'BCLcu', 'BCLnc', 'BECcu', 'BETcu', 'BETcw', 'BETnc', 'BURcu', 'C2Tcd', 'C2Tcn', 'C2Tcs', 'C2Tcu', 'CARcb', 'CARch', 'CARco', 'CARcs', 'CARcu', 'CATce', 'CATch', 'CATcn', 'CATcs', 'CATcu', 'CATcx', 'D3Aaf', 'D3Acs', 'D3Act', 'D3Anr', 'D3Asc', 'D3Asi', 'D3Asl', 'DEAct', 'DEAeu', 'DEAfa', 'DEAff', 'DEAfs', 'DEAnf', 'DEAnr', 'DEAns', 'DRTcb', 'DRTcu', 'DRTnb', 'DRTnc', 'E8Adi', 'E8Aox', 'E8Aph', 'ESTsz', 'ESTwa', 'ESTwc', 'EVAgi', 'FAWcs', 'FAWks', 'FBSws', 'G4Acs', 'G50tl', 'G6Pcn', 'G6Pct', 'G6Pcv', 'G6Tpc', 'G6Tpl', 'G6Tpy', 'G70cu', 'G70tb', 'G70tl', 'G70tm', 'G70vg', 'G70vm', 'G70vn', 'G70vs', 'G70vt', 'G7Xcb', 'G7Xce', 'G7Xcu', 'G7Xcw', 'G7Xnm', 'G8Aca', 'G8Ara', 'G8Ark', 'G8Ocb', 'G8Ocj', 'G8Ocn', 'G8Ocs', 'G8Oct', 'G8Ocv', 'G8Ocw', 'G8Tac', 'G8Tah', 'G8Tas', 'G8Tat', 'G8Tcc', 'G8Tcg', 'G8Tck', 'G8Tct', 'G8Tcv', 'G8Ttc', 'G8Tte', 'G8Ttg', 'G8Ttj', 'G8Ttk', 'G8Ttn', 'G8Tto', 'G8Ttp', 'G8Ttr', 'G8Tts', 'G8Ttt', 'G8Ttu', 'G8Tva', 'G8Tvc', 'G8Tvg', 'G8Tvm', 'G8Tvs', 'G8Xdp', 'G8Xmr', 'G8Xpc', 'G8Xqn', 'G8Xsm', 'G8Xte', 'G8Zva', 'G8Zvs', 'GIBcu', 'GNTbg', 'GNTde', 'GNTed', 'GPCcu', 'GPCpc', 'GSTwa', 'GSXcb', 'GSXch', 'GSXcu', 'GSXnm', 'GTAbe', 'GTAca', 'GTAce', 'GTAcq', 'GTAcs', 'GTAcv', 'GTAet', 'GTAob', 'GTArk', 'GTOcb', 'GTOcj', 'GTOcn', 'GTOcq', 'GTOcs', 'GTOct', 'GTOcu', 'GTOcv', 'GTOcw', 'GTOcz', 'GTOon', 'GTOsh', 'GTOtb', 'GTOtk', 'GTOtl', 'GTOtm', 'GTOva', 'GTOvb', 'GTOvh', 'GTOvj', 'GTOvn', 'GTOvo', 'GTTcc', 'GTTcg', 'GTTck', 'GTTcn', 'GTTct', 'GTTcv', 'GTTta', 'GTTtc', 'GTTtf', 'GTTtg', 'GTTth', 'GTTti', 'GTTtp', 'GTTtr', 'GTTts', 'GTTtt', 'GTTtx', 'GTTva', 'GTTvc', 'GTTvg', 'GTTvh', 'GTTvm', 'GTTvs', 'GTTvx', 'GTXde', 'GTZvs', 'HINcl', 'HINcu', 'HINde', 'HINdl', 'HMEch', 'HMEcm', 'HMEct', 'HMEcu', 'HOPwe', 'HOTpi', 'I2Efn', 'I2Emt', 'I2Ene', 'I2Epy', 'ICEbt', 'ICEeu', 'ICEfn', 'ICEmt', 'ICEne', 'ICEpy', 'ICExx', 'J4Rcp', 'J4Rcu', 'J4Rwe', 'J4Rwx', 'JGRcp', 'JGRcu', 'JGRwt', 'JGRwx', 'KSTrn', 'KSTsd', 'KSTsp', 'KSTwa', 'KSTwd', 'L3Ocb', 'L3Ocf', 'L3Ocj', 'L3Ocs', 'L3Oct', 'L3Ocv', 'L3Odt', 'L3Onf', 'LATne', 'LEOcb', 'LEOcf', 'LEOcj', 'LEOcs', 'LEOct', 'LEOcv', 'LEOnb', 'LEOwf', 'M6Ece', 'M6Ect', 'M6Edn', 'M6Eme', 'M6Eml', 'M6Emt', 'M6Epc', 'M6Esi', 'M6Esp', 'M6Esq', 'MIKab', 'MMEcl', 'MMExl', 'MPTde', 'NABcu', 'NABpc', 'NSEde', 'NSTpc', 'NSTpn', 'NSTsc', 'NSTwa', 'NSTwn', 'NSTwp', 'ONTde', 'ONThm', 'ONTqs', 'ONTqt', 'ONTqz', 'ONTxx', 'OVPcu', 'OVPpc', 'OX5cl', 'OX5cn', 'OXScb', 'OXScl', 'OXScn', 'OXSco', 'OXScs', 'OXScv', 'OXTcr', 'OXTdm', 'OXThm', 'OXTon', 'OXTrk', 'P2Tbe', 'P2Tfa', 'P2Tfb', 'P2Tfi', 'P2Thm', 'P2Tpt', 'P2Ttc', 'P2Ttn', 'P2Tty', 'P2Txa', 'P2Txe', 'P2Txf', 'P2Txh', 'P4Xmg', 'P4Xpl', 'P4Xsp', 'PATbe', 'PATcm', 'PATmr', 'PATne', 'PATnx', 'PATpe', 'PATrt', 'PATxo', 'PATxt', 'PGXxo', 'PGXxt', 'PRGsu', 'PRTcb', 'PRTcu', 'PRTnb', 'PRTnc', 'PRTnd', 'R3Xbr', 'R3Xbt', 'R3Xbv', 'R3Xch', 'R3Xci', 'R3Xck', 'R3Xcm', 'R3Xcn', 'R3Xcr', 'R3Xct', 'R3Xcw', 'R3Xde', 'R3Xdn', 'R3Xes', 'R3Xhr', 'R3Xme', 'R3Xmi', 'R3Xmo', 'R3Xpt', 'R3Xpv', 'R3Xrk', 'R3Xrx', 'R3Xsp', 'R3Xss', 'R3Xtq', 'R3Xtr', 'R3Xwe', 'RCLcr', 'RCLcu', 'RCLde', 'RCLrg', 'REXal', 'REXam', 'REXan', 'REXbl', 'REXbt', 'REXcc', 'REXcd', 'REXcl', 'REXco', 'REXcu', 'REXcx', 'REXdl', 'REXfl', 'REXgl', 'REXhl', 'REXkl', 'REXll', 'REXme', 'REXml', 'REXol', 'REXpl', 'REXql', 'REXrl', 'REXsp', 'REXul', 'REXvl', 'REXxl', 'REXxx', 'S5Sxa', 'S5Sxc', 'SLSde', 'SSTeg', 'SSTsa', 'SSTsg', 'SSTwa', 'SSTwh', 'T4Oca', 'T4Ocs', 'T4Rcb', 'T4Rce', 'T4Rcj', 'T4Rco', 'T4Rcp', 'T4Rcr', 'T4Rct', 'T4Rcx', 'T4Rjn', 'T4Rne', 'T4Rnj', 'T4Rnp', 'T4Rny', 'T4Rsh', 'T5Spr', 'T5Ssg', 'TAOca', 'TAOce', 'TAOco', 'TAOcr', 'TAOcs', 'TAOcv', 'TGR1x', 'TGR2x', 'TGRbd', 'TGRbr', 'TGRbv', 'TGRca', 'TGRcb', 'TGRce', 'TGRch', 'TGRci', 'TGRcj', 'TGRcp', 'TGRcu', 'TGRcw', 'TGRcx', 'TGRcy', 'TGRcz', 'TGRjd', 'TGRjn', 'TGRjr', 'TGRna', 'TGRne', 'TGRnh', 'TGRni', 'TGRnj', 'TGRnp', 'TGRnt', 'TGRny', 'TGRps', 'TGRue', 'TGRwd', 'TGRwe', 'TGRwf', 'TGRwj', 'TGRwl', 'TGRwm', 'TGRwp', 'TGRws', 'TGRwv', 'TGRwy', 'TGRwz', 'TLSde', 'UDMan', 'UFPcu', 'UFPpc', 'WBKcx', 'WDFwe', 'WMEwe', 'WRSrg', 'WSFwe', 'WSIwe']

// Use this cookie name for storing selected CEIDs
const CEID_COOKIE = "SELECTED_CEIDS";
const TEST_NAME_COOKIE = "SELECTED_TEST_NAMES";


/**
 * Example of grouping related constants
 */
const DATASETS = {
    ENTITY_LIST: {
        PARAMETER_NAME: "ceids",
        PARAMETER_VALUE: '',
        DATASET_NAME: "ENTITY_STATUS",
        LOADED: false,
        DATA: [],
        ERROR: false,
        COOKIE_NAME: CEID_COOKIE,
        FILTER: []
    },
    ENTITY_HISTORY: {
        PARAMETER_NAME: "ceids",
        PARAMETER_VALUE: '',
        DATASET_NAME: "ENTITY_HISTORY",
        LOADED: false,
        DATA: [],
        ERROR: false,
        COOKIE_NAME: CEID_COOKIE
    },
    SPC: {
        PARAMETER_NAME: "ceids",
        PARAMETER_VALUE: '',
        DATASET_NAME: "SPC",
        LOADED: false,
        DATA: [],
        ERROR: false,
        COOKIE_NAME: CEID_COOKIE
    },
    WORK_ORDERS: {
        PARAMETER_NAME: "ceids",
        PARAMETER_VALUE: '',
        DATASET_NAME: "WORKORDERS",
        LOADED: false,
        DATA: [],
        ERROR: false,
        COOKIE_NAME: CEID_COOKIE
    },
};


function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}
function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

/**
 * Adds the 'expanded' class to the PAM header after a delay to trigger the animation.
 * 
 * This function waits for the DOM to be fully loaded, then waits PAM_HEADER_EXPAND_DELAY_MS
 * before adding the 'expanded' class to the element with the 'pam-header' class. This triggers
 * the CSS animation that expands the header text.
 * This function also begins loading the page.
 */
window.addEventListener('DOMContentLoaded', function () {
    loadPage()
});


// Helper functions for cookie management
function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

// Populate the select2 multiselect with CEIDs
function populateCEIDMultiselect(list) {
    const $select = $('#ceid-multiselect');
    $select.empty();
    list.forEach(ceid => {
        $select.append(new Option(ceid, ceid));
    });
    $select.trigger('change');
}


/**
   * Return a list of data where the key provided matches at least one of the values
      provided in the array *values
      Input is the raw data from an XMLHttpRequest
   * @param {*} data 
   * @param {string} key key name to filter on
   * @param {Array|*} values values to include
   * @returns {*}
   */
function dataIn(data, key, values) {
    // fix simple error of values not being an array
    values = !Array.isArray(values) ? [values] : values
    //let BreakException = {}
    let results = []
    data.forEach(row => {
        let check = row[key]
        //try {
        values.forEach(val => {
            if (val === check) {
                results.push(row)
                //throw BreakException
            }
        })
        //} catch (e) {
        // if (e !== BreakException) throw e
        //}
    })
    return results
}

/**
 * Takes in data and column name and returns how many unique values are in the column
 * Function expects that the data from JSON.parse() 'data.value' will be supplied and that
 * the function only needs to reference data instead of data.value
 * @param {*} data data to get unique values from
 * @param {*} key key with values that need to be unique
 * @returns {Array} array of unique values
 */
function unique(data, key) {
    // if data has nothing in it... return
    if (data.length === 0) {
        return []
    }

    // make a deep copy of the data so that the initial data isn't sorted
    data = JSON.parse(JSON.stringify(data))

    //sort data by key provided
    data.sort(function (a, b) {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    })

    // push the first key in and save it in variable for loop comparison
    let results = []
    let val = data[0][key]
    results.push(val)

    for (let i = 1; i < data.length; i++) {
        let newVal = data[i][key]
        if (val !== newVal) {
            val = newVal
            results.push(val)
        }
    }
    return results
}

/**
 * Remove the useless ID data from data received from PBI
 * @param {Array<Map>} data
 * @returns {Array<Map>}
 */
function cleanData(data) {
    let result = []

    let keys = Object.keys(data[0])
    for (let i = 0; i < data.length; i++) {
        let row = {}
        for (let j = 1; j < keys.length; j++) {
            row[keys[j]] = data[i][keys[j]]
        }
        result.push(row)
    }
    return result
}

/**
 *   return a list of data where the key provided matches the value provided exactly
 * @param {*} data
 * @param {string} key key to filter on
 * @param {*} val value to filter on
 * @param {string}dataType if datatype is a month... specific usecase
 * @returns {*}
 */
function dataEquals(data, key, val, dataType) {
    let results = []
    for (let i = 0; i < data.length; i++) {
        if (typeof dataType === 'undefined') {
            if (data[i][key] === val) {
                results.push(data[i])
            }
        } else {
            if (dataType === 'month') {
                if (data[i][key].getMonth() === val) {
                    results.push(data[i])
                }
            }
        }
    }
    return results
}


/**
 * Returns only data that matches the value provided
 * @param {*} data
 * @param {*} key key name to filter on
 * @param {*} value value to include
 * @returns {Dict|Map}
 */
function dataLike(data, key, value) {
    let results = []
    data.forEach(row => {
        if (row[key].toUpperCase().includes(value)) {
            results.push(row)
        }
    })
    return results
}

/**
 * Quick create an HTML element
 * @param {string} type type of element to create
 * @param {Map | undefined} args id, className, style, etc.
 * @param {Map | undefined} attrs any attributes using the setAttributes function
 * @returns
 */
function create(type, args, attrs) {
    // make the element
    let element = document.createElement(type)

    // if any args are included, assign them
    if (typeof args !== 'undefined') {
        element = addProp(element, args)
    }

    //if any attributes are included, set them
    if (typeof attrs !== 'undefined') {
        element = addAttr(element, attrs)
    }
    return element
}


/**
 * Quick way to add multpile attributes to an HTML element
 * ex. element.addAttribute('key','val')
 * @param {HTMLElement} element the element to add the attribures
 * @param {*} args a dict|map of attrs to be added
 * @returns {HTMLElement}
 */
function addAttr(element, args) {
    Object.keys(args).forEach(key => {
        try {
            element[key] = args[key]
        } catch (e) {
            console.log('Error assigning' + key + ' to element')
        }
    })
    return element
}

/**
 * Quick way to add multiple properties to an HTML element
 * ex. element[key] = val
 * @param {HTMLElement} element
 * @param {*} attr
 * @returns {HTMLElement}
 */
function addProp(element, args) {
    Object.keys(args).forEach(key => {
        try {
            element.setAttribute(key, args[key])
        } catch (e) {
            log('Error adding attr ' + key.toString() + ' to element')
        }
    })
    return element
}

function stringsLike(arr, matchArr) {
    var results = []
    arr.forEach(str => {
        matchArr.forEach(match => {
            if (str.includes(match)) {
                results.push(str)
            }
        })
    })
    return results
}

function getPrefix(arr, n) {
    var results = []
    try {
        arr.forEach(str => {
            let slice = str.slice(0, n)
            if (!results.includes(slice)) {
                results.push(slice)
            }
        })
    } catch (e) { return [] }
    return results
}


function pamTable(entity) {
    // Create the main table element
    let parentTable, testNames, sections, SPCbody;

    // create table
    parentTable = create('table', {}, { className: 'subtable' })

    // add Workorder section
    let workOrderData = dataEquals(DATASETS.WORK_ORDERS.DATA, 'TOOLNAME', entity)
    if (workOrderData.length > 0) {
        tr = create('tr')
        td = create('td')
        parentTable.appendChild(tr)
        tr.appendChild(td)
        td.appendChild(buildWorkOrderSection(workOrderData))
    }

    // add SPC section
    let spcData = dataEquals(DATASETS.SPC.DATA, 'ENTITY', entity)
    let testCookies = JSON.parse(getCookie(TEST_NAME_COOKIE))
    try {
        if (testCookies.length > 0) {
            spcData = dataIn(spcData, 'FILTER', testCookies)
            if (spcData.length === 0) {
                // clear filters if no spc data after filter applied
                spcData = dataEquals(DATASETS.SPC.DATA, "ENTITY", entity)
            }
        }
    } catch (e) { }
    buildSPCSection(spcData)

    // add Entity History section


    // individual sections broken out for readability
    // this is the section that builds the SPC table
    function buildSPCSection(SPCdata) {
        testNames = unique(SPCdata, 'TEST_NAME')


        // build SPC thead,tbody
        sections = testNames.length
        if (sections > 0) {
            var table = create('table')
            SPCbody = []
            testNames.forEach((val) => {

                // vars
                let tempData, tnLabel, msnLabel, thead, tbody, tr, th, uniqueDates, bodyRows

                // filter down data
                tempData = dataEquals(SPCdata, 'TEST_NAME', val)
                uniqueDates = unique(tempData, 'ACTION_DATE')

                // start with thead
                thead = create('thead')

                // if this is the first loop
                if (SPCbody.length === 0) {
                    tr = create('tr')
                    thead.appendChild(tr)
                    th = create('th', { colspan: "14" }, { textContent: 'SPC' })
                    tr.appendChild(th)
                }

                // static headers part 1
                tr = create('tr')
                thead.appendChild(tr)

                tr.append(
                    create('th', { rowspan: '3' }, { textContent: 'Module Monitor' }),
                    create('th', { rowspan: '3' }, { textContent: 'Monitor Set Name' }),
                    create('th', { rowspan: '3' }, { textContent: 'Measurement Set Name' }),
                    create('th', { rowspan: '3' }, { textContent: 'Chart Type' }),
                    create('th', { rowspan: '3' }, { textContent: 'Chart Subset' }),
                    create('th', { colspan: `${(uniqueDates.length * 2).toString()}` }, { textContent: `Last ${uniqueDates.length.toString()} Run(s)` })
                )

                // dynamic date headers
                tr = create('tr')
                thead.appendChild(tr)
                for (let i = 0; i < uniqueDates.length; i++) {
                    tr.appendChild(create('th', { colspan: "2" }, { textContent: uniqueDates[i] }))
                }

                // static headers part 2
                tr = create('tr')
                thead.appendChild(tr)
                for (let i = 0; i < uniqueDates.length; i++) {
                    tr.append(
                        create('th', {}, { textContent: 'Pass/Fail' }),
                        create('th', {}, { textContent: 'Zone' })
                    )
                }

                SPCbody.push(thead)


                // all module monitor and monitor set names will be the same for this block of data
                tnLabel = tempData[0].MODULE_MONITOR
                msnLabel = tempData[0].MONITOR_SET_NAME

                // make the body and append it to the spc body array
                tbody = create('tbody')
                SPCbody.push(tbody)

                bodyRows = {}
                for (let i = tempData.length - 1; i >= 0; i--) {

                    let row = tempData[i]
                    let key = row.MEASUREMENT_SET_NAME + row.CHART_TYPE + row.SPC_CHART_SUBSET
                    let status

                    // add map
                    if (bodyRows[key] === undefined) {
                        let veryFirstRow
                        Object.keys(bodyRows).length === 0 ? veryFirstRow = true : veryFirstRow = false
                        bodyRows[key] = create('tr')


                        // add first two columns only if very first row
                        if (veryFirstRow) {
                            bodyRows[key].append(
                                create('td', { rowspan: tempData.length.toString() }, { textContent: tnLabel }),
                                create('td', { rowspan: tempData.length.toString() }, { textContent: msnLabel })
                            )
                        }

                        // add next columns 
                        bodyRows[key].append(
                            create('td', {}, { textContent: row.MEASUREMENT_SET_NAME }),
                            create('td', {}, { textContent: row.CHART_TYPE }),
                            create('td', {}, { textContent: row.SPC_CHART_SUBSET }),
                        )
                    }

                    // debugging
                    //console.log(`cv: ${row.CHART_VALUE}, cll: ${row.CHART_LOWER_LIMIT}, cul: ${row.CHART_UPPER_LIMIT}, ucl: ${row.UP_CONTROL_LMT}, lcl: ${row.LO_CONTROL_LMT}, cl: ${row.CENTERLINE}`)

                    // color next td based on pass/fail
                    row.INCONTROL_FLAG === 'Y' ? status = 'pass' : status = 'fail'
                    bodyRows[key].append(
                        create('td', {}, { className: status, textContent: status.toUpperCase() }),
                        create('td', {
                            chartValue: parseFloat(row.CHART_VALUE).toFixed(3),
                            CLL: parseFloat(row.CHART_LOWER_LIMIT).toFixed(3),
                            CUL: parseFloat(row.CHART_UPPER_LIMIT).toFixed(3),
                            UCL: parseFloat(row.UP_CONTROL_LMT).toFixed(3),
                            LCL: parseFloat(row.LO_CONTROL_LMT).toFixed(3),
                            CL: parseFloat(row.CENTERLINE).toFixed(3)
                        }, { textContent: row.ZONE })
                    )
                }
                Object.keys(bodyRows).forEach(k => {
                    tbody.appendChild(bodyRows[k])
                })


            })
            SPCbody.forEach(entry => {
                table.appendChild(entry)
            })
            td = create('td')
            tr = create('tr')

            parentTable.appendChild(tr)
            tr.appendChild(td)
            td.appendChild(table)
        }
    }

    function buildWorkOrderSection(data) {
        // Create table and header
        const table = create('table')
        const thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        const columns = ['WORKORDERID', 'STATUSOPTIONNAME', 'DESCRIPTION', 'CREATEDON', 'LASTUPDATEDON'];

        var th = create('th', { colspan: columns.length }, { textContent: 'Work Orders' });
        headerRow.appendChild(th);
        thead.appendChild(headerRow);

        var tr = create('tr')
        thead.appendChild(tr)

        columns.forEach(col => {
            th = document.createElement('th');
            th.textContent = col;
            tr.appendChild(th);
        });
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                td.style = "white-space: pre-wrap;"
                td.textContent = row[col] !== undefined ? row[col].replaceAll('<br>', '\n') : '';
                tr.appendChild(td);
                if (col === "WORKORDERID") {
                    td.textContent = ''; // Clear text content for the link
                    const a = document.createElement('a');
                    a.href = `https://f32-apps-fuzion.f32prod.mfg.intel.com/EditWorkOrderPage.aspx?WorkOrderID=${row[col]}`;
                    a.target = "_blank"
                    a.textContent = row[col];
                    td.appendChild(a);
                }
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        return table;
    }

    function buildEntityHistorySection() {
        //TODO
    }


    return parentTable

}


// Attach modal open to Equipment Groups nav link
function initNavComponents() {
    // Initialize select2 with dropdownParent set to modal for correct stacking
    $('#ceid-multiselect').select2({
        placeholder: "Select CEIDs",
        width: 'resolve',
        dropdownParent: $('#equipment-modal')
    });
    populateCEIDMultiselect(getPrefix(CEID_LIST, 3));

    // Attach to Equipment Groups link in side nav
    const eqLink = Array.from(document.querySelectorAll('.side-nav a')).find(a => a.textContent.trim() === 'Equipment Groups');
    if (eqLink) {
        eqLink.addEventListener('click', function (e) {
            e.preventDefault();
            showEquipmentModal();
        });
    }

    // Attach to Test Names link in side nav
    const testLink = Array.from(document.querySelectorAll('.side-nav a')).find(a => a.textContent.trim() === 'SPC Chart Filter');
    if (testLink) {
        testLink.addEventListener('click', function (e) {
            e.preventDefault();
            showTestModal();
        });
    }
}

function initEqModal() {
    // Modal open/close event handlers
    document.getElementById('close-equipment-modal').onclick = hideEquipmentModal;
    document.getElementById('equipment-modal-ok').onclick = hideEquipmentModal;
    document.getElementById('equipment-modal').addEventListener('click', function (e) {
        if (e.target === this) hideEquipmentModal();
    });
}


// Show modal and update select2 with CEIDs from cookie
function showEquipmentModal() {
    document.getElementById('equipment-modal').style.display = 'flex';
    setTimeout(() => {
        // Get selected CEIDs from cookie
        let selected = getCookie(CEID_COOKIE);
        let selectedArr = [];
        if (selected) {
            try { selectedArr = getPrefix(JSON.parse(selected), 3); } catch { }
        }
        $('#ceid-multiselect').val(selectedArr).trigger('change');
        $('#ceid-multiselect').select2('open');
    }, 100);
}

// Hide modal and update cookie with current select2 values
function hideEquipmentModal() {
    const selected = $('#ceid-multiselect').val() || [];
    setCookie(CEID_COOKIE, JSON.stringify(stringsLike(CEID_LIST, selected)));
    document.getElementById('equipment-modal').style.display = 'none';
    $('#ceid-multiselect').select2('close');
    checkAndQuery() ? monitorStatus() : alert('Failed to query data.')
}

function initTestSelectModal() {
    // Modal open/close event handlers
    document.getElementById('test-modal').addEventListener('click', function (e) {
        if (e.target === this) hideTestModal();
    });
}

// Show modal and update form with test names from cookie
function showTestModal() {
    document.getElementById('test-modal').style.display = 'flex';
    // load test unique test names and maybe a few other columns for clarity
    setTimeout(() => {
        // Get selected TestNames from cookie

        let selected = getCookie(TEST_NAME_COOKIE);
        let selectedArr = [];
        if (selected) {
            try { selectedArr = JSON.parse(selected); } catch { }
        }
        buildTestFilter(selectedArr)



    }, 100);
}

// Hide modal and update cookie with current select2 values
function hideTestModal() {
    document.getElementById('test-modal').style.display = 'none';
    parseData()
}


// Helper: Extract chart attributes from all zone cells in the row
function getRowChartData(zoneCell) {
    var tr = zoneCell.closest('tr');
    if (!tr) return null;
    var cells = Array.from(tr.querySelectorAll('td[chartvalue]'));
    var chartvalues = [], ucls = [], lcls = [], cls = [], xLabels = [];
    var cll = null, cul = null;
    cells.forEach((cell, idx) => {
        chartvalues.push(Number(cell.getAttribute('chartvalue')));
        ucls.push(Number(cell.getAttribute('ucl')));
        lcls.push(Number(cell.getAttribute('lcl')));
        cls.push(Number(cell.getAttribute('cl')));
        xLabels.push('Run ' + (idx + 1));
        if (idx === 0) {
            cll = Number(cell.getAttribute('cll'));
            cul = Number(cell.getAttribute('cul'));
        }
    });
    return { chartvalues, ucls, lcls, cls, xLabels, cll, cul };
}

// Show the popup graph
function showZoneGraph(evt, zoneCell) {
    var popup = document.getElementById('zone-graph-popup');
    var canvas = document.getElementById('zone-graph-canvas');
    var data = getRowChartData(zoneCell);
    if (!data) return;

    popup.style.left = (evt.pageX + 10) + 'px';
    popup.style.top = (evt.pageY + 10) + 'px';
    popup.style.display = 'block';

    if (window.zoneChart) window.zoneChart.destroy();

    // Register datalabels plugin
    if (window.ChartDataLabels) {
        Chart.register(window.ChartDataLabels);
    }

    window.zoneChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.xLabels,
            datasets: [
                {
                    label: 'Chart Value',
                    data: data.chartvalues,
                    borderColor: '#0068b5',
                    backgroundColor: 'rgba(0,104,181,0.1)',
                    pointBackgroundColor: '#00baff',
                    fill: false,
                    tension: 0.2
                },
                {
                    label: 'UCL',
                    data: data.ucls,
                    borderColor: 'red',
                    borderWidth: 1,
                    borderDash: [],
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    showLine: true
                },
                {
                    label: 'CL',
                    data: data.cls,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderDash: [6, 4],
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    showLine: true
                },
                {
                    label: 'LCL',
                    data: data.lcls,
                    borderColor: 'red',
                    borderWidth: 1,
                    borderDash: [],
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    showLine: true
                }
            ]
        },
        options: {
            responsive: false,
            plugins: {
                legend: { display: true },
                title: { display: false },
                datalabels: {
                    display: true,
                    align: 'top',
                    anchor: 'end',
                    color: '#0068b5',
                    font: { weight: 'bold' },
                    formatter: function (value, context) {
                        // Only show datalabels for the main chartvalue dataset
                        if (context.datasetIndex === 0) {
                            return value != null ? value : '';
                        }
                        return '';
                    }
                }
            },
            scales: {
                y: {
                    // min: data.cll,
                    // max: data.cul,
                    title: { display: true, text: 'Value' }
                }
            }
        },
        plugins: [window.ChartDataLabels]
    });
}

function hideZoneGraph() {
    var popup = document.getElementById('zone-graph-popup');
    popup.style.display = 'none';
    if (window.zoneChart) {
        window.zoneChart.destroy();
        window.zoneChart = null;
    }
}

function attachZoneHoverListeners() {
    document.querySelectorAll('.subtable td[chartvalue]').forEach(function (cell) {
        cell.style.cursor = 'pointer';
        cell.addEventListener('mouseenter', function (evt) {
            showZoneGraph(evt, cell);
        });
        cell.addEventListener('mouseleave', hideZoneGraph);
    });
}

function initTables() {

    // Toggle subtable visibility
    document.querySelectorAll('.expandable').forEach(function (cell) {
        cell.addEventListener('click', function () {
            var subtableId = 'subtable-' + this.getAttribute('data-entity');
            var subtableRow = document.getElementById(subtableId);
            if (subtableRow.classList.contains('open')) {
                subtableRow.classList.remove('open');
            } else {
                subtableRow.classList.add('open');
            }
        });
    });
    attachZoneHoverListeners()
    document.querySelectorAll('.expandable').forEach(function (cell) {
        cell.addEventListener('click', function () {
            setTimeout(attachZoneHoverListeners, 200);
        });
    });
}

function checkAndQuery() {

    // check cookies to initiate queries
    try {
        let ceidList = []

        ceidList = getPrefix(JSON.parse(getCookie(CEID_COOKIE)), 3)
        if (ceidList.length === 0) {
            ceidList = getPrefix(CEID_LIST, 3)
        }
        return ceidList.length === 0 ? f() : t()

    } catch (e) {
        alert(ERROR_MESSAGES["2"])
    }

    function t() {
        // add parameter value to DATASETS
        Object.keys(DATASETS).forEach(key => {
            if (DATASETS[key].COOKIE_NAME.length > 0) {
                let cookies = JSON.parse(getCookie(DATASETS[key].COOKIE_NAME)).join()
                if (cookies.length > 0) {
                    DATASETS[key].PARAMETER_VALUE = cookies
                }
            }
        })
        queryData()

        return true
    }

    function f() {
        console.log(ERROR_MESSAGES["1"])
        showEquipmentModal()
        return false
    }
}

function resetFlags() {

    // Reset error and loaded flags
    Object.keys(DATASETS).forEach(key => {
        DATASETS[key].LOADED = false
        DATASETS[key].ERROR = false
    })

    // Reset retry counter
    retry_counter = 0
}


/**
/**
 * Loads a dataset from a JSON file and filters it by a parameter.
 *
 * @param {Map} map - The dataset mapping data.
 */
function loadData(map) {
    var xhr = new XMLHttpRequest();
    var url = `${DATASET_PATH}${map.DATASET_NAME}')/data?`
    map.PARAMETER_NAME ? url = `${url}${map.PARAMETER_NAME}=${map.PARAMETER_VALUE}` : console.log('parameter not present')


    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var data = JSON.parse(xhr.responseText);
                // Filter the data by paramName and paramValue
                map.DATA = cleanData(data.value)
                map.LOADED = true
                if (map.DATASET_NAME === 'SPC') {
                    map.DATA.forEach(row => {
                        row['FILTER'] = `${row.MONITOR_SET_NAME} - ${row.MODULE_MONITOR} - ${row.TEST_NAME}`
                        if (row['ZONE'] === "999") {
                            row['ZONE'] = " - "
                        }
                    })
                }
            } catch (e) {
                console.error('Error parsing dataset:', e);
                map.LOADED = false
                map.ERROR = true
            }
        }
    };

    xhr.send();
}

function queryData() {

    // Show loading overlay
    showLoading()

    // reset the loaded and error flags on all datasets
    resetFlags()

    // query the data asynchronously
    Object.keys(DATASETS).forEach(key => {
        loadData(DATASETS[key])
    })
}

function monitorStatus() {
    const keys = Object.keys(DATASETS)
    var errorCount = 0
    var loadedCount = 0

    keys.forEach(key => {
        errorCount += DATASETS[key].ERROR ? 1 : 0
        loadedCount += DATASETS[key].LOADED ? 1 : 0
    })

    // intervene to prevent getting stuck on this loop
    if (retry_counter >= MAX_RETRIES) {
        maxRetries()
        return
    }

    //increment counter
    retry_counter++

    // Check that the total count = the number of datasets and act accordingly
    keys.length === (errorCount + loadedCount) ? errorCount === 0 ? resume() : fail() : retry()

    // function to wait a few seconds and retry this function
    function retry() {
        setTimeout(monitorStatus, RETRY_DELAY)
    }

    // if all data is loaded
    function resume() {
        //parseData()
        analyzeCandidates()
    }

    // if there is a fail and all datasets are loaded
    function fail() {
        var failed = []
        var names = 'Datasets: \r\n'

        keys.forEach(key => {
            if (DATASETS[key].ERROR) {
                failed.push(key)
            }
        })

        // add failing datasets to the message
        failed.forEach(failing => {
            failing.split("_").forEach(word => {
                names = names + word
            })
            if (failed[failed.length - 1] !== failing) {
                names = names + '/r/n'
            }
        })

        // hide loading overlay
        hideLoading()

        // complete the message
        names = `${names}The above datasets have failed to load. Retry loading all datasets?`

        if (confirm(names)) {
            queryData()
        }
    }

    // if there are too many retries
    function maxRetries() {
        alert(`Waited ${(MAX_RETRIES * RETRY_DELAY) / 1000} seconds for all queries to finish, but they never did. Check that you are on the Intel network and refresh the page.`)
    }
}

function loadPage() {
    // Init Steps
    // 1.) Inititalize the select2 based on static data for now and the equipment modal
    // 2.) Check for existing selected CEIDs.
    //      a.) If exists then load the page normally
    //      b.) If no ceids are selected, open up the equipment groups modal
    //          Modal close already has code to trigger data updates. So once
    //          they're selected, no further action needed.
    //     Finally: Monitor 'LOADED' and 'ERROR' status of datasets and take action when all are completed.

    // Step 1
    initNavComponents()
    initEqModal()
    initTestSelectModal()

    // Step 2
    checkAndQuery() ? monitorStatus() : console.log('Failed check and query')

    // Data parsing and table building happen after checks pass. See parseData() below

}

function parseData() {

    // TODO: Break out by Functional Area / CEID

    // TODO: Algorithm to see what tools can be logged up


    // get main
    const main = document.getElementsByClassName('main-content')[0]
    main.innerHTML = '<h1 style="text-align:center;">Down Entity Table</h1>'

    // loop entities and build/attach tables
    unique(DATASETS.ENTITY_LIST.DATA, 'ENTITY').forEach(e => {
        try {
            if (e.length >= 6) {
                main.appendChild(entityTable(e))
            }
        } catch (err) {
            //hide loading overlay
            hideLoading()
            console.log(`${ERROR_MESSAGES["3"]} ${e}\r\n${err}`)
        }
    })

    initTables()

    // broken out for readability
    function entityTable(entity) {
        // make table
        const table = create('table', { id: `${entity}-table` })

        // make thead and append to table
        const thead = create('thead')
        table.appendChild(thead)

        //make thead row and append to thead
        const thtr = create('tr')
        thead.appendChild(thtr)

        // loop an array and add ths
        const colNames = ['Entity', 'State', 'Date Logged']
        colNames.forEach(column => {
            thtr.appendChild(create('th', {}, { textContent: column }))
        })

        // make body and append to table
        const tbody = create('tbody')
        table.appendChild(tbody)

        // make body row and append to body
        const tbtr = create('tr')
        tbody.appendChild(tbtr)

        // filter data - should only be one row of data
        const data = dataEquals(DATASETS.ENTITY_LIST.DATA, 'ENTITY', entity)[0]

        // loop an array and add tds
        const colKeys = ['ENTITY', 'STATE', 'LAST_EVENT_DATE']
        colKeys.forEach(key => {
            const attrs = {}
            const params = {}

            // only for first column
            if (key === 'ENTITY') {
                attrs['data-entity'] = entity
                params['className'] = 'expandable'
            }

            // for all columns
            params['textContent'] = data[key]

            // add to row
            tbtr.appendChild(create('td', attrs, params))
        })

        // make the subtable row
        const subtr = create('tr', { id: `subtable-${entity}` }, { className: 'subtable-row' })
        tbody.appendChild(subtr)

        // make the td that holds the div that holds the subtable
        const subtd = create('td', { colspan: "3" }, { className: 'subtable-cell' })
        subtr.appendChild(subtd)

        // make the div that holds the subtable
        const subdiv = create('div', {}, { className: 'subtable-cell-inner' })
        subtd.appendChild(subdiv)

        // append pam table
        subdiv.appendChild(pamTable(entity))

        return table
    }
    // hide loading overlay
    hideLoading()

    // activate header animation
    setTimeout(function () {
        var header = document.querySelector('.pam-header');
        if (header) {
            header.classList.add('expanded');
        }
    }, PAM_HEADER_EXPAND_DELAY_MS);
}

function filterData() {

}

function spcFilter() {
    let data = DATASETS.SPC.DATA
    let list = []

    data.forEach(row => {
        if (!list.includes(row.ENTITY)) {
            list.push(row.ENTITY)
        }
    })
    return list
}

function testFilter(filter) {
    return dataEquals(DATASETS.SPC.DATA, "FILTER", filter)
}

function analyzeCandidates() {
    let filter = spcFilter()
    let passingFilter = []

    DATASETS.ENTITY_LIST['BACKUP_DATA'] = DATASETS.ENTITY_LIST.DATA
    DATASETS.ENTITY_LIST.DATA = dataIn(DATASETS.ENTITY_LIST.DATA, 'ENTITY', filter)

    // lets find out results from the last run of each
    filter.forEach(entity => {
        var entitySPCData = dataEquals(DATASETS.SPC.DATA, "ENTITY", entity)
        var results = []
        var testNames = unique(entitySPCData, 'TEST_NAME')

        // loop test names
        testNames.forEach(test => {
            var spcTestData = dataEquals(entitySPCData, "TEST_NAME", test)
            var rank = spcTestData[0].RANK
            var rankData = dataEquals(spcTestData, "RANK", rank)

            rankData.forEach(row => {
                results.push(row.INCONTROL_FLAG)
            })
        })

        if (!results.includes('N')) {
            passingFilter.push(entity)
        }
    })
    DATASETS.ENTITY_LIST.DATA = dataIn(DATASETS.ENTITY_LIST.DATA, 'ENTITY', passingFilter)

    parseData()
}


function buildTestFilter(filters) {


    spcData = unique(DATASETS.SPC.DATA, 'FILTER')




    // Get filter box
    const filterBox = document.getElementById('test-filter-box');
    filterBox.className = 'spc-filter-box';
    filterBox.innerHTML = ''

    // Header
    const header = document.createElement('div');
    header.className = 'spc-filter-header';
    header.innerHTML = `<svg width="22" height="22" style="vertical-align:middle;margin-right:0.2em;" viewBox="0 0 24 24" fill="none"><path d="M3 5h18M6 10h12M10 15h4" stroke="#00baff" stroke-width="2" stroke-linecap="round"/></svg>Filter`;
    filterBox.appendChild(header);

    // "Select All" checkbox
    const selectAllDiv = document.createElement('div');
    selectAllDiv.className = 'spc-filter-select-all';
    const selectAll = document.createElement('input');
    selectAll.type = 'checkbox';
    selectAll.checked = true;
    selectAll.id = 'spc-filter-select-all';
    selectAll.className = 'spc-filter-checkbox';
    selectAllDiv.appendChild(selectAll);
    const selectAllLabel = document.createElement('label');
    selectAllLabel.textContent = 'Select All';
    selectAllLabel.htmlFor = selectAll.id;
    selectAllLabel.className = 'spc-filter-label';
    selectAllDiv.appendChild(selectAllLabel);
    filterBox.appendChild(selectAllDiv);

    // Centered info string under Select All
    const infoDiv = document.createElement('div');
    infoDiv.textContent = "Monitor Set Name - Module Monitor - Test Name";
    infoDiv.style.textAlign = "center";
    infoDiv.style.fontSize = "1.08rem";
    infoDiv.style.color = "#0068b5";
    infoDiv.style.fontWeight = "500";
    infoDiv.style.margin = "0 0 0.7rem 0";
    filterBox.appendChild(infoDiv);

    // List of checkboxes
    const listDiv = document.createElement('div');
    listDiv.className = 'spc-filter-list';

    // Helper to log selected items
    function logSelected() {
        const selected = Array.from(listDiv.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        setCookie(TEST_NAME_COOKIE, JSON.stringify(selected));
    }

    spcData.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'spc-filter-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        !filters.includes(item) && filters > 0 ? checkbox.checked = false : checkbox.checked = true;
        checkbox.id = 'spc-filter-' + idx;
        checkbox.value = item;
        checkbox.className = 'spc-filter-checkbox';


        checkbox.addEventListener('change', function () {
            // If any are unchecked, uncheck select all
            if (!checkbox.checked) {
                selectAll.checked = false;
            } else {
                // If all are checked, check select all
                const all = Array.from(listDiv.querySelectorAll('input[type="checkbox"]'));
                if (all.every(cb => cb.checked)) {
                    selectAll.checked = true;
                }
            }
            logSelected();
        });

        const label = document.createElement('label');
        label.textContent = item;
        label.htmlFor = checkbox.id;
        label.className = 'spc-filter-label';

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(label);
        listDiv.appendChild(itemDiv);
    });

    // Select All logic
    selectAll.addEventListener('change', function () {
        const all = Array.from(listDiv.querySelectorAll('input[type="checkbox"]'));
        all.forEach(cb => cb.checked = selectAll.checked);
        logSelected();
    });

    filterBox.appendChild(listDiv);
}


