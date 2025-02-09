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