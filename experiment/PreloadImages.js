var preloads = ''
preloads += `<link rel="preload" href="${CONTENT_URL}/img/fixationSameSize.png" as="image"></link>` 
FACES.forEach((image) => {
    preloads += `<link rel="preload" href="${CONTENT_URL}/${image}" as="image"></link>` 
})
document.write(preloads)