import React from 'react'
import ReactDOM from 'react'
import AutomationStudioContext from '../../../SystemComponents/AutomationStudioContext';
import DataConnection from '../../../SystemComponents/DataConnection';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

//import ReactVisLightCompoment from '../../CSS/ReactVisLightCompoment';
//import ReactVisDarkCompoment from '../../../../CSS/ReactVisDarkCompoment';
import Loadable from 'react-loadable';
import ContextMenu from '../../../SystemComponents/ContextMenu';


//import HarpGraphOverrideCSS from '../../CSS/HarpGraphOverrideCSS.css';
import {curveCatmullRom} from 'd3-shape';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot,
  DiscreteColorLegend
} from 'react-vis';

const wireSpacing=[-42,-39,-36,-33,-30,-27,-24,-22,-20,-18,-16,-14,-12,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,27,30,33,36,39,42,43];
// const LoadableReactVisLightCompoment = Loadable({
//   loader: () => import('../../../../CSS/ReactVisLightCompoment'),
//   loading() {
//     return <div>Loading LoadableReactVisLightCompoment</div>
//   }
// });

// const LoadableReactVisDarkCompoment = Loadable({
//   loader: () => import('../../../../CSS/ReactVisDarkCompoment'),
//   loading() {
//     return <div>Loading LoadableReactVisLightCompoment</div>
//   }
// });

const styles = theme => ({

  lineSeries: {

    stroke:theme.palette.type==='dark'?'orange':'default'


  },
});




class HarpGraph extends React.Component {
  constructor(props) {
    super(props);
    let state={}
    let pv;
    let pvname;
    let dataPVs={};
    for (pv in this.props.dataPVs){
      pvname=this.props.dataPVs[pv];
      if (typeof this.props.macros !== 'undefined'){

        let macro;
        for (macro in this.props.macros){
          pvname=pvname.replace(macro.toString(),this.props.macros[macro].toString());
        }
      }
      //    console.log(pvname)

      dataPVs[pvname]={label:"", initialized: false,pvname:pvname,value:[],char_value:"",alarmColor:"",lower_disp_limit: 0,upper_disp_limit: 10000,lower_warning_limit: 4000,upper_warning_limit: 6000,
      units: "V",precision: 0};
    }
    state['rangeUnits']="";
    state['ymax']="";
    state['ymax']=2000;
    state['rangeYmax']=2000;
    state['ymin']=0;
    state['dataPVs']=dataPVs;
    state['openContextMenu']= false;
      state['x0']=0;
      state['y0']=0;
      const contextPVs=[];
      for (const item in dataPVs){
        contextPVs.push(dataPVs[item]);
      }
      state['contextPVs']=contextPVs;

    this.state=state;

    this.testRef = React.createRef()



    this.handleRangeInputValue= this.handleRangeInputValue.bind(this);
    this.handleInputValue= this.handleInputValue.bind(this);
    this.handleInputValueLabel= this.handleInputValueLabel.bind(this);
    this.handleMetadata= this.handleMetadata.bind(this);
    this.multipleDataConnections=this.multipleDataConnections.bind(this);
    this.test=this.test.bind(this);
    this.multipleLineData=this.multipleLineData.bind(this);
    this.changeOtherGraphYmax=this.changeOtherGraphYmax.bind(this);
    this.changeThisGraphYmax=this.changeThisGraphYmax.bind(this);
  }


  handleRangeInputValue = (inputValue,pvname,initialized,severity)=>{
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
    //    console.log("initialized:",initialized)
    if (initialized===true){
      switch(parseInt(inputValue)) {
        case 1:
        if (!((this.state.rangeUnits=='uA')&&(this.state.rangeYmax==200))){
          this.setState({'rangeUnits':'uA','ymax':200,'rangeYmax':200});
        }
        break;
        case 2:
        if (!((this.state.rangeUnits=='uA')&&(this.state.rangeYmax==20))){
          this.setState({'rangeUnits':'uA','ymax':20,'rangeYmax':20});
        }
        break;
        case 3:
        if (!((this.state.rangeUnits=='nA')&&(this.state.rangeYmax==2000))){
          this.setState({'rangeUnits':'nA','ymax':2000,'rangeYmax':2000});
        }
        break;
        case 4:
        if (!((this.state.rangeUnits=='nA')&&(this.state.rangeYmax==200))){
          this.setState({'rangeUnits':'nA','ymax':200,'rangeYmax':200});
        }
        break;
        case 5:
        if (!((this.state.rangeUnits=='nA')&&(this.state.rangeYmax==20))){
          this.setState({'rangeUnits':'nA','ymax':20,'rangeYmax':20});
        }
        break;
        case 6:
        if (!((this.state.rangeUnits=='pA')&&(this.state.rangeYmax==2000))){
          this.setState({rangeUnits:'pA','ymax':2000,'rangeYmax':2000});
        }
        break;


        // code block
      }
    }
    //  console.log('this.state.rangeUnits',this.state.rangeUnits);
    //  console.log('this.state.ymax',this.state.ymax);
  }


  handleInputValue = (inputValue,pvname,initialized,severity)=>{
    //  console.log("test");
    //  console.log("value: ",inputValue);
    //  console.log("pvname:", pvname);
    if (initialized===true){
      let dataPVs=this.state.dataPVs;
      let newArray=[];

      //  console.log('pvs[pvname].value', pvs[pvname].value);
      //   console.log('inputValue', inputValue);
      let max;
      if (typeof this.props.maxLength !== 'undefined'){
        max=this.props.maxLength;
        newArray=dataPVs[pvname].value.concat(inputValue);
      }
      else {
        newArray=inputValue;
        max=inputValue.length;
      }




      //  console.log('newArray=dataPVs[pvname].value.concat(inputValue);', newArray);
      dataPVs[pvname].initialized=initialized;
      dataPVs[pvname].severity=severity;

      let length= newArray.length;

      if  (length> max){
        newArray=newArray.slice(length-max);

      }
      //    console.log('newArray=newArray.slice(length-max);', newArray);

      let i=0;
      let sample;
      let data=[];
      let n;
      //	console.log("pv.value: ",this.state[this.props.pv].value);
      for(n in newArray){
        // console.log("value: ",this.state[this.props.pv].value[i]);
        if (newArray[n]>0){
          sample={x:wireSpacing[i],y:newArray[n]}
        }
        else{
          sample={x:wireSpacing[i],y:this.state.ymin}
        }

        // console.log("sample: ",sample)

        data[i]=sample;

        i++;

      }
      //    console.log('data', data);

      dataPVs[pvname].value=newArray;
      dataPVs[pvname].linedata=data;
      //  console.log('length3', dataPVs[pvname].linedata.length);




      this.setState({dataPVs:dataPVs});


      //state.dataPVs[pvname].inputValue=inputValue;
      //pvData.dataPVs[pvname].initialized=initialized;
      //pvData.dataPVs[pvname].severity=severity;

      //console.log("pvData:",pvData)

      //this.setState(pvData);
    }
    else {
      let dataPVs=this.state.dataPVs;
      dataPVs[pvname].initialized=false;


      let i;
      let sample;
      let data=[];
      //let n;
      //	console.log("pv.value: ",this.state[this.props.pv].value);
      for(i in wireSpacing){
        // console.log("value: ",this.state[this.props.pv].value[i]);

        sample={x:wireSpacing[i],y:0}




      //  console.log("sample: ",sample)

        data[i]=sample;



      }
      //    console.log('data', data);


      dataPVs[pvname].linedata=data;



      this.setState({dataPVs:dataPVs});
    }
  }


  handleMetadata =  pvname=>(metadata) =>{

    let dataPVs=this.state.dataPVs;
    dataPVs[pvname].metadata=metadata;
    this.setState({dataPVs:dataPVs});
    //  console.log("metadata",metadata)

  }



  handleInputValueLabel=pvname=>(inputValue)=>{

    let dataPVs=this.state.dataPVs;
    dataPVs[pvname].label=inputValue;
    this.setState({dataPVs:dataPVs});

  }



  componentDidMount() {

  }


  componentWillUnmount() {

  }
  componentDidUpdate(){
    //    console.log(this.testRef)
  }






  handleContextMenuClose = event => {


    this.setState({ openContextMenu: false });
  };

  handleToggleContextMenu = (event) => {
  //     console.log(event.type)

    event.persist()
    this.setState(state => ({ openContextMenu: !state.openContextMenu,x0:event.pageX,y0:event.pageY }));

    event.preventDefault();
  }



  handleOnFocus= event =>{
    this.setState({['hasFocus']:true});
  }

  catchReturn= stateVar => event =>{
    if (event.key === 'Enter') {
      this.setState({['outputValue']:this.state['value']});
    }
  }


  handleOnBlur= event =>{
    this.setState({['hasFocus']:false,
    ['value']:this.state['inputValue'],
    ['metadata'] :this.state['newMetadata'] });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleWheel = (event) => {

    const adjust=this.state.ymax/5;
    let ymax=this.state.ymax;
    if (event.deltaY<0){
      ymax=this.state.ymax-adjust;

    }
    else{
      ymax=this.state.ymax+adjust;
    }
    //  if (ymax<10){
    //    ymax=10;
    //    }
    this.setState({ymax:ymax})

    this.changeOtherGraphYmax(ymax);
  };

  changeOtherGraphYmax = (ymax) => {

    //  console.log('changeOtherGraphYmax',ymax)
    this.props.changeOtherGraphYmax(ymax);

  };
  changeThisGraphYmax = (ymax) => {

    //  console.log('changeThisGraphYmax',ymax)


  };

  handleOnClick = (event) => {

    //console.log("click",event.nativeEvent.which)
    if (event.nativeEvent.which===1){



      this.setState({ymax:this.state.rangeYmax})
      this.changeOtherGraphYmax(this.state.rangeYmax);
    }

  };


  test(){
  }


  test =testvalue=>{
    //console.log("test",testvalue);
  }

  multipleDataConnections = () => {
    //this.test("test1");
    //this.handleInputValue();

    let pv;
    let DataConnections=[];
    for (pv in this.state.dataPVs){
    //  console.log(pv.toString());
      DataConnections.push(
        <div key= {pv.toString()}>
          <DataConnection
            key={'pv'+pv.toString()}
            pv={this.state.dataPVs[pv].pvname}
            handleInputValue={this.handleInputValue}
            handleMetadata={this.handleMetadata(this.state.dataPVs[pv].pvname)}
          />
          { this.props.usePvLabel===true && <DataConnection

            pv={pv.toString()+".DESC"}

            handleInputValue={this.handleInputValueLabel(this.state.dataPVs[pv].pvname)}

                                            />    }
          {this.props.usePvLabel===true?this.state.dataPVs[pv].label+': ':""}
          {/*this.state.pvs[pv].value*/}
        </div>
      )
    }
    //console.log(DataConnections[0]);
    return DataConnections;
  }

  multipleLineData = () => {
    const theme =this.props.theme;
    //this.test("test1");
    //this.handleInputValue();
    let pv;
    let lines=[];
    for (pv in this.state.dataPVs){
      //console.log("linedata: ", this.state.pvs[pv].linedata);
  //    if (this.state.dataPVs[pv].initialized===true){
        if(theme.palette.type==='dark'){
          lines.push(

            <LineSeries
              key= {pv.toString()}

              color={this.state.dataPVs[pv].initialized===true?'#e89b02':'grey'}
              data={this.state.dataPVs[this.state.dataPVs[pv].pvname].linedata}
              style={{

                strokeLinejoin: 'round',
                strokeWidth: 3
              }}

            />


          )
        }else{
          lines.push(
            <LineSeries
              key= {pv.toString()}


              data={this.state.dataPVs[this.state.dataPVs[pv].pvname].linedata}
              style={{

                strokeLinejoin: 'round',
                strokeWidth: 3
              }}

            />
          )
        }
//      }

    }
    //console.log(DataConnections[0]);
    return lines;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ymaxFromOtherGraph!=='undefined')
    {
      if (prevProps.ymaxFromOtherGraph!=this.props.ymaxFromOtherGraph)
      {
        this.setState({ymax:this.props.ymaxFromOtherGraph});
      }

    }
  }

  render() {

    //console.log('HarpGRaph',  this.props.dataPVs)

    const {classes}= this.props;
    const theme=this.props.theme;
    //  console.log(this.props.theme);
    //console.log(this.state.ymax)
    //  console.log(this.state.rangeUnits)
    const ymax=this.state.ymax;
    let legendTitle="";
    if (typeof this.props.legend[0] !=='undefined'){
      legendTitle=this.props.legend[0].toString();
    }

    //console.log(this.state.pvs['pva://testIOC:PS1:Readback:History'].linedata)
    return (

      <React.Fragment>
        {/* {theme.palette.type==='dark'&& <LoadableReactVisDarkCompoment/>} */}
        {/* {theme.palette.type==='light'&& <LoadableReactVisLightCompoment/>} */}
        {(typeof this.props.rangePV !== 'undefined')&&<DataConnection
          key={'pv'+this.props.rangePV.toString()}
          pv={this.props.rangePV}
          handleInputValue={this.handleRangeInputValue}
                                                      />
        }
        {this.multipleDataConnections()}
        <div style={{width:'100%',height:'100%'}} onContextMenu={this.handleToggleContextMenu}>
          <FlexibleXYPlot  yDomain={[0, ymax]}margin={{left: 60}} onWheel={this.handleWheel} onClick={this.handleOnClick}>
            <ContextMenu
              disableProbe={this.props.disableProbe}
              open={this.state.openContextMenu}
              anchorReference="anchorPosition"
              anchorPosition={{ top: +this.state.y0, left: +this.state.x0 }}
              probeType={'readOnly'}
              pvs={this.state.contextPVs}
              handleClose={this.handleContextMenuClose}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            />
            <HorizontalGridLines style={{stroke: theme.palette.type==='dark'?'#0097a7':'#B7E9ED'}} />

            <VerticalGridLines tickValues={wireSpacing} style={{stroke: theme.palette.type==='dark'?'#0097a7':'#B7E9ED'}} />
            <VerticalGridLines tickValues={[0]} style={{stroke: theme.palette.type==='dark'?'white':'grey'}} />
            <XAxis
              title="mm"
              color="white"
              style={{
                title:{stroke:theme.palette.type==='dark'?'#dbdbe0':'#6b6b76',strokeWidth:0.2},
                line: {stroke: '#ADDDE1'},
                ticks: {stroke: '#ADDDE1'},
                text: {stroke: 'none', fill: theme.palette.type==='dark'?'#a9a9b2':'#6b6b76', fontWeight: 600}
              }}
            />

            <YAxis title={this.props.ylabel} left={9} tickFormat={v => (v+' '+this.state.rangeUnits)} tickSize={20}  tickPadding={2}
              style={{
                title:{stroke:theme.palette.type==='dark'?'#ccccce':'#dbdbe0',strokeWidth:0.2},
                text: {stroke: 'none', fill: theme.palette.type==='dark'?'#a9a9b2':'#6b6b76', fontWeight: 600}
              }}
            />

            {this.multipleLineData()}

            {(typeof this.props.legend !== 'undefined')&&<DiscreteColorLegend
              color='#e89b02'
              style={{position: 'absolute', right: '50px', top: '10px',
                color:theme.palette.type==='dark'?'#ccccce':'#dbdbe0',strokeWidth:0.2}}
              orientation="horizontal" items={[{title:legendTitle,color:theme.palette.type==='dark'?'#e89b02':'#80deea',stroke:theme.palette.type==='dark'?'#80deea':'#dbdbe0',fontSize:24}]} />}
          </FlexibleXYPlot>
        </div>
      </React.Fragment>



    )
  }

}
HarpGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

HarpGraph.contextType=AutomationStudioContext;
export default  withStyles(styles,{withTheme:true})(HarpGraph)
