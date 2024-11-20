// Worker script: updateDataWorker.js

// Internal state to store plot data

const data = [];

onmessage = function (e) {
   
  const { index, pvData,maxLength,useTimeStamp,name,yHoverFormat,themeColor,lineColor } = e.data;
  const { initialized, value: rawValue, timestamp } = pvData;

  if (!initialized) return; // Ignore uninitialized PVs

  const value = Array.isArray(rawValue) ? rawValue : [rawValue];
  

  // Ensure data[index] exists
  if (!data[index]) {
    data[index] = { x: [], y: [] };
  }

  // Update the Y values
  const newY = data[index].y.concat(value).slice(-maxLength);

  // Update the X values
  const newX = useTimeStamp
    ? data[index].x.concat(value.map((_, i) => new Date((timestamp + i) * 1000))).slice(-maxLength)
    : Array.from(newY.keys());

  // Update internal state
  data[index] = { x: newX, y: newY };

  // Send updated data back to the main thread
  postMessage({
    index,
    newData: {
      x: newX,
      y: newY,
      type: "scatter",
      mode: "lines",
      marker: {
        color: lineColor?.[index] || themeColor,
      },
      name:name,
     
      hovertemplate:yHoverFormat
        ? `(%{y:${yHoverFormat}}) %{x}<extra>%{fullData.name}</extra>`
        : "(%{y}) %{x}<extra>%{fullData.name}</extra>",
    },
  });
};
