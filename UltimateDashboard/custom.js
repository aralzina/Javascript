import Gauge from 'https://bernii.github.io/gauge.js/dist/gauge.min.js'

var CUSTOM_DATA = {
  URL: {
    BASE_URL: '',
    COS_DASHBOARD: {
      CEID: {
        1270: '',
        1274: '',
        5053: ''
      }
    }
  }
}

// Gauge.js functions
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
    radiusScale: 0.5, // Relative radius
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

function gaugeIt (elementId, optArgs, gaugeArgs) {
  let animationSpeed = 8
  if (typeof gaugeArgs['animationSpeed'] !== 'undefined') {
    animationSpeed = gaugeArgs['animationSpeed']
  }

  let opts = default_gauge_opts(optArgs)
  var target = document.getElementById(elementId) // your canvas element
  var gauge = new Gauge(target).setOptions(opts) // create sexy gauge!
  gauge.maxValue = gaugeArgs.maxValue // set max gauge value
  gauge.setMinValue(gaugeArgs.minValue) // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = animationSpeed // set animation speed (32 is default value)
  gauge.set(gaugeArgs.actualValue) // set actual value
}

function AvailabilityGauge (data) {
  let up, down, total, pct, goal

  goal = data.PORAVAIL
  up = data.UP
  down = data.DOWN
  total = up + down

  let optArgs = {
    percentColors: [
      [0.0, '#ff0000'],
      [goal - 0.1, '#ff0000'],
      [goal, '#32CD32'],
      [1.0, '#32CD32']
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

  pct = ((up / total) * 100).toFixed(1).toString() + '%'
  goal = (goal * 100).toFixed(1).toString() + '%'
  document.getElementById(
    'target-str'
  ).textContent = `${up}/${down} (${pct} vs Goal: ${goal})`
  document.getElementById('target').setAttribute('title', pct)
  let elementId = 'target'
  gaugeIt(elementId, optArgs, gaugeArgs)
}

function PaceGauge (data) {
  let csPace,
    drumBeat,
    paceScore,
    inventoryGoal,
    currentInventory,
    inventoryScore,
    barColor,
    titleText

  csPace = data['CS_PACE']
  drumBeat = data['DRUM_BEAT']
  paceScore = csPace / drumBeat

  currentInventory = data['INV_PROD']
  inventoryGoal = data['INV_GOAL']
  inventoryScore = currentInventory / inventoryGoal

  barColor =
    inventoryScore <= 1 && paceScore >= 1
      ? '#32cd32'
      : inventoryScore > 1 && paceScore < 1
      ? '#ff0000'
      : '#b59700'

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
                labels: [goal * 100], // Print labels at these values
                color: '#000000', // Optional: Label text color
                fractionDigits: 0 // Optional: Numerical precision. 0=round off.
              },*/
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
    maxValue: drumBeat,
    minValue: 0,
    actualValue: csPace
  }

  titleText =
    inventoryScore <= 1 && paceScore >= 1
      ? 'Inv <= Goal\nCS Pace >= Drum Beat\nKeep it up!'
      : inventoryScore > 1 && paceScore < 1
      ? 'Inv > Goal\nCS Pace < Drum Beat'
      : inventoryScore <= 1
      ? 'Inv <= Goal\nCS Pace < Drum Beat'
      : 'Inv > Goal\nCS Pace >= Drum Beat'

  paceScore = (paceScore * 100).toFixed(1).toString() + '%'
  inventoryScore = (inventoryScore * 100).toFixed(1).toString() + '%'

  console.log(paceScore)
  document.getElementById(
    'target-str'
  ).textContent = `CS Pace: ${paceScore} of Drum Beat.    Inv: ${inventoryScore} of goal`
  document.getElementById('target').setAttribute('title', titleText)
  let elementId = 'target'
  gaugeIt(elementId, optArgs, gaugeArgs)
}
