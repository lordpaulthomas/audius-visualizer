// src/visualizers/CircularLines.js
export default function CircularLines(ctx, dataArray, bufferLength, canvas) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(centerX, centerY) * 6; // Increased radius for fuller screen coverage

  const zoomFactor = 1 + Math.sin(Date.now() * 0.0002) * 0.2; // Slow breathing zoom effect
  const spiralScale = 2.5; // Larger scaling factor for wider spacing between shapes
  const spiralRotation = Date.now() * 0.00005; // Slow rotation for spiraling effect

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(zoomFactor, zoomFactor); // Apply zoom effect

  for (let i = 0; i < bufferLength; i++) {
    const angle = i * spiralRotation; // Positioning around a spiral
    const radius = spiralScale * Math.sqrt(i) * 20; // Larger spacing for a bigger pattern
    const audioValue = dataArray[i % bufferLength] / 255;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // Larger shape size for a fuller visual effect
    const size = audioValue * 14 + 6; // Larger circles for visual emphasis
    const colorHue = (i * 5 + Date.now() / 30) % 360; // Smooth color transitions
    const color = `hsla(${colorHue}, 70%, 60%, ${0.6 + audioValue / 3})`;

    // Draw primary shape (circle)
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Connect shapes with lines for intricate mandala design
    if (i > 0) {
      const prevAngle = (i - 1) * spiralRotation;
      const prevRadius = spiralScale * Math.sqrt(i - 1) * 20;
      const prevX = prevRadius * Math.cos(prevAngle);
      const prevY = prevRadius * Math.sin(prevAngle);

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `hsla(${(colorHue + 180) % 360}, 80%, 50%, ${0.5 + audioValue / 3})`;
      ctx.lineWidth = 2; // Thicker lines for emphasis
      ctx.stroke();
    }
  }

  ctx.restore();
}
