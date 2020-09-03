// Base Globals
const EXPECTED_TRIALS = 5
const FACE_NAMES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg']
const FIXATION_NAME = 'fixationSameSize.png'
const IMAGE_DIRECTORY = 'images/'
const IMAGE_DURATION = 1000

// Derived Globals
const TRIALS = Math.min(EXPECTED_TRIALS, FACE_NAMES.length/2);
const FIXATION = `${IMAGE_DIRECTORY}/${FIXATION_NAME}`

// Utility Funcitons

function ImageNamesToImages(imageNames) {
    var images = []
    imageNames.forEach(image => {images.push(`${IMAGE_DIRECTORY}/${image}`)})
    return images
}

// Page Definitions
let WelcomePage = {
    type: 'html-keyboard-response',
    stimulus:`
    <p>Welcome to the experiment.</p>
    <p>Press any key to begin.</p>
    `
}

let InstructionsAndEnterFullscreenPage = {
    type: 'fullscreen',
    message: `
    <h1>Instructions</h1>
    <p>Stare at the fixation cross and use your peripheral vision to observe the faces on the left and right.</p>
    `
}

let ExitFullscreenPage = {
    type: 'fullscreen',
    fullscreen_mode: false
}

let ExperimentPage = {
    tags: ['FlashFace'],
    type: 'html-keyboard-response',
    trial_duration: IMAGE_DURATION,
    choices: jsPsych.NO_KEYS,
    timeline: [
        {  
            stimulus: function() {
                return `
                <img id="leftImage" src="${jsPsych.timelineVariable('leftFace', true)}">
                <img id="fixation" src="${FIXATION}">
                <img id="rightImage" src="${jsPsych.timelineVariable('rightFace', true)}">`
            }
        }
    ],
    timeline_variables: function() {
        const facesRequired = TRIALS*2;
        this.faceNames = jsPsych.randomization.sampleWithoutReplacement(FACE_NAMES, facesRequired)

        var faces = ImageNamesToImages(this.faceNames)
        var trialVariables = []
        for(var i = 0; i < faces.length; i+=2) {
            trialVariables.push({
                leftFace: faces[i],
                rightFace: faces[i+1]
            })
        }
        return trialVariables;
    }(),
}

let MeasureDistortionPage = {
    tags: ['Response'],
    type: 'html-slider-response',
    start: 1,
    min: 1,
    max: 7,
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    button_label: 'Submit',
    stimulus: `
    <p>Rate the amount of distortion seen on the last set of faces</p>
    `
}

// Controller Functions
function PreloadImages() {
    var preloads = ''
    preloads += `<link rel="preload" href="${FIXATION}" as="image"></link>` 
    var faces = ImageNamesToImages(FACE_NAMES)
    faces.forEach((image) => {
        preloads += `<link rel="preload" href="${image}" as="image"></link>` 
    })
    document.write(preloads)
}

function StartExperiment() {
    jsPsych.init({
        timeline: [WelcomePage, InstructionsAndEnterFullscreenPage, ExperimentPage, ExitFullscreenPage, MeasureDistortionPage],
        on_finish: () => {
            const results = JSON.parse(jsPsych.data.get().json())

            var responses = []
            var faceNames = results.find((element => element.tags?.includes('FlashFace') ?? false)).faceNames
            results.forEach(trial => {
                if (trial.tags.includes('FlashFace')) {
                    faceNames = trial.faceNames
                }
                if (trial.tags.includes('Response')) {
                    responses.push(value.response)
                }
            })
            
            var entry = []
            entry.push(TRIALS)
            entry.push(IMAGE_DURATION)
            entry.push(FACE_NAMES.toString())
            entry.push(faceNames.toString())
            entry.push(responses.toString())
            jsPsychSheet.Insert('Responses', entry)
        }
    })
}