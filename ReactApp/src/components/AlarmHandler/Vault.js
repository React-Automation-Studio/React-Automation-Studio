import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import SideBar from '../SystemComponents/SideBar';
import SelectionList from '../BaseComponents/SelectionList';
import SimpleSlider from '../BaseComponents/SimpleSlider';
import DataConnection from '../SystemComponents/DataConnection';

import Floor from './SVG Components/Floor'

// Styles
const styles = theme => ({
    root: {
        padding: theme.spacing(1),
        // paddingLeft: theme.spacing(8),
        overflowX: "hidden",
        overflowY: "hidden",
        paddingTop: 0,
        width: '100%',
        height: "100%"
    },
    card: {
        padding: theme.spacing(2),
        height: "100%",
        width: "100%",
        overflowX: "default",
        overflowY: "default",
    },
})


class Vault extends Component {
    state = {
        alarmDict: {}
    }

    logout = () => {
        localStorage.removeItem('jwt');
    }

    handlePVChange = (value, pvname, initialized, severity, timestamp) => {
        let alarmDict = { ...this.state.alarmDict }

        if (pvname.includes("building_fire")) {
            alarmDict["building_fire"] = severity > 0
        }
        else if (pvname.includes("building_security")) {
            alarmDict["building_security"] = severity > 0
        }
        else if (pvname.includes("building_airtemp")) {
            alarmDict["building_airtemp_sev"] = severity
            alarmDict["building_airtemp_val"] = value
        }
        else if (pvname.includes("building_airhumidity")) {
            alarmDict["building_airhumidity_sev"] = severity
            alarmDict["building_airhumidity_val"] = value
        }
        else if (pvname.includes("building_airpressure_diff")) {
            alarmDict["building_airpressure_diff_sev"] = severity
            alarmDict["building_airpressure_diff_val"] = value
        }
        else if (pvname.includes("vault_door")) {
            alarmDict["vault_door"] = severity > 0
        }
        else if (pvname.includes("vault_clear")) {
            alarmDict["vault_clear"] = severity > 0
        }
        else if (pvname.includes("vault_radiation")) {
            alarmDict["vault_radiation_sev"] = severity
            alarmDict["vault_radiation_val"] = value
        }
        else if (pvname.includes("cyclotron_interlocks")) {
            alarmDict["cyclotron_interlocks"] = severity > 0
        }
        else if (pvname.includes("cyclotron_safety")) {
            alarmDict["cyclotron_safety"] = severity > 0
        }
        else if (pvname.includes("cyclotron_RF_pickup")) {
            alarmDict["cyclotron_RF_pickup"] = severity > 0
            alarmDict["cyclotron_RF_pickup_sev"] = severity
        }
        else if (pvname.includes("cyclotron_RF1")) {
            alarmDict["cyclotron_RF1"] = severity > 0
        }
        else if (pvname.includes("cyclotron_RF2")) {
            alarmDict["cyclotron_RF2"] = severity > 0
        }

        this.setState({ alarmDict: alarmDict })
    }

    render() {
        const { classes } = this.props;

        const pvArray = [
            "demoAlarmsIOC:building_fire",
            "demoAlarmsIOC:building_airtemp",
            "demoAlarmsIOC:building_airhumidity",
            "demoAlarmsIOC:building_airpressure_diff",
            "demoAlarmsIOC:building_security",
            "demoAlarmsIOC:cyclotron_interlocks",
            "demoAlarmsIOC:cyclotron_airpressure",
            "demoAlarmsIOC:cyclotron_RF1",
            "demoAlarmsIOC:cyclotron_RF2",
            "demoAlarmsIOC:cyclotron_RF_pickup",
            "demoAlarmsIOC:cyclotron_safety",
            "demoAlarmsIOC:cyclotron_vacuum",
            "demoAlarmsIOC:cyclotron_water_flow",
            "demoAlarmsIOC:cyclotron_water_temp",
            "demoAlarmsIOC:vault_radiation",
            "demoAlarmsIOC:vault_door",
            "demoAlarmsIOC:vault_clear"
        ]

        const pvs = pvArray.map(pv => {
            // console.log(pv)
            return (
                <DataConnection
                    key={pv}
                    pv={'pva://' + pv}
                    handleInputValue={this.handlePVChange}
                />
            )
        })

        return (
            <React.Fragment>
                {pvs}
                <SideBar />
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={2}
                    className={classes.root}
                >

                    <Grid item xs={12} lg={6} style={{ textAlign: 'center' }}>
                        <Card className={classes.card}>
                            <svg
                                width='100%'
                                height='100%'
                                viewBox='0 0 1100 900'
                            >
                                <Floor alarmDict={this.state.alarmDict} />
                            </svg>
                        </Card>
                    </Grid>

                    <Grid item md={12} lg={6}>
                        <Card className={classes.card}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="stretch"
                                spacing={2}
                            >
                                <Grid item xs={12} md={6}>
                                    <Card className={classes.card}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="stretch"
                                            spacing={2}

                                        >
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>BUILDING</div>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <SelectionList
                                                    pv='pva://$(device):building_fire'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <SelectionList
                                                    pv='pva://$(device):building_security'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <SimpleSlider
                                                    pv='pva://$(device):building_airtemp'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <SimpleSlider
                                                    pv='pva://$(device):building_airhumidity'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <SimpleSlider
                                                    pv='pva://$(device):building_airpressure_diff'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card className={classes.card}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="stretch"
                                            spacing={2}

                                        >
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>VAULT</div>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <SelectionList
                                                    pv='pva://$(device):vault_door'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <SelectionList
                                                    pv='pva://$(device):vault_clear'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <SimpleSlider
                                                    pv='pva://$(device):vault_radiation'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={0.1}
                                                />
                                            </Grid>


                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card className={classes.card}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="stretch"
                                            spacing={2}

                                        >
                                            <Grid item xs={12} >
                                                <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>CYCLOTRON</div>
                                            </Grid>
                                            <Grid item xs={12} lg={3}>
                                                <SelectionList
                                                    pv='pva://$(device):cyclotron_interlocks'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={3}>
                                                <SelectionList
                                                    pv='pva://$(device):cyclotron_safety'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={3}>
                                                <SimpleSlider
                                                    pv='pva://$(device):cyclotron_water_flow'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={3}>
                                                <SimpleSlider
                                                    pv='pva://$(device):cyclotron_water_temp'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <SelectionList
                                                    pv='pva://$(device):cyclotron_RF1'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <SelectionList
                                                    pv='pva://$(device):cyclotron_RF2'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    horizontal={true}
                                                    usePvLabel={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <SimpleSlider
                                                    pv='pva://$(device):cyclotron_RF_pickup'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <SimpleSlider
                                                    pv='pva://$(device):cyclotron_airpressure'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <SimpleSlider
                                                    pv='pva://$(device):cyclotron_vacuum'
                                                    macros={{ '$(device)': 'demoAlarmsIOC' }}
                                                    usePvLabel={true}
                                                    usePvMinMax={true}
                                                    usePvUnits={true}
                                                    step={1}
                                                />
                                            </Grid>
                                            <Grid item xs={12} lg={3}></Grid>




                                        </Grid>
                                    </Card>
                                </Grid>

                            </Grid>


                        </Card>

                    </Grid>
                </Grid>

            </React.Fragment>

        );
    }
}

export default withStyles(styles, { withTheme: true })(Vault);