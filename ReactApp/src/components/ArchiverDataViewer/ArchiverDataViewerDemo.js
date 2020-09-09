import React, { useState, useEffect } from 'react';
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
                <Grid item xs={12} style={{ paddingBottom: 16 }}>
                    <ArchiverDataViewer
                        debug={true}
                        // pvs={['pva://testIOC:BO1']}
                        pvs={['pva://testIOC:BO1', 'pva://testIOC:BO2']}
                    //  from={'2020-08-31T12:20:00'}
                    //  to=  {'2020-09-02T15:30:00'}


                    />
                </Grid>
                <Grid item xs={12}>
                    <ArchiverDataViewer
                        debug={true}
                        pvs={['pva://testIOC:amplitude']}
                    //from={'2020-08-31T12:20:00'}
                    //to={'2020-09-02T15:30:00'}


                    />
                </Grid>
            </Grid>
        </TraditionalLayout>
    )

}
export default ArchiverDataViewerDemo