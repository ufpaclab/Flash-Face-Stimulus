function FlashFaceStimulus(jsSheetHandle, jsPsychHandle) {
    jsSheetHandle.CreateSession(RunExperiment)
    
    function RunExperiment(sessionID) {
        // Constants
        const EXPECTED_TRIALS = 10
        const IMAGE_NUMBER = 40 
        const IMAGE_EXTENSION = `jpg`
        const FOLDER_NAMES = [`AAF`, `AAM`, `AF`, `AM`, `LF`, `LM`, `WF`, `WM`]
        const FIRST_TRIAL = []
        const IMAGE_DURATION = 800
        const TRIALS_1 = Math.min(EXPECTED_TRIALS, FIRST_TRIAL.length/2);

        // Experiment Trials
        let WelcomeTrial = {
            type: 'html-keyboard-response',
            stimulus:`
                <p>Welcome to the experiment.</p>
                <p>Press any key to begin.</p>
            `
        }

        let CheckVisionTrial = {
            type: 'survey-multi-choice',
            questions: [{
                name: 'vision',
                prompt: 'Do you have normal or correct-to-normal vision?',
                options: ['Normal', 'Corrected-to-Normal', 'Other'],
                required: true
            }]
        }

            let ConsentFormTrial = {
                type: 'external-html',
                url: 'https://ufpaclab.github.io/Consent-Forms/Active/Consent.html',
                cont_btn: 'consent-button'
        }

        let InstructionsAndEnterFullscreenTrial = {
            type: 'fullscreen',
            message: `
                <h1>Instructions</h1>
                <p>Stare at the fixation cross and use your peripheral vision to observe the faces on the left and right.</p>
                <p>Orient yourself so that you are viewing the screen from 40-50 centimeters away (~2 feet)</p>
            `
        }

        let PresenceOfIllusionTrial = {
            type: 'html-keyboard-response',
            trial_duration: IMAGE_DURATION,
            choices: jsPsychHandle.NO_KEYS,
            timeline: [
                {  
                    stimulus: function() {
                        return `
                        <div class="flashFaceElement">
                            <img class="flashFaceElement flashFaceImage" src="${jsPsychHandle.timelineVariable('leftFace', true)}"/>
                            <p class="flashFaceElement flashFaceFixation">+</p>
                            <img class="flashFaceElement flashFaceImage" src="${jsPsychHandle.timelineVariable('rightFace', true)}"/>
                        </div>`
                    }
                }
            ],
            timeline_variables: function() {
                const facesRequired = TRIALS_1 * 2

                let images = []
                for (let i = 0; i < IMAGE_NUMBER; i++) {
                    images.push(i + '.' + IMAGE_EXTENSION)
                }

                let imageSets = []
                for (genderRace in FOLDER_NAMES){
                    imageSets.push(jsPsych.randomization.sampleWithoutReplacement(images, 20));
                }

                var faces = ImageNamesToImages(faceNames)
                var trialVariables = []
                for(var i = 0; i < faces.length; i+=2) {
                    trialVariables.push({
                        leftFace: faces[i],
                        rightFace: faces[i+1]
                    })
                }
                return [].concat(trialVariables, trialVariables, trialVariables);
            }()
        }

        let MeasureDistortionTrial = {
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

        let ExperimentTrial = {
            type: 'html-keyboard-response',
            trial_duration: IMAGE_DURATION,
            choices: jsPsychHandle.NO_KEYS,
            timeline: [
                {  
                    stimulus: function() {
                        return `
                        <div class="flashFaceElement">
                            <img class="flashFaceElement flashFaceImage" src="${jsPsychHandle.timelineVariable('leftFace', true)}"/>
                            <p class="flashFaceElement flashFaceFixation">+</p>
                            <img class="flashFaceElement flashFaceImage" src="${jsPsychHandle.timelineVariable('rightFace', true)}"/>
                        </div>`
                    }
                }
            ],
            timeline_variables: function() {
                const facesRequired = TRIALS_1*2
                var faceNames = jsPsychHandle.randomization.sampleWithoutReplacement(FACE_NAMES, facesRequired)

                var faces = ImageNamesToImages(faceNames)
                var trialVariables = []
                for(var i = 0; i < faces.length; i+=2) {
                    trialVariables.push({
                        leftFace: faces[i],
                        rightFace: faces[i+1]
                    })
                }
                return trialVariables;
            }()
        }

        let ExitFullscreenTrial = {
            type: 'fullscreen',
            fullscreen_mode: false
        }

        let MeasureDistortionTrial = {
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

        let FinalTrial = {
            type: 'instructions',
            pages: ['Thanks for particpating! Please email us at fake@emial.com.'],
            allow_keys: false
        }

        // Configure and Start Experiment
        jsPsychHandle.init({
            timeline: [WelcomeTrial, CheckVisionTrial, InstructionsAndEnterFullscreenTrial, ExperimentTrial, ExitFullscreenTrial, MeasureDistortionTrial, FinalTrial],
            preload_images: ImageNamesToImages(FACE_NAMES),
            on_trial_finish: CreateAdaptiveUpload(sessionID, jsSheetHandle.Insert)
        })

        // Utility Functions
        function CreateAdaptiveUpload(id, callback) {
            let keyLookup = {}
            let keyOrder = []
            return function(data) {
                let keys = Object.keys(data)
                for (let keyIndex in keys) {
                    let key = keys[keyIndex]
                    if (typeof keyLookup[key] === 'undefined') {
                        keyLookup[key] = true
                        keyOrder.push(key)
                    }
                }
                let paddedData = []
                for (let keyIndex in keyOrder) {
                    let key = keyOrder[keyIndex]
                    if (typeof data[key] === 'undefined') {
                        paddedData.push('')
                    }
                    else {
                        paddedData.push(data[key])
                    }
                }
                callback(id, paddedData)
            }
        }

        function ImageNamesToImages(imageNames) {
            var images = []
            imageNames.forEach(image => {images.push(`${document.getElementById("base-url").href}/resources/${image}`)})
            return images
        }
    }
}