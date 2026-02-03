document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('demo-video');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const restartBtn = document.getElementById('restart-btn');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeSlider = document.getElementById('volume-slider');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');
    
    // Установка длительности видео при загрузке метаданных
    video.addEventListener('loadedmetadata', function() {
        durationElement.textContent = formatTime(video.duration);
        progressBar.max = Math.floor(video.duration);
    });
    
    // Обновление времени воспроизведения
    video.addEventListener('timeupdate', function() {
        const currentTime = Math.floor(video.currentTime);
        progressBar.value = currentTime;
        currentTimeElement.textContent = formatTime(currentTime);
    });
    
    // Форматирование времени в мм:сс
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Управление воспроизведением
    playBtn.addEventListener('click', function() {
        video.play();
        playBtn.style.backgroundColor = '#27ae60';
        pauseBtn.style.backgroundColor = '#3498db';
    });
    
    pauseBtn.addEventListener('click', function() {
        video.pause();
        pauseBtn.style.backgroundColor = '#e74c3c';
        playBtn.style.backgroundColor = '#3498db';
    });
    
    restartBtn.addEventListener('click', function() {
        video.currentTime = 0;
        video.play();
        playBtn.style.backgroundColor = '#27ae60';
        pauseBtn.style.backgroundColor = '#3498db';
    });
    
    // Перемещение по видео
    progressBar.addEventListener('input', function() {
        video.currentTime = progressBar.value;
    });
    
    // Управление громкостью
    volumeSlider.addEventListener('input', function() {
        video.volume = volumeSlider.value / 100;
        
        // Изменение иконки в зависимости от громкости
        if (video.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (video.volume < 0.5) {
            muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Кнопка отключения звука
    muteBtn.addEventListener('click', function() {
        if (video.volume > 0) {
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted 
                ? '<i class="fas fa-volume-mute"></i>' 
                : '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Полноэкранный режим
    fullscreenBtn.addEventListener('click', function() {
        const videoContainer = document.querySelector('.video-container');
        
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });
    
    // Выход из полноэкранного режима
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }
    
    // Автоматическое воспроизведение при загрузке страницы (с учетом политики браузера)
    setTimeout(() => {
        video.play().catch(error => {
            console.log("Автовоспроизведение заблокировано браузером. Используйте кнопку воспроизведения.");
        });
    }, 1000);
});