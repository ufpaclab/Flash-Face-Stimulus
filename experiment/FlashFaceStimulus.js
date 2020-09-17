function FlashFaceStimulus(sheetsHandle, jsPsychHandle) {
    sheetsHandle.CreateSession(RunExperiment)
    
    function RunExperiment(sessionID) {
        // Base Constants
        const EXPECTED_TRIALS = 12
        const FACE_NAMES = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg']
        const IMAGE_DURATION = 800

        // Derived Constants
        const TRIALS = Math.min(EXPECTED_TRIALS, FACE_NAMES.length/2);

        // Page Definitions
        let WelcomePage = {
            type: 'html-keyboard-response',
            stimulus:`
                <p>Welcome to the experiment.</p>
                <p>Press any key to begin.</p>
            `
        }

        let CheckVision = {
            type: 'survey-multi-choice',
            questions: [{
                name: 'vision',
                prompt: 'Do you have normal or correct-to-normal vision?',
                options: ['Normal', 'Corrected-to-Normal', 'Other'],
                required: true
            }]
        }

        let InstructionsAndEnterFullscreenPage = {
            type: 'fullscreen',
            message: `
                <h1>Instructions</h1>
                <p>Stare at the fixation cross and use your peripheral vision to observe the faces on the left and right.</p>
            `
        }

        let ExperimentPage = {
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
                const facesRequired = TRIALS*2
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

        let ExitFullscreenPage = {
            type: 'fullscreen',
            fullscreen_mode: false
        }

        let MeasureDistortionPage = {
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

        // Primary Logic
        jsPsychHandle.init({
            timeline: [WelcomePage, CheckVision, InstructionsAndEnterFullscreenPage, ExperimentPage, ExitFullscreenPage, MeasureDistortionPage],
            preload_images: [ImageNamesToImages(FACE_NAMES)],
            on_finish: () => {
                const trials = JSON.parse(jsPsychHandle.data.get().json())

                var responses = []
                trials.forEach(trial => {
                    if (trial.trial_type == 'html-slider-response') {
                        responses.push(trial.response)
                    }
                })

                var entry = []
                entry.push(TRIALS)
                entry.push(IMAGE_DURATION)
                entry.push(FACE_NAMES.toString())
                entry.push(responses.toString())
                sheetsHandle.Insert(sessionID, entry)
            }
        })

        // Utility Functions
        function ImageNamesToImages(imageNames) {
            var images = []
            imageNames.forEach(image => {images.push(`${document.getElementById("base-url").href}/images/${image}`)})
            return images
        }
    }
}