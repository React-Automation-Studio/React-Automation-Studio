import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import HarpRangeSelection from '../../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpRangeSelection';

import ActionButton from '../../BaseComponents/ActionButton';


import HarpGraph from '../../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';

import PV from '../../SystemComponents/PV'
import { replaceMacros } from '../../SystemComponents/Utils/macroReplacement';


const HarpsBeamDiagnostics = (props) => {    
    const [harpGraphsState, setHarpGraphsState] = useState({
        x0GraphPVs: [],
        y0GraphPVs: [],
        x0legend: [],
        y0legend: [],
        x0GraphKey: "",
        onlyY0: false,
        onlyX0: false,
        x1GraphPVs: [],
        y1GraphPVs: [],
        x1legend: [],
        y1legend: [],
        x1GraphKey: "",
        onlyY1: false,
        onlyX1: false,
        topXgraphYmax: 0,
        topYgraphYmax: 0, ///
        bottomYgraphYmax: 0,
        bottomXgraphYmax: 0,
        x0SystemName: undefined,
        x1SystemName: undefined,
        x0RangePV: undefined,
        x1RangePV: undefined,
        y0RangePV: undefined,
        y1RangePV: undefined,
        y0GraphKey: null,
        y1GraphKey: null,
    });
    const [topXgraphYmax, setTopXgraphYmax] = useState(0); ///
    const [topYgraphYmax, setTopYgraphYmax] = useState(0); ///
    const [bottomYgraphYmax, setBottomYgraphYmax] = useState(0);
    const [bottomXgraphYmax, setBottomXgraphYmax] = useState(0);

    const [harpPvs, setHarpPvs] = useState({});

    const harpPvConnections = (harpSystems) => {
        let pvs = [];
        let index = 0;
        for (let harp in harpSystems) {
            pvs.push(
                <PV
                    key={index.toString()}
                    pv={harpSystems[harp].inLimitPv}
                    macros={harpSystems[harp].macros}
                    pvData={(pv) => setHarpPvs(prePvs => {
                        let pvs = { ...prePvs }
                        pvs[harp] = pv;
                        return pvs
                    }
                    )}
                />)
            index++;
        }
        return pvs
    }

    useEffect(() => {
        let harp;
        let x0GraphPVs = [];
        let y0GraphPVs = [];
        let x0legend = [];
        let y0legend = [];
        let x0GraphKey = "x0Graph";
        let y0GraphKey = "y0Graph";
        let x1GraphPVs = [];
        let y1GraphPVs = [];
        let x0SystemName;
        let x1SystemName;
        let x0RangePV;
        let y0RangePV;
        let onlyY0 = false;
        let onlyX0 = false;
        let onlyY1 = false;
        let onlyX1 = false;
        let x1RangePV;
        let y1RangePV;
        let x1legend = [];
        let y1legend = [];
        let x1GraphKey = "x1Graph";
        let y1GraphKey = "y1Graph";
        let numberOfInsertedGraphs = 0;
        
        for (harp in harpPvs) {
            if (harpPvs[harp]) {
                let currentHarp = props.harps[harp];
                let systemName = replaceMacros(currentHarp.systemName, currentHarp.macros);
                let label = replaceMacros(currentHarp.label, currentHarp.macros);
                // eslint-disable-next-line eqeqeq 
                if (harpPvs[harp].value == 1) {
                    if (numberOfInsertedGraphs === 0) {
                        if (typeof currentHarp.onlyY !== 'undefined') {

                            x0GraphPVs.push( systemName + ':ycur');
                            x0RangePV =  systemName + ':yrange';
                            onlyY0 = true;
                        }
                        else {
                            x0GraphPVs.push( systemName + ':xcur');
                            x0RangePV =  systemName + ':xrange';
                            onlyY0 = false;
                        }
                        x0legend.push(label);
                        x0GraphKey = x0GraphKey + systemName;
                        x0SystemName = systemName;
                        if (typeof currentHarp.onlyX !== 'undefined') {
                            y0GraphPVs.push( systemName + ':xcur');
                            y0RangePV =  systemName + ':xrange';
                            onlyX0 = true;
                        }
                        else {
                            y0GraphPVs.push( systemName + ':ycur');
                            y0RangePV =  systemName + ':yrange';
                            onlyX0 = false;
                        }
                        y0GraphKey = y0GraphKey + systemName;
                        y0legend.push(label);
                        numberOfInsertedGraphs++;
                    } else {
                        if (typeof currentHarp.onlyY !== 'undefined') {
                            x1GraphPVs.push( systemName + ':ycur');
                            x1RangePV =  systemName + ':yrange';
                            onlyY1 = true;
                        }
                        else {
                            x1GraphPVs.push( systemName + ':xcur');
                            x1RangePV =  systemName + ':xrange';
                            onlyY1 = false;
                        }
                        if (typeof currentHarp.onlyX !== 'undefined') {
                            y1GraphPVs.push( systemName + ':xcur');
                            y1RangePV =  systemName + ':xrange';
                            onlyX1 = true;
                        }
                        else {
                            y1GraphPVs.push( systemName + ':ycur');
                            y1RangePV =  systemName + ':yrange';
                            onlyX1 = false;
                        }
                        x1legend.push(label);
                        y1legend.push(label);
                        x1GraphKey = x1GraphKey + systemName;
                        y1GraphKey = y1GraphKey + systemName;
                        x1SystemName = systemName;
                        numberOfInsertedGraphs++;
                    }
                }
            }
        }

        setHarpGraphsState({
            x0GraphPVs: x0GraphPVs,
            y0GraphPVs: y0GraphPVs,
            x0legend: x0legend,
            y0legend: y0legend,
            x0GraphKey: x0GraphKey,
            y0GraphKey: y0GraphKey,
            x1GraphPVs: x1GraphPVs,
            y1GraphPVs: y1GraphPVs,
            x1legend: x1legend,
            y1legend: y1legend,
            x1GraphKey: x1GraphKey,
            y1GraphKey: y1GraphKey,
            x0RangePV: x0RangePV,
            x1RangePV: x1RangePV,
            y0RangePV: y0RangePV,
            y1RangePV: y1RangePV,
            x0SystemName: x0SystemName,
            x1SystemName: x1SystemName,
            onlyX0: onlyX0,
            onlyX1: onlyX1,
            onlyY0: onlyY0,
            onlyY1: onlyY1
        })

    }, [harpPvs, props.harps])

    return (
        <React.Fragment>
            {harpPvConnections(props.harps)}
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item sm={12}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item sm={2} >
                            <div style={{ height: '25vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                                {(harpGraphsState.x0SystemName !== undefined) && <React.Fragment>
                                    <HarpRangeSelection onlyX={harpGraphsState.onlyX0} onlyY={harpGraphsState.onlyY0} key={'harpRangeSelectionx0' + harpGraphsState.x0SystemName} systemName={harpGraphsState.x0SystemName} label={'Range'} />
                                    <div style={{ marginBottom: 8 }}>
                                        {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === false)) &&
                                            <ActionButton key={'storex0' + harpGraphsState.x0SystemName} pvs={['$(device):x_store_offset', '$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                        }
                                        {((harpGraphsState.onlyY0 === true) && (harpGraphsState.onlyX0 === false)) &&
                                            <ActionButton key={'storex0' + harpGraphsState.x0SystemName} pvs={['$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                        }
                                        {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === true)) &&
                                            <ActionButton key={'storex0' + harpGraphsState.x0SystemName} pvs={['$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                        }
                                    </div>
                                    <div style={{ marginBottom: 8 }}>
                                        {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === false)) &&
                                            <ActionButton key={'clearx0' + harpGraphsState.x0SystemName} pvs={['$(device):x_store_offset', '$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                        }
                                        {((harpGraphsState.onlyY0 === true) && (harpGraphsState.onlyX0 === false)) &&
                                            <ActionButton key={'clearx0' + harpGraphsState.x0SystemName} pvs={['$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                        }
                                        {((harpGraphsState.onlyY0 === false) && (harpGraphsState.onlyX0 === true)) &&
                                            <ActionButton key={'clearx0' + harpGraphsState.x0SystemName} pvs={['$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x0SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                        }
                                    </div>
                                </React.Fragment>}
                            </div>
                        </Grid>
                        <Grid item sm={10}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item sm={6}>
                                    <div style={{ height: '25vh' }}>
                                        {((harpGraphsState.onlyY0 === false) && harpGraphsState.x0GraphPVs.length > 0) && <HarpGraph
                                            ymax={2000}
                                            units={'pA'}
                                            key={harpGraphsState.x0GraphKey}
                                            dataPVs={harpGraphsState.x0GraphPVs}
                                            rangePV={harpGraphsState.x0RangePV}
                                            legend={harpGraphsState.x0legend}
                                            changeOtherGraphYmax={setTopYgraphYmax}
                                            ymaxFromOtherGraph={topXgraphYmax}
                                            ylabel="X Axis"
                                        />}
                                    </div>
                                </Grid>
                                <Grid item sm={6}>
                                    <div style={{ height: '25vh' }}>
                                        {((harpGraphsState.onlyX0 === false) && harpGraphsState.y0GraphPVs.length > 0) && <HarpGraph
                                            ymax={2000}
                                            units={'pA'}
                                            key={harpGraphsState.y0GraphKey}
                                            dataPVs={harpGraphsState.y0GraphPVs}
                                            rangePV={harpGraphsState.y0RangePV}
                                            legend={harpGraphsState.y0legend}
                                            changeOtherGraphYmax={setTopXgraphYmax}
                                            ymaxFromOtherGraph={topYgraphYmax}
                                            ylabel="Y Axis"
                                        />}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <div style={{ height: '25vh' }}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item sm={2}>
                                <div style={{ height: '25vh', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                                    {(harpGraphsState.x1SystemName !== undefined) && <React.Fragment>
                                        <HarpRangeSelection onlyX={harpGraphsState.onlyX1} onlyY={harpGraphsState.onlyY1} key={'harpRangeSelectionx1' + harpGraphsState.x1SystemName} systemName={harpGraphsState.x1SystemName} label={'Range'} />
                                        <div style={{ marginBottom: 8 }}>
                                            {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === false)) &&
                                                <ActionButton key={'storex1' + harpGraphsState.x1SystemName} pvs={['$(device):x_store_offset', '$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                            }
                                            {((harpGraphsState.onlyY1 === true) && (harpGraphsState.onlyX1 === false)) &&
                                                <ActionButton key={'storex1' + harpGraphsState.x1SystemName} pvs={['$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                            }
                                            {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === true)) &&
                                                <ActionButton key={'storex1' + harpGraphsState.x1SystemName} pvs={['$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"1"} actionString={"Store Offset"} />
                                            }
                                        </div>
                                        <div style={{ marginBottom: 8 }}>
                                            {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === false)) &&
                                                <ActionButton key={'clearx1' + harpGraphsState.x1SystemName} pvs={['$(device):x_store_offset', '$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                            }
                                            {((harpGraphsState.onlyY1 === true) && (harpGraphsState.onlyX1 === false)) &&
                                                <ActionButton key={'clearx1' + harpGraphsState.x1SystemName} pvs={['$(device):y_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                            }
                                            {((harpGraphsState.onlyY1 === false) && (harpGraphsState.onlyX1 === true)) &&
                                                <ActionButton key={'clearx1' + harpGraphsState.x1SystemName} pvs={['$(device):x_store_offset']} macros={{ '$(device)': harpGraphsState.x1SystemName }} actionValue={"0"} actionString={"Clear Offset"} />
                                            }
                                        </div>
                                    </React.Fragment>}
                                </div>
                            </Grid>
                            <Grid item sm={10}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="center"
                                    >
                                        <Grid item sm={6}>
                                            <div style={{ height: '25vh' }}>
                                                {((harpGraphsState.onlyY1 === false) && harpGraphsState.x1GraphPVs.length > 0) && <HarpGraph
                                                    ymax={2000}
                                                    units={'pA'}
                                                    key={harpGraphsState.x1GraphKey}
                                                    dataPVs={harpGraphsState.x1GraphPVs}
                                                    rangePV={harpGraphsState.x1RangePV}
                                                    legend={harpGraphsState.x1legend}
                                                    ylabel="X Axis"
                                                    changeOtherGraphYmax={setBottomYgraphYmax}
                                                    ymaxFromOtherGraph={bottomXgraphYmax}
                                                />}

                                            </div>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <div style={{ height: '25vh' }}>
                                                {((harpGraphsState.onlyX1 === false) && harpGraphsState.y1GraphPVs.length > 0) && <HarpGraph
                                                    ymax={2000}
                                                    units={'pA'}
                                                    key={harpGraphsState.y1GraphKey}
                                                    dataPVs={harpGraphsState.y1GraphPVs}
                                                    rangePV={harpGraphsState.y1RangePV}
                                                    legend={harpGraphsState.y1legend}
                                                    ylabel="Y Axis"
                                                    changeOtherGraphYmax={setBottomXgraphYmax}
                                                    ymaxFromOtherGraph={bottomYgraphYmax}
                                                />}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default HarpsBeamDiagnostics;
