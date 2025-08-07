async function loadSprites() {
    const imgRes = await fetch("./data/images.json")
    const imgData = await imgRes.json()
    const loadedSprites = {};

    const promises = []
    for (const [name, path] of Object.entries(imgData)) {
        const image = new Image();
        image.src = path;

        const p = new Promise((resolve) => { image.onload = () => resolve([name, image]) });
        promises.push(p);
    }

    await Promise.all(promises).then((nameImagePair) => {
        for (const [name, image] of nameImagePair) {
            loadedSprites[name] = image;
        }
    })

    return loadedSprites;
}

export default loadSprites;