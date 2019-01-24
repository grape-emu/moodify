const express = require('express')
const app = express()
const vision = require('@google-cloud/vision')
const GoogleAPIKey = './secrets/GoogleAPIKey.json'
const path = require('path')
app.use(express.static(path.join(__dirname, '..', 'public')))
const imageUrl = './public/guliSad.jpeg'
const fs = require('fs')

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
