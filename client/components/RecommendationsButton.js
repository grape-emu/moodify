import React, {Component} from 'react'
import axios from 'axios'
import {getHashParams} from './spotify-functions'

const functionConversion = 'seed_genres=blues&max_valence=0.5'
// function converting from google to spotify will have to convert to string before output: key=value.join('&')
// will be importing output of function here (likewise ../../server/api/spotify)

export default class RecommendationsButton extends Component {
  constructor() {
    super()
    this.handleRecommendations = this.handleRecommendations.bind(this)
  }
  handleRecommendations = async () => {
    try {
      const token = getHashParams()
      //currently hard-coding query string. this will have to be dynamically built in the front-end
      console.log(
        `localhost:8080/api/spotify/find?token=${
          token.access_token
        }&recommendations?seed_genres=blues&max_valence=0.5`
      )
      const {data} = await axios.get(
        `api/spotify/find?token=${
          token.access_token
        }&recommendations?${functionConversion}`
      )
      //console.log returns the url to the Spotify Play link
      // console.log(data.tracks[0].external_urls.spotify)
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <button type="button" onClick={this.handleRecommendations}>
        Get Recomendations
      </button>
    )
  }
}
