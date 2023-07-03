const playerBoxes = document.querySelectorAll('.player-box');

playerBoxes.forEach(function(playerBox) {
  const triangleIcon = playerBox.querySelector('.triangle-icon');
  const pauseIcon = playerBox.querySelector('.pause-icon');
  let isPlaying = false;

  const songUrl = playerBox.dataset.songUrl;
  const audio = new Audio(songUrl);

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
