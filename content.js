let isInitialized = false;

// Helper function to safely create elements
function createControlElement(type, className, innerHTML = '') {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

function createControlsStructure() {
    // Create main wrapper
    const wrapper = createControlElement('div', 'video-controls-wrapper');
    
    // Create progress bar container
    const progressContainer = createControlElement('div', 'progress-bar-container');
    wrapper.appendChild(progressContainer);
    
    // Create custom controls container
    const customControls = createControlElement('div', 'fathom-custom-controls');
    
    // Create left controls group
    const leftControls = createControlElement('div', 'controls-left');

    
    
    // Create play button
    const playButton = createControlElement('button', 'control-button play-pause');
    playButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
    `;

    // Create volume control container
    const volumeContainer = createControlElement('div', 'volume-container');
    
    // Create volume button
    const volumeButton = createControlElement('button', 'control-button volume-button');
    volumeButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5v14l-7-7H1V8h4l7-7v14zM16 7v10c1.2-1.2 2-3 2-5s-.8-3.8-2-5z"/>
        </svg>
    `;

    
    // Create volume slider container
    const volumeSliderContainer = createControlElement('div', 'volume-slider-container');
    
    // Create volume slider
    const volumeSlider = createControlElement('input', 'volume-slider');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '100';
    volumeSlider.value = '100';
    
    volumeSliderContainer.appendChild(volumeSlider);
    volumeContainer.appendChild(volumeButton);
    volumeContainer.appendChild(volumeSliderContainer);
    
    // Create time display
    const timeDisplay = createControlElement('span', 'time-display', '0:00 / 0:00');
    
    leftControls.appendChild(playButton);
    leftControls.appendChild(volumeContainer);
    leftControls.appendChild(timeDisplay);
    
    // Create right controls group
    const rightControls = createControlElement('div', 'controls-right');

      
    // Create speed control
    const speedContainer = createControlElement('div', 'speed-container');
    const speedButton = createControlElement('button', 'control-button speed-button');
    speedButton.innerHTML = `
        <span class="speed-label">1x</span>
    `;
    
    // Create speed menu
    const speedMenu = createControlElement('div', 'speed-menu');
    const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    speedOptions.forEach(speed => {
        const option = createControlElement('button', 'speed-option');
        option.textContent = `${speed}x`;
        option.dataset.speed = speed;
        if (speed === 1) option.classList.add('active');
        speedMenu.appendChild(option);
    });
    
    speedContainer.appendChild(speedButton);
    speedContainer.appendChild(speedMenu);
    
    // Create fullscreen button
    const fullscreenButton = createControlElement('button', 'control-button fullscreen-button');
    fullscreenButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
    `;

     // Add new controls to right side
     rightControls.appendChild(speedContainer);
     rightControls.appendChild(fullscreenButton);
    
    
    // Add all elements to the custom controls
    customControls.appendChild(leftControls);
    customControls.appendChild(rightControls);
    
    // Add custom controls to wrapper
    wrapper.appendChild(customControls);
    
    return wrapper;
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


function setupSpeedControl(videoElement, speedButton, speedMenu) {
    let menuVisible = false;
    
    // Toggle speed menu
    speedButton.addEventListener('click', (e) => {
        e.stopPropagation();
        menuVisible = !menuVisible;
        speedMenu.classList.toggle('visible', menuVisible);
    });
    
    // Handle speed selection
    speedMenu.addEventListener('click', (e) => {
        const speedOption = e.target.closest('.speed-option');
        if (!speedOption) return;
        
        const speed = parseFloat(speedOption.dataset.speed);
        videoElement.playbackRate = speed;
        
        // Update UI
        speedButton.querySelector('.speed-label').textContent = `${speed}x`;
        speedMenu.querySelectorAll('.speed-option').forEach(opt => {
            opt.classList.toggle('active', opt === speedOption);
        });
        
        menuVisible = false;
        speedMenu.classList.remove('visible');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', () => {
        if (menuVisible) {
            menuVisible = false;
            speedMenu.classList.remove('visible');
        }
    });
}

function setupFullscreenControl(videoElement, fullscreenButton) {
    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log(err));
            fullscreenButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
            `;
        } else {
            videoElement.requestFullscreen().catch(err => console.log(err));
            fullscreenButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
            `;
        }
    });
    
    // Update button icon when fullscreen changes
    document.addEventListener('fullscreenchange', () => {
        const isFullscreen = document.fullscreenElement !== null;
        fullscreenButton.innerHTML = isFullscreen ? `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
        ` : `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
        `;
    });
}


// Add this new function to handle volume controls
function setupVolumeControl(videoElement, volumeContainer) {
    const volumeButton = volumeContainer.querySelector('.volume-button');
    const volumeSlider = volumeContainer.querySelector('.volume-slider');
    let previousVolume = 1;

    // Function to update volume icon based on current volume
    function updateVolumeIcon(volume) {
        const isMuted = volume === 0;
        const isLow = volume > 0 && volume <= 0.5;
        
        volumeButton.innerHTML = isMuted ? `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5v14l-7-7H1V8h4l7-7v14zM16 7v10l4-4-4-6z"/>
                <line x1="16" y1="7" x2="20" y2="17" stroke="currentColor" stroke-width="2"/>
            </svg>
        ` : isLow ? `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5v14l-7-7H1V8h4l7-7v14zM16 7v10c1.2-1.2 2-3 2-5s-.8-3.8-2-5z"/>
            </svg>
        ` : `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5v14l-7-7H1V8h4l7-7v14zM16 7v10c1.2-1.2 2-3 2-5s-.8-3.8-2-5z"/>
                <path d="M19 7v10c1.8-1.8 3-4.2 3-7s-1.2-5.2-3-7z"/>
            </svg>
        `;
    }

    // Initialize volume slider value
    volumeSlider.value = videoElement.volume * 100;
    updateVolumeIcon(videoElement.volume);

    // Handle volume slider input
    volumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value) / 100;
        videoElement.volume = volume;
        videoElement.muted = volume === 0;
        updateVolumeIcon(volume);
    });

    // Handle volume button click (mute/unmute)
    volumeButton.addEventListener('click', () => {
        if (videoElement.volume === 0 || videoElement.muted) {
            videoElement.muted = false;
            videoElement.volume = previousVolume;
            volumeSlider.value = previousVolume * 100;
        } else {
            previousVolume = videoElement.volume;
            videoElement.volume = 0;
            volumeSlider.value = 0;
        }
        updateVolumeIcon(videoElement.volume);
    });

    // Handle keyboard accessibility
    volumeSlider.addEventListener('keydown', (e) => {
        const step = 5;
        let newValue = parseInt(volumeSlider.value);

        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            newValue = Math.min(100, newValue + step);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            newValue = Math.max(0, newValue - step);
        }

        volumeSlider.value = newValue;
        videoElement.volume = newValue / 100;
        updateVolumeIcon(videoElement.volume);
    });
}

function initializePlayer() {
    if (isInitialized) return;
    
    console.log('Initializing Fathom player controls...');
    
    // Find required elements
    const videoElement = document.querySelector('video');
    const playerSection = document.querySelector('section.absolute');
    const existingPlayhead = document.querySelector('ui-playhead');

   

  
    
    if (!videoElement || !playerSection || !existingPlayhead) {
        console.log('Required elements not found, retrying...');
        return false;
    }
    
    console.log('Found all required elements, creating controls...');
    
    // Create and insert controls
    const controlsWrapper = createControlsStructure();
    
    // Move existing progress bar
    const progressContainer = controlsWrapper.querySelector('.progress-bar-container');
    progressContainer.appendChild(existingPlayhead);
    
    // Add controls to player
    playerSection.appendChild(controlsWrapper);
    
    // Set up event listeners
    const playButton = controlsWrapper.querySelector('.play-pause');
    const volumeContainer = controlsWrapper.querySelector('.volume-container');
    const timeDisplay = controlsWrapper.querySelector('.time-display');

    const speedButton = controlsWrapper.querySelector('.speed-button');
    const speedMenu = controlsWrapper.querySelector('.speed-menu');
    const fullscreenButton = controlsWrapper.querySelector('.fullscreen-button');

    if (speedButton && speedMenu) {
        setupSpeedControl(videoElement, speedButton, speedMenu);
    }
    if (volumeContainer) {
        setupVolumeControl(videoElement, volumeContainer);
    }
    if (fullscreenButton) {
        setupFullscreenControl(videoElement, fullscreenButton);
    }
    
    if (!playButton || !timeDisplay) {
        console.error('Failed to find control elements');
        return false;
    }
    
    function updatePlayButton() {
        playButton.innerHTML = videoElement.paused ? 
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>` :
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>`;
    }
    
    function updateTimeDisplay() {
        const current = formatTime(videoElement.currentTime);
        const duration = formatTime(videoElement.duration);
        timeDisplay.textContent = `${current} / ${duration}`;
    }
    
    playButton.addEventListener('click', () => {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
        updatePlayButton();
    });
    
    videoElement.addEventListener('play', updatePlayButton);
    videoElement.addEventListener('pause', updatePlayButton);
    videoElement.addEventListener('timeupdate', updateTimeDisplay);
    
    isInitialized = true;
    console.log('Player controls initialized successfully');
    return true;
}

// Initialize with retry mechanism
function initializeWithRetry(maxAttempts = 5, currentAttempt = 0) {
    console.log(`Initialization attempt ${currentAttempt + 1} of ${maxAttempts}`);
    
    if (currentAttempt >= maxAttempts) {
        console.log('Max initialization attempts reached');
        return;
    }
    
    if (!initializePlayer()) {
        setTimeout(() => {
            initializeWithRetry(maxAttempts, currentAttempt + 1);
        }, 1000);
    }
}

// Start initialization when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeWithRetry());
} else {
    initializeWithRetry();
}