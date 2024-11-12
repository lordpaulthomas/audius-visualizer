// src/visualizers/RadialPulse.js
export default function RadialPulse(ctx, dataArray, bufferLength, canvas) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.0001; // Slow down time for gradual changes
    const maxRadius = Math.min(centerX, centerY) * 1.2; // Increased for longer lines

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);

    // Use parametric equation for dynamic zig-zag or wave-like paths
    for (let i = 0; i < bufferLength; i += 2) {
        const audioFactor = dataArray[i] / 255;
        const angle = (i / bufferLength) * Math.PI * 2 + time; // Gradual rotation

        // Parametric equations for unique paths, now extended for longer lines
        const a = maxRadius * 0.6 * audioFactor;  // Primary amplitude based on audio
        const b = maxRadius * 0.5 * (1 - audioFactor); // Secondary amplitude control
        const x = (a * Math.sin(3 * angle)) + (b * Math.cos(4 * angle));
        const y = (a * Math.cos(3 * angle)) - (b * Math.sin(4 * angle));

        // Draw extended lines with new color palette
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x * 1.5, y * 1.5); // Extended length by 1.5 times
        ctx.strokeStyle = `hsl(${(150 + i * 5 + time * 100) % 360}, 80%, 60%)`; // Cyan to lime green tones
        ctx.lineWidth = 1 + audioFactor * 3; // Thicker line width
        ctx.stroke();

        // Add bright endpoint dots with magenta tones
        ctx.beginPath();
        ctx.arc(x * 1.5, y * 1.5, 4 + audioFactor * 5, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(300 + i * 10) % 360}, 100%, 70%)`; // Magenta hues for endpoints
        ctx.fill();
    }

    ctx.restore();
}
