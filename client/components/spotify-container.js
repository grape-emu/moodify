import React, {Component} from 'react'
import ConnectSpotify from './connect-spotify'
import * as SpotifyFunctions from './spotify-functions.js'

class SpotifyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInToSpotify: false,
      accessToken: null
    }
  }

  componentDidMount() {
    //will check URL for accessToken hash. If it's not there, it will show the connect-spotify-button as a link
    //which will then redirect back to your site with the hash. If there is a hash, then we will jump right into the player
    const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken()
    accessToken
      ? this.setState({loggedInToSpotify: true, accessToken: accessToken})
      : this.setState({loggedInToSpotify: false, accessToken: null})
  }

  render() {
    return (
      <div className="SpotifyContainer">
        {!this.state.loggedInToSpotify ? (
          <ConnectSpotify />
        ) : (
          <p>{`Access Token: ${this.state.accessToken}`}</p>
        )}
      </div>
    )
  }
}

export default SpotifyContainer
