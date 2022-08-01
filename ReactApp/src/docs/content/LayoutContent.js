import React from 'react';

import Grid from '@mui/material/Grid';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';


import TextOutput from '../../components/BaseComponents/TextOutput';
import ToggleButton from '../../components/BaseComponents/ToggleButton';
import Slider from '../../components/BaseComponents/Slider';
import GraphY from '../../components/BaseComponents/GraphY';
import StyledIconIndicator from '../../components/BaseComponents/StyledIconIndicator';
import SelectionInput from '../../components/BaseComponents/SelectionInput';
import ThumbWheel from '../../components/BaseComponents/ThumbWheel';



const LayoutContent = () => {



    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
        >
            <Grid item xs={12}>
                <div style={{ height: '20vh' }}>
                    <GraphY
                        pvs={['testIOC:test4', 'testIOC:test5']}
                        legend={['Sine Wave ', 'Amplitude ']}
                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <ToggleButton pv='$(device)' macros={{ '$(device)': 'testIOC:BO1' }} custom_selection_strings={["OFF", "ON"]} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid
                item
                xs={4}
                container
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    <StyledIconIndicator pv='$(device)' macros={{ '$(device)': 'testIOC:BO1' }} onColor='lime' offColor='grey'>
                        <CheckCircle />
                    </StyledIconIndicator>
                </Grid>
                <Grid item >
                    <StyledIconIndicator pv='$(device)' macros={{ '$(device)': 'testIOC:BO1' }} onColor='grey' offColor='red'>
                        <Cancel />
                    </StyledIconIndicator>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <TextOutput pv='$(device)' macros={{ '$(device)': 'testIOC:mbboTest1' }} />
            </Grid>
            <Grid item xs={6}>
                <SelectionInput pv='$(device)' macros={{ '$(device)': 'testIOC:mbboTest1' }} />
            </Grid>
            <Grid
                item
                xs={12}
                container
                justifyContent="center"
            >
                <Grid item>
                    <ThumbWheel
                        pv='$(device)'
                        macros={{ '$(device)': 'testIOC:amplitude' }}
                        prec_integer={3}
                        prec_decimal={1}
                        usePvMinMax={true}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Slider pv='$(device):amplitude' macros={{ '$(device)': 'testIOC' }} usePvMinMax={true} usePvLabel={true} prec={1} />
            </Grid>
        </Grid>
    );
};

export default LayoutContent;