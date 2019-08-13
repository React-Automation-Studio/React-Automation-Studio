import React, { Component } from 'react';
import * as THREE from 'three';
import DataConnection from '../SystemComponents/DataConnection';
import GLTFLoader from 'three-gltf-loader';
import { pink} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
const pv1='pva://testIOC:Cube1:xRotation';
const pv2='pva://testIOC:Cube1:yRotation';
const styles = theme => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',


  },
});

class ThreeScene extends Component{


  constructor(props) {
    super(props);
    this.state={
      [pv1]:{'value' : "",'hasFocus':false,'label':"Undefined", 'pvname':"Undefined",'intialized':false,'metadata':{},'severity':''},
      [pv2]:{'value' : "",'hasFocus':false,'label':"Undefined", 'pvname':"Undefined",'intialized':false,'metadata':{},'severity':''},

  }

  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);


}


handleMetadata(pvname,metadata){


  this.setState({[pvname]:{['metadata']	 :metadata}});


}


handleInputValue(inputValue,pvname,initialized,severity){

  this.setState({[pvname]:{['value']	 :inputValue,['pvname']:pvname,['initialized']:initialized, ['severity']:severity}});

}
componentDidUpdate(prevProps){
  if ((prevProps.width!=this.props.width)||(prevProps.height!=this.props.height)){
  this.renderer.setSize(this.props.width, this.props.height);
  this.camera.aspect = this.props.width / this.props.height;
    this.camera.updateProjectionMatrix();
}
}

componentDidMount(){

  let width = this.props.width;
  let height = this.props.height;

  //ADD SCENE
  this.scene = new THREE.Scene()

  //ADD CAMERA
  this.camera = new THREE.PerspectiveCamera(
    75,
    width / height,
    0.1,
    1000
  )
  //  this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 2000 );


  this.camera.position.z = 400

  //ADD RENDERER
  this.renderer = new THREE.WebGLRenderer({ antialias: true })
  this.renderer.setClearColor(this.props.theme.palette.type=='dark'?'#80deea':'#dbdbe0')
  this.renderer.setSize(width, height)
  this.mount.appendChild(this.renderer.domElement)

  //ADD CUBE
  const radius = 50;
  //const geometry = new THREE.IcosahedronBufferGeometry(radius);
  const geometry = new THREE.BoxBufferGeometry(200, 200, 200)
  const material = new THREE.MeshPhongMaterial({
    ambient: 0x555555,color: pink[500],specular: 0xffffff,shininess:30,shading: THREE.SmoothShading


  });
  //const cylinderGeometry = new THREE.CylinderGeometry( 5, 5, width, 32 );
  //const cylinderMaterial = new THREE.MeshPhongMaterial({ ambient: 0x555555,color: 0xD2D2D2,specular: 0xffffff,shininess:30,shading: THREE.SmoothShading} );


  // this.loader = new GLTFLoader();
  // this.harp={};
  // this.loader.load(
  //   // resource URL
  //   'Harp.gltf',
  //   // called when the resource is loaded
  //   ( gltf )=> {
  //     console.log("gltf",gltf)
  //     this.cube=gltf.scene;
  //     this.cube.callback=this.handle3dObjectOnClick([pv3]);
  //     this.scene.add(this.cube)
  //     //this.scene.add( gltf.scene );
  //     console.log("render scene: ", gltf.scene)
  //
  //     //		gltf.animations; // Array<THREE.AnimationClip>
  //     //		gltf.scene; // THREE.Scene
  //     //		gltf.scenes; // Array<THREE.Scene>
  //     //		gltf.cameras; // Array<THREE.Camera>
  //     //		gltf.asset; // Object
  //
  //   },
  //   // called while loading is progressing
  //   function ( xhr ) {
  //
  //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  //
  //   },
  //   // called when loading has errors
  //   function ( error ) {
  //
  //     console.log( 'An error happened',error );
  //
  //   }
  // );
  //

  //this.cylinder = new THREE.Mesh( cylinderGeometry,cylinderMaterial);

//  this.scene.add( this.cylinder );
  this.cube = new THREE.Mesh(geometry, material)
  //    this.cube.callback=this.handle3dObjectOnClick([pv3]);
     this.scene.add(this.cube)


  this.light1 = new THREE.PointLight(0xFFFFFE, 0.25, 0);
  this.light1.position.set(2000, 1000, 3000);
  this.scene.add(this.light1);
  this.light2 = new THREE.PointLight(0xFFFFFE,0.8, 0);
  this.light2.position.set(-2000, 1000, 3000);
  this.scene.add(this.light2);
  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();
  this.meshObjects = [this.cube];

  this.start()
}

componentWillUnmount(){
  this.stop()
  this.mount.removeChild(this.renderer.domElement)
}

start = () => {
  if (!this.frameId) {
    this.frameId = requestAnimationFrame(this.animate)
  }
}

stop = () => {
  cancelAnimationFrame(this.frameId)
}

animate = () => {
//  this.cylinder.rotation.x=1.5708;
//  this.cylinder.rotation.z=1.5708;
  if (this.state[pv1].initialized===true) {
    // console.log(true)
    this.cube.rotation.x=this.state[pv1].value;

  }
  if (this.state[pv1].initialized===true) {
    this.cube.rotation.y =this.state[pv2].value;
  }

  this.renderScene()
  this.frameId = window.requestAnimationFrame(this.animate)
}

renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}



render(){
//  console.log(this.props.width)
//  console.log(this.props.height)
  return(

    <div
      style={{  width: '100%', height: '40vh' }}
      ref={(mount) => { this.mount = mount }}

    >
      <DataConnection pv={pv1}  handleInputValue={this.handleInputValue}   handleMetadata={this.handleMetadata} />
      <DataConnection pv={pv2}  handleInputValue={this.handleInputValue}   handleMetadata={this.handleMetadata} />


    </div>
)
}
  }

  export default withStyles(styles,{withTheme:true})(ThreeScene)
