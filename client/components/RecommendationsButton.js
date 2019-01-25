import React, {Component} from 'react'
import axios from 'axios'
import {getHashParams} from './spotify-functions'

export default class RecommendationsButton extends Component {
  constructor() {
    super()
    this.handleRecommendations = this.handleRecommendations.bind(this)
  }
  handleRecommendations = async () => {
    try {
      const token = getHashParams()
      //currently hard-coding query string. this will have to be dynamically built in the front-end
      const {data} = await axios.get(
        `api/spotify/find?token=${
          token.access_token
        }&recommendations?seed_genres=blues&max_valence=0.5`
      )
      //console.log returns the url to the Spotify Play link
      console.log(data.tracks[0].external_urls.spotify)
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
