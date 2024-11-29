import { useCallback, useEffect, useRef, useState } from "react";
import { replaceMacros } from "../../SystemComponents/Utils/macroReplacement";
export function useUpdateDataWorker() {
  const [updatedData, setUpdatedData] = useState([]);
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize the Web Worker
    workerRef.current = new Worker(
      new URL("./updateDataWorker.js", import.meta.url)
    );

    // Listen for messages from the worker
    workerRef.current.onmessage = (e) => {
      const { index, newData } = e.data;
      setUpdatedData((prev) => {
        const newDataArray = [...prev];
        newDataArray[index] = newData;
        return newDataArray;
      });
    };

    // Cleanup the worker on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // Function to send data to the worker
  const processUpdate = useCallback((index, pvData, props, theme) => {
    if (workerRef.current) {
      const {
        useTimeStamp,
        legend,
        yHoverFormat,
        lineColor,
        pvs,
        macros,
        maxLength,
      } = props;

      const themeColor = theme.palette.reactVis.lineColors[index];
      const name = legend?.[index] || replaceMacros(pvs[index], macros);
      workerRef.current.postMessage({
        index,
        pvData,
        maxLength,
        useTimeStamp,
        name,
        yHoverFormat,
        themeColor,
        lineColor,
      });
    }
  }, []);

  return [updatedData, processUpdate];
}
