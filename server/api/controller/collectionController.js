const multer = require('multer')
// Models
const Collection = require('../models/collection')
const Distribution = require('../models/distribution')
const Token = require('../models/tokens')

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
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = (rq, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb(null, true)
    else cb(null, false)
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // this is equal to 5 mb maximum
    },
    fileFilter
})

exports.getCollections = (req, res, next) => {
    Collection.find()
        // .select("name price _id") // select use to preview which key value I want to fetch from db
        .exec()
        .then(data => {
            const response = {
                total: data.length,
                data
            }
            res.status(200).json(response)
        })
        .catch(err => console.error(err))
}

exports.getCollectionById = (req, res, next) => {
    // console.log(res.send(req.params.collectionId))
    Collection.findOne({ address: req.params.collectionId })
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
    const { address, avatar, banner, description, name, totalSupply, symbol, owner } = req.body
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

exports.postCollectionDistribution = (req, res, next) => {
    console.log({ body: req.body })
    Collection.findOne({ address: req.body?.address })
        .exec()
        .then(response => {
            const distribution = new Distribution({
                ...req.body
            });
            distribution.save()
                .then(data => res.status(201).json({ data, response }))
        })
        .catch(err => res.status(500).send(err))
}


exports.getCollectionDistribution = (req, res, next) => {
    Distribution.findOne({ address: req.params.address })
        .exec()
        .then(response => {
            res.status(200).json({
                data: response.distribution,
                total: 8
            })
        })
        .catch(err => res.status(500).send(err))
}

exports.postCollectionToken = (req, res) => {
    Collection.findOne({ address: req.params.address })
        .exec()
        .then(collection => {
            Distribution.findOne({ address: req.params.address })
                // .select("distribution")
                .exec()
                .then(dist => {
                   const attributes = [
                    {traitType: "background", value: "white", displayType: null},
                    {traitType: "body", value: "Green", displayType: null},
                    {traitType: "expression", value: "Fur Coat", displayType: null},
                    {traitType: "hands", value: "UU", displayType: null},
                    {traitType: "head gears", value: "Big Teeth", displayType: null},
                    {traitType: "misc", value: "Flower", displayType: null},
                    {traitType: "shirt", value: "Pancake Syrup", displayType: null},
                    {traitType: "wristband", value: "Pancake Syrup", displayType: null}
                   ]
                    // let collection = {name: "Dooda"}
                    let payload = {
                        // attributes,
                        collection:{name: "Dooda"},
                        name: "Dooda",
                        description:'A collection of Dooda on the BSC Blockchain',
                        tokenId: 0,
                        image: {
                            original: '',
                            thumbnail: ''
                        }
                    }
                    const getJson = JSON.stringify(payload)
                    const token = new Token({
                        address: req.params.address,  
                          attributes,
                          myCollection:{name: "Dooda"},
                          name: "Dooda",
                          description:'A collection of Dooda on the BSC Blockchain',
                          tokenId: 2,
                          image: {
                              original: '',
                              thumbnail: ''
                          }
                    })
                    token.save()
                    .then(data => {
                        res.status(201).json({ data:data })
                    })
                })
        })
        .catch(err => res.status(500).json(err))
}

exports.getCollectionToken = (req, res) => {
    console.log(req.body)
    Collection.findOne({ address: req.params.address })
        .exec()
        .then(response => {
            Token.find()
            .exec()
            .then(data => {
                res.status(200).json({
                    data
                })
            })
        })
        .catch(err => res.status(500).json(err))
}

exports.getCollectionTokenById = (req, res) => {
    console.log(req.body)
    Collection.findOne({ address: req.params.address })
        .exec()
        .then(response => {
            Token.findOne({tokenId: req.params.tokenId })
            .exec()
            .then(data => {
                res.status(200).json({
                    data: {
                        ...data?._doc,
                        collection: data.myCollection
                    }
                })
            })
        })
        .catch(err => res.status(500).json(err))
}