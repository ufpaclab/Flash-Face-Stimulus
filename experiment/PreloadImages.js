var preloads = ''
preloads += `<link rel="preload" href="./fixationSameSize.png" as="image"></link>` 
FACES.forEach((image) => {
    preloads += `<link rel="preload" href="./${image}" as="image"></link>` 
})
document.write(preloads)