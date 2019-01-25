const router = require('express').Router()
module.exports = router
const https = require('https')
const token =
  'BQA9_Uq__qyKc-78ut8eFOLazQez84lMDA_WmM7295qILW__zdvcoD1Z90_6HLJF5fjajg5LKbfHI7dk-RKGL-EQVfOtBElDsKAkprFSMUfLEUcv4GLBkMgvJLPnVzqamTMbjrg9JTRXc97vsmgb23YcTHUY6kVUn1m3mXG2KsO9LWyJ4eWi77jouye9RJ7cEIIaJAW8nLInDfhmGmiPQdognCtTat35nYI1tGGpiQT-UFhfS8Y'

function spotifyAPI(params) {
  return new Promise((resolve, reject) => {
    let options = {
      hostname: 'api.spotify.com',
      port: 443,
      path: '/v1/tracks/' + params,
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

router.get('/:id', async (req, res, next) => {
  try {
    const data = await spotifyAPI(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})
