window.sprites = {}

const getSprites = (callback) => {
    // Fetching image data (path and name)
    fetch("./images.json")
        .then((res) => res.json())
        .then((data) => {
            loadImages(data, callback)
        });
}

const loadImages = (imgData, callback) => {
    promises = []
    for (const [name, path] of Object.entries(imgData)) {
        const image = new Image();
        image.src = path;

        const promise = new Promise((resolve) => { image.onload = () => resolve([name, image]) })
        promises.push(promise)
    }

    Promise.all(promises).then((nameImagePair) => {
        const loadedImages = {};
        for (const [name, image] of nameImagePair) {
            loadedImages[name] = image;
        }

        window.sprites = loadedImages;
        callback();
    })
}