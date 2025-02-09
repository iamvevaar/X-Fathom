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

   // Add loader container (will be positioned in the center of video)
   const loaderContainer = createControlElement("div", "video-loader-container");
   loaderContainer.innerHTML = `
       <div class="spinner-container">
           <div class="spinner-ring"></div>
       </div>
   `;
   
   // Add loader to the correct location - the menu element inside video-player
   const menu = document.querySelector('video-player menu');
   if (menu) {
       // Insert loader as the first child of menu, before all other controls
       menu.insertBefore(loaderContainer, menu.firstChild);
   }

  // Create backward 10s button
  const backwardButton = createControlElement(
    "button",
    "control-button skip-button"
  );
  backwardButton.setAttribute("title", "Previous 10 seconds");
  backwardButton.innerHTML = `
     
<svg width="24" height="24" viewBox="0 0 216 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M88.8 43.8431C92 45.6906 92 50.3094 88.8 52.1569L31.2 85.4123C28 87.2598 24 84.9504 24 81.2554L24 14.7446C24 11.0496 28 8.74018 31.2 10.5877L88.8 43.8431Z" fill="white"/>
<path d="M40.3444 154.25C37.2456 156.472 36.517 160.803 38.9475 163.741C50.7433 178.001 66.2987 188.745 83.9117 194.712C103.71 201.42 125.113 201.754 145.111 195.669C165.109 189.584 182.698 177.384 195.404 160.786C208.111 144.187 215.296 124.024 215.951 103.131C216.605 82.2374 210.696 61.6641 199.053 44.3029C187.41 26.9417 170.62 13.6655 151.042 6.34055C131.463 -0.984429 110.082 -1.98989 89.9023 3.46549C71.9505 8.3187 55.7531 18.0681 43.0879 31.5614C40.4783 34.3416 40.9344 38.7098 43.888 41.1214C46.8417 43.533 51.1719 43.0715 53.8121 40.3203C64.6292 29.0484 78.3413 20.8951 93.506 16.7954C110.899 12.0933 129.328 12.9599 146.203 19.2734C163.078 25.587 177.55 37.0299 187.585 51.9938C197.62 66.9577 202.713 84.6902 202.149 102.699C201.585 120.707 195.392 138.086 184.44 152.392C173.488 166.699 158.328 177.214 141.091 182.459C123.854 187.704 105.407 187.415 88.3426 181.634C73.4642 176.593 60.2893 167.597 50.1988 155.671C47.736 152.759 43.4431 152.028 40.3444 154.25Z" fill="white"/>
<path d="M93.2175 65.6121V143H83.8464V75.4367H83.3929L64.4994 87.982V78.4597L83.8464 65.6121H93.2175ZM140.716 144.058C135.023 144.058 130.173 142.509 126.168 139.41C122.162 136.286 119.102 131.765 116.986 125.845C114.87 119.9 113.811 112.72 113.811 104.306C113.811 95.9425 114.87 88.8007 116.986 82.8808C119.127 76.9356 122.2 72.4012 126.206 69.2774C130.236 66.1285 135.073 64.554 140.716 64.554C146.359 64.554 151.183 66.1285 155.188 69.2774C159.219 72.4012 162.292 76.9356 164.408 82.8808C166.55 88.8007 167.62 95.9425 167.62 104.306C167.62 112.72 166.562 119.9 164.446 125.845C162.33 131.765 159.269 136.286 155.264 139.41C151.258 142.509 146.409 144.058 140.716 144.058ZM140.716 135.745C146.359 135.745 150.742 133.024 153.866 127.583C156.99 122.142 158.551 114.383 158.551 104.306C158.551 97.6051 157.833 91.8993 156.398 87.1885C154.987 82.4777 152.946 78.8879 150.276 76.4192C147.631 73.9504 144.444 72.7161 140.716 72.7161C135.123 72.7161 130.753 75.4745 127.604 80.9914C124.455 86.4831 122.88 94.2547 122.88 104.306C122.88 111.007 123.586 116.7 124.996 121.386C126.407 126.071 128.435 129.636 131.08 132.08C133.75 134.523 136.962 135.745 140.716 135.745Z" fill="white"/>
</svg>

  `;

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

  // Create forward 10s button
  const forwardButton = createControlElement(
    "button",
    "control-button skip-button"
  );
  forwardButton.setAttribute("title", "Next 10 seconds");
  forwardButton.innerHTML = `
       
<svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M115.979 44.9641C113.733 46.3647 113.733 49.6353 115.979 51.0359L172.306 86.158C174.689 87.6439 177.777 85.9304 177.777 83.122V12.878C177.777 10.0696 174.689 8.35608 172.306 9.84204L115.979 44.9641Z" fill="white"/>
<path d="M163.022 154.543C165.737 156.645 166.387 160.504 164.316 163.243C153.349 177.751 138.801 188.675 122.304 194.712C103.972 201.42 84.1549 201.754 65.6379 195.669C47.1209 189.584 30.8351 177.384 19.0698 160.786C7.3045 144.187 0.651245 124.024 0.0452576 103.131C-0.560745 82.2374 4.911 61.6641 15.6913 44.3029C26.4717 26.9417 42.0186 13.6655 60.1466 6.34055C78.2747 -0.984429 98.0724 -1.98989 116.757 3.46549C133.559 8.37131 148.702 18.28 160.484 32.0016C162.727 34.6143 162.318 38.5151 159.736 40.7927C156.862 43.3266 152.456 42.8618 149.897 40.0106C139.925 28.899 127.333 20.8574 113.42 16.7954C97.3157 12.0933 80.2517 12.9599 64.6269 19.2734C49.002 25.587 35.6019 37.0299 26.3102 51.9938C17.0184 66.9577 12.3022 84.6902 12.8246 102.699C13.3469 120.707 19.0814 138.086 29.2221 152.392C39.3628 166.699 53.3998 177.214 69.3599 182.459C85.32 187.704 102.401 187.415 118.201 181.634C131.876 176.63 143.997 167.729 153.313 155.933C155.673 152.945 160.012 152.212 163.022 154.543Z" fill="white"/>
<path d="M60.2175 65.6121V143H50.8464V75.4367H50.3929L31.4994 87.982V78.4597L50.8464 65.6121H60.2175ZM107.716 144.058C102.023 144.058 97.1733 142.509 93.1679 139.41C89.1624 136.286 86.1017 131.765 83.9856 125.845C81.8695 119.9 80.8115 112.72 80.8115 104.306C80.8115 95.9425 81.8695 88.8007 83.9856 82.8808C86.1269 76.9356 89.2002 72.4012 93.2057 69.2774C97.2363 66.1285 102.073 64.554 107.716 64.554C113.359 64.554 118.183 66.1285 122.188 69.2774C126.219 72.4012 129.292 76.9356 131.408 82.8808C133.55 88.8007 134.62 95.9425 134.62 104.306C134.62 112.72 133.562 119.9 131.446 125.845C129.33 131.765 126.269 136.286 122.264 139.41C118.258 142.509 113.409 144.058 107.716 144.058ZM107.716 135.745C113.359 135.745 117.742 133.024 120.866 127.583C123.99 122.142 125.551 114.383 125.551 104.306C125.551 97.6051 124.833 91.8993 123.398 87.1885C121.987 82.4777 119.946 78.8879 117.276 76.4192C114.631 73.9504 111.444 72.7161 107.716 72.7161C102.123 72.7161 97.7527 75.4745 94.6038 80.9914C91.4549 86.4831 89.8804 94.2547 89.8804 104.306C89.8804 111.007 90.5858 116.7 91.9965 121.386C93.4072 126.071 95.4351 129.636 98.0802 132.08C100.75 134.523 103.962 135.745 107.716 135.745Z" fill="white"/>
</svg>

    `;

  // Create volume control container
  const volumeContainer = createControlElement("div", "volume-container");

  // Create volume button
  const volumeButton = createControlElement(
    "button",
    "control-button volume-button"
  );
  volumeButton.innerHTML = getVolumeIcon(1);

  // Create volume slider container
  const volumeSliderContainer = createControlElement(
    "div",
    "volume-slider-container"
  );

  // Create wrapper for slider and progress
  const volumeSliderWrapper = createControlElement(
    "div",
    "volume-slider-wrapper"
  );

  // Create background track
  const volumeBackground = createControlElement(
    "div",
    "volume-slider-background"
  );

  // Create progress fill
  const volumeProgress = createControlElement("div", "volume-slider-progress");
  volumeProgress.style.width = "100%";

  // Create volume slider input
  const volumeSlider = createControlElement("input", "volume-slider");
  volumeSlider.type = "range";
  volumeSlider.min = "0";
  volumeSlider.max = "100";
  volumeSlider.value = "100";

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

  // Assemble controls in correct order
  leftControls.appendChild(backwardButton);
  leftControls.appendChild(playButton);
  leftControls.appendChild(forwardButton);
  leftControls.appendChild(volumeContainer);
  leftControls.appendChild(timeDisplay);

  // Create right controls group
  const rightControls = createControlElement("div", "controls-right");

  // Create speed control
  const speedContainer = createControlElement("div", "speed-container");

  // Create speed button (will now be on the right)
  const speedButton = createControlElement(
    "button",
    "control-button speed-button"
  );
  speedButton.innerHTML = `
     <span class="speed-label">1x</span>
 `;

  // Create speed slider container (will now be on the left)
  const speedSliderContainer = createControlElement(
    "div",
    "speed-slider-container"
  );

  // Create wrapper for slider and progress
  const speedSliderWrapper = createControlElement(
    "div",
    "speed-slider-wrapper"
  );

  // Create background track
  const speedBackground = createControlElement(
    "div",
    "speed-slider-background"
  );

  // Create progress fill
  const speedProgress = createControlElement("div", "speed-slider-progress");
  speedProgress.style.width = "50%"; // Default 1x speed is in the middle

  // Create speed slider input
  const speedSlider = createControlElement("input", "speed-slider");
  speedSlider.type = "range";
  speedSlider.min = "0";
  speedSlider.max = "100";
  speedSlider.value = "50"; // Default value for 1x speed

  // Assemble speed control elements in the new order
  speedSliderWrapper.appendChild(speedBackground);
  speedSliderWrapper.appendChild(speedProgress);
  speedSliderWrapper.appendChild(speedSlider);
  speedSliderContainer.appendChild(speedSliderWrapper);

  // Add elements in reverse order (slider first, then button)
  speedContainer.appendChild(speedButton); // This will appear on the right
  speedContainer.appendChild(speedSliderContainer); // This will appear on the left

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

function setupSpeedControl(videoElement, speedContainer) {
  // Get all the necessary elements
  const speedButton = speedContainer.querySelector(".speed-button");
  const speedSlider = speedContainer.querySelector(".speed-slider");
  const speedProgress = speedContainer.querySelector(".speed-slider-progress");
  const speedLabel = speedButton.querySelector(".speed-label");

  // Convert slider value (0-100) to speed (0.25-2)
  function sliderToSpeed(value) {
    // Using a non-linear scale for better control around 1x speed
    const normalizedValue = value / 100; // Convert to 0-1 range
    if (normalizedValue <= 0.5) {
      // First half maps to 0.25-1 (slower speeds)
      return 0.25 + normalizedValue * 1.5; // 1.5 = 0.75 * 2
    } else {
      // Second half maps to 1-2 (faster speeds)
      return 1 + (normalizedValue - 0.5) * 2;
    }
  }

  // Convert speed to slider value (inverse of sliderToSpeed)
  function speedToSlider(speed) {
    if (speed <= 1) {
      // Map 0.25-1 to 0-50
      return ((speed - 0.25) / 0.75) * 50;
    } else {
      // Map 1-2 to 50-100
      return 50 + ((speed - 1) / 1) * 50;
    }
  }

  // Update all UI elements to reflect current speed
  function updateSpeedUI(speed, updateSlider = true) {

    // Update the label with formatted speed
    speedLabel.textContent = `${speed.toFixed(2)}x`;

    // Calculate slider value
    const sliderValue = speedToSlider(speed);

    // Update the progress fill width
    speedProgress.style.width = `${sliderValue}%`;

    // Update slider position if needed
    if (updateSlider) {
      speedSlider.value = sliderValue;
    }
  }

  // Handle slider input (during drag)
  speedSlider.addEventListener("input", (e) => {
    const sliderValue = parseFloat(e.target.value);
    const speed = sliderToSpeed(sliderValue);

    // Update video playback rate
    videoElement.playbackRate = speed;

    // Update UI without updating slider (as it's being dragged)
    updateSpeedUI(speed, false);

  });

  // Mouse wheel support for fine-tuning
  speedContainer.addEventListener("wheel", (e) => {
    e.preventDefault();

    // Get current speed and calculate new speed
    const currentSpeed = videoElement.playbackRate;
    const direction = e.deltaY < 0 ? 1 : -1;
    const step = 0.1;
    const newSpeed = Math.max(
      0.25,
      Math.min(2, currentSpeed + direction * step)
    );

    // Update video speed
    videoElement.playbackRate = newSpeed;

    // Update all UI elements
    updateSpeedUI(newSpeed);

  });

  // Double-click to reset to normal speed
  speedButton.addEventListener("dblclick", () => {
    videoElement.playbackRate = 1;
    updateSpeedUI(1);
  });

  // Initial setup - set speed to 1x
  videoElement.playbackRate = 1;
  updateSpeedUI(1);

  // Add event listener for playback rate changes
  videoElement.addEventListener("ratechange", () => {
    updateSpeedUI(videoElement.playbackRate);
  });
}

function setupControlsVisibility(videoElement) {
  const videoPlayer = document.querySelector('video-player');
  const controlsWrapper = document.querySelector('.video-controls-wrapper');
  
  if (!videoPlayer || !controlsWrapper) return;

  let mouseTimeoutId = null;
  let isMouseMoving = false;

  // Function to hide controls
  function hideControls() {
      // Don't hide if video is paused
      if (!videoElement.paused) {
          controlsWrapper.style.opacity = '0';
          controlsWrapper.style.transform = 'translateY(10px)';
      }
  }

  // Function to show controls
  function showControls() {
      controlsWrapper.style.opacity = '1';
      controlsWrapper.style.transform = 'translateY(0)';
      
      // Reset any existing timeout
      if (mouseTimeoutId) {
          clearTimeout(mouseTimeoutId);
      }

      // Set new timeout to hide controls after 3 seconds of inactivity
      if (!videoElement.paused) {
          mouseTimeoutId = setTimeout(hideControls, 3000);
      }
  }

  // Handle mouse movement
  videoPlayer.addEventListener('mousemove', () => {
      isMouseMoving = true;
      showControls();
      
      // Reset mouse moving flag after a short delay
      setTimeout(() => {
          isMouseMoving = false;
      }, 150);
  });

  // Keep controls visible when video is paused
  videoElement.addEventListener('pause', showControls);

  // Handle mouse leaving the video player
  videoPlayer.addEventListener('mouseleave', () => {
      if (!videoElement.paused) {
          hideControls();
      }
  });

  // Show controls initially
  showControls();
}


function setupVideoLoader(videoElement) {
  const loaderContainer = document.querySelector('.video-loader-container');
  if (!loaderContainer) return;

  // Show loader when video is waiting/buffering
  videoElement.addEventListener('waiting', () => {
      loaderContainer.classList.add('loading');
  });

  // Hide loader when video can play
  videoElement.addEventListener('canplay', () => {
      loaderContainer.classList.remove('loading');
  });

  // Show loader when seeking
  videoElement.addEventListener('seeking', () => {
      loaderContainer.classList.add('loading');
  });

  // Hide loader when done seeking
  videoElement.addEventListener('seeked', () => {
      loaderContainer.classList.remove('loading');
  });

  // Also hide loader when playing (in case other events missed)
  videoElement.addEventListener('playing', () => {
      loaderContainer.classList.remove('loading');
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
  const volumeButton = volumeContainer.querySelector(".volume-button");
  const volumeSlider = volumeContainer.querySelector(".volume-slider");
  const volumeProgress = volumeContainer.querySelector(
    ".volume-slider-progress"
  );
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
  volumeSlider.addEventListener("input", (e) => {
    const volume = parseFloat(e.target.value) / 100;
    videoElement.volume = volume;
    videoElement.muted = volume === 0;
    updateVolumeUI(volume, false);
    isDragging = true;
  });

  // Handle slider change (on release)
  volumeSlider.addEventListener("change", (e) => {
    isDragging = false;
    const volume = parseFloat(e.target.value) / 100;
    if (volume > 0) {
      previousVolume = volume;
    }
  });

  // Handle volume button click
  volumeButton.addEventListener("click", () => {
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
  volumeContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    const step = 0.05;
    const newVolume = Math.max(
      0,
      Math.min(1, videoElement.volume + direction * step)
    );
    videoElement.volume = newVolume;
    updateVolumeUI(newVolume);
    if (newVolume > 0) {
      previousVolume = newVolume;
    }
  });
}

// Add this new function to handle seeking functionality
function setupSkipControls(videoElement, controlsWrapper) {
  const backwardButton = controlsWrapper.querySelector(
    ".skip-button:first-child"
  );
  const forwardButton = controlsWrapper.querySelector(
    ".skip-button:nth-child(3)"
  );

  function seekVideo(offset) {
    const newTime = Math.max(
      0,
      Math.min(videoElement.duration, videoElement.currentTime + offset)
    );
    if (!isNaN(newTime)) {
      videoElement.currentTime = newTime;
    }
  }

  // Helper function to handle button animation
  function animateButton(button, direction) {
    // Remove any existing animation class
    button.classList.remove("animate-backward", "animate-forward");

    // Force a reflow to ensure animation plays again even if clicked rapidly
    void button.offsetWidth;

    // Add the appropriate animation class
    button.classList.add(`animate-${direction}`);

    // Clean up animation class after it completes
    setTimeout(() => {
      button.classList.remove(`animate-${direction}`);
    }, 500); // Match this with animation duration
  }

  // Add backward seeking with animation
  backwardButton.addEventListener("click", () => {
    seekVideo(-10);
    animateButton(backwardButton, "backward");
  });

  // Add forward seeking with animation
  forwardButton.addEventListener("click", () => {
    seekVideo(10);
    animateButton(forwardButton, "forward");
  });

  // Add keyboard shortcuts with visual feedback
  document.addEventListener("keydown", (e) => {
    const isInputFocused =
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA";

    if (!isInputFocused) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekVideo(-10);
        animateButton(backwardButton, "backward");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seekVideo(10);
        animateButton(forwardButton, "forward");
      }
    }
  });
}

// Update the setupKeyboardControls function
function setupKeyboardControls(videoElement, controlsWrapper) {
  // Cache all the control elements we need
  const playButton = controlsWrapper.querySelector('.play-pause');
  const volumeContainer = controlsWrapper.querySelector('.volume-container');
  const volumeButton = volumeContainer?.querySelector('.volume-button');
  const volumeProgress = volumeContainer?.querySelector('.volume-slider-progress');
  const volumeSlider = volumeContainer?.querySelector('.volume-slider');
  const volumeSliderContainer = volumeContainer?.querySelector('.volume-slider-container');
  const fullscreenButton = controlsWrapper.querySelector('.fullscreen-button');
  
  
  let previousVolume = 1;
  let volumeVisibilityTimeout;

    // Function to update volume with bounds checking and UI update
    function adjustVolume(delta) {
        // Calculate new volume, keeping it between 0 and 1
        const newVolume = Math.max(0, Math.min(1, videoElement.volume + delta));
        
        // If we're increasing volume from 0, unmute first
        if (delta > 0 && (videoElement.volume === 0 || videoElement.muted)) {
            videoElement.muted = false;
        }
        
        // Update video volume
        videoElement.volume = newVolume;
        
        // If new volume is greater than 0, store it as previous volume
        if (newVolume > 0) {
            previousVolume = newVolume;
        }
        
        // Update the UI elements
        updateVolumeUI(newVolume);
        
        // Show a temporary visual indicator of volume change
        volumeButton?.classList.add('button-pressed');
        setTimeout(() => volumeButton?.classList.remove('button-pressed'), 200);
    }

    function updateVolumeUI(volume, updateSlider = true) {
        // Update the progress fill
        if (volumeProgress) {
            volumeProgress.style.width = `${volume * 100}%`;
        }

        // Update the slider value if needed
        if (updateSlider && volumeSlider) {
            volumeSlider.value = volume * 100;
        }

        // Update the icon
        if (volumeButton) {
            volumeButton.innerHTML = getVolumeIcon(volume);
        }
    }

// Function to show volume slider temporarily
function showVolumeSlider() {
    // Instead of directly setting style.width, use a class
    if (volumeSliderContainer) {
        volumeSliderContainer.classList.add('volume-slider-visible');
        
        // Clear any existing timeout
        if (volumeVisibilityTimeout) {
            clearTimeout(volumeVisibilityTimeout);
        }

        // Set timeout to remove the class
        volumeVisibilityTimeout = setTimeout(() => {
            if (volumeSliderContainer) {
                volumeSliderContainer.classList.remove('volume-slider-visible');
            }
        }, 2000);
    }
}
    function adjustVolume(delta) {
        // Show the volume slider when adjusting volume
        showVolumeSlider();

        // Calculate new volume, keeping it between 0 and 1
        const newVolume = Math.max(0, Math.min(1, videoElement.volume + delta));
        
        if (delta > 0 && (videoElement.volume === 0 || videoElement.muted)) {
            videoElement.muted = false;
        }
        
        videoElement.volume = newVolume;
        
        if (newVolume > 0) {
            previousVolume = newVolume;
        }
        
        updateVolumeUI(newVolume);
        
        volumeButton?.classList.add('button-pressed');
        setTimeout(() => volumeButton?.classList.remove('button-pressed'), 200);
    }

    

     // Add cleanup function
     function cleanup() {
        if (volumeVisibilityTimeout) {
            clearTimeout(volumeVisibilityTimeout);
        }
    }

     // Clean up when video is unloaded
     videoElement.addEventListener('unload', cleanup);

    function toggleMute() {
        if (videoElement.volume === 0 || videoElement.muted) {
            videoElement.muted = false;
            videoElement.volume = previousVolume;
            updateVolumeUI(previousVolume);
        } else {
            previousVolume = videoElement.volume;
            videoElement.volume = 0;
            videoElement.muted = true;
            updateVolumeUI(0);
        }
    }

    // Add function to handle percentage-based seeking
    function seekToPercentage(percentage) {
        // Ensure the video duration is available
        if (!videoElement.duration || isNaN(videoElement.duration)) return;
        
        // Calculate the target time (percentage of total duration)
        const targetTime = (percentage / 100) * videoElement.duration;
        
        // Ensure the time is within valid bounds
        const newTime = Math.max(0, Math.min(videoElement.duration, targetTime));
        
        // Update video time
        if (!isNaN(newTime)) {
            videoElement.currentTime = newTime;
            
            // Optional: Show a visual indicator of the jump
            // We can use the existing progress bar for this
            const progressBar = controlsWrapper.querySelector('ui-playhead');
            if (progressBar) {
                // Add a quick highlight effect
                progressBar.style.transition = 'opacity 0.2s';
                progressBar.style.opacity = '0.7';
                setTimeout(() => {
                    progressBar.style.opacity = '1';
                }, 200);
            }
        }
    }

    // Add the keyboard event listener
    document.addEventListener('keydown', (e) => {
        // Don't handle shortcuts if user is typing in an input
        const isInputFocused = document.activeElement.tagName === 'INPUT' || 
                             document.activeElement.tagName === 'TEXTAREA';
        
        if (!isInputFocused) {
            switch (e.key.toLowerCase()) {
                case ' ':  // Space bar
                    e.preventDefault();
                    if (videoElement.paused) {
                        videoElement.play();
                    } else {
                        videoElement.pause();
                    }
                    playButton?.classList.add('button-pressed');
                    setTimeout(() => playButton?.classList.remove('button-pressed'), 200);
                    break;
                    
                case 'm':
                    toggleMute();
                    volumeButton?.classList.add('button-pressed');
                    setTimeout(() => volumeButton?.classList.remove('button-pressed'), 200);
                    break;
                    
                case 'f':
                    if (document.fullscreenElement) {
                        document.exitFullscreen().catch(err => console.log(err));
                    } else {
                        videoElement.requestFullscreen().catch(err => console.log(err));
                    }
                    fullscreenButton?.classList.add('button-pressed');
                    setTimeout(() => fullscreenButton?.classList.remove('button-pressed'), 200);
                    break;

                case 'arrowup':
                    e.preventDefault(); // Prevent page scroll
                    adjustVolume(0.05); // Increase volume by 5%
                    break;

                case 'arrowdown':
                    e.preventDefault(); // Prevent page scroll
                    adjustVolume(-0.05); // Decrease volume by 5%
                    break;

                    // Add handling for number keys (0-9)
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        // Convert key to percentage (0 = 0%, 1 = 10%, ..., 9 = 90%)
                        const percentage = (e.key === '0' ? 0 : parseInt(e.key) * 10);
                        seekToPercentage(percentage);
                        break;
            }
        }
    });
}
function initializePlayer() {
  if (isInitialized) return;


  // Find required elements
  const videoElement = document.querySelector("video");
  const playerSection = document.querySelector("section.absolute");
  const existingPlayhead = document.querySelector("ui-playhead");

  if (!videoElement || !playerSection || !existingPlayhead) {
    return false;
  }


  // Create and insert controls
  const controlsWrapper = createControlsStructure();

  setupSkipControls(videoElement, controlsWrapper);
  setupKeyboardControls(videoElement, controlsWrapper);  // Add this line
  setupControlsVisibility(videoElement);


  // Move existing progress bar
  const progressContainer = controlsWrapper.querySelector(
    ".progress-bar-container"
  );
  progressContainer.appendChild(existingPlayhead);

  // Add controls to player
  playerSection.appendChild(controlsWrapper);

  setupVideoLoader(videoElement);

  // Set up event listeners
  const playButton = controlsWrapper.querySelector(".play-pause");
  const volumeContainer = controlsWrapper.querySelector(".volume-container");
  const timeDisplay = controlsWrapper.querySelector(".time-display");

  const speedButton = controlsWrapper.querySelector(".speed-button");
  const speedMenu = controlsWrapper.querySelector(".speed-menu");
  const fullscreenButton = controlsWrapper.querySelector(".fullscreen-button");

  const speedContainer = controlsWrapper.querySelector(".speed-container");

  if (speedContainer) {
    setupSpeedControl(videoElement, speedContainer);
  }

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
  return true;
}

// Initialize with retry mechanism
function initializeWithRetry(maxAttempts = 5, currentAttempt = 0) {

  if (currentAttempt >= maxAttempts) {
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
