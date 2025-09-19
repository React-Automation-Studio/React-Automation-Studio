import React from "react";

import { useTheme } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/GridLegacy';
import Radio from "@mui/material/Radio";
import Switch from "@mui/material/Switch";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SignalIcon from "./SignalIcon";

import DateFnsUtils from "@date-io/date-fns";
import {
  formatISO,
  isSameDay,
  isAfter,
  parseISO,
  setSeconds,
  startOfDay,
  endOfDay,
} from "date-fns";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

const ScheduleDialog = (props) => {
  const theme = useTheme();

  const { global } = props.dialogUserObject;

  const displayUserObject = global
    ? props.dialogUserObject.globalSetup
    : props.dialogUserObject.notifyPVs[props.dialogUserNotifyIndex].notifySetup;

  const fromTime = displayUserObject.fromTime
    ? parseISO(displayUserObject.fromTime)
    : setSeconds(new Date(), 0);
  const toTime = displayUserObject.toTime
    ? parseISO(displayUserObject.toTime)
    : setSeconds(new Date(), 0);

  const fromDate = displayUserObject.fromDate
    ? parseISO(displayUserObject.fromDate)
    : startOfDay(new Date());
  const toDate = displayUserObject.toDate
    ? parseISO(displayUserObject.toDate)
    : endOfDay(new Date());

  const handleNotifyGlobal = (event) => {
    props.setDialogUserObject({
      ...props.dialogUserObject,
      global: event.target.checked,
    });
  };

  const handleNotify = (event) => {
    if (global) {
      props.setDialogUserObject({
        ...props.dialogUserObject,
        globalSetup: {
          ...props.dialogUserObject.globalSetup,
          notify: event.target.checked,
        },
      });
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            const newArea = {
              ...area,
              notifySetup: {
                ...area.notifySetup,
                notify: event.target.checked,
              },
            };
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleEmail = (event) => {
    if (global) {
      // Check oneMedium is checked
      const oneMedium = !event.target.checked
        ? // Backwards compatible
          props.dialogUserObject.globalSetup.sms ||
          props.dialogUserObject.globalSetup.whatsapp ||
          (props.dialogUserObject.globalSetup.signal ?? false)
        : true;
      //
      if (oneMedium) {
        props.setDialogUserObject({
          ...props.dialogUserObject,
          globalSetup: {
            ...props.dialogUserObject.globalSetup,
            email: event.target.checked,
          },
        });
      } else {
        props.setSnackMessage("At least one notification medium must be set!");
      }
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
              ? // Backwards compatible
                area.notifySetup.sms ||
                area.notifySetup.whatsapp ||
                (area.notifySetup.signal ?? false)
              : true;
            //
            if (oneMedium) {
              const newArea = {
                ...area,
                notifySetup: {
                  ...area.notifySetup,
                  email: event.target.checked,
                },
              };
              return newArea;
            } else {
              props.setSnackMessage(
                "At least one notification medium must be set!"
              );
              return area;
            }
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleSMS = (event) => {
    if (global) {
      // Check oneMedium is checked
      const oneMedium = !event.target.checked
        ? // Backwards compatible
          props.dialogUserObject.globalSetup.email ||
          props.dialogUserObject.globalSetup.whatsapp ||
          (props.dialogUserObject.globalSetup.signal ?? false)
        : true;
      //
      if (oneMedium) {
        props.setDialogUserObject({
          ...props.dialogUserObject,
          globalSetup: {
            ...props.dialogUserObject.globalSetup,
            sms: event.target.checked,
          },
        });
      } else {
        props.setSnackMessage("At least one notification medium must be set!");
      }
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
              ? // Backwards compatible
                area.notifySetup.email ||
                area.notifySetup.whatsapp ||
                (area.notifySetup.signal ?? false)
              : true;
            //
            if (oneMedium) {
              const newArea = {
                ...area,
                notifySetup: {
                  ...area.notifySetup,
                  sms: event.target.checked,
                },
              };
              return newArea;
            } else {
              props.setSnackMessage(
                "At least one notification medium must be set!"
              );
              return area;
            }
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleWhatsApp = (event) => {
    if (global) {
      // Check oneMedium is checked
      const oneMedium = !event.target.checked
        ? // Backwards compatible
          props.dialogUserObject.globalSetup.email ||
          props.dialogUserObject.globalSetup.sms ||
          (props.dialogUserObject.globalSetup.signal ?? false)
        : true;
      //
      if (oneMedium) {
        props.setDialogUserObject({
          ...props.dialogUserObject,
          globalSetup: {
            ...props.dialogUserObject.globalSetup,
            whatsapp: event.target.checked,
          },
        });
      } else {
        props.setSnackMessage("At least one notification medium must be set!");
      }
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
              ? // Backwards compatible
                area.notifySetup.email ||
                area.notifySetup.sms ||
                (area.notifySetup.signal ?? false)
              : true;
            //
            if (oneMedium) {
              const newArea = {
                ...area,
                notifySetup: {
                  ...area.notifySetup,
                  whatsapp: event.target.checked,
                },
              };
              return newArea;
            } else {
              props.setSnackMessage(
                "At least one notification medium must be set!"
              );
              return area;
            }
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleSignal = (event) => {
    if (global) {
      // Check oneMedium is checked
      const oneMedium = !event.target.checked
        ? props.dialogUserObject.globalSetup.email ||
          props.dialogUserObject.globalSetup.sms ||
          props.dialogUserObject.globalSetup.whatsapp
        : true;
      //
      if (oneMedium) {
        props.setDialogUserObject({
          ...props.dialogUserObject,
          globalSetup: {
            ...props.dialogUserObject.globalSetup,
            signal: event.target.checked,
          },
        });
      } else {
        props.setSnackMessage("At least one notification medium must be set!");
      }
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            // Check oneMedium is checked
            const oneMedium = !event.target.checked
              ? // Backwards compatible
                area.notifySetup.email ||
                area.notifySetup.sms ||
                area.notifySetup.whatsapp
              : true;
            //
            if (oneMedium) {
              const newArea = {
                ...area,
                notifySetup: {
                  ...area.notifySetup,
                  signal: event.target.checked,
                },
              };
              return newArea;
            } else {
              props.setSnackMessage(
                "At least one notification medium must be set!"
              );
              return area;
            }
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleAllDay = (event) => {
    if (global) {
      if (!event.target.checked) {
        props.setDialogUserObject({
          ...props.dialogUserObject,
          globalSetup: {
            ...props.dialogUserObject.globalSetup,
            allDay: event.target.checked,
            fromTime: formatISO(fromTime),
            toTime: formatISO(toTime),
          },
        });
      } else {
        props.setDialogUserObject({
          ...props.dialogUserObject,
          globalSetup: {
            ...props.dialogUserObject.globalSetup,
            allDay: event.target.checked,
          },
        });
      }
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            let newArea;
            if (!event.target.checked) {
              newArea = {
                ...area,
                notifySetup: {
                  ...area.notifySetup,
                  allDay: event.target.checked,
                  fromTime: formatISO(fromTime),
                  toTime: formatISO(toTime),
                },
              };
            } else {
              newArea = {
                ...area,
                notifySetup: {
                  ...area.notifySetup,
                  allDay: event.target.checked,
                },
              };
            }
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleFromTime = (event) => {
    const newTime = formatISO(setSeconds(event, 0));
    if (global) {
      props.setDialogUserObject({
        ...props.dialogUserObject,
        globalSetup: {
          ...props.dialogUserObject.globalSetup,
          fromTime: newTime,
        },
      });
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            const newArea = {
              ...area,
              notifySetup: {
                ...area.notifySetup,
                fromTime: newTime,
              },
            };
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleToTime = (event) => {
    const newTime = formatISO(setSeconds(event, 0));
    if (global) {
      props.setDialogUserObject({
        ...props.dialogUserObject,
        globalSetup: {
          ...props.dialogUserObject.globalSetup,
          toTime: newTime,
        },
      });
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            const newArea = {
              ...area,
              notifySetup: {
                ...area.notifySetup,
                toTime: newTime,
              },
            };
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleWeekly = () => {
    if (global) {
      props.setDialogUserObject({
        ...props.dialogUserObject,
        globalSetup: {
          ...props.dialogUserObject.globalSetup,
          weekly: true,
          dateRange: false,
        },
      });
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            const newArea = {
              ...area,
              notifySetup: {
                ...area.notifySetup,
                weekly: true,
                dateRange: false,
              },
            };
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleDay = (day) => {
    if (displayUserObject.weekly && displayUserObject.notify) {
      if (global) {
        // Check at least one day selected
        let days = Object.entries(
          props.dialogUserObject.globalSetup.days
        ).reduce((acc, day) => {
          if (day[1]) {
            acc.push(day[0]);
          }
          return acc;
        }, []);
        const lastDayChecked = days.length === 1 && days[0] === day;
        //
        if (lastDayChecked) {
          props.setSnackMessage("At least one day must be selected!");
        } else {
          props.setDialogUserObject({
            ...props.dialogUserObject,
            globalSetup: {
              ...props.dialogUserObject.globalSetup,
              days: {
                ...props.dialogUserObject.globalSetup.days,
                [day]: !props.dialogUserObject.globalSetup.days[day],
              },
            },
          });
        }
      } else {
        const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
          (area, index) => {
            if (props.dialogUserNotifyIndex !== index) {
              return area;
            } else {
              // Check at least one day selected
              let days = Object.entries(area.notifySetup.days).reduce(
                (acc, day) => {
                  if (day[1]) {
                    acc.push(day[0]);
                  }
                  return acc;
                },
                []
              );
              const lastDayChecked = days.length === 1 && days[0] === day;
              //
              if (lastDayChecked) {
                props.setSnackMessage("At least one day must be selected!");
                return area;
              } else {
                const newArea = {
                  ...area,
                  notifySetup: {
                    ...area.notifySetup,
                    days: {
                      ...area.notifySetup.days,
                      [day]: !area.notifySetup.days[day],
                    },
                  },
                };
                return newArea;
              }
            }
          }
        );
        props.setDialogUserObject({
          ...props.dialogUserObject,
          notifyPVs: newNotifyPVs,
        });
      }
    }
  };

  const handleDateRange = () => {
    if (global) {
      props.setDialogUserObject({
        ...props.dialogUserObject,
        globalSetup: {
          ...props.dialogUserObject.globalSetup,
          weekly: false,
          dateRange: true,
          fromDate: formatISO(fromDate),
          toDate: formatISO(toDate),
        },
      });
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            const newArea = {
              ...area,
              notifySetup: {
                ...area.notifySetup,
                weekly: false,
                dateRange: true,
                fromDate: formatISO(fromDate),
                toDate: formatISO(toDate),
              },
            };
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleFromDate = (event) => {
    const newDate = formatISO(startOfDay(event));
    if (global) {
      // Check if fromDate after toDate
      let newDateAfterToDate = false;
      if (
        isAfter(
          parseISO(newDate),
          parseISO(props.dialogUserObject.globalSetup.toDate)
        )
      ) {
        newDateAfterToDate = true;
      }
      //
      props.setDialogUserObject({
        ...props.dialogUserObject,
        globalSetup: {
          ...props.dialogUserObject.globalSetup,
          fromDate: newDate,
          toDate: newDateAfterToDate
            ? newDate
            : props.dialogUserObject.globalSetup.toDate,
        },
      });
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            // Check if fromDate after toDate
            let newDateAfterToDate = false;
            if (isAfter(parseISO(newDate), parseISO(area.notifySetup.toDate))) {
              newDateAfterToDate = true;
            }
            //
            const newArea = {
              ...area,
              notifySetup: {
                ...area.notifySetup,
                fromDate: newDate,
                toDate: newDateAfterToDate ? newDate : area.notifySetup.toDate,
              },
            };
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleToDate = (event) => {
    const newDate = formatISO(endOfDay(event));
    if (global) {
      // Check if toDate after fromDate
      let newDateAfterFromDate = false;
      if (
        isAfter(
          parseISO(newDate),
          parseISO(props.dialogUserObject.globalSetup.fromDate)
        )
      ) {
        newDateAfterFromDate = true;
      } else if (
        isSameDay(
          parseISO(newDate),
          parseISO(props.dialogUserObject.globalSetup.fromDate)
        )
      ) {
        newDateAfterFromDate = true;
      }
      //
      if (newDateAfterFromDate) {
        props.setDialogUserObject({
          ...props.dialogUserObject,
          globalSetup: {
            ...props.dialogUserObject.globalSetup,
            toDate: newDate,
          },
        });
      } else {
        props.setSnackMessage("To date must be after from date!");
      }
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            // Check if toDate after fromDate
            let newDateAfterFromDate = false;
            if (
              isAfter(parseISO(newDate), parseISO(area.notifySetup.fromDate))
            ) {
              newDateAfterFromDate = true;
            } else if (
              isSameDay(parseISO(newDate), parseISO(area.notifySetup.fromDate))
            ) {
              newDateAfterFromDate = true;
            }
            //
            if (newDateAfterFromDate) {
              const newArea = {
                ...area,
                notifySetup: {
                  ...area.notifySetup,
                  toDate: newDate,
                },
              };
              return newArea;
            } else {
              props.setSnackMessage("To date must be after from date!");
              return area;
            }
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  const handleAlarmType = (event, alarmType) => {
    if (global) {
      props.setDialogUserObject({
        ...props.dialogUserObject,
        globalSetup: {
          ...props.dialogUserObject.globalSetup,
          [alarmType]: event.target.checked,
        },
      });
    } else {
      const newNotifyPVs = props.dialogUserObject.notifyPVs.map(
        (area, index) => {
          if (props.dialogUserNotifyIndex !== index) {
            return area;
          } else {
            const newArea = {
              ...area,
              notifySetup: {
                ...area.notifySetup,
                [alarmType]: event.target.checked,
              },
            };
            return newArea;
          }
        }
      );
      props.setDialogUserObject({
        ...props.dialogUserObject,
        notifyPVs: newNotifyPVs,
      });
    }
  };

  return (
    <Dialog
      // TransitionComponent={Transition}
      fullWidth
      // maxWidth='xl'
      open={props.dialogOpen}
      onBackdropClick={props.closeDialog}
      onClose={props.closeDialog}
    >
      <DialogTitle sx={{ 
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}>
        {global
          ? `${props.dialogUserObject.name}'s notification schedule (Global)`
          : `${props.dialogUserObject.name}'s notification schedule (${
              props.dialogUserObject.notifyPVs[props.dialogUserNotifyIndex]
                .regEx
            })`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ 
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
          {props.userScheduleString({ isGlobal: global, ...displayUserObject })}
        </DialogContentText>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                  Unique schedule
                </span>
              </Grid>
              <Grid item sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Switch
                  checked={global}
                  onChange={handleNotifyGlobal}
                  disabled={props.dialogUserObject.notifyPVs.length === 0}
                />
              </Grid>
              <Grid item sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>
                  Global schedule
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: 24, paddingRight: 24 }}>
            {props.dialogUserObject.notifyPVs.map((area, index) => {
              return (
                <Chip
                  sx={{ 
                    marginRight: "1em",
                    marginTop: "0.5em",
                    marginBottom: "0.5em",
                    '&.MuiChip-outlinedSecondary': {
                      borderWidth: "1.5px",
                    }
                  }}
                  key={`${index}-${area.regEx}`}
                  label={area.regEx}
                  variant={
                    index === props.dialogUserNotifyIndex || global
                      ? undefined
                      : "outlined"
                  }
                  color="secondary"
                  onClick={() => props.setDialogUserNotifyIndex(index)}
                  disabled={global}
                />
              );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <NotificationsActiveIcon />
              </Grid>
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "1rem" }}>Notify</span>
              </Grid>
              <Grid item xs={8}>
                <Checkbox
                  checked={displayUserObject.notify}
                  onChange={handleNotify}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              style={{
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            >
              <Grid item xs={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem", marginRight: "auto" }}>
                      MINOR
                    </span>
                  </Grid>
                  <Grid item>
                    <Checkbox
                      // Backwards compatible
                      checked={displayUserObject.alarmMinor ?? true}
                      onChange={(event) => handleAlarmType(event, "alarmMinor")}
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem" }}>MAJOR</span>
                  </Grid>
                  <Grid item>
                    <Checkbox
                      // Backwards compatible
                      checked={displayUserObject.alarmMajor ?? true}
                      onChange={(event) => handleAlarmType(event, "alarmMajor")}
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem" }}>INVALID</span>
                  </Grid>
                  <Grid item>
                    <Checkbox
                      // Backwards compatible
                      checked={displayUserObject.alarmInvalid ?? true}
                      onChange={(event) =>
                        handleAlarmType(event, "alarmInvalid")
                      }
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem" }}>DISCONN</span>
                  </Grid>
                  <Grid item>
                    <Checkbox
                      // Backwards compatible
                      checked={displayUserObject.alarmDisconn ?? true}
                      onChange={(event) =>
                        handleAlarmType(event, "alarmDisconn")
                      }
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item xs={3} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <EmailOutlinedIcon />
                  </Grid>
                  <Grid item xs={4} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem" }}>Email</span>
                  </Grid>
                  <Grid item xs={3}>
                    <Checkbox
                      checked={displayUserObject.email}
                      onChange={handleEmail}
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item xs={3} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <WhatsAppIcon />
                  </Grid>
                  <Grid item xs={4} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem" }}>WhatsApp</span>
                  </Grid>
                  <Grid item xs={3}>
                    <Checkbox
                      checked={displayUserObject.whatsapp}
                      onChange={handleWhatsApp}
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item xs={3} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <SmsOutlinedIcon />
                  </Grid>
                  <Grid item xs={4} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem" }}>SMS</span>
                  </Grid>
                  <Grid item xs={3}>
                    <Checkbox
                      checked={displayUserObject.sms}
                      onChange={handleSMS}
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <Grid item xs={3} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <SignalIcon />
                  </Grid>
                  <Grid item xs={4} sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "1rem" }}>Signal</span>
                  </Grid>
                  <Grid item xs={3}>
                    <Checkbox
                      // Backwards compatible
                      checked={displayUserObject.signal ?? false}
                      onChange={handleSignal}
                      disabled={!displayUserObject.notify}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <ScheduleIcon />
              </Grid>
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "1rem" }}>All-day</span>
              </Grid>
              <Grid item xs={2}>
                <Switch
                  checked={displayUserObject.allDay}
                  onChange={handleAllDay}
                  disabled={!displayUserObject.notify}
                />
              </Grid>
              {displayUserObject.allDay && <Grid item xs={6}></Grid>}
              {!displayUserObject.allDay && (
                <Grid item xs={6}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                  >
                    <Grid item xs={3} sx={{ 
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                      From
                    </Grid>
                    <Grid item xs={9}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          ampm={false}
                          value={fromTime}
                          onChange={handleFromTime}
                          disabled={!displayUserObject.notify}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {!displayUserObject.allDay && <Grid item xs={6}></Grid>}
              {!displayUserObject.allDay && (
                <Grid item xs={6}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                  >
                    <Grid item xs={3} sx={{ 
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                      To
                    </Grid>
                    <Grid item xs={9}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          ampm={false}
                          value={toTime}
                          onChange={handleToTime}
                          disabled={!displayUserObject.notify}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Radio
                  checked={displayUserObject.weekly}
                  onChange={handleWeekly}
                  disabled={!displayUserObject.notify}
                />
              </Grid>
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "1rem" }}>Weekly</span>
              </Grid>
              <Grid item xs={8} sx={{ 
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <Grid item>
                    <Avatar
                      onClick={() => handleDay("Monday")}
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        marginLeft: "1em",
                        marginRight: "0.4em",
                        cursor:
                          displayUserObject.weekly && displayUserObject.notify
                            ? "pointer"
                            : null,
                        ...(displayUserObject.notify &&
                        displayUserObject.weekly &&
                        displayUserObject.days.Monday
                          ? {
                              color: theme.palette.getContrastText(theme.palette.secondary.main),
                              backgroundColor: theme.palette.secondary.main,
                            }
                          : {}),
                      }}
                    >
                      M
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      onClick={() => handleDay("Tuesday")}
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        marginLeft: "0.4em",
                        marginRight: "0.4em",
                        cursor:
                          displayUserObject.weekly && displayUserObject.notify
                            ? "pointer"
                            : null,
                        ...(displayUserObject.notify &&
                        displayUserObject.weekly &&
                        displayUserObject.days.Tuesday
                          ? {
                              color: theme.palette.getContrastText(theme.palette.secondary.main),
                              backgroundColor: theme.palette.secondary.main,
                            }
                          : {}),
                      }}
                    >
                      T
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      onClick={() => handleDay("Wednesday")}
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        marginLeft: "0.4em",
                        marginRight: "0.4em",
                        cursor:
                          displayUserObject.weekly && displayUserObject.notify
                            ? "pointer"
                            : null,
                        ...(displayUserObject.notify &&
                        displayUserObject.weekly &&
                        displayUserObject.days.Wednesday
                          ? {
                              color: theme.palette.getContrastText(theme.palette.secondary.main),
                              backgroundColor: theme.palette.secondary.main,
                            }
                          : {}),
                      }}
                    >
                      W
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      onClick={() => handleDay("Thursday")}
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        marginLeft: "0.4em",
                        marginRight: "0.4em",
                        cursor:
                          displayUserObject.weekly && displayUserObject.notify
                            ? "pointer"
                            : null,
                        ...(displayUserObject.notify &&
                        displayUserObject.weekly &&
                        displayUserObject.days.Thursday
                          ? {
                              color: theme.palette.getContrastText(theme.palette.secondary.main),
                              backgroundColor: theme.palette.secondary.main,
                            }
                          : {}),
                      }}
                    >
                      T
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      onClick={() => handleDay("Friday")}
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        marginLeft: "0.4em",
                        marginRight: "0.4em",
                        cursor:
                          displayUserObject.weekly && displayUserObject.notify
                            ? "pointer"
                            : null,
                        ...(displayUserObject.notify &&
                        displayUserObject.weekly &&
                        displayUserObject.days.Friday
                          ? {
                              color: theme.palette.getContrastText(theme.palette.secondary.main),
                              backgroundColor: theme.palette.secondary.main,
                            }
                          : {}),
                      }}
                    >
                      F
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      onClick={() => handleDay("Saturday")}
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        marginLeft: "0.4em",
                        marginRight: "0.4em",
                        cursor:
                          displayUserObject.weekly && displayUserObject.notify
                            ? "pointer"
                            : null,
                        ...(displayUserObject.notify &&
                        displayUserObject.weekly &&
                        displayUserObject.days.Saturday
                          ? {
                              color: theme.palette.getContrastText(theme.palette.secondary.main),
                              backgroundColor: theme.palette.secondary.main,
                            }
                          : {}),
                      }}
                    >
                      S
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      onClick={() => handleDay("Sunday")}
                      sx={{
                        width: theme.spacing(4),
                        height: theme.spacing(4),
                        marginLeft: "0.4em",
                        marginRight: "0.4em",
                        cursor:
                          displayUserObject.weekly && displayUserObject.notify
                            ? "pointer"
                            : null,
                        ...(displayUserObject.notify &&
                        displayUserObject.weekly &&
                        displayUserObject.days.Sunday
                          ? {
                              color: theme.palette.getContrastText(theme.palette.secondary.main),
                              backgroundColor: theme.palette.secondary.main,
                            }
                          : {}),
                      }}
                    >
                      S
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid
            item
            xs={8}
            style={{ marginTop: "0.75em", marginBottom: "0.75em" }}
          >
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: "1em" }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Radio
                  checked={displayUserObject.dateRange}
                  onChange={handleDateRange}
                  disabled={!displayUserObject.notify}
                />
              </Grid>
              <Grid item xs={2} sx={{ 
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "1rem" }}>Date range</span>
              </Grid>
              <Grid item xs={8}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <Grid
                    item
                    xs={2}
                    style={{ marginLeft: "1.5em" }}
                    sx={{ 
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    From
                  </Grid>
                  <Grid item xs={9}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd MMMM yyyy"
                        value={fromDate}
                        onChange={handleFromDate}
                        disabled={
                          displayUserObject.weekly || !displayUserObject.notify
                        }
                        autoOk
                        slotProps={{ textField: { variant: 'standard' } }}
                       
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ marginLeft: "1.5em" }}
                    sx={{ 
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    To
                  </Grid>
                  <Grid item xs={9}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd MMMM yyyy"
                        value={toDate}
                        onChange={handleToDate}
                        disabled={
                          displayUserObject.weekly || !displayUserObject.notify
                        }
                        autoOk
                        slotProps={{ textField: { variant: 'standard' } }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog}>Cancel</Button>
        <Button
          onClick={() =>
            props.acceptDialog(
              props.dialogUserObject.name,
              props.dialogUserObject.username
            )
          }
          color="secondary"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ScheduleDialog);
