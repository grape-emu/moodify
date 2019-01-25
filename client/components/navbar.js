import React from 'react'
import SpotifyContainer from './spotify-container'
import RecommendationsButton from './RecommendationsButton'

const Navbar = () => (
  <div>
    <nav>
      <h1>MOODIFY</h1>
      <SpotifyContainer />
      <RecommendationsButton />
    </nav>
    <hr />
  </div>
)

export default Navbar
