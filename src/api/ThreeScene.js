import React, { Component } from 'react';
import * as THREE from 'three';
import EpicsPV from '../components/SystemComponents/EpicsPV';
import GLTFLoader from 'three-gltf-loader';
const pv1='pva://testIOC:Cube1:xRotation';
const pv2='pva://testIOC:Cube1:yRotation';
const pv3='pva://testIOC:Harp3:InOut';

class ThreeScene extends Component{


 constructor(props) {
    super(props);
    this.state={[pv1]:{'value' : "",'hasFocus':false,'label':"Undefined", 'pvname':"Undefined",'intialized':false,'metadata':{},'severity':''},
                [pv2]:{'value' : "",'hasFocus':false,'label':"Undefined", 'pvname':"Undefined",'intialized':false,'metadata':{},'severity':''},
                [pv3]:{'value' : "",'hasFocus':false,'label':"Undefined", 'pvname':"Undefined",'intialized':false,'metadata':{},'severity':''}
  }
  console.log(this.state);
  this.handleInputValue= this.handleInputValue.bind(this);
  this.handleMetadata= this.handleMetadata.bind(this);
  this.handleOnClick= this.handleOnClick.bind(this);
  this.handle3dObjectOnClick= this.handle3dObjectOnClick.bind(this);

}


handleMetadata(pvname,metadata){

console.log('handleMetadata')
  this.setState({[pvname]:{['metadata']	 :metadata}});


}


handleInputValue(inputValue,pvname,initialized,severity){
  console.log('handleInputValue')
  this.setState({[pvname]:{['value']	 :inputValue,['pvname']:pvname,['initialized']:initialized, ['severity']:severity}});

}

  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

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
    this.renderer.setClearColor('#FFFFFF')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    //ADD CUBE
    const radius = 50;
//const geometry = new THREE.IcosahedronBufferGeometry(radius);
    const geometry = new THREE.BoxBufferGeometry(10, 50, 50)
    const material = new THREE.MeshPhongMaterial({
 ambient: 0x555555,color: 0x2011AC,specular: 0xffffff,shininess:30,shading: THREE.SmoothShading


  });
    const cylinderGeometry = new THREE.CylinderGeometry( 5, 5, width, 32 );
    const cylinderMaterial = new THREE.MeshPhongMaterial({ ambient: 0x555555,color: 0xD2D2D2,specular: 0xffffff,shininess:30,shading: THREE.SmoothShading} );


  this.loader = new GLTFLoader();
this.harp={};
this.loader.load(
	// resource URL
	'Harp.gltf',
	// called when the resource is loaded
	 ( gltf )=> {
     console.log("gltf",gltf)
this.cube=gltf.scene;
this.cube.callback=this.handle3dObjectOnClick([pv3]);
this.scene.add(this.cube)
		//this.scene.add( gltf.scene );
    console.log("render scene: ", gltf.scene)

//		gltf.animations; // Array<THREE.AnimationClip>
//		gltf.scene; // THREE.Scene
//		gltf.scenes; // Array<THREE.Scene>
//		gltf.cameras; // Array<THREE.Camera>
//		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened',error );

	}
);


  this.cylinder = new THREE.Mesh( cylinderGeometry,cylinderMaterial);

  this.scene.add( this.cylinder );
//this.cube = new THREE.Mesh(geometry, material)
      //    this.cube.callback=this.handle3dObjectOnClick([pv3]);
      //    this.scene.add(this.cube)


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
  this.cylinder.rotation.x=1.5708;
  this.cylinder.rotation.z=1.5708;
   if (this.state[pv1].initialized===true) {
    // console.log(true)
     this.cube.rotation.x=this.state[pv1].value;

 }
   if (this.state[pv1].initialized===true) {
   this.cube.rotation.y =this.state[pv2].value;
}
if (this.state[pv3].initialized===true) {
 // console.log(true)
  if (this.state[pv3].value==1){
    this.cube.position.y=0;
  }else {
    this.cube.position.y=50;
  }


}
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }

renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}

handle3dObjectOnClick = pvname => event => {
  console.log("In threejs: clicked 3d",pvname);
  this.setState({ [pvname]:{['value']	 : this.state[pvname]['value']==0?1:0}});
}

handleOnClick = event => {
  console.log("In threejs: clicked ",event);
  //this.props.handleOnClick(device);
  //this.setState({ ['value']: this.state['value']==0?1:0});

        event.preventDefault();

        this.mouse.x=(event.nativeEvent.offsetX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y=-(event.nativeEvent.offsetY / this.renderer.domElement.clientHeight) * 2 + 1;
      /*  console.log("In threejs: clicked mouse.x  ",this.mouse.x );
        console.log("In threejs: clicked mouse.y  ",this.mouse.y );
        console.log("this.renderer.domElement.clientWidth",this.renderer.domElement.clientWidth)
        console.log("this.renderer.domElement.clientHeight",this.renderer.domElement.clientHeight)
        console.log("this.mount.clientWidth",this.mount.clientWidth)
        console.log("this.mount.clientHeight",this.mount.clientHeight)
        console.log("event.clientY",event.clientY)
        console.log("event.clientX",event.clientX)
        console.log("event.nativeEvent.offsetX",event.nativeEvent.offsetX);
        console.log("event.nativeEvent.offsetY",event.nativeEvent.offsetY);*/
        this.raycaster.setFromCamera(this.mouse, this.camera);

//        meshObjects = [mesh, mesh2, mesh3]; // three.js objects with click handlers we are interested in

        var intersects = this.raycaster.intersectObjects(this.scene.children);
        console.log('intersects.length',intersects.length)
        if (intersects.length > 0) {
            intersects[0].object.callback();
        }

    }

render(){
console.log("render scene: ", this.scene)
console.log("render myscene: ", this.myscene)
    return(

      <div
        style={{ width: '100%', height: '100%' }}
        ref={(mount) => { this.mount = mount }}
        onClick={this.handleOnClick}
      >
        <EpicsPV pv={pv1}  handleInputValue={this.handleInputValue}   handleMetadata={this.handleMetadata} />
        <EpicsPV pv={pv2}  handleInputValue={this.handleInputValue}   handleMetadata={this.handleMetadata} />
        <EpicsPV pv={pv3}  handleInputValue={this.handleInputValue}   handleMetadata={this.handleMetadata} outputValue=  {this.state[pv3].value}/>
        <div id="info"
          style={{position: 'relative',
            top: this.state[pv3].value==1?'245px':'195px',
            width: '100%',
            'text-align': 'center',
            'z-index': '100',
          display:'block'}}
        >
          Harp3
        </div>
      </div>

    )
  }
}

export default ThreeScene
