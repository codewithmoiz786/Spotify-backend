const musicModel = require('../models/music.model')
const uploadMusic = require('../services/storage.service')
const albumModel = require('../models/album.model')

async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file
        console.log(file, title);

        if (!file) {
            return res.status(400).json({
                message: "Upload your file"
            })
        }
        let result = await uploadMusic(file)
        console.log(result);

        let music = await musicModel.create({
            title,
            uri: result.url,
            artist: req.user._id
        })
        res.status(201).json({
            message: "Music upload successfully",
            music
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "Error": err.message
        })
    }

}
async function createAlbum(req, res) {
    try {

        const { title, music } = req.body;
        const album = await albumModel.create({
            title,
            musics: music,
            artist: req.user._id
        })
        res.status(201).json({
            message: "Album created successfully",
            album
        })
    } catch (err) {
        res.status(500).json({
            "Error": err.message
        })

    }
}

async function getAllMusics(req, res) {
    try {
        const musics = await musicModel.find().populate("artist")

        res.status(200).json({
            message: "Musics fetched successfully",
            musics
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}
async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel.find().populate("musics").populate("artist");

        return res.status(200).json({
            message: "Albums fetched successfuly",
            albums
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }

}
async function getAlbumById(req, res) {
    try {
        const albumId = req.params.albumId;
        let album = await albumModel.findById(albumId).populate('musics').populate("artist", "username,email")
        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            })
        }
        return res.status(200).json({
            message: "Album get by Id successfully",
            album
        })

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }


}

async function getMusicById(req, res) {
    try {

        const musicId = req.params.musicId;
        let music = await musicModel.findById(musicId)
            .populate("artist")
        if (!music) {
            return res.status(404).json({
                message: "Music not found"
            })
        }
        res.status(201).json({
            message: "Music Fetched successfully",
            music
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}



module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById, getMusicById }