/**
 * Constants used throughout the script.
 */
const PBI_SERVER = 'https://f32-pbi.f32prod.mfg.intel.com/'
const DATASET_PATH = `${PBI_SERVER}reports/api/v2.0/datasets(path='/F32_FAB/SharedTechnologies/WetEtch/PAM/DATASETS/`;
const PAM_HEADER_EXPAND_DELAY_MS = 2000;
const RETRY_DELAY = 4000;
const MAX_RETRIES = 6
var retry_counter = 0;
const ERROR_MESSAGES = {
    "1": "Error #1 - No CEIDs selected. Opening CEID modal for selection.", // no CEID console message
    "2": "Error #2 - Exception occurred when checking for CEIDs. Please escalate this to the report owner by clicking email at the bottom of this page."  // error message that pops up prompt
}


// CEID JSON list
const CEID_LIST = ['A6Ect', 'AERca', 'AMEcn', 'AMEct', 'AMEcz', 'AMEgn', 'ANTde', 'ANTpa', 'ANTpb', 'ANTpd', 'APTcu', 'APTde', 'ASHcu', 'AURwe', 'BCLcu', 'BCLnc', 'BECcu', 'BETcu', 'BETcw', 'BETnc', 'BURcu', 'C2Tcd', 'C2Tcn', 'C2Tcs', 'C2Tcu', 'CARcb', 'CARch', 'CARco', 'CARcs', 'CARcu', 'CATce', 'CATch', 'CATcn', 'CATcs', 'CATcu', 'CATcx', 'D3Aaf', 'D3Acs', 'D3Act', 'D3Anr', 'D3Asc', 'D3Asi', 'D3Asl', 'DEAct', 'DEAeu', 'DEAfa', 'DEAff', 'DEAfs', 'DEAnf', 'DEAnr', 'DEAns', 'DRTcb', 'DRTcu', 'DRTnb', 'DRTnc', 'E8Adi', 'E8Aox', 'E8Aph', 'ESTsz', 'ESTwa', 'ESTwc', 'EVAgi', 'FAWcs', 'FAWks', 'FBSws', 'G4Acs', 'G50tl', 'G6Pcn', 'G6Pct', 'G6Pcv', 'G6Tpc', 'G6Tpl', 'G6Tpy', 'G70cu', 'G70tb', 'G70tl', 'G70tm', 'G70vg', 'G70vm', 'G70vn', 'G70vs', 'G70vt', 'G7Xcb', 'G7Xce', 'G7Xcu', 'G7Xcw', 'G7Xnm', 'G8Aca', 'G8Ara', 'G8Ark', 'G8Ocb', 'G8Ocj', 'G8Ocn', 'G8Ocs', 'G8Oct', 'G8Ocv', 'G8Ocw', 'G8Tac', 'G8Tah', 'G8Tas', 'G8Tat', 'G8Tcc', 'G8Tcg', 'G8Tck', 'G8Tct', 'G8Tcv', 'G8Ttc', 'G8Tte', 'G8Ttg', 'G8Ttj', 'G8Ttk', 'G8Ttn', 'G8Tto', 'G8Ttp', 'G8Ttr', 'G8Tts', 'G8Ttt', 'G8Ttu', 'G8Tva', 'G8Tvc', 'G8Tvg', 'G8Tvm', 'G8Tvs', 'G8Xdp', 'G8Xmr', 'G8Xpc', 'G8Xqn', 'G8Xsm', 'G8Xte', 'G8Zva', 'G8Zvs', 'GIBcu', 'GNTbg', 'GNTde', 'GNTed', 'GPCcu', 'GPCpc', 'GSTwa', 'GSXcb', 'GSXch', 'GSXcu', 'GSXnm', 'GTAbe', 'GTAca', 'GTAce', 'GTAcq', 'GTAcs', 'GTAcv', 'GTAet', 'GTAob', 'GTArk', 'GTOcb', 'GTOcj', 'GTOcn', 'GTOcq', 'GTOcs', 'GTOct', 'GTOcu', 'GTOcv', 'GTOcw', 'GTOcz', 'GTOon', 'GTOsh', 'GTOtb', 'GTOtk', 'GTOtl', 'GTOtm', 'GTOva', 'GTOvb', 'GTOvh', 'GTOvj', 'GTOvn', 'GTOvo', 'GTTcc', 'GTTcg', 'GTTck', 'GTTcn', 'GTTct', 'GTTcv', 'GTTta', 'GTTtc', 'GTTtf', 'GTTtg', 'GTTth', 'GTTti', 'GTTtp', 'GTTtr', 'GTTts', 'GTTtt', 'GTTtx', 'GTTva', 'GTTvc', 'GTTvg', 'GTTvh', 'GTTvm', 'GTTvs', 'GTTvx', 'GTXde', 'GTZvs', 'HINcl', 'HINcu', 'HINde', 'HINdl', 'HMEch', 'HMEcm', 'HMEct', 'HMEcu', 'HOPwe', 'HOTpi', 'I2Efn', 'I2Emt', 'I2Ene', 'I2Epy', 'ICEbt', 'ICEeu', 'ICEfn', 'ICEmt', 'ICEne', 'ICEpy', 'ICExx', 'J4Rcp', 'J4Rcu', 'J4Rwe', 'J4Rwx', 'JGRcp', 'JGRcu', 'JGRwt', 'JGRwx', 'KSTrn', 'KSTsd', 'KSTsp', 'KSTwa', 'KSTwd', 'L3Ocb', 'L3Ocf', 'L3Ocj', 'L3Ocs', 'L3Oct', 'L3Ocv', 'L3Odt', 'L3Onf', 'LATne', 'LEOcb', 'LEOcf', 'LEOcj', 'LEOcs', 'LEOct', 'LEOcv', 'LEOnb', 'LEOwf', 'M6Ece', 'M6Ect', 'M6Edn', 'M6Eme', 'M6Eml', 'M6Emt', 'M6Epc', 'M6Esi', 'M6Esp', 'M6Esq', 'MIKab', 'MMEcl', 'MMExl', 'MPTde', 'NABcu', 'NABpc', 'NSEde', 'NSTpc', 'NSTpn', 'NSTsc', 'NSTwa', 'NSTwn', 'NSTwp', 'ONTde', 'ONThm', 'ONTqs', 'ONTqt', 'ONTqz', 'ONTxx', 'OVPcu', 'OVPpc', 'OX5cl', 'OX5cn', 'OXScb', 'OXScl', 'OXScn', 'OXSco', 'OXScs', 'OXScv', 'OXTcr', 'OXTdm', 'OXThm', 'OXTon', 'OXTrk', 'P2Tbe', 'P2Tfa', 'P2Tfb', 'P2Tfi', 'P2Thm', 'P2Tpt', 'P2Ttc', 'P2Ttn', 'P2Tty', 'P2Txa', 'P2Txe', 'P2Txf', 'P2Txh', 'P4Xmg', 'P4Xpl', 'P4Xsp', 'PATbe', 'PATcm', 'PATmr', 'PATne', 'PATnx', 'PATpe', 'PATrt', 'PATxo', 'PATxt', 'PGXxo', 'PGXxt', 'PRGsu', 'PRTcb', 'PRTcu', 'PRTnb', 'PRTnc', 'PRTnd', 'R3Xbr', 'R3Xbt', 'R3Xbv', 'R3Xch', 'R3Xci', 'R3Xck', 'R3Xcm', 'R3Xcn', 'R3Xcr', 'R3Xct', 'R3Xcw', 'R3Xde', 'R3Xdn', 'R3Xes', 'R3Xhr', 'R3Xme', 'R3Xmi', 'R3Xmo', 'R3Xpt', 'R3Xpv', 'R3Xrk', 'R3Xrx', 'R3Xsp', 'R3Xss', 'R3Xtq', 'R3Xtr', 'R3Xwe', 'RCLcr', 'RCLcu', 'RCLde', 'RCLrg', 'REXal', 'REXam', 'REXan', 'REXbl', 'REXbt', 'REXcc', 'REXcd', 'REXcl', 'REXco', 'REXcu', 'REXcx', 'REXdl', 'REXfl', 'REXgl', 'REXhl', 'REXkl', 'REXll', 'REXme', 'REXml', 'REXol', 'REXpl', 'REXql', 'REXrl', 'REXsp', 'REXul', 'REXvl', 'REXxl', 'REXxx', 'S5Sxa', 'S5Sxc', 'SLSde', 'SSTeg', 'SSTsa', 'SSTsg', 'SSTwa', 'SSTwh', 'T4Oca', 'T4Ocs', 'T4Rcb', 'T4Rce', 'T4Rcj', 'T4Rco', 'T4Rcp', 'T4Rcr', 'T4Rct', 'T4Rcx', 'T4Rjn', 'T4Rne', 'T4Rnj', 'T4Rnp', 'T4Rny', 'T4Rsh', 'T5Spr', 'T5Ssg', 'TAOca', 'TAOce', 'TAOco', 'TAOcr', 'TAOcs', 'TAOcv', 'TGR1x', 'TGR2x', 'TGRbd', 'TGRbr', 'TGRbv', 'TGRca', 'TGRcb', 'TGRce', 'TGRch', 'TGRci', 'TGRcj', 'TGRcp', 'TGRcu', 'TGRcw', 'TGRcx', 'TGRcy', 'TGRcz', 'TGRjd', 'TGRjn', 'TGRjr', 'TGRna', 'TGRne', 'TGRnh', 'TGRni', 'TGRnj', 'TGRnp', 'TGRnt', 'TGRny', 'TGRps', 'TGRue', 'TGRwd', 'TGRwe', 'TGRwf', 'TGRwj', 'TGRwl', 'TGRwm', 'TGRwp', 'TGRws', 'TGRwv', 'TGRwy', 'TGRwz', 'TLSde', 'UDMan', 'UFPcu', 'UFPpc', 'WBKcx', 'WDFwe', 'WMEwe', 'WRSrg', 'WSFwe', 'WSIwe']

// Use this cookie name for storing selected CEIDs
const CEID_COOKIE = "SELECTED_CEIDS";


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
        COOKIE_NAME: CEID_COOKIE
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

/**
 * Adds the 'expanded' class to the PAM header after a delay to trigger the animation.
 * 
 * This function waits for the DOM to be fully loaded, then waits PAM_HEADER_EXPAND_DELAY_MS
 * before adding the 'expanded' class to the element with the 'pam-header' class. This triggers
 * the CSS animation that expands the header text.
 */
window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        var header = document.querySelector('.pam-header');
        if (header) {
            header.classList.add('expanded');
        }
    }, PAM_HEADER_EXPAND_DELAY_MS);
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

// Show modal and update select2 with CEIDs from cookie
function showEquipmentModal() {
    document.getElementById('equipment-modal').style.display = 'flex';
    setTimeout(() => {
        // Get selected CEIDs from cookie
        let selected = getCookie(CEID_COOKIE);
        let selectedArr = [];
        if (selected) {
            try { selectedArr = JSON.parse(selected); } catch { }
        }
        $('#ceid-multiselect').val(selectedArr).trigger('change');
        $('#ceid-multiselect').select2('open');
    }, 100);
}

// Hide modal and update cookie with current select2 values
function hideEquipmentModal() {
    const selected = $('#ceid-multiselect').val() || [];
    setCookie(CEID_COOKIE, JSON.stringify(selected));
    checkAndQuery()
    document.getElementById('equipment-modal').style.display = 'none';
    $('#ceid-multiselect').select2('close');
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

function pamTable(entity) {
    // Create the main table element
    let parentTable, SPCdata, testNames, sections, SPCbody;
    // Example dataset for SPC (Statistical Process Control) data
    const TEMPDATASETS = {
        SPC: [{ "RANK": "1", "TEST_NAME": "5053ESTRNBPST", "SPC_OPERATION": "8136", "ROUTE": "WN74.077S", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-04-02 02:38:44", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "TFK706", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.THICKNESS.5053.MON", "DATA_COLLECT_DATE": "2025-04-02 02:38:50", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "", "PARAMETER_CLASS": "THICKNESS", "MEASUREMENT_SET_NAME": "EST.THICK_DYN.5053.DER", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "0.16455126136311", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "SIGMA", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNBER;METRO_PLATFORM=TFK_KCD", "SPC_CHART_SUBSET": "ALL MEASUREMENTS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "THICKNESS", "CHART_TEST_NAME": "5053ESTRNBPST", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";METRO_PLATFORM=TFK_KCD;MODULE_MONITOR=RNBER;PARAMETER_NAME=THICKNESS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "0.6", "CHART_PARAMETER": ";METRO_PLATFORM=TFK_KCD;MM=RNBER;PN=THICKNESS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "0.2166707", "CENTERLINE": "0.1792473", "LO_CONTROL_LMT": "0", "ZONE": "-1" }, { "RANK": "1", "TEST_NAME": "5053ESTRNBPST", "SPC_OPERATION": "8136", "ROUTE": "WN74.077S", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-04-02 02:38:44", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "TFK706", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.THICKNESS.5053.MON", "DATA_COLLECT_DATE": "2025-04-02 02:38:50", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "", "PARAMETER_CLASS": "THICKNESS", "MEASUREMENT_SET_NAME": "EST.THICK_DYN.5053.DER", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "2.27766190476191", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "X-BAR", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNBER;METRO_PLATFORM=TFK_KCD", "SPC_CHART_SUBSET": "ALL MEASUREMENTS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "THICKNESS", "CHART_TEST_NAME": "5053ESTRNBPST", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";METRO_PLATFORM=TFK_KCD;MODULE_MONITOR=RNBER;PARAMETER_NAME=THICKNESS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "1.8", "CHART_UPPER_LIMIT": "2.8", "CHART_PARAMETER": ";METRO_PLATFORM=TFK_KCD;MM=RNBER;PN=THICKNESS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "2.4591373", "CENTERLINE": "2.30623373", "LO_CONTROL_LMT": "2.153333573", "ZONE": "-1" }, { "RANK": "1", "TEST_NAME": "5053ESTRNBSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-06-02 14:41:08", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL736", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-06-02 14:41:09", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "3", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNB", "SPC_CHART_SUBSET": "PARTICLE_SIZE=TOTAL_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTRNBSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=RNB;PARTICLE_SIZE=TOTAL_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "16", "CHART_PARAMETER": ";MM=RNB;PS=TOTAL_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "5", "CENTERLINE": "2", "LO_CONTROL_LMT": "0", "ZONE": "1" }, { "RANK": "1", "TEST_NAME": "5053ESTRNBSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-06-02 14:41:08", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL736", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-06-02 14:41:09", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "2", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNB", "SPC_CHART_SUBSET": "PARTICLE_SIZE=LARGE_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTRNBSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=RNB;PARTICLE_SIZE=LARGE_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "7", "CHART_PARAMETER": ";MM=RNB;PS=LARGE_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "2.1", "CENTERLINE": "0.14", "LO_CONTROL_LMT": "0", "ZONE": "3" }, { "RANK": "2", "TEST_NAME": "5053ESTRNBSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-17 11:21:13", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL736", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-17 11:21:15", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "0", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNB", "SPC_CHART_SUBSET": "PARTICLE_SIZE=LARGE_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTRNBSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=RNB;PARTICLE_SIZE=LARGE_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "7", "CHART_PARAMETER": ";MM=RNB;PS=LARGE_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "2.1", "CENTERLINE": "0.14", "LO_CONTROL_LMT": "0", "ZONE": "-3" }, { "RANK": "2", "TEST_NAME": "5053ESTRNBSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-17 11:21:13", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL736", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-17 11:21:15", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "0", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNB", "SPC_CHART_SUBSET": "PARTICLE_SIZE=TOTAL_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTRNBSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=RNB;PARTICLE_SIZE=TOTAL_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "16", "CHART_PARAMETER": ";MM=RNB;PS=TOTAL_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "5", "CENTERLINE": "2", "LO_CONTROL_LMT": "0", "ZONE": "-3" }, { "RANK": "3", "TEST_NAME": "5053ESTRNBSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-16 15:46:23", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-16 15:46:25", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "0", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNB", "SPC_CHART_SUBSET": "PARTICLE_SIZE=LARGE_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTRNBSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=RNB;PARTICLE_SIZE=LARGE_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "7", "CHART_PARAMETER": ";MM=RNB;PS=LARGE_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "2.1", "CENTERLINE": "0.14", "LO_CONTROL_LMT": "0", "ZONE": "-3" }, { "RANK": "3", "TEST_NAME": "5053ESTRNBSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-16 15:46:23", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-16 15:46:25", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "1", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=RNB", "SPC_CHART_SUBSET": "PARTICLE_SIZE=TOTAL_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTRNBSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=RNB;PARTICLE_SIZE=TOTAL_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "24", "CHART_PARAMETER": ";MM=SPM;PS=TOTAL_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "7.1", "CENTERLINE": "3", "LO_CONTROL_LMT": "0", "ZONE": "-2" }, { "RANK": "1", "TEST_NAME": "5053ESTSPMSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-31 12:21:43", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-31 12:21:45", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "1", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=SPM", "SPC_CHART_SUBSET": "PARTICLE_SIZE=TOTAL_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTSPMSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=SPM;PARTICLE_SIZE=TOTAL_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "24", "CHART_PARAMETER": ";MM=SPM;PS=TOTAL_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "7.1", "CENTERLINE": "3", "LO_CONTROL_LMT": "0", "ZONE": "-2" }, { "RANK": "1", "TEST_NAME": "5053ESTSPMSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-31 12:21:43", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-31 12:21:45", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "1", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=SPM", "SPC_CHART_SUBSET": "PARTICLE_SIZE=LARGE_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTSPMSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=SPM;PARTICLE_SIZE=LARGE_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "7", "CHART_PARAMETER": ";MM=SPM;PS=LARGE_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "2.1", "CENTERLINE": "0.14", "LO_CONTROL_LMT": "0", "ZONE": "2" }, { "RANK": "2", "TEST_NAME": "5053ESTSPMSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-16 16:12:59", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-16 16:13:01", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "0", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=SPM", "SPC_CHART_SUBSET": "PARTICLE_SIZE=LARGE_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTSPMSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=SPM;PARTICLE_SIZE=LARGE_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "7", "CHART_PARAMETER": ";MM=SPM;PS=LARGE_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "2.1", "CENTERLINE": "0.14", "LO_CONTROL_LMT": "0", "ZONE": "-3" }, { "RANK": "2", "TEST_NAME": "5053ESTSPMSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-16 16:12:59", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-16 16:13:01", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "N", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "0", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "Y", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=SPM", "SPC_CHART_SUBSET": "PARTICLE_SIZE=TOTAL_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTSPMSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=SPM;PARTICLE_SIZE=TOTAL_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "24", "CHART_PARAMETER": ";MM=SPM;PS=TOTAL_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "7.1", "CENTERLINE": "3", "LO_CONTROL_LMT": "0", "ZONE": "-3" }, { "RANK": "3", "TEST_NAME": "5053ESTSPMSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-16 10:56:08", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-16 10:56:10", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "Y", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "4", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "N", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "> UCL", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=SPM", "SPC_CHART_SUBSET": "PARTICLE_SIZE=LARGE_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTSPMSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=SPM;PARTICLE_SIZE=LARGE_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "7", "CHART_PARAMETER": ";MM=SPM;PS=LARGE_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "2.1", "CENTERLINE": "0.14", "LO_CONTROL_LMT": "0", "ZONE": "4" }, { "RANK": "3", "TEST_NAME": "5053ESTSPMSPS", "SPC_OPERATION": "248126", "ROUTE": "WN53.022", "ENTITY": "EST327_SPIN1", "ACTION_DATE": "2025-05-16 10:56:08", "CEID": "ESTwa", "ANALYTICAL_ENTITY": "UDL779", "ENTITY_SITE": "F32", "ENTITY_TYPE": "DNS SPIN", "MONITOR_SET_NAME": "EST.SURFSCAN.5053.MON", "DATA_COLLECT_DATE": "2025-05-16 10:56:10", "AREA": "Etch FE Wet", "MODULE": "EST", "MONITOR_PROCESS": "5053", "MONITOR_TYPE": "TOOL MONITOR", "MON_SET_STATUS": "V", "PARAMETER_HEADER": "TOOL_DATA;PARTICLE_SIZE", "PARAMETER_CLASS": "DEFECT_PARTICLE", "MEASUREMENT_SET_NAME": "EST.DYN_YAS.5053", "VIOLATION_FLAG": "Y", "MON_SET_LATEST_FLAG": "Y", "MEAS_SET_STANDARD_FLAG": "Y", "MEAS_SET_STATUS": "V", "MEAS_SET_VALID_FLAG": "V", "CHART_VALUE": "21", "PROCESS_CHAMBER": "EST327_SPIN1", "INCONTROL_FLAG": "N", "INDISPOSITION_FLAG": "Y", "CHART_PT_LATEST_FLAG": "Y", "RESET_FLAG": "N", "SPECIAL_CAUSE_FLAG": "N", "VIOLATED_RULE_NOTATION": "> UCL", "CORRECTED_FLAG": "N", "CHART_STANDARD_FLAG": "Y", "CHART_PT_VALID_FLAG": "Y", "CHART_PT_STATUS": "V", "CHART_TYPE": "MAX", "SPC_CHART_CATEGORY": "PROCESS_CHAMBER=EST327_SPIN1;MODULE_MONITOR=SPM", "SPC_CHART_SUBSET": "PARTICLE_SIZE=TOTAL_ADDERS", "CHART_MONITOR_PROCESS": "5053", "CHART_MONITOR_TYPE": "TOOL MONITOR", "CHART_PARAMETER_CLASS": "DEFECT_PARTICLE", "CHART_TEST_NAME": "5053ESTSPMSPS", "ALL_CHART_FLAG_1": "", "CHART_ATTRIBUTES": ";MODULE_MONITOR=SPM;PARTICLE_SIZE=TOTAL_ADDERS;PROCESS_CHAMBER=EST327_SPIN1;", "CHART_LOWER_LIMIT": "0", "CHART_UPPER_LIMIT": "24", "CHART_PARAMETER": ";MM=SPM;PS=TOTAL_ADDERS;", "CHART_ACTIVE_FLAG": "Y", "UP_CONTROL_LMT": "7.1", "CENTERLINE": "3", "LO_CONTROL_LMT": "0", "ZONE": "4" }],
        WORKORDERS: [{ "Id": "9327019a-6547-4856-86ed-ad9a84e0472e", "CURRENT_SITE": "F32", "ENTITY": "EST327", "CEID": "ESTwa", "CLUSTER_NAME": "ESTWA", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8468785", "CREATEDON": "1/17/2025 4:43:37 PM", "CREATEDONSHIFT": "7", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "SP 8 requal WO", "LASTUPDATEDON": "6/3/2025 4:33:40 AM", "TOOLID": "6601", "TOOLNAME": "EST327", "CREATEDBYUSERID": "13425", "CREATEDBYUSERNAME": "acruz1", "LASTUPDATEDBYUSERID": "826825", "LASTUPDATEDUSERNAME": "tbarnes", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "", "ASSIGNEDTOUSERNAME": "", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "", "REQUESTEDBYUSERNAME": "", "APPROVALTYPEID": "", "APPROVALTYPE": "", "APPROVALTYPECATEGORY": "", "APPROVALTYPEDELETED": "", "REQUESTSTATUSID": "", "REQUESTSTATUS": "", "FACTORYWIDEIMPACT": "", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "4.72236648286965E+21", "LOAD_DATE": "6/3/2025 4:40:08 AM", "PRIORITYID": "5", "PRIORITYRANK": "119540000" }, { "Id": "8328eae3-c569-4cb4-add3-c4dae98b573b", "CURRENT_SITE": "F32", "ENTITY": "EST327", "CEID": "ESTwa", "CLUSTER_NAME": "ESTWA", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8625518", "CREATEDON": "6/13/2025 9:21:20 AM", "CREATEDONSHIFT": "7", "LASTUPDATEDONSHIFT": "7", "DESCRIPTION": "ABM  to re-balance Lateral EXSC-QwW which drifted from the setpoint of -3 to2.73 . Lateral EXSC-QwW damper will be adjusted to return the lateral to set-point. Lateral pressure will be adjusted by 0.27 WC which is approximately a 9% pressure change. The lateral and submain EOL pressure will be live monitored during the work. ", "LASTUPDATEDON": "6/13/2025 9:21:26 AM", "TOOLID": "6601", "TOOLNAME": "EST327", "CREATEDBYUSERID": "1008375", "CREATEDBYUSERNAME": "storre9x", "LASTUPDATEDBYUSERID": "1008375", "LASTUPDATEDUSERNAME": "storre9x", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "1008375", "ASSIGNEDTOUSERNAME": "storre9x", "STARTDATE": "6/19/2025 6:00:00 AM", "DUEDATE": "6/19/2025 7:00:00 AM", "ETU": "6/19/2025 7:00:00 AM", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "1008375", "REQUESTEDBYUSERNAME": "storre9x", "APPROVALTYPEID": "1", "APPROVALTYPE": "Reservation", "APPROVALTYPECATEGORY": "Reservation", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "1", "FACILITYNAME": "F32", "FACILITYDELETED": "0", "WIINGSFACTORYNAME": "AZFSM", "SECURITY_CODE": "4.72236648286965E+21", "LOAD_DATE": "6/13/2025 9:40:12 AM", "PRIORITYID": "5", "PRIORITYRANK": "204770000" }, { "Id": "555c989d-a2fa-48c5-9c60-79e4eb8acc25", "CURRENT_SITE": "F32", "ENTITY": "EST327_SPIN2", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8582648", "CREATEDON": "5/7/2025 3:31:41 PM", "CREATEDONSHIFT": "7", "LASTUPDATEDONSHIFT": "5", "DESCRIPTION": "This wo is to t/s lfc2 lower limit error", "LASTUPDATEDON": "5/20/2025 9:05:27 AM", "TOOLID": "9917", "TOOLNAME": "EST327_SPIN2", "CREATEDBYUSERID": "799798", "CREATEDBYUSERNAME": "sbaraka", "LASTUPDATEDBYUSERID": "6902", "LASTUPDATEDUSERNAME": "blkane", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "returned 5/20", "ASSIGNEDTOID": "", "ASSIGNEDTOUSERNAME": "", "STARTDATE": "5/7/2025 12:00:00 AM", "DUEDATE": "", "ETU": "5/20/2025 12:00:00 AM", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "", "REQUESTEDBYUSERNAME": "", "APPROVALTYPEID": "", "APPROVALTYPE": "", "APPROVALTYPECATEGORY": "", "APPROVALTYPEDELETED": "", "REQUESTSTATUSID": "", "REQUESTSTATUS": "", "FACTORYWIDEIMPACT": "", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "4.72236648286965E+21", "LOAD_DATE": "5/20/2025 9:25:08 AM", "PRIORITYID": "5", "PRIORITYRANK": "181400000" }, { "Id": "d05fb8b1-65ce-43ad-9fe4-15af0bb9f5b6", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8271419", "CREATEDON": "7/11/2024 1:14:04 PM", "CREATEDONSHIFT": "7", "LASTUPDATEDONSHIFT": "7", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST350_HOTDIW", "LASTUPDATEDON": "4/8/2025 3:48:08 PM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "349877", "CREATEDBYUSERNAME": "arnuanez", "LASTUPDATEDBYUSERID": "349877", "LASTUPDATEDUSERNAME": "arnuanez", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "349877", "ASSIGNEDTOUSERNAME": "arnuanez", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "349877", "REQUESTEDBYUSERNAME": "arnuanez", "APPROVALTYPEID": "3", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Post-MRCL", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "4/8/2025 3:55:13 PM", "PRIORITYID": "5", "PRIORITYRANK": "86740000" }, { "Id": "7f7d89ed-9de9-4e55-a481-6b312b949a61", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8271420", "CREATEDON": "7/11/2024 1:14:06 PM", "CREATEDONSHIFT": "7", "LASTUPDATEDONSHIFT": "7", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST350_HOTDIW", "LASTUPDATEDON": "4/8/2025 3:48:08 PM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "349877", "CREATEDBYUSERNAME": "arnuanez", "LASTUPDATEDBYUSERID": "349877", "LASTUPDATEDUSERNAME": "arnuanez", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "349877", "ASSIGNEDTOUSERNAME": "arnuanez", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "349877", "REQUESTEDBYUSERNAME": "arnuanez", "APPROVALTYPEID": "3", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Post-MRCL", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "4/8/2025 3:55:13 PM", "PRIORITYID": "5", "PRIORITYRANK": "86750000" }, { "Id": "ab1c80ce-80a1-4d18-b691-46209b1437a2", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8271421", "CREATEDON": "7/11/2024 1:14:08 PM", "CREATEDONSHIFT": "7", "LASTUPDATEDONSHIFT": "7", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST350_HOTDIW", "LASTUPDATEDON": "4/8/2025 3:48:08 PM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "349877", "CREATEDBYUSERNAME": "arnuanez", "LASTUPDATEDBYUSERID": "349877", "LASTUPDATEDUSERNAME": "arnuanez", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "349877", "ASSIGNEDTOUSERNAME": "arnuanez", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "349877", "REQUESTEDBYUSERNAME": "arnuanez", "APPROVALTYPEID": "3", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Post-MRCL", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "4/8/2025 3:55:13 PM", "PRIORITYID": "5", "PRIORITYRANK": "86760000" }, { "Id": "e8ffc7e3-66c3-4126-bf2c-03aa716f28b4", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8595579", "CREATEDON": "5/19/2025 3:15:10 AM", "CREATEDONSHIFT": "4", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "manual valve cannibalization for EST", "LASTUPDATEDON": "5/19/2025 3:25:50 AM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "280597", "CREATEDBYUSERNAME": "nenrique", "LASTUPDATEDBYUSERID": "280597", "LASTUPDATEDUSERNAME": "nenrique", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "", "ASSIGNEDTOUSERNAME": "", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "", "REQUESTEDBYUSERNAME": "", "APPROVALTYPEID": "", "APPROVALTYPE": "", "APPROVALTYPECATEGORY": "", "APPROVALTYPEDELETED": "", "REQUESTSTATUSID": "", "REQUESTSTATUS": "", "FACTORYWIDEIMPACT": "", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "5/19/2025 3:40:09 AM", "PRIORITYID": "5", "PRIORITYRANK": "199210000" }, { "Id": "280d62d2-c68c-4116-9d64-368ef7ad10e1", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8595581", "CREATEDON": "5/19/2025 3:23:44 AM", "CREATEDONSHIFT": "4", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST709_HOTDIW", "LASTUPDATEDON": "5/19/2025 3:23:51 AM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "280597", "CREATEDBYUSERNAME": "nenrique", "LASTUPDATEDBYUSERID": "280597", "LASTUPDATEDUSERNAME": "nenrique", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "280597", "ASSIGNEDTOUSERNAME": "nenrique", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "280597", "REQUESTEDBYUSERNAME": "nenrique", "APPROVALTYPEID": "4", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Warehouse / Decon", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "5/19/2025 3:40:09 AM", "PRIORITYID": "5", "PRIORITYRANK": "199230000" }, { "Id": "1cffe1a5-9084-4c70-b9db-07b4465ca3ad", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8595582", "CREATEDON": "5/19/2025 3:23:48 AM", "CREATEDONSHIFT": "4", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST709_HOTDIW", "LASTUPDATEDON": "5/19/2025 3:24:00 AM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "280597", "CREATEDBYUSERNAME": "nenrique", "LASTUPDATEDBYUSERID": "280597", "LASTUPDATEDUSERNAME": "nenrique", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "280597", "ASSIGNEDTOUSERNAME": "nenrique", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "280597", "REQUESTEDBYUSERNAME": "nenrique", "APPROVALTYPEID": "4", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Warehouse / Decon", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "5/19/2025 3:40:09 AM", "PRIORITYID": "5", "PRIORITYRANK": "199240000" }, { "Id": "f405fe9b-b2a1-4182-9af7-213a4c5f7c8e", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8595583", "CREATEDON": "5/19/2025 3:23:57 AM", "CREATEDONSHIFT": "4", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST709_HOTDIW", "LASTUPDATEDON": "5/19/2025 3:24:19 AM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "280597", "CREATEDBYUSERNAME": "nenrique", "LASTUPDATEDBYUSERID": "280597", "LASTUPDATEDUSERNAME": "nenrique", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "280597", "ASSIGNEDTOUSERNAME": "nenrique", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "280597", "REQUESTEDBYUSERNAME": "nenrique", "APPROVALTYPEID": "4", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Warehouse / Decon", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "5/19/2025 3:40:09 AM", "PRIORITYID": "5", "PRIORITYRANK": "199250000" }, { "Id": "fe4d62d2-04ab-4bb7-8507-e28ac73937ad", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8595585", "CREATEDON": "5/19/2025 3:23:58 AM", "CREATEDONSHIFT": "4", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST709_HOTDIW", "LASTUPDATEDON": "5/19/2025 3:24:10 AM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "280597", "CREATEDBYUSERNAME": "nenrique", "LASTUPDATEDBYUSERID": "280597", "LASTUPDATEDUSERNAME": "nenrique", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "280597", "ASSIGNEDTOUSERNAME": "nenrique", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "280597", "REQUESTEDBYUSERNAME": "nenrique", "APPROVALTYPEID": "4", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Warehouse / Decon", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "5/19/2025 3:40:09 AM", "PRIORITYID": "5", "PRIORITYRANK": "199250000" }, { "Id": "7f4dcf34-7c8d-4556-adb7-ce17102bf0d9", "CURRENT_SITE": "F32", "ENTITY": "EST354_HOTDIW", "CEID": "ESTwa", "CLUSTER_NAME": " ", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8595589", "CREATEDON": "5/19/2025 3:24:21 AM", "CREATEDONSHIFT": "4", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "Cannibalizing parts from donor tool EST354_HOTDIW for receiving tool EST709_HOTDIW", "LASTUPDATEDON": "5/19/2025 3:24:32 AM", "TOOLID": "13017", "TOOLNAME": "EST354_HOTDIW", "CREATEDBYUSERID": "280597", "CREATEDBYUSERNAME": "nenrique", "LASTUPDATEDBYUSERID": "280597", "LASTUPDATEDUSERNAME": "nenrique", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "280597", "ASSIGNEDTOUSERNAME": "nenrique", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "280597", "REQUESTEDBYUSERNAME": "nenrique", "APPROVALTYPEID": "4", "APPROVALTYPE": "Cannibalization", "APPROVALTYPECATEGORY": "Warehouse / Decon", "APPROVALTYPEDELETED": "0", "REQUESTSTATUSID": "1", "REQUESTSTATUS": "Pending", "FACTORYWIDEIMPACT": "0", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "2594", "LOAD_DATE": "5/19/2025 3:40:09 AM", "PRIORITYID": "5", "PRIORITYRANK": "199260000" }, { "Id": "9a638bbe-798e-4590-8208-f0a9d4e44258", "CURRENT_SITE": "F42", "ENTITY": "EST709", "CEID": "ESTwc", "CLUSTER_NAME": "ESTWC", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8571051", "CREATEDON": "4/27/2025 5:17:47 PM", "CREATEDONSHIFT": "5", "LASTUPDATEDONSHIFT": "5", "DESCRIPTION": "CC11 Heater Controler Error<br>Alarm 015<br>need TS", "LASTUPDATEDON": "4/27/2025 5:18:04 PM", "TOOLID": "32045", "TOOLNAME": "EST709", "CREATEDBYUSERID": "298400", "CREATEDBYUSERNAME": "wdbyrd", "LASTUPDATEDBYUSERID": "298400", "LASTUPDATEDUSERNAME": "wdbyrd", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "", "ASSIGNEDTOUSERNAME": "", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "", "REQUESTEDBYUSERNAME": "", "APPROVALTYPEID": "", "APPROVALTYPE": "", "APPROVALTYPECATEGORY": "", "APPROVALTYPEDELETED": "", "REQUESTSTATUSID": "", "REQUESTSTATUS": "", "FACTORYWIDEIMPACT": "", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "8", "LOAD_DATE": "4/27/2025 5:25:09 PM", "PRIORITYID": "5", "PRIORITYRANK": "198550000" }, { "Id": "be8f4262-9cf2-4874-bb8f-41c728252e79", "CURRENT_SITE": "F42", "ENTITY": "EST709_HOTDIW", "CEID": "ESTwc", "CLUSTER_NAME": "", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8594942", "CREATEDON": "5/18/2025 1:25:39 PM", "CREATEDONSHIFT": "5", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "Hot DIW CC leak from valve on HDIW Supply inside CC.", "LASTUPDATEDON": "5/19/2025 3:28:43 AM", "TOOLID": "32049", "TOOLNAME": "EST709_HOTDIW", "CREATEDBYUSERID": "321298", "CREATEDBYUSERNAME": "esglando", "LASTUPDATEDBYUSERID": "280597", "LASTUPDATEDUSERNAME": "nenrique", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "", "ASSIGNEDTOUSERNAME": "", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "", "REQUESTEDBYUSERNAME": "", "APPROVALTYPEID": "", "APPROVALTYPE": "", "APPROVALTYPECATEGORY": "", "APPROVALTYPEDELETED": "", "REQUESTSTATUSID": "", "REQUESTSTATUS": "", "FACTORYWIDEIMPACT": "", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "10", "LOAD_DATE": "5/19/2025 3:40:09 AM", "PRIORITYID": "5", "PRIORITYRANK": "197840000" }, { "Id": "575afb9e-6bdd-4bd8-a515-9b0f63d9501e", "CURRENT_SITE": "F42", "ENTITY": "EST710", "CEID": "ESTwc", "CLUSTER_NAME": "ESTWC", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8613882", "CREATEDON": "6/3/2025 6:38:54 PM", "CREATEDONSHIFT": "4", "LASTUPDATEDONSHIFT": "4", "DESCRIPTION": "Execute checklist AcidSpinEBiWeeklyINVPM", "LASTUPDATEDON": "6/3/2025 6:54:00 PM", "TOOLID": "33700", "TOOLNAME": "EST710", "CREATEDBYUSERID": "870483", "CREATEDBYUSERNAME": "heimani", "LASTUPDATEDBYUSERID": "870483", "LASTUPDATEDUSERNAME": "heimani", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "", "ASSIGNEDTOUSERNAME": "", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "", "REQUESTEDBYUSERNAME": "", "APPROVALTYPEID": "", "APPROVALTYPE": "", "APPROVALTYPECATEGORY": "", "APPROVALTYPEDELETED": "", "REQUESTSTATUSID": "", "REQUESTSTATUS": "", "FACTORYWIDEIMPACT": "", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "8", "LOAD_DATE": "6/3/2025 7:10:10 PM", "PRIORITYID": "5", "PRIORITYRANK": "205790000" }, { "Id": "2b414336-6754-4adb-a8ef-90e44ae91bcb", "CURRENT_SITE": "F42", "ENTITY": "EST710", "CEID": "ESTwc", "CLUSTER_NAME": "ESTWC", "FUNCTIONAL_AREA": "WetEtch", "WORKORDERID": "8615611", "CREATEDON": "6/5/2025 3:43:01 AM", "CREATEDONSHIFT": "6", "LASTUPDATEDONSHIFT": "6", "DESCRIPTION": "Execute checklist AcidSpinERMIMMO74ADHOC", "LASTUPDATEDON": "6/5/2025 3:49:01 AM", "TOOLID": "33700", "TOOLNAME": "EST710", "CREATEDBYUSERID": "870483", "CREATEDBYUSERNAME": "heimani", "LASTUPDATEDBYUSERID": "870483", "LASTUPDATEDUSERNAME": "heimani", "STATUSID": "1", "STATUSOPTIONNAME": "Open", "STATUSOPTIONDELETED": "0", "STATUSOPTIONSTATUSORDER": "1", "ROOTCAUSE": "", "ASSIGNEDTOID": "", "ASSIGNEDTOUSERNAME": "", "STARTDATE": "", "DUEDATE": "", "ETU": "", "AUTOCLOSEFYI": "0", "AUTOCLOSEFYIUSERID": "", "AUTOCLOSEFYIUSERNAME": "", "REQUESTBYUSERID": "", "REQUESTEDBYUSERNAME": "", "APPROVALTYPEID": "", "APPROVALTYPE": "", "APPROVALTYPECATEGORY": "", "APPROVALTYPEDELETED": "", "REQUESTSTATUSID": "", "REQUESTSTATUS": "", "FACTORYWIDEIMPACT": "", "ARCHIVABLE": "1", "HASWIINGSPART": "", "FACILITYID": "", "FACILITYNAME": "", "FACILITYDELETED": "", "WIINGSFACTORYNAME": "", "SECURITY_CODE": "8", "LOAD_DATE": "6/5/2025 3:55:10 AM", "PRIORITYID": "5", "PRIORITYRANK": "200310000" }]
    }

    // create table
    table = create('table', {}, { className: 'subtable' })

    // add SPC section
    let spcData = dataEquals(DATASETS.SPC, 'ENTITY', entity)
    buildSPCSection(spcData)

    // add Workorder section
    let workOrderData = dataEquals(DATASETS.WORK_ORDERS, 'TOOLNAME', entity)
    if (workOrderData.length > 0) {
        tr = create('tr')
        td = create('td')
        parentTable.appendChild(tr)
        tr.appendChild(td)
        td.appendChild(buildWorkOrderSection(workOrderData))
    }

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
                    th = create('th', { colspan: "13" }, { textContent: 'SPC' })
                    tr.appendChild(th)
                }

                // static headers part 1
                tr = create('tr')
                thead.appendChild(tr)

                tr.append(
                    create('th', { rowspan: '3' }, { textContent: 'Test Name' }),
                    create('th', { rowspan: '3' }, { textContent: 'Monitor Set Name' }),
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


                // all test names and monitor set names will be the same for this block of data
                tnLabel = tempData[0].TEST_NAME
                msnLabel = tempData[0].MONITOR_SET_NAME

                // make the body and append it to the spc body array
                tbody = create('tbody')
                SPCbody.push(tbody)

                bodyRows = {}
                for (let i = tempData.length - 1; i >= 0; i--) {

                    let row = tempData[i]
                    let key = row.CHART_TYPE + row.SPC_CHART_SUBSET
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
                            create('td', {}, { textContent: row.CHART_TYPE }),
                            create('td', {}, { textContent: row.SPC_CHART_SUBSET }),
                        )
                    }

                    // debugging
                    console.log(`cv: ${row.CHART_VALUE}, cll: ${row.CHART_LOWER_LIMIT}, cul: ${row.CHART_UPPER_LIMIT}, ucl: ${row.UP_CONTROL_LMT}, lcl: ${row.LO_CONTROL_LMT}, cl: ${row.CENTERLINE}`)

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

        columns.forEach(col => {
            th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
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


    return table

}


// Attach modal open to Equipment Groups nav link
function initSelect2() {
    // Initialize select2 with dropdownParent set to modal for correct stacking
    $('#ceid-multiselect').select2({
        placeholder: "Select CEIDs",
        width: 'resolve',
        dropdownParent: $('#equipment-modal')
    });
    populateCEIDMultiselect(CEID_LIST);

    // Attach to Equipment Groups link in side nav
    const eqLink = Array.from(document.querySelectorAll('.side-nav a')).find(a => a.textContent.trim() === 'Equipment Groups');
    if (eqLink) {
        eqLink.addEventListener('click', function (e) {
            e.preventDefault();
            showEquipmentModal();
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
        let ceidList = JSON.parse(getCookie(CEID_COOKIE))
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
                map.DATA = data.value
                map.LOADED = true
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
        parseData()
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
    initSelect2()
    initEqModal()

    // Step 2
    checkAndQuery() ? monitorStatus() : console.log('Failed check and query')

    // Data parsing and table building happen after checks pass. See parseData() below

}

function parseData() {
    prompt('Data is loaded. The page will be built when the code reaches this point. Functions beyond this point are not built and/or wired yet.')
}

