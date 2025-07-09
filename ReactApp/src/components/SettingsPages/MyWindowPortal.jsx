import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom'

const MyWindowPortal = (props) => {
  const containerElRef = useRef(null);
  const externalWindowRef = useRef(null);

  if (!containerElRef.current) {
    containerElRef.current = document.createElement('div');
  }

  useEffect(() => {
    externalWindowRef.current = window.open('', '', 'width=600,height=400,left=200,top=200');
    externalWindowRef.current.document.body.appendChild(containerElRef.current);

    return () => {
      if (externalWindowRef.current) {
        externalWindowRef.current.close();
      }
    };
  }, []);

  return ReactDOM.createPortal(props.children, containerElRef.current);
}

export default MyWindowPortal
