import React  from 'react';
import ArchiverDataViewer from '../ArchiverDataViewer/ArchiverDataViewer'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';
import Grid from '@material-ui/core/Grid';
const ArchiverDataViewerDemo = (props) => {

    return (
        <TraditionalLayout
            title="Archiver Viewer Examples"
            denseAppBar
            alignTitle="center"
        >
            <Grid
                container
                spacing={2}
                alignItems={'center'}
                direction={'row'}
                justify={'center'}
                style={{ paddingTop: 32, paddingLeft: 8, paddingRight: 8 }}

            >
                <Grid item xs={12} >
                    <ArchiverDataViewer
                      //  debug={true}
                        archiver={"DEMO_ARCHIVER"}
                        title={"Demo Buttons"}
                        showButtons={true}
                        defaultButtonsExpanded={true}
                        livePolling={true}
                        fromTimeOffset={'1m'}
                      //  height={'35vh'}
                        //displayModeBar={true}
                        // pvs={['pva://testIOC:BO1']}
                       
                        traces={
                            [
                                {
                                    pv: 'pva://testIOC:BO1',
                                     yAxis: 0


                                },
                               

                                {
                                    pv: 'pva://testIOC:BO2',
                                    yAxis: 1
                                },
                                {
                                    pv: 'pva://testIOC:amplitude',
                                    yAxis: 2
                                },
                            ]}
                        yAxes={
                            [
                                {
                                    title: "BO1",
                                },
                                {
                                    title: "BO2",
                                },
                                {
                                    title: "Amplitude",
                                },
                            ]}
                        //     {pv:'pva://testIOC:BO1',



                        // },
                        // {pv:'pva://testIOC:amplitude',
                        // yaxis:'y4'},

                        // {pv:'pva://testIOC:BO2',
                        // yaxis:'y5'}






                        showLegend={true}
                    // yAxes={{'yAxis':{

                    // }

                    // }}
                    //  from={'2020-08-31T12:20:00'}
                    //  to=  {'2020-09-02T15:30:00'}


                    />
                </Grid>
                <Grid item xs={12}>
                <ArchiverDataViewer
                        debug={true}
                        archiver={"DEMO_ARCHIVER"}
                        title={"Demo Buttons"}
                        showButtons={true}
                       // height={'35vh'}
                        //displayModeBar={true}
                        // pvs={['pva://testIOC:BO1']}
                       
                        traces={
                            [
                               
                               

                              
                                {
                                    pv: 'pva://testIOC:amplitude',
                                    yAxis: 0
                                },
                                {
                                    pv: 'pva://testIOC:BO1',
                                     yAxis: 1


                                },
                                {
                                    pv: 'pva://testIOC:BO2',
                                    yAxis: 2
                                },
                            ]}
                        yAxes={
                            [
                                {
                                    title: "Amplitude",
                                   
                                },
                                {
                                    title: "BO1",
                                },
                                {
                                    title: "BO2",
                                },
                                
                            ]}
                        //     {pv:'pva://testIOC:BO1',



                        // },
                        // {pv:'pva://testIOC:amplitude',
                        // yaxis:'y4'},

                        // {pv:'pva://testIOC:BO2',
                        // yaxis:'y5'}






                        showLegend={true}
                    // yAxes={{'yAxis':{

                    // }

                    // }}
                    //  from={'2020-08-31T12:20:00'}
                    //  to=  {'2020-09-02T15:30:00'}


                    />
                </Grid>
            </Grid>
        </TraditionalLayout>
    )

}
export default ArchiverDataViewerDemo