import { useState, useEffect, useRef } from "react";

export function useDataTransformationWebWorker(value, rows, initialized) {
  const [transformedData, setTransformedData] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize the worker
    workerRef.current = new Worker(new URL('./dataTransformationWorker.js', import.meta.url));

    // Listen for messages from the worker
    workerRef.current.onmessage = (e) => {
      setTransformedData(e.data.z); // Update the transformed data
    };

    // Cleanup the worker on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []); // Runs only once on mount

  useEffect(() => {
    // Only send data if `initialized` is true and `value` is present
    if (initialized && value && rows && workerRef.current) {
      workerRef.current.postMessage({ value, rows });
    }
  }, [initialized, value, rows]);

  return transformedData;
}
