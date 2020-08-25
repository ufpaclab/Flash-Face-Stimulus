// Base Globals
const EXPECTED_TRIALS = 5
const FACE_NAMES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg']
const FIXATION_NAME = 'fixationSameSize.png'
const IMAGE_DIRECTORY = 'images/'

// Derived Globals
const TRIALS = Math.min(EXPECTED_TRIALS, FACE_NAMES.length/2);
const FACES = (() => {
    let images = []
    FACE_NAMES.forEach(image => {images.push(`${IMAGE_DIRECTORY}/${image}`)})
    return images
})()
const FIXATION = `${IMAGE_DIRECTORY}/${FIXATION_NAME}`

// Page Definitions
const WelcomePage = {
    type: 'html-keyboard-response',
    stimulus:`
    <p>Welcome to the experiment.</p>
    <p>Press any key to begin.</p>
    `
}

const InstructionsAndEnterFullscreenPage = {
    type: 'fullscreen',
    message: `
    <h1>Instructions</h1>
    <p>Stare at the fixation cross and use your peripheral vision to observe the faces on the left and right.</p>
    `
}

const ExitFullscreenPage = {
    type: 'fullscreen',
    fullscreen_mode: false
}

const ExperimentPage = {
    type: 'html-keyboard-response',
    trial_duration: 1000,
    choices: jsPsych.NO_KEYS,
    timeline: [
        {  
            stimulus: () => `
                <img id="leftImage" src="${jsPsych.timelineVariable('leftFace', true)}">
                <img id="fixation" src="${FIXATION}">
                <img id="rightImage" src="${jsPsych.timelineVariable('rightFace', true)}">`
        }
    ],
    timeline_variables: (() => {
        const facesRequired = TRIALS*2;
        const faces = jsPsych.randomization.sampleWithoutReplacement(FACES, facesRequired)

        var trialVariables = []
        for(var i = 0; i < faces.length; i+=2) {
            trialVariables.push({
                leftFace: faces[i],
                rightFace: faces[i+1]
            })
        }
        return trialVariables;
    })(),
}

const MeasureDistortionPage = {
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
const StartExperiment = () => {
    jsPsych.init({
        timeline: [WelcomePage, InstructionsAndEnterFullscreenPage, ExperimentPage, ExitFullscreenPage, MeasureDistortionPage],
        on_finish: () => {
            const results = JSON.parse(jsPsych.data.get().json())
            var responses = []
            results.forEach(value => {
                if (value.trial_type == 'html-slider-response') {
                    responses.push(value.response)
                }
            })
            jsPsychSheet.Insert('Responses', responses)
        }
    })
}

const PreloadImages = () => {
    var preloads = ''
    preloads += `<link rel="preload" href="${FIXATION}" as="image"></link>` 
    FACES.forEach((image) => {
        preloads += `<link rel="preload" href="${image}" as="image"></link>` 
    })
    document.write(preloads)
}