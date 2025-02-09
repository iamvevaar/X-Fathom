// This script runs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Function to remove elements while keeping the progress bar
    function simplifyPlayer() {
      // Find the main section containing the player controls
      const playerSection = document.querySelector('section.absolute');
      
      if (playerSection) {
        // Keep only the progress bar visible by adding a class
        playerSection.classList.add('simplified-player');
        
        // Optional: Adjust the layout if needed
        const playhead = playerSection.querySelector('ui-playhead');
        if (playhead) {
          playhead.style.flex = '1';
        }
      }
    }
  
    // Run the function immediately
    simplifyPlayer();
  
    // Also run when dynamic content loads (for single-page applications)
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          simplifyPlayer();
        }
      });
    });
  
    // Start observing the document for dynamic changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });