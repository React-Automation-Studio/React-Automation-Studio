import { useState, useEffect, useRef } from "react";

export function useHeatmapWebWorker(data, colors) {
  const [imageData, setImageData] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize worker
    workerRef.current = new Worker(
      new URL("./heatmapWorker.js", import.meta.url)
    );

    // Listen for messages
    workerRef.current.onmessage = (e) => {
      setImageData(e.data.imageData); // Receive processed ImageData
    };

    // Cleanup
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []); // Runs once

  useEffect(() => {
    // Send data to worker when inputs change
    if (data && colors && workerRef.current) {
      workerRef.current.postMessage({ data, colors });
    }
  }, [data, colors]);

  return imageData;
}
