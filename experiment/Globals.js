const FIXATION = `${REPO_URL}/experiment/img/${FIXATION_NAME}`
const TRIALS = Math.min(EXPECTED_TRIALS, IMAGE_NAMES.length/2);
const FACES = (() => {
    let images = []
    IMAGE_NAMES.forEach(value => {images.push(`${REPO_URL}/experiment/img/${value}`)})
    return images
})()
