import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'),
          audioImg = document.querySelector('.audio-img'),
          audioHeader = document.querySelector('.audio-header'),
          audioPlayer = document.querySelector('.audio-player'),
          audioNavigation = document.querySelector('.audio-navigation'),
          audioButtonPlay = document.querySelector('.audio-button__play'),
          audioProgress = document.querySelector('.audio-progress'),
          audioProgressTiming = document.querySelector('.audio-progress__timing'),
          audioTimePassed = document.querySelector('.audio-time__passed'),
          audioTimeTotal = document.querySelector('.audio-time__total'),
          musicStart = document.querySelector('.music-start'),
          musicVolume = document.querySelector('.music-volume');

    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toLocaleUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevTrack = () => {
        if (trackIndex) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
        audioProgressTiming.style.width = '0%';
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
        audioProgressTiming.style.width = '0%';
    };

    audioNavigation.addEventListener('click', evt => {
        const target = evt.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toLocaleUpperCase();
        } else if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        } else if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration,
              currentTime = audioPlayer.currentTime,
              progress = (currentTime / duration) * 100;

              audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0',
              secondsPassed = Math.floor(currentTime % 60) || '0',
              minutesTotal = Math.floor(duration / 60) || '0',
              secondsTotal = Math.floor(duration % 60) || '0';    
              
        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    audioProgress.addEventListener('click', evt => {
        const x = evt.offsetX,
              allWidth = audioProgress.clientWidth,
              progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;

    });

    const toggleIconVolume = () => {
        if (!audioPlayer.volume) {
            musicStart.classList.remove('fa-volume-down');
            musicStart.classList.add('fa-volume-off');
        } else { 
            musicStart.classList.remove('fa-volume-off');
            musicStart.classList.add('fa-volume-down');
        }
    }

    musicVolume.addEventListener('input', () => {
        audioPlayer.volume = musicVolume.value / 100;
        toggleIconVolume();
    });
    audioPlayer.volume = 0.5;
    musicVolume.value = audioPlayer.volume * 100;
    
    musicStart.addEventListener('click', () => {
        const volume = audioPlayer.volume;

        if (volume) {
            audioPlayer.volume = 0;
            toggleIconVolume();
            musicVolume.value = audioPlayer.volume * 100;
        }
    });

    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
        }
    }
}