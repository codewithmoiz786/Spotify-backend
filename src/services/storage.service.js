const Imagekit = require('imagekit')

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.URL_END_POINT
})

async function uploadMusic(file) {
    let result = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "musics/"
    })
    return result
}
module.exports = uploadMusic