import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayerComponent = () => {
    return (
        <AudioPlayer
        src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
        showFilledVolume
        showSkipControls
        onPlay={e => console.log("onPlay")}
      />
    )
}

export default AudioPlayerComponent