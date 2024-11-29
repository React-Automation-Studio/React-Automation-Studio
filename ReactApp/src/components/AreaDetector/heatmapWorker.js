// Worker script: heatmapWorker.js

onmessage = function (e) {
  const { data, colors } = e.data;
  if (!data || !colors) return;
  if (!Array.isArray(data)) return;
  if (data[0].length === 0) return;
  // Dimensions of the heatmap
  const width = data[0].length;
  const height = data.length;

  // Create an ImageData object
  const imageData = new ImageData(width, height);

  // Function to convert hex color to RGBA
  const hexToRGBA = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
      a: 255, // Full opacity
    };
  };

  // Populate ImageData with colors
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = data[y][x]; // Get the value at (x, y)
      const color = hexToRGBA(colors[value]); // Map value to color

      const index = (y * width + x) * 4; // Calculate pixel index
      imageData.data[index] = color.r; // Red
      imageData.data[index + 1] = color.g; // Green
      imageData.data[index + 2] = color.b; // Blue
      imageData.data[index + 3] = color.a; // Alpha
    }
  }

  // Post the processed ImageData back to the main thread
  postMessage({ imageData });
};
