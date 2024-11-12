// src/visualizers/Waveform.js
export default function Waveform(ctx, dataArray, bufferLength, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;
  
    // Calculate the waveform path and fill areas above/below
    ctx.beginPath();
    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
    }
  
    // Close the path to create a filled area below the waveform
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
  
    // Set gradient fill for the area below the waveform
    const gradientBelow = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
    gradientBelow.addColorStop(0, 'rgba(50, 50, 150, 0.5)'); // Darker blue tone
    gradientBelow.addColorStop(1, 'rgba(20, 20, 80, 0.8)');
    ctx.fillStyle = gradientBelow;
    ctx.fill();

    // Draw the area above the waveform
    ctx.beginPath();
    x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        x += sliceWidth;
    }
  
    // Complete the path for the upper fill
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
  
    // Set gradient fill for the area above the waveform
    const gradientAbove = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
    gradientAbove.addColorStop(0, 'rgba(200, 100, 100, 0.5)'); // Light red/pink tone
    gradientAbove.addColorStop(1, 'rgba(100, 50, 50, 0.3)');
    ctx.fillStyle = gradientAbove;
    ctx.fill();

    // Draw the main waveform line with a glow effect
    ctx.lineWidth = 2;
    ctx.strokeStyle = `hsl(${(Date.now() / 20) % 360}, 100%, 50%)`;
    ctx.shadowBlur = 10; // Glow effect
    ctx.shadowColor = ctx.strokeStyle;
    ctx.stroke();
  
    // Remove shadow for future drawing
    ctx.shadowBlur = 0;
}
