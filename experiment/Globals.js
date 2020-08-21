const REPO_URL = 'https://greyjohnsongit.github.io/jsPsychSheet'
const CONTENT_URL = REPO_URL + '/experiment'
const FACES = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg'].forEach((value, index, array) => {array[index] = `${CONTENT_URL}/img/${value}`})
const FIXATION = `${CONTENT_URL}/img/fixationSameSize.png`
const TRIALS = Math.min(5, FACES.length/2);