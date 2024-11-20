onmessage = (e) => {
    const { value, rows } = e.data;
    const array = new Uint8Array(value);
    const cols = array.length / rows;
    const z = Array.from({ length: rows }, (_, i) =>
      new Uint8Array(array.buffer, i * cols, cols)
    );
    postMessage({ z });
  };