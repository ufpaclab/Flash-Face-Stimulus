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
                <img id="fixation" src="./fixationSameSize.png">
                <img id="rightImage" src="./${jsPsych.timelineVariable('rightFace', true)}">`
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
    stimulus_duration: 100000,
    trial_duration: 10000,
    start: 1,
    min: 1,
    max: 7,
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    button_label: 'Submit',
    stimulus: `
    <p>Rate the amount of distortion seen on the last set of faces</p>
    `
}

const FinalPage = {
    type: 'html-keyboard-response',
    choices: jsPsych.NO_KEYS,        
    stimulus: `
    You have finished the experiment! Please take this survey <a href="https://forms.gle/x9SaVYoYUVvBq6zj8">here</a>.
    `
}

jsPsych.init({
    timeline: [WelcomePage, InstructionsAndEnterFullscreenPage, ExperimentPage, ExitFullscreenPage, MeasureDistortionPage, FinalPage]
})