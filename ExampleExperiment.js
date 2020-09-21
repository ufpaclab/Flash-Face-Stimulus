function ExampleExperiment(jsSheetHandle, jsPsychHandle) {
    jsSheetHandle.CreateSession(RunExperiment)

    function RunExperiment(sessionID) {
        // Define Constants
        const CONTACT_EMAIL = "fake@email.com"

        // Define Experiment Trials
        let WelcomeTrial = {
            type: 'html-keyboard-response',
            stimulus:`
                <p>Welcome to the experiment.</p>
                <p>Press any key to begin.</p>
            `
        }

        let FinalTrial = {
            type: 'instructions',
            pages: [`Thanks for particpating! Please email us at ${CONTACT_EMAIL}.`],
            allow_keys: false
        }

        // Configure and Start Experiment
        jsPsychHandle.init({
            timeline: [WelcomeTrial, FinalTrial],
            on_trial_finish: CreateAdaptiveUpload(sessionID, jsSheetHandle.Insert)
        })
        
        // Define Utility Functions
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
    }
}