const WavesurferUtil = {};

WavesurferUtil.initWavesurfer = ({
  container,
  surferInstance,
  updateSongPlaying,
}) => {
  let zoomValue = 0;

  // Zooming in timeline
  container.addEventListener('wheel', (e) => {
    const zoomSign = Math.sign(e.deltaY);

    if (zoomSign === -1) {
      // Zoomolás be
      zoomValue += 20;
      surferInstance.zoom(zoomValue);
    }

    if (zoomSign === 1) {
      // Zoomolás ki
      zoomValue -= 20;
      surferInstance.zoom(zoomValue);
    }
  });

  // After the song is finished we need restore the play button to default state
  surferInstance.on('finish', updateSongPlaying);
};

export default WavesurferUtil;
