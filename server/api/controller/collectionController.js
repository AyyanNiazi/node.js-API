const multer = require('multer')
// Models
const Collection = require('../models/collection')

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

exports.getCollections = (req, res, next) => {
    console.log(res.send("Collection"))
    // Product.find()
    // .select("name price _id") // select use to preview which key value I want to fetch from db
    // .exec()
    // .then(data => {
    //     const response = {
    //         count: data.length,
    //         products: data
    //     }
    //     res.status(200).json(response)
    // })
    // .catch(err => console.error(err))
}

exports.getCollectionById = (req, res, next) => {
    // console.log(res.send(req.params.collectionId))
    Collection.findById(req.params.collectionId)
    // .select("name price _id") // select use to preview which key value I want to fetch from db
    .exec()
    .then(data => {
        const response = {
            data
        }
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
}

exports.postCollection = (req, res, next) => {
    const {address, avatar, banner, description, name, totalSupply, symbol, owner} = req.body
    console.log(typeof banner)
    console.log(JSON.parse(banner))
    // const collection = new Collection({
    //     address,
    //     avatar,
    //     banner: {large: banner.small, small: banner.large},
    //     description,
    //     name,
    //     totalSupply,
    //     symbol,
    //     owner
    // })
    // collection.save()
    // .then(data => {
    //     const response = {
    //         data,
    //         total: data.length
    //     }
    //     res.status(201).json(response)
    // })
    // .catch(error => {
    //     res.status(500).json({
    //         error
    //     })
    // })
}