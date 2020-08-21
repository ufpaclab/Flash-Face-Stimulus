var preloads = ''
preloads += `<link rel="preload" href="${FIXATION}" as="image"></link>` 
FACES.forEach((image) => {
    preloads += `<link rel="preload" href="${image}" as="image"></link>` 
})
document.write(preloads)