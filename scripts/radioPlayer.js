export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
          radioNavigation = document.querySelector('.radio-navigation'),
          radioCoverImg = document.querySelector('.radio-cover__img'),
          radioItem = document.querySelectorAll('.radio-item'),
          radioHeaderBig = document.querySelector('.radio-header__big'),
          radioStop = document.querySelector('.radio-stop'),
          radioVolumeIcon = document.querySelector('.radio-start'),
          radioVolume = document.querySelector('.radio-volume');

    const audio = new Audio();
    audio.type = 'audio/aac';
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-pause');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-pause');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', evt => {
        const target = evt.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    const toggleIconVolume = () => {
        if (!audio.volume) {
            radioVolumeIcon.classList.remove('fa-volume-down');
            radioVolumeIcon.classList.add('fa-volume-off');
        } else { 
            radioVolumeIcon.classList.remove('fa-volume-off');
            radioVolumeIcon.classList.add('fa-volume-down');
        }
    }

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        toggleIconVolume();
    });
    audio.volume = 0.5;
    radioVolume.value = audio.volume * 100;
    
    radioVolumeIcon.addEventListener('click', () => {
        const volume = audio.volume;

        if (volume) {
            audio.volume = 0;
            toggleIconVolume();
            radioVolume.value = audio.volume * 100;
        }
    });

    radioPlayerInit.stop = () => {
        changeIconPlay();
        audio.pause();
    }
}