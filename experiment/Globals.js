const REPO_URL = 'https://greyjohnsongit.github.io/jsPsychSheet'
const IMAGE_NAMES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg']
const FIXATION_NAME = 'fixationSameSize.png'
const EXPECTED_TRIALS = 5

const CONTENT_URL = REPO_URL + '/experiment'
const FIXATION = `${CONTENT_URL}/img/${FIXATION_NAME}`
const TRIALS = Math.min(EXPECTED_TRIALS, IMAGE_NAMES.length/2);
const FACES = (() => {
    let images = []
    IMAGE_NAMES.forEach(value => {images.push(`${CONTENT_URL}/img/${value}`)})
    return images
})()
