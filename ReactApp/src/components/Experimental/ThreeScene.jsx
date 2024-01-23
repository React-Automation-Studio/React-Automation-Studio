import React, { Component } from "react";
import * as THREE from "three";
import DataConnection from "../SystemComponents/DataConnection";

import { pink } from "@mui/material/colors";
import withStyles from "@mui/styles/withStyles";

const pv1 = "testIOC:Cube1:xRotation";
const pv2 = "testIOC:Cube1:yRotation";
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
});

/* eslint-disable eqeqeq */
class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [pv1]: {
        value: "",
        hasFocus: false,
        label: "Undefined",
        pvname: "Undefined",
        initialized: false,
        metadata: {},
        severity: "",
      },
      [pv2]: {
        value: "",
        hasFocus: false,
        label: "Undefined",
        pvname: "Undefined",
        initialized: false,
        metadata: {},
        severity: "",
      },
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleMetadata = this.handleMetadata.bind(this);
  }

  handleMetadata(pvname, metadata) {
    this.setState({ [pvname]: { metadata: metadata } });
  }

  handleInputValue(inputValue, pvname, initialized, severity) {
    this.setState({
      [pvname]: {
        value: inputValue,
        pvname: pvname,
        initialized: initialized,
        severity: severity,
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.width != this.props.width ||
      prevProps.height != this.props.height
    ) {
      this.renderer.setSize(this.props.width, this.props.height);
      this.camera.aspect = this.props.width / this.props.height;
      this.camera.updateProjectionMatrix();
    }
  }

  componentDidMount() {
    let width = this.props.width;
    let height = this.props.height;

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    this.camera.position.z = 400;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(
      this.props.theme.palette.mode == "dark" ? "#80deea" : "#dbdbe0"
    );
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //ADD CUBE
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshPhongMaterial({
      color: pink[500],
      specular: 0xffffff,
      shininess: 30,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.pointLight = new THREE.PointLight(0xffffff, 2.5, 0, 0);
    this.camera.add(this.pointLight);
    this.scene.add(this.camera);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.meshObjects = [this.cube];

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    if (this.state[pv1].initialized === true) {
      this.cube.rotation.x = this.state[pv1].value;
    }
    if (this.state[pv1].initialized === true) {
      this.cube.rotation.y = this.state[pv2].value;
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: "100%", height: "40vh" }}
        ref={(mount) => {
          this.mount = mount;
        }}
      >
        <DataConnection
          pv={pv1}
          handleInputValue={this.handleInputValue}
          handleMetadata={this.handleMetadata}
        />
        <DataConnection
          pv={pv2}
          handleInputValue={this.handleInputValue}
          handleMetadata={this.handleMetadata}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ThreeScene);
