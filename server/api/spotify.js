const router = require('express').Router()
module.exports = router

const https = require('https')

//pass querystring, token
function spotifyAPI(params, token) {
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

router.get('/find', async (req, res, next) => {
  let token = req.query.token
  try {
    const data = await spotifyAPI(
      'recommendations?seed_genres=sad&max_valence=0.5',
      token
    )
    res.json(JSON.parse(data))
  } catch (err) {
    next(err)
  }
})
