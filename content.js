let isInitialized = false;

// Helper function to safely create elements
function createControlElement(type, className, innerHTML = "") {
  const element = document.createElement(type);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

function createControlsStructure() {
  // Create main wrapper
  const wrapper = createControlElement("div", "video-controls-wrapper");

  // Create progress bar container
  const progressContainer = createControlElement(
    "div",
    "progress-bar-container"
  );
  wrapper.appendChild(progressContainer);

  // Create custom controls container
  const customControls = createControlElement("div", "fathom-custom-controls");

  // Create left controls group
  const leftControls = createControlElement("div", "controls-left");

  // Create play button
  const playButton = createControlElement(
    "button",
    "control-button play-pause"
  );
  playButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
    `;

  // Create volume control container
  const volumeContainer = createControlElement('div', 'volume-container');
    
  // Create volume button
  const volumeButton = createControlElement('button', 'control-button volume-button');
  volumeButton.innerHTML = getVolumeIcon(1);

  // Create volume slider container
  const volumeSliderContainer = createControlElement('div', 'volume-slider-container');
  
  // Create wrapper for slider and progress
  const volumeSliderWrapper = createControlElement('div', 'volume-slider-wrapper');
  
  // Create background track
  const volumeBackground = createControlElement('div', 'volume-slider-background');
  
  // Create progress fill
  const volumeProgress = createControlElement('div', 'volume-slider-progress');
  volumeProgress.style.width = '100%';
  
  // Create volume slider input
  const volumeSlider = createControlElement('input', 'volume-slider');
  volumeSlider.type = 'range';
  volumeSlider.min = '0';
  volumeSlider.max = '100';
  volumeSlider.value = '100';
  
  // Assemble volume control elements
  volumeSliderWrapper.appendChild(volumeBackground);
  volumeSliderWrapper.appendChild(volumeProgress);
  volumeSliderWrapper.appendChild(volumeSlider);
  volumeSliderContainer.appendChild(volumeSliderWrapper);
  volumeContainer.appendChild(volumeButton);
  volumeContainer.appendChild(volumeSliderContainer);


  // Create time display
  const timeDisplay = createControlElement(
    "span",
    "time-display",
    "0:00 / 0:00"
  );

  leftControls.appendChild(playButton);
  leftControls.appendChild(volumeContainer);
  leftControls.appendChild(timeDisplay);

  // Create right controls group
  const rightControls = createControlElement("div", "controls-right");

  // Create speed control
  const speedContainer = createControlElement("div", "speed-container");
  const speedButton = createControlElement(
    "button",
    "control-button speed-button"
  );
  speedButton.innerHTML = `
        <span class="speed-label">1x</span>
    `;

  // Create speed menu
  const speedMenu = createControlElement("div", "speed-menu");
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  speedOptions.forEach((speed) => {
    const option = createControlElement("button", "speed-option");
    option.textContent = `${speed}x`;
    option.dataset.speed = speed;
    if (speed === 1) option.classList.add("active");
    speedMenu.appendChild(option);
  });

  speedContainer.appendChild(speedButton);
  speedContainer.appendChild(speedMenu);

  // Create fullscreen button
  const fullscreenButton = createControlElement(
    "button",
    "control-button fullscreen-button"
  );
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
  if (!seconds || isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function setupSpeedControl(videoElement, speedButton, speedMenu) {
  let menuVisible = false;

  // Toggle speed menu
  speedButton.addEventListener("click", (e) => {
    e.stopPropagation();
    menuVisible = !menuVisible;
    speedMenu.classList.toggle("visible", menuVisible);
  });

  // Handle speed selection
  speedMenu.addEventListener("click", (e) => {
    const speedOption = e.target.closest(".speed-option");
    if (!speedOption) return;

    const speed = parseFloat(speedOption.dataset.speed);
    videoElement.playbackRate = speed;

    // Update UI
    speedButton.querySelector(".speed-label").textContent = `${speed}x`;
    speedMenu.querySelectorAll(".speed-option").forEach((opt) => {
      opt.classList.toggle("active", opt === speedOption);
    });

    menuVisible = false;
    speedMenu.classList.remove("visible");
  });

  // Close menu when clicking outside
  document.addEventListener("click", () => {
    if (menuVisible) {
      menuVisible = false;
      speedMenu.classList.remove("visible");
    }
  });
}

function setupFullscreenControl(videoElement, fullscreenButton) {
  fullscreenButton.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.log(err));
      fullscreenButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
            `;
    } else {
      videoElement.requestFullscreen().catch((err) => console.log(err));
      fullscreenButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
            `;
    }
  });

  // Update button icon when fullscreen changes
  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = document.fullscreenElement !== null;
    fullscreenButton.innerHTML = isFullscreen
      ? `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
        `
      : `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
        `;
  });
}

// Add this function to get the correct volume icons
function getVolumeIcon(volume) {
    if (volume === 0) {
        return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
        `;
    } else if (volume <= 0.5) {
        return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
        `;
    } else {
        return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
        `;
    }
}

// Add this new function to handle volume controls// Update the setupVolumeControl function:
function setupVolumeControl(videoElement, volumeContainer) {
    const volumeButton = volumeContainer.querySelector('.volume-button');
    const volumeSlider = volumeContainer.querySelector('.volume-slider');
    const volumeProgress = volumeContainer.querySelector('.volume-slider-progress');
    let previousVolume = 1;
    let isDragging = false;

    // Function to update volume UI
    function updateVolumeUI(volume, updateSlider = true) {
        // Update the progress fill
        volumeProgress.style.width = `${volume * 100}%`;
        
        // Update the slider value if needed
        if (updateSlider) {
            volumeSlider.value = volume * 100;
        }
        
        // Update the icon
        volumeButton.innerHTML = getVolumeIcon(volume);
    }

    // Initialize volume state
    updateVolumeUI(videoElement.volume);

    // Handle volume slider input
    volumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value) / 100;
        videoElement.volume = volume;
        videoElement.muted = volume === 0;
        updateVolumeUI(volume, false);
        isDragging = true;
    });

     // Handle slider change (on release)
     volumeSlider.addEventListener('change', (e) => {
        isDragging = false;
        const volume = parseFloat(e.target.value) / 100;
        if (volume > 0) {
            previousVolume = volume;
        }
    });


 // Handle volume button click
 volumeButton.addEventListener('click', () => {
    if (videoElement.volume === 0 || videoElement.muted) {
        videoElement.muted = false;
        videoElement.volume = previousVolume;
        updateVolumeUI(previousVolume);
    } else {
        previousVolume = videoElement.volume;
        videoElement.volume = 0;
        updateVolumeUI(0);
    }
});

    // Add mouse wheel volume control
    volumeContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const direction = e.deltaY < 0 ? 1 : -1;
        const step = 0.05;
        const newVolume = Math.max(0, Math.min(1, videoElement.volume + (direction * step)));
        videoElement.volume = newVolume;
        updateVolumeUI(newVolume);
        if (newVolume > 0) {
            previousVolume = newVolume;
        }
    });
}

function initializePlayer() {
  if (isInitialized) return;

  console.log("Initializing Fathom player controls...");

  // Find required elements
  const videoElement = document.querySelector("video");
  const playerSection = document.querySelector("section.absolute");
  const existingPlayhead = document.querySelector("ui-playhead");

  if (!videoElement || !playerSection || !existingPlayhead) {
    console.log("Required elements not found, retrying...");
    return false;
  }

  console.log("Found all required elements, creating controls...");

  // Create and insert controls
  const controlsWrapper = createControlsStructure();

  // Move existing progress bar
  const progressContainer = controlsWrapper.querySelector(
    ".progress-bar-container"
  );
  progressContainer.appendChild(existingPlayhead);

  // Add controls to player
  playerSection.appendChild(controlsWrapper);

  // Set up event listeners
  const playButton = controlsWrapper.querySelector(".play-pause");
  const volumeContainer = controlsWrapper.querySelector(".volume-container");
  const timeDisplay = controlsWrapper.querySelector(".time-display");

  const speedButton = controlsWrapper.querySelector(".speed-button");
  const speedMenu = controlsWrapper.querySelector(".speed-menu");
  const fullscreenButton = controlsWrapper.querySelector(".fullscreen-button");

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
    console.error("Failed to find control elements");
    return false;
  }

  function updatePlayButton() {
    playButton.innerHTML = videoElement.paused
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>`;
  }

  function updateTimeDisplay() {
    const current = formatTime(videoElement.currentTime);
    const duration = formatTime(videoElement.duration);
    timeDisplay.textContent = `${current} / ${duration}`;
  }

  playButton.addEventListener("click", () => {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
    updatePlayButton();
  });

  videoElement.addEventListener("play", updatePlayButton);
  videoElement.addEventListener("pause", updatePlayButton);
  videoElement.addEventListener("timeupdate", updateTimeDisplay);

  isInitialized = true;
  console.log("Player controls initialized successfully");
  return true;
}

// Initialize with retry mechanism
function initializeWithRetry(maxAttempts = 5, currentAttempt = 0) {
  console.log(`Initialization attempt ${currentAttempt + 1} of ${maxAttempts}`);

  if (currentAttempt >= maxAttempts) {
    console.log("Max initialization attempts reached");
    return;
  }

  if (!initializePlayer()) {
    setTimeout(() => {
      initializeWithRetry(maxAttempts, currentAttempt + 1);
    }, 1000);
  }
}

// Start initialization when the page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initializeWithRetry());
} else {
  initializeWithRetry();
}
