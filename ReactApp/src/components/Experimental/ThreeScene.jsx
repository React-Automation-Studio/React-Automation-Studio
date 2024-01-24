import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { pink } from "@mui/material/colors";
import { lightGreen } from "@mui/material/colors";
import PV from "../SystemComponents/PV";

function Box(props) {
  const [xRotationPv, setXRotaionPv] = useState({ initialized: false });
  const [yRotationPv, setYRotaionPv] = useState({ initialized: false });
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    meshRef.current.rotation.x = xRotationPv.initialized
      ? xRotationPv.value
      : 0;
    meshRef.current.rotation.y = yRotationPv.initialized
      ? yRotationPv.value
      : 0;
  });
  // Return view, these are regular three.js elements expressed in JSX
  const pvConnections = () => {
    let pvs = [];
    props.pvs.forEach((item, index) => {
      pvs.push(
        <PV
          key={index.toString()}
          pv={item}
          macros={props.macros}
          pvData={(pvData) => {
            if (index === 0) {
              setXRotaionPv(pvData);
            } else if (index === 1) {
              setYRotaionPv(pvData);
            }
          }}
        />
      );
    });
    return pvs;
  };
  return (
    <React.Fragment>
      {pvConnections()}
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial color={hovered ? lightGreen["A400"] : pink[500]} />
      </mesh>
    </React.Fragment>
  );
}

const ThreeScene = () => {
  return (
    <div style={{ height: "35vh" }}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box
          position={[0, 0, 0]}
          pvs={["testIOC:Cube1:xRotation", "testIOC:Cube1:yRotation"]}
        />
      </Canvas>
    </div>
  );
};
export default ThreeScene;
