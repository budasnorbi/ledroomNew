const initWavesurfer = (instance) => {
  const container = instance.waveRef.current;
  const { Wavesurfer } = instance;

  // Action
  const { updateSongPlaying, addSongRegion } = instance.props;

  let zoomValue = 0;

  // Zooming in timeline
  container.addEventListener('wheel', (e) => {
    const zoomSign = Math.sign(e.deltaY);

    if (zoomSign === -1) {
      // Zoomolás be
      zoomValue += 20;
      Wavesurfer.zoom(zoomValue);
    }

    if (zoomSign === 1) {
      // Zoomolás ki
      zoomValue -= 20;
      Wavesurfer.zoom(zoomValue);
    }
  });

  // After the song is finished we need restore the play button to default state
  Wavesurfer.on('finish', () => updateSongPlaying());

  addSongRegion({
    start: 0,
    end: 100,
    color: 'rgba(0,0,0,.2)',
  });
};

export default initWavesurfer;
