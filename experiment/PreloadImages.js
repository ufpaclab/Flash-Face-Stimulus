var preloads = ''
preloads += `<link rel="preload" href="${FIXATION}" as="image"></link>` 
FACES.forEach((image) => {
    preloads += `<link rel="preload" href="${CONTENT_URL}/img/${image}" as="image"></link>` 
})
document.write(preloads)