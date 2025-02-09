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
    
    // Create time display
    const timeDisplay = createControlElement('span', 'time-display', '0:00 / 0:00');
    
    leftControls.appendChild(playButton);
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
    const timeDisplay = controlsWrapper.querySelector('.time-display');

    const speedButton = controlsWrapper.querySelector('.speed-button');
    const speedMenu = controlsWrapper.querySelector('.speed-menu');
    const fullscreenButton = controlsWrapper.querySelector('.fullscreen-button');

    if (speedButton && speedMenu) {
        setupSpeedControl(videoElement, speedButton, speedMenu);
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