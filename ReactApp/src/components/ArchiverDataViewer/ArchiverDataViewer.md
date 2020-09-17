
```js
import ToggleButton from '../../components/BaseComponents/ToggleButton.js';
import ThumbWheel from '../../components/BaseComponents/ThumbWheel.js';
<div>
 <ArchiverDataViewer
                        debug={true}
                        archiver={"DEMO_ARCHIVER"}
                        title={"Demo Archive Viewer"}
                        showButtons={true}
                        //displayModeBar={true}
                        // pvs={['pva://testIOC:BO1']}
                       
                         traces={
                            [
                                {pv:'pva://testIOC:BO1',
                                 yAxis:0


                            },
                            {pv:'pva://testIOC:amplitude',
                            yAxis:1},

                            {pv:'pva://testIOC:BO2',
                            yAxis:2},
                            
                            
                        


                        

                        ]}
                          yAxes={
                            [
                                {
                                    title: "BO1",
                                },
                                {
                                    title: "Amplitude",
                                },
                                {
                                    title: "BO2",
                                },
                               
                            ]}
                       
                    //  from={'2020-08-31T12:20:00'}
                    //  to=  {'2020-09-02T15:30:00'}


                    />

                <ToggleButton style={{paddingTop:32}}
                usePvLabel={true}
                pv='pva://testIOC:BO1'
                />
                 <ToggleButton style={{paddingTop:32}}
                usePvLabel={true}
                pv='pva://testIOC:BO2'
                />
                <div style={{paddingTop:32}}>
                <ThumbWheel 
                usePvLabel={true}
                pv='pva://testIOC:amplitude'
                usePvMinMax={true}
                />
                </div>
                </div>
```



