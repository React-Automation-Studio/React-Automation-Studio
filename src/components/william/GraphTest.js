import React from 'react'

import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';
import {curveCatmullRom} from 'd3-shape';
//import '../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from 'react-vis';

//const  socket = io.connect('http://127.0.0.1:5000/test');
//openSocket('http://127.0.0.1:5000');
//var 'pva://testIOC:test2'=10;
//var pv2=0;



class GraphTest extends React.Component {
  constructor(props) {
    super(props);
    this.state ={[this.props.pv]:{intialized: false,pvname:"",value:"",borderColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
		                 units: "V",precision: 0},
                 ['linedata']:[]};
    //console.log(this.state);
  }


  updatePVData(pv,msg){
        //console.log("new data!")
     	//console.log(msg.pvname+": "+msg.value)
        //console.log(msg.pvname)

        //let data=   msg.value;
        //console.log(pv+ "       " +data);
       // let  pv=msg.pvname;

       // console.log(msg.value)
       	    let color='';
            switch(msg.severity) {
	       case 0:
	          //  console.log("OK");
                    break;
               case 1:
		 //   console.log("Warning");
                    color='orange';
		    break;
               case 2:
                    color='red';
		//    console.log("Severe");
		    break;
              default:
            }
if (msg.newmetadata=='False'){
             let old_data=this.state[pv];
            old_data['pvname']=   msg.pvname;
            old_data['value']= msg.value;
            old_data['border_color']=color;
            this.setState({[pv]:old_data});
        }
	else {
             //console.log(msg.value.length);
             this.setState({[pv]:{pvname:msg.pvname,value: msg.value,borderColor:color,lower_disp_limit: msg.lower_disp_limit,upper_disp_limit: msg.upper_disp_limit,
                                 lower_warning_limit:msg.lower_warning_limit,upper_warning_limit: msg.upper_warning_limit,units: msg.units,precision: parseInt(msg.precision)
                                }})

        }
  this.GraphUpdate();
  }


  GraphUpdate(){
//     console.log('I was triggered during GraphUpdate');
//     console.log('pv ' + this.props.pv);
//     console.log('this.props.pv ' +this.props.pv)
            // console.log(this.state[this.props.pv].value)
           let pv=this.props.pv;

             //let data=[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}];
            let i=0;
            let sample;
            let data=[];
            let n;
	//	console.log("pv.value: ",this.state[this.props.pv].value);
            for(n in this.state[this.props.pv].value){
               // console.log("value: ",this.state[this.props.pv].value[i]);
               sample={x:i,y:this.state[this.props.pv].value[i]}
               // console.log("sample: ",sample)
               data[i]=sample;
               i++;

            }

        this.setState({['linedata']:data});
  //      console.log('I was triggered during GraphUpdate');
//        console.log(this.state);

  }
  GraphTextUpdate(){
//     console.log('I was triggered during GraphUpdate');
//     console.log('pv ' + this.props.pv);
//     console.log('this.props.pv ' +this.props.pv)

            let pv=this.props.pv;
            // console.log('this.state[pv].value '+this.state[pv].value)

           // if (typeof options === 'undefined') {
              //  console.log(pv+ " undefined options");
           //     let value= this.state[pv].value;
            //    console.log(value);
            //    return value
           // }
           // else{
                let value;
                if (typeof this.props.usePrecision !== 'undefined'){
                    if (this.props.usePrecision==true){
                        if (typeof this.props.prec !== 'undefined'){
                            value=parseFloat(this.state[pv].value).toFixed(this.props.prec);
		        }
           	        else
                            value=parseFloat(this.state[pv].value).toFixed(parseInt(this.state[pv].precision));
                      //  value=value.toFixed(parseInt(this.state[pv].precision));

                    }

	        }
                else value=this.state[pv].value;
                let units;
	        if (typeof this.props.display_units!== 'undefined'){
                    if (this.props.display_units==true){
                        if (typeof this.props.units !== 'undefined'){
                            units=this.props.units;
		        }
           	        else
                            units=this.state[pv].units;
                      //  value=value.toFixed(parseInt(this.state[pv].precision));


                    return value + " " + units;
                    }
                    else return value;
	        }
                else  return value;
           //}






  }

  componentDidMount() {

                let socket=this.context;
                socket.emit('request_pv_info', {data: this.props.pv});
		socket.on(this.props.pv,msg=>this.updatePVData(this.props.pv,msg));
        	//this.setState({[pv].intialized=true});

    //socket.emit('request_pv_info', {data: "pva://testIOC:test1"});
    //this.initializePV('pva://testIOC:test1');
    //this.initializePV('pva://testIOC:test2');
    //this.initializePV('pva://testIOC:time');
    //this.initializePV('pva://testIOC:test3');
    //this.initializePV('pva://testIOC:test1.DESC');
    //socket.on("pva://testIOC:test2", msg=>this.setState({'pva://testIOC:test2':msg.pvname+": "+msg.value}));
    //socket.on("pva://testIOC:test2", msg=>this.setState({'pva://testIOC:test2':msg.pvname+": "+msg.value}));
    //socket.on("pva://testIOC:test1", msg=>this.setState({'pva://testIOC:test1':msg.pvname+": "+msg.value}));
    //socket.on("pva://testIOC:test2", msg=>this.setState({'pva://testIOC:test2':msg.pvname+": "+msg.value}));
    //console.log('I was triggered during mount')

  }


  //componentWillUnmount() {
  //  clearInterval(this.MyTimerID);
 // }

  //tick() {
  //  this.setState({
  //    date: new Date()
   // });
 // }

// <div>{this.GraphUpdate('pva://testIOC:test1.DESC')+": "+this.GraphUpdate('pva://testIOC:test1',{usePrecision:true,display_units:true, units: 'A'})}</div>

  render() {

    //console.log('I was triggered during render');
     //console.log('this.props.pv' +this.props.pv)
// <XYPlot margin={{left: 100}} width={300} height={250}>
    return (



      <FlexibleXYPlot margin={{left: 60}} >
      <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
      <VerticalGridLines style={{stroke: '#B7E9ED'}} />
      <XAxis
        title="X Axis"
        style={{
          line: {stroke: '#ADDDE1'},
          ticks: {stroke: '#ADDDE1'},
          text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
        }}
      />

      <YAxis title="Y Axis" left={9} tickFormat={v => (v)} tickSize={20}  tickPadding={2}/>
      <LineSeries
        className="first-series"
        data={this.state['linedata']}
        style={{
          strokeLinejoin: 'round',
          strokeWidth: 2
        }}
      />



    </FlexibleXYPlot>



    );
  }
}

GraphTest.contextType=AutomationStudioContext;
export default GraphTest
