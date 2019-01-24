const router = require('express').Router()
module.exports = router
const Spotify = require('spotify-web-api-js')
const request = require('request')
const spotifyApi = new Spotify()

spotifyApi.setAccessToken(
  'BQDMEtWSCwohp1iLCFkLAecnIEDoIhv9-Rr3vBxl9zGdQL6NxJNNr_rgezVmIf2E22fpYTXm6R6fIcJoXI1SDbhPaG6SrS0xpJZbSJN4z0nwssMmgpILisESzJglxuI01wupQxZwenouEqlqJWTxEzhV8RA1CV_89S1ODA5iRfZAvdBYbz4B3jjEoMPGRf0eSUSGLgJRmREFJneip-bLKPqV9dFCljp4U3OiRCztJUHIvMSmR3k'
)

router.get('/:id', async (req, res, next) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.spotify.com/v1/tracks/${req.params.id}`,
      headers: {
        Authorization:
          'Bearer  BQDMEtWSCwohp1iLCFkLAecnIEDoIhv9-Rr3vBxl9zGdQL6NxJNNr_rgezVmIf2E22fpYTXm6R6fIcJoXI1SDbhPaG6SrS0xpJZbSJN4z0nwssMmgpILisESzJglxuI01wupQxZwenouEqlqJWTxEzhV8RA1CV_89S1ODA5iRfZAvdBYbz4B3jjEoMPGRf0eSUSGLgJRmREFJneip-bLKPqV9dFCljp4U3OiRCztJUHIvMSmR3k'
      }
    }
    const data = await request(options, (error, response, body) => {
      if (error) throw new Error(error)
      //   console.log(body)
      console.log(response)
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})
