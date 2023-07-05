const playerBoxes = document.querySelectorAll('.player-box');
const audioElements = [];

playerBoxes.forEach(function(playerBox) {
  const audio = new Audio();
  audioElements.push(audio);

  const triangleIcon = playerBox.querySelector('.triangle-icon');
  const pauseIcon = playerBox.querySelector('.pause-icon');
  let isPlaying = false;

  const songUrl = playerBox.dataset.songUrl;
  audio.src = songUrl;

  playerBox.addEventListener('click', function() {
    if (isPlaying) {
      triangleIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      audio.pause();
    } else {
      triangleIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      audio.play();
    }

    isPlaying = !isPlaying;
  });
});

$("#volume").slider({
  min: 0,
  max: 100,
  value: 0,
  range: "min",
  slide: function(event, ui) {
    setVolume(ui.value / 100);
  }
});

function setVolume(volume) {
  audioElements.forEach(function(audio) {
    audio.volume = volume;
  });
}
