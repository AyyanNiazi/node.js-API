const { Router } = require('express')
const multer = require('multer')
const collection_controller = require('../controller/collectionController')
const router = Router()

// Multer stuff
const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname )
    }
})
const fileFilter = (rq, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true)
    else cb(null, false)
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 *1024 * 5 // this is equal to 5 mb maximum
    },
    fileFilter
})

const uploadFileType = upload.single('avatar')

// Get Collections
router.get('/', collection_controller.getCollections)
// Get Collection By Id
router.get('/:collectionId', collection_controller.getCollectionById)
// post Collections
router.post('/', upload.none(), collection_controller.postCollection)

// post Collection Distribution
router.post('/distribution', collection_controller.postCollectionDistribution)
// get Collection Distribution
router.get('/:address/distribution', collection_controller.getCollectionDistribution)

// post Collection Token
router.post('/:address/token', collection_controller.postCollectionToken)
// get Collection Toen
router.get('/:address/token/:tokenId', collection_controller.getCollectionToken)

module.exports = router