// src/visualizers/AbstractShapes.js
export default function AbstractShapes(ctx, dataArray, bufferLength, canvas) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);

    // Slower rotation for the entire shape
    const rotation = (Date.now() / 4000) % (Math.PI * 2); // Slow rotation
    ctx.rotate(rotation);

    // Main loop to create multiple parametric lines
    for (let i = 0; i < bufferLength; i++) {
        // Define parametric angle and radius
        const angle = (i / bufferLength) * Math.PI * 6; // Increase cycles for more density
        const frequencyFactor = (dataArray[i] / 255) * 2.5; // Increase dynamic scaling factor
        const time = Date.now() / 1000; // Time factor for evolving curves

        // Parametric equations for x and y with increased scale
        const x = (frequencyFactor * 150 + 150) * Math.sin(3 * angle + time) * Math.cos(angle * 2);
        const y = (frequencyFactor * 150 + 150) * Math.cos(3 * angle + time) * Math.sin(angle * 2);

        // Draw a line from the center to the calculated point
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);

        // Color change with a gradient effect based on frequency and time
        ctx.strokeStyle = `hsl(${(i * 5 + Date.now() / 50) % 360}, 80%, 60%)`;
        ctx.lineWidth = 1.8 + (dataArray[i] / 255) * 3; // Make lines bolder
        ctx.stroke();
    }

    ctx.restore();
}
