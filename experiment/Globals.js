const CONTENT_URL = REPO_URL + '/experiment'
const FIXATION = `${CONTENT_URL}/img/${FIXATION_NAME}`
const TRIALS = Math.min(EXPECTED_TRIALS, IMAGE_NAMES.length/2);
const FACES = (() => {
    let images = []
    IMAGE_NAMES.forEach(value => {images.push(`${CONTENT_URL}/img/${value}`)})
    return images
})()
