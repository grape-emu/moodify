const router = require('express').Router()
module.exports = router

const https = require('https')
const token =
  'BQBg4ZaQqe7NDcG9c9dJl1pJm-J5agSp0IRxnUPLcWpbvJQbAAkNuc71B-S9WcAVZ9N_1bIaih57RHHcxSxvRJ1trNIqbod99IR5wWaH0tRcPupBwRA2C6v7pJHBXmDMMhGDjej-wW98GkYtVmF_diD9-VITUIMOVFOFyUaLZ4t1Nd1btrx1eAgzjwkqhPhi3QfWbKYE0mAGeYYvalndPav14KVj0KTAWvaIYYg6xkdqYwSGY7M'

//pass querry string to spotifyAPI
function spotifyAPI(params) {
  return new Promise((resolve, reject) => {
    let options = {
      hostname: 'api.spotify.com',
      port: 443,
      path: '/v1/' + params,
      method: 'GET',
      headers: {
        Authorization: ' Bearer ' + token
      }
    }

    let httpsObject = https.get(options, res => {
      let data = ''
      res
        .on('data', chunk => {
          data += chunk
        })
        .on('end', () => {
          resolve(data)
        })
        .on('error', err => {
          reject(err)
        })
    })
  })
}

//this works if I hard-code it.
//Tomorrow, figure out how to extract 'recommendations?seed_genres=blues&max_valence=0.5' from req.
router.get('/find', async (req, res, next) => {
  try {
    const data = await spotifyAPI(
      'recommendations?seed_genres=blues&max_valence=0.5'
    )
    res.json(JSON.parse(data))
  } catch (err) {
    next(err)
  }
})
