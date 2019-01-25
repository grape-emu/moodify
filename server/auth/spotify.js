const express = require('express')
const request = require('request')
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')

const {
  REACT_APP_SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  REACT_APP_SPOTIFY_PRODUCTION_REDIRECT_URI
} = require('../../secrets')

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

const app = express()

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())

app.get('/login', function(req, res) {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)

  // your application requests authorization
  const scope = 'user-read-private user-read-email'
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        REACT_APP_SPOTIFY_CLIENT_ID,
        scope,
        REACT_APP_SPOTIFY_PRODUCTION_REDIRECT_URI,
        state
      })
  )
})

app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    )
  } else {
    res.clearCookie(stateKey)
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        REACT_APP_SPOTIFY_PRODUCTION_REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(
            REACT_APP_SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
          ).toString('base64')
      },
      json: true
    }

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
          refresh_token = body.refresh_token

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {Authorization: 'Bearer ' + access_token},
          json: true
        }

        // use the access token to access the Spotify Web API
        // eslint-disable-next-line handle-callback-err
        request.get(options, function(error, response, body) {
          console.log(body)
        })

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          '/#' +
            querystring.stringify({
              access_token,
              refresh_token
            })
        )
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        )
      }
    })
  }
})

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(
          REACT_APP_SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
        ).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({
        access_token: access_token
      })
    }
  })
})

console.log('Listening on 8080')
app.listen(8080)