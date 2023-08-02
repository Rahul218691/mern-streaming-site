import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayerComponent = ({
  playerUrl = '',
  playerRef,
  onAudioPlay = () => { },
  onPauseAudio = () => { }
}) => {
    return (
        <AudioPlayer
        ref={playerRef}
        autoPlay
        src={playerUrl}
        customAdditionalControls={[]}
        showFilledVolume
        showSkipControls={true}
        onPlay={onAudioPlay}
        onPause={onPauseAudio}
      />
    )
}

export default AudioPlayerComponent