const { Router } = require('express')
const multer = require('multer')
const router = Router()
// Controllers
const productController = require('../controller/productController')
// Models
const Product = require('../models/product')
// Cloudinary Stuff
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

// Multer stuff
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
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

router.get('/', productController.getProduct)

router.get('/:productById', (req, res, next) => {
    const id = req.params.productById
    Product.findById(id)
    .exec()
    .then(data => {
        console.log(data)
        res.status(200).json({
            message: "Hello i'm get of proudct specific id",
            data
        })
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    } )
    
})

router.post('/', upload.single('productImage'), (req, res, next) => {

    cloudinary.uploader.upload(req.file.path, function(err,image) {
        console.log('file upload')
        if (err) { console.warn(err); }
        console.log("public id" + image.public_id);
        console.log("image url" + image.url);
        console.log({image});
    })

    const {name, price} = req.body
    const product = new Product({
        // _id: new mongoose.Types.ObjectId,
        name,
        price
    })
    product.save()
    .then((data) => {
        res.status(201).json({
            messsage: "Hi buddy I'm product",
            data
        })
    })
    .catch(error => res.status(500).json({
        message: "Internal Server Error",
        error
    }))
    
})

router.delete('/:productId', async (req, res, next) => {
    const _id = req.params.productId
    Product.remove({_id})
    .exec()
    .then((data) => {
        res.status(200).json({
            messsage: "Successfully deleted",
            data
        })
    })
    .catch(error => {
        res.status(500).json({
            messsage: "Server error",
            error
        })
    })
    
})

router.patch('/:productId', (req, res, next) => {
    const _id = req.params.productId
    const {name, price} = req.body
    Product.updateOne({_id}, {$set: {name, price }})
    .exec()
    .then((data) => {
        res.status(200).json({
            messsage: "Successfully Updated",
            data
        })
    })
    .catch(error => {
        res.status(500).json({
            messsage: "Server error",
            error
        })
    })
})

module.exports = router