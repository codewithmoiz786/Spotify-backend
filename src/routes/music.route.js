const express = require('express')
const router = express.Router()
const controller = require('../controllers/music.controller')
const middleware = require('../middlewares/auth.middleware')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post("/createMusic", middleware.artist, upload.single('music'), controller.createMusic)
router.post("/createAlbum", middleware.artist, controller.createAlbum)

router.get("/getAllMusics", middleware.user, controller.getAllMusics)
router.get("/getAllAlbums", middleware.user, controller.getAllAlbums)
router.get("/getAlbumById/:albumId", middleware.user, controller.getAlbumById)
router.get("/getMusicById/:musicId", middleware.user, controller.getMusicById)



module.exports = router
