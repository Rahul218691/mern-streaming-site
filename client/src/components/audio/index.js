import React, { useCallback } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { toast } from 'react-toastify';

const AudioPlayerComponent = ({
  playerUrl = '',
  playerRef,
  onAudioPlay = () => { },
  onPauseAudio = () => { },
  onPlayNext = () => { },
  onPlayPrevious = () => { }
}) => {

    const handleError = useCallback(() => {
      toast.error('Error in playing aduio')
    }, [])

    return (
        <AudioPlayer
        ref={playerRef}
        autoPlay
        src={playerUrl}
        customAdditionalControls={[]}
        showFilledVolume
        showSkipControls={true}
        onPlay={onAudioPlay}
        onClickNext={onPlayNext}
        onClickPrevious={onPlayPrevious}
        onPause={onPauseAudio}
        onPlayError={handleError}
        onError={handleError}
      />
    )
}

export default AudioPlayerComponent