const REPO_URL = 'https://greyjohnsongit.github.io/jsPsychSheet'
const IMAGE_NAMES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg']
const EXPECTED_TRIALS = 5

const FIXATION = `${CONTENT_URL}/img/fixationSameSize.png`
const TRIALS = Math.min(EXPECTED_TRIALS, FACES.length/2);
const CONTENT_URL = REPO_URL + '/experiment'
const IMAGES = (() => {
    let images = []
    IMAGES_NAMES.forEach(value => {images.push(`${CONTENT_URL}/img/${value}`)})
    return images
})()
