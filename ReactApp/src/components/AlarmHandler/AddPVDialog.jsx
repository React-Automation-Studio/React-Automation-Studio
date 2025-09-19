import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/GridLegacy';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Domain, Lan, LanConnect, LanDisconnect } from "mdi-material-ui/";

const AddPVDialog = (props) => {
    const lastIndex = props.newPVInfo.pvs?.length - 1

    const enableAddButton = props.newPVInfo.pvs?.reduce((acc, pv) => {
        return acc && pv.connected
    }, true)

    const pvGrid = props.newPVInfo.pvs
        ? props.newPVInfo["pvs"].map((pv, index) => {
            return (
                <Grid
                    key={`${pv}-${index}`}
                    item
                    xs={12}
                >
                    <Grid

                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="stretch"
                    >
                        <Grid item xs={1} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                            <Lan />
                        </Grid>
                        <Grid item xs={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginRight: 4 }}>
                            <Typography sx={{ fontWeight: 500, textAlign: 'center' }} >
                                PV
                                </Typography>
                        </Grid>
                        <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <TextField
                                type='text'
                                value={props.newPVInfo.pvs[index].pvname}
                                onChange={(event) => props.updateNewPVInfoPVName(event, index)}
                                fullWidth
                                autoFocus
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end"  >
                                            {props.newPVInfo.pvs[index].connected
                                                ? <LanConnect sx={{ color: 'ok.main' }} />
                                                : <LanDisconnect sx={{ color: 'error.main' }} />
                                            }
                                        </InputAdornment >
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item >
                            {lastIndex !== 0 &&
                                <Tooltip title="Remove PV" placement="bottom">
                                    <IconButton
                                        onClick={() => props.popNewPVInfo(index)}
                                        sx={{ marginLeft: 1 }}
                                        size="large">
                                        <RemoveCircleIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            }
                            {index === lastIndex &&
                                <Tooltip title="Add another PV" placement="bottom">
                                    <IconButton
                                        onClick={props.appendNewPVInfo}
                                        sx={{ marginLeft: lastIndex === 0 && 1 }}
                                        size="large">
                                        <AddCircleIcon color="secondary" />
                                    </IconButton>
                                </Tooltip>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            );
        })
        : null

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            maxWidth={"md"}
        >
            <DialogTitle >{`Add new PV`}</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={1} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                                <Domain />
                            </Grid>
                            <Grid item xs={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", mr: 4 }}>
                                <Typography sx={{ fontWeight: 500, textAlign: 'center' }} >
                                    AREA
                                </Typography>
                            </Grid>
                            <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <Typography>
                                    {`${props.newPVInfo["areaName"]}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                        >
                            {pvGrid}
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ mt: 4 }}>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.executeAddNewPVs} color="secondary" disabled={!enableAddButton}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(AddPVDialog);