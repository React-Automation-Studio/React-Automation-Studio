import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from '@mui/material/GridLegacy';
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import DateFnsUtils from "@date-io/date-fns";
import { formatISO, parseISO, setSeconds, addHours } from "date-fns";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { TextField } from "@mui/material";

const EnableDialog = (props) => {

  const dateTime =
    props.data.bridge ?? false
      ? parseISO(props.data.bridgeTime)
      : setSeconds(addHours(new Date(), 1), 0);

  const handleEnable = () => {
    props.setEnableDialogData({
      ...props.data,
      enable: true,
      bridge: false,
    });
  };

  const handleDisable = () => {
    props.setEnableDialogData({
      ...props.data,
      enable: false,
      bridge: false,
    });
  };

  const handleBridge = () => {
    props.setEnableDialogData({
      ...props.data,
      enable: false,
      bridge: true,
      bridgeTime: formatISO(dateTime),
    });
  };

  const handleBridgeTime = (event) => {
    const newDateTime = formatISO(setSeconds(event, 0));
    props.setEnableDialogData({
      ...props.data,
      bridgeTime: newDateTime,
    });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth={"xs"}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >{`${props.data.name}`}</DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={6} sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <FormControlLabel
              control={
                <Radio
                  color="secondary"
                  checked={props.data.enable && !(props.data.bridge ?? false)}
                  onChange={handleEnable}
                />
              }
              label="ENABLE"
            />
          </Grid>
          <Grid item xs={6} sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <FormControlLabel
              control={
                <Radio
                  color="secondary"
                  checked={!props.data.enable && !(props.data.bridge ?? false)}
                  onChange={handleDisable}
                />
              }
              label="DISABLE"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <FormControlLabel
              control={
                <Radio
                  color="secondary"
                  // Backwards compatible
                  checked={props.data.bridge ?? false}
                  onChange={handleBridge}
                />
              }
              label="BRIDGE"
            />
            <Typography
              style={{
                marginRight: "1em",
              }}
            >
              until
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                format="dd MMMM yyyy HH:mm"
                value={dateTime}
                onChange={handleBridgeTime}
                ampm={false}
                disablePast
                autoOk={false}
                // Backwards compatible
                disabled={!props.data.bridge}
                slotProps={{ textField: { variant: 'standard' } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.executeEnable} color="secondary">
          OKAY
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EnableDialog);
