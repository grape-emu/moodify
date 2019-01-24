const express = require('express')
const app = express()
const router = require('express').Router()
const multer = require('multer')
const AWS = require('aws-sdk')
const vision = require('@google-cloud/vision')
const GoogleAPIKey = './secrets/GoogleAPIKey.json'
const imageUrl = './public/guliSad.jpeg'
const fs = require('fs')

if (process.env.NODE_ENV === 'development') {
  require('../../secrets')
}

// configuring the DiscStorage engine.
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

// AWS Access credentials
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_SECRET_ACCESS_KEY
AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: 'us-east-1'
})

//Create a new instance of S3:
const s3 = new AWS.S3()

//POST method route for uploading file
router.post('/post_file', upload.single('demo_file'), function(req, res) {
  //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
  //req.file is the demo_file
  uploadFile(req.file.path, req.file.filename, res)
})

//GET method route for downloading/retrieving file
router.get('/get_file/:file_name', (req, res) => {
  retrieveFile(req.params.file_name, res)
})

//GET method route for downloading/retrieving file URL
router.get('/get_fileUrl/:file_name', (req, res) => {
  getFileUrl(req.params.file_name, res)
})

//The uploadFile function
function uploadFile(source, targetName, res) {
  console.log('preparing to upload...')
  fs.readFile(source, function(err, filedata) {
    if (!err) {
      const putParams = {
        Bucket: 'node-sdk-sample-74cc0b9f-09e9-48f6-9ba0-60706233320b',
        Key: targetName,
        Body: filedata
      }
      s3.putObject(putParams, function(error, data) {
        if (error) {
          console.log('Could not upload the file. Error :', error)
          return res.send({success: false})
        } else {
          console.log('Successfully uploaded the file')
          return res.send({success: true})
        }
      })
    } else {
      console.log({err: err})
    }
  })
}

//The retrieveFile function
function retrieveFile(filename, res) {
  const getParams = {
    Bucket: 'node-sdk-sample-74cc0b9f-09e9-48f6-9ba0-60706233320b',
    Key: filename
  }

  s3.getObject(getParams, function(err, data) {
    if (err) {
      return res.status(400).send({success: false, err: err})
    } else {
      return res.send(data.Body)
    }
  })
}

//getFileUrl function
function getFileUrl(filename, res) {
  const urlParams = {
    Bucket: 'node-sdk-sample-74cc0b9f-09e9-48f6-9ba0-60706233320b',
    Key: filename
  }
  s3.getSignedUrl('getObject', urlParams, function(err, url) {
    if (err) {
      return res.status(400).send({success: false, err: err})
    } else {
      return res.status(200).send({success: true, url: url})
    }
  })
}

// Imports the Google Cloud client library &
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: GoogleAPIKey
})

async function detectFaces(inputFile) {
  // Make a call to the Vision API to detect the faces
  const request = {image: {source: {filename: inputFile}}}
  const response = await client.faceDetection(request)
  const facialData = response[0].faceAnnotations[0]
  console.log('results[0].faceAnnotations[0]', facialData)
}

detectFaces(imageUrl)

module.exports = router
