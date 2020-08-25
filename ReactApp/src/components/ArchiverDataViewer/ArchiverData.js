import  React,{useContext,  useState, useEffect } from 'react';
import AutomationStudioContext from '../SystemComponents/AutomationStudioContext';



import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
    makeVisFlexible,
    DiscreteColorLegend
} from 'react-vis';
import GraphY from '../BaseComponents/GraphY';
const FlexibleXYPlot = makeVisFlexible(XYPlot);
const styles=()=>{

}

const useArchiverDataHook = (props) => {
  
    const context = useContext(AutomationStudioContext);
    const [dbWatchId, setDbWatchId] = useState(null);
    const [data, setData] = useState(null);
    // useEffect(()=>{
    //     setData([{data:[{secs:123123,val:1}]}])

    // },[])
    const [writeAccess, setWriteAccess] = useState(false);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        const handleArchiverReadAck = (msg) => {
         
            if (typeof msg !== 'undefined') {
                setDbWatchId(msg.dbWatchId)
            }
        }
        const handleArchiverReadData = (msg) => {
           // console.log(msg.data)
            //const newData = JSON.parse(msg.data);
            setData(msg.data);
            setInitialized(true)
            setWriteAccess(msg.write_access)
        }

      
        let socket = context.socket;
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt === null) {
            jwt = 'unauthenticated'
        }
        if (props.archiverURL) {
            socket.emit('archiverRead', { 'archiverURL': props.archiverURL, 'clientAuthorisation': jwt }, handleArchiverReadAck)
            socket.on('archiverReadData:' + props.archiverURL, handleArchiverReadData);
        }

        const reconnect = () => {
            if (props.archiverURL) {
                socket.emit('archiverRead', { 'archiverURL': props.archiverURL, 'clientAuthorisation': jwt }, handleArchiverReadAck)
            }
        }
        const disconnect = () => {
            if (props.archiverURL) {
                setInitialized(false);
                setData(null)
            }
        }
        socket.on('disconnect', disconnect);
        socket.on('reconnect', reconnect);
        return () => {

            if (props.archiverURL) {
                if (dbWatchId !== null) {
                    socket.emit('remove_dbWatch', { archiverURL: props.archiverURL, dbWatchId: dbWatchId, 'clientAuthorisation': jwt });
                }
                socket.removeListener('databaseWatchData:' + props.archiverURL, handleArchiverReadData);
                socket.removeListener('reconnect', reconnect);
                socket.removeListener('disconnect', disconnect);
            }

        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.archiverURL])
    console.log("useArchiverDataHook",data)
    return ({ data: data})
    
}

const ArchiverData = (props) => {

    const archData = useArchiverDataHook({ archiverURL: 'arch://DEMO_ARCHIVER:request:{"pv":"' + props.pv + '","options":"' + props.options + '"}' })
    //const [xYData,setXYData]=useState([]);
    const data=archData.data;
    const [lineData,setLineData]=useState([]);
    // const data = useArchiverData({ archiverURL: "arch://DEMO_ARCHIVER:{pv:testIOC:BO1}" })
    console.log(archData)
    console.log(data)
    useEffect(()=>{
        if(data!==null){
             let newArchiverData=[];
             let newXYData=[];
             if (typeof data[0].data!==undefined){
                 console.log(data[0].data)
                 newArchiverData=data[0].data
                 
                 let sample;
                 for(sample in newArchiverData){
                     newXYData.push({x:newArchiverData[sample].secs,y:newArchiverData[sample].val})
                 }

            
        //        // console.log(archiverData,xYData)
        console.log(newXYData)
        setLineData(newXYData);
            }
        
        }

    },[data])
    useEffect(()=>{

    },[])
    console.log(lineData)

    return (
        <React.Fragment>
            {props.debug && <Typography style={{ width: '100%' }}>
                {"PV name: " + props.pv + " Data: " }
            </Typography>}

            {<div style={{ width: '100%', height: '35vh' }}
            // onContextMenu={handleToggleContextMenu}
            >
                <FlexibleXYPlot
                    //yDomain={[0, 100]}
                    margin={{ left: 60 }} >
                    {/* <ContextMenu
                        disableProbe={props.disableProbe}
                        open={state.openContextMenu}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: +state.y0, left: +state.x0 }}
                        probeType={'readOnly'}
                        pvs={state.contextPVs}
                        handleClose={handleContextMenuClose}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    /> */}
                    <HorizontalGridLines
                    //style={{stroke: theme.palette.type==='dark'?'#0097a7':'#B7E9ED'}} 
                    />
                    <VerticalGridLines
                    //style={{stroke: theme.palette.type==='dark'?'#0097a7':'#B7E9ED'}} 
                    />
                    <XAxis
                        title={(typeof props.xAxisTitle !== 'undefined') ? props.xAxisTitle : "X Axis"}
                        color="white"
                        // tickFormat={v => typeof props.useTimeStamp !== 'undefined' ? calcTimeFormat(v) : (v) + props.xUnits}
                        tickTotal={4}
                    // style={{
                    //   title:{stroke:theme.palette.type==='dark'?'#dbdbe0':'#6b6b76',strokeWidth:0.2},
                    //   line: {stroke: '#ADDDE1'},
                    //   ticks: {stroke: '#ADDDE1'},
                    //   text: {stroke: 'none', fill: theme.palette.type==='dark'?'#a9a9b2':'#6b6b76', fontWeight: 600}
                    // }}
                    />

                    <YAxis
                        title={(typeof props.yAxisTitle !== 'undefined') ? props.yAxisTitle : "Y Axis"}
                        left={9} 
                        // tickFormat={props.yScaleLog10 === true ? v => "10E" + (v) + " " + props.yUnits : v => (v) + " " + props.yUnits} tickSize={20} tickPadding={2}
                    // style={{
                    //   title:{stroke:theme.palette.type==='dark'?'#ccccce':'#dbdbe0',strokeWidth:0.2},
                    //   text: {stroke: 'none', fill: theme.palette.type==='dark'?'#a9a9b2':'#6b6b76', fontWeight: 600}
                    // }}
                    />
                    <LineSeries

                        //key={pv.toString()}
                       // color={'grey'}
                       data={lineData}
                       color={props.theme.palette.reactVis.lineColors[0]}
                     //http://localhost:3000/ArchiverDataViewerDemo   data={xYData}
                        //data={typeof this.state.pvs[this.state.pvs[pv].pvname].linedata==='undefined'?data:this.state.pvs[this.state.pvs[pv].pvname].linedata}
                        style={{
                            strokeLinejoin: 'round',
                            strokeWidth: 2

                        }}
                    />

                    {/* {multipleLineData()} */}

                    {/* 
                    {(typeof props.legend !== 'undefined') && <DiscreteColorLegend

                        style={{
                            position: 'absolute', right: '50px', top: '10px',
                            //  color:theme.palette.type==='dark'?'#ccccce':'#dbdbe0',strokeWidth:0.2
                        }
                        }
                        orientation="horizontal" items={legendItems} />} */}

                </FlexibleXYPlot>
            </div>}
            <div style={{ height: '25vh' }}>
                {/* <GraphY
                    pvs={['pva://testIOC:test4', 'pva://testIOC:test5']}
                    legend={['Modulated Sine Wave Amplitude', 'Sine Wave Amplitude']}
                /> */}
            </div>
        </React.Fragment>
    )
}
export default withStyles(styles,{withTheme:true})(ArchiverData)