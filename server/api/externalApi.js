const express = require('express')
const app = express()
const vision = require('@google-cloud/vision')
const GoogleAPIKey = './secrets/GoogleAPIKey.json'
const image = '/guliSad.jpeg'

// Imports the Google Cloud client library &
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: GoogleAPIKey
})

client
  .labelDetection(
    'http://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/e4R-RRY/person-smiling-and-happy_sqtmh7xr_thumbnail-full03.png' // happy
  )
  .then(results => {
    const labels = results[0].labelAnnotations
    console.log('results[0].labelAnnotations', labels)

    const faces = results[0].facelAnnotations
    console.log('results[0].faceAnnotations', faces)

    console.log('Labels:')
    labels.forEach(label => console.log(label))
  })
  .catch(err => {
    console.error('ERROR:', err)
  })
