import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
const videoPlayer = document.querySelector('.video-player'),
      videoButtonPlay = document.querySelector('.video-button__play'),
      videoButtonStop = document.querySelector('.video-button__stop'),
      videoProgress = document.querySelector('.video-progress'),
      videoTimePassed = document.querySelector('.video-time__passed'), 
      videoTimeTotal = document.querySelector('.video-time__total'),
      videoVolume = document.querySelector('.video-volume'),
      videoFullScreen = document.querySelector('.video-fullscreen'),
      volumeDown = document.querySelector('.video-start');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else { 
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    const toggleIconVolume = () => {
        if (!videoPlayer.volume) {
            volumeDown.classList.remove('fa-volume-down');
            volumeDown.classList.add('fa-volume-off');
        } else { 
            volumeDown.classList.remove('fa-volume-off');
            volumeDown.classList.add('fa-volume-down');
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else { 
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const totalTimeVideoInit = () => {
        const duration = videoPlayer.duration;
        const minuteTotal = Math.floor(duration / 60);
        const secondsTotal = Math.floor(duration % 60);
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    }
    totalTimeVideoInit();

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        totalTimeVideoInit();
        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    });

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
      });

    videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
    toggleIconVolume();
    });
    videoPlayer.volume = 0.5;
    videoVolume.value = videoPlayer.volume * 100;

    volumeDown.addEventListener('click', () => {
        const volume = videoPlayer.volume;

        if (volume) {
            videoPlayer.volume = 0;
            toggleIconVolume();
            videoVolume.value = videoPlayer.volume * 100;
        }
    });

}