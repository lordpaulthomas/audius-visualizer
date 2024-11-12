// frontend/src/audioManager.js

let audioContext;
let analyser;
let sourceNode;

function initAudioContext(audioElement) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
  }

  // Only create sourceNode once for the audio element
  if (!sourceNode) {
    sourceNode = audioContext.createMediaElementSource(audioElement);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  return { audioContext, analyser };
}

function disconnectSourceNode() {
  if (sourceNode) {
    sourceNode.disconnect();
    sourceNode = null;  // Ensure it's reset to avoid reconnection issues
  }
}

export { initAudioContext, disconnectSourceNode };
