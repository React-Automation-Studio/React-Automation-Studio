import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from '../GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from '../GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from '../GroupedComponents/EpicsMbboDebug';
import TextUpdate from '../BaseComponents/TextUpdate';
import TextInput from '../BaseComponents/TextInput';
import TextOutput from '../BaseComponents/TextOutput';
import SimpleSlider from '../BaseComponents/SimpleSlider';
import GraphTest from '../william/GraphTest';

import Grid from '@material-ui/core/Grid';
import EpicsPV from '../SystemComponents/EpicsPV';

import SwitchComponent from '../BaseComponents/SwitchComponent';
import SelectionInput from '../BaseComponents/SelectionInput';
import HarpRangeSelection from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpRangeSelection';
import ToggleButton from '../BaseComponents/ToggleButton';
import ActionButton from '../BaseComponents/ActionButton';
import ActionFanoutButton from '../BaseComponents/ActionFanoutButton';
import ArrowButton from '../BaseComponents/ArrowButton';
import ControlRightEx1 from '../ControlScreens/GridComponents/ControlRightEx1'
import ControlRightSteererXY from '../ControlScreens/GridComponents/ControlRightSteererXY'
import ControlRightSinglePS from '../ControlScreens/GridComponents/ControlRightSinglePS'
import ControlRightIonSourcePostion from '../ControlScreens/GridComponents/ControlRightIonSourcePostion'
import ControlRightSinglePSVarTable from '../ControlScreens/GridComponents/ControlRightSinglePSVarTable'
import ControlRightPsSingleIgor from '../ControlScreens/GridComponents/ControlRightPsSingleIgor'

import ControlTopHarpEx1 from '../ControlScreens/GridComponents/ControlTopHarpEx1'
import ControlCenterTable from '../ControlScreens/GridComponents/ControlCenterTable'
import ControlBottomHarp1 from '../ControlScreens/GridComponents/ControlBottomHarp1'
import HarpGraph from '../SiteSpecificComponents/iThembaLABS/CompoundComponents/HarpGraph';
import SideBar from '../SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';

{/* const systems={
  'P-Line':{
    'tab0':[
      {systemName:'bmag1p'     , displayName:'bmag1p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad10p'    , displayName:'quad10p'    ,editorType:'singlePS',devices:{device:{deviceName:'quad10p'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad11p'    , displayName:'quad11p'    ,editorType:'singlePS',devices:{device:{deviceName:'quad11p'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad12p'    , displayName:'quad12p'    ,editorType:'singlePS',devices:{device:{deviceName:'quad12p'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad7p'     , displayName:'quad7p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad7p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad8p'     , displayName:'quad8p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad8p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad9p'     , displayName:'quad9p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad9p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad4p2is'  , displayName:'quad4p2is'  ,editorType:'singlePS',devices:{device:{deviceName:'quad4p2is'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad5p3is'  , displayName:'quad5p3is'  ,editorType:'singlePS',devices:{device:{deviceName:'quad5p3is'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad6p'     , displayName:'quad6p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad6p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad1p8i'   , displayName:'quad1p8i'   ,editorType:'singlePS',devices:{device:{deviceName:'quad1p8i'   ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad2p9i'   , displayName:'quad2p9i'   ,editorType:'singlePS',devices:{device:{deviceName:'quad2p9i'   ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad3p1is'  , displayName:'quad3p1is'  ,editorType:'singlePS',devices:{device:{deviceName:'quad3p1is'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    ],
    'tab1':[
      {systemName:'quad4p2is', displayName:'quad4p2is',editorType:'singlePS',devices:{device:{deviceName:'quad4p2is',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad5p3is', displayName:'quad5p3is',editorType:'singlePS',devices:{device:{deviceName:'quad5p3is',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad6p', displayName:'quad6p',editorType:'singlePS',devices:{device:{deviceName:'quad6p',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad1p8i', displayName:'quad1p8i',editorType:'singlePS',devices:{device:{deviceName:'quad1p8i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad2p9i', displayName:'quad2p9i',editorType:'singlePS',devices:{device:{deviceName:'quad2p9i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad3p1is', displayName:'quad3p1is',editorType:'singlePS',devices:{device:{deviceName:'quad3p1is',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    ],
  }  */}

  const systems={
    'SPC1':{
      'SPC1-IonSource':[
        {systemName:'paraz',  displayName:'Ion Source parallel to Puller',        editorType:'IonSourcePostion',devices:{device:{deviceName:'paraz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:false}},
        {systemName:'perpz',  displayName:'Ion Source perpendicular to Puller',   editorType:'IonSourcePostion',devices:{device:{deviceName:'perpz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:false}},
        {systemName:'vertz',  displayName:'Ion Source Height above Median plane', editorType:'IonSourcePostion',devices:{device:{deviceName:'vertz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:false}},
        {systemName:'tiltz',  displayName:'Ion Source Tilt',                      editorType:'IonSourcePostion',devices:{device:{deviceName:'tiltz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:false}},
        {systemName:'pullerz', displayName:'Puller fixed position',               editorType:'IonSourcePostion',devices:{device:{deviceName:'pullerz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:false}},
        {systemName:'isradz', displayName:'Radial Motor',                         editorType:'IonSourcePostion',devices:{device:{deviceName:'isradz',readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:true}},
        {systemName:'isazz',  displayName:'Azimuthal Motor',                      editorType:'IonSourcePostion',devices:{device:{deviceName:'isazz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:true}},
        {systemName:'isfrz',  displayName:'Front Motor',                          editorType:'IonSourcePostion',devices:{device:{deviceName:'isfrz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:true}},
        {systemName:'istlz',  displayName:'Tail Motor',                           editorType:'IonSourcePostion',devices:{device:{deviceName:'istlz', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:true}},
        {systemName:'sdr1z',  displayName:'Radial Differential Probe 1',          editorType:'IonSourcePostion',devices:{device:{deviceName:'sdr1z', readback:'get-P',setpoint:'put-P',statusText:'get-statusText'}},props:{usePrecision:true,prec:2,usePvUnits:true,useStatus:true}},
        {systemName:'bmag1p', displayName:'bmag1p',                               editorType:'singlePS'        ,devices:{device:{deviceName:'bmag1p',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'SPC1-Central':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
    },
    'J-Line':{
      'J-Slits':[
        {systemName:'bmag1p'     , displayName:'bmag1p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'J-PowerSupplies':[
        {systemName:'sty1j'      , displayName:'sty1j'      ,editorType:'singlePS',devices:{device:{deviceName:'sty1j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2j'      , displayName:'sty2j'      ,editorType:'singlePS',devices:{device:{deviceName:'sty2j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx3j'      , displayName:'stx3j'      ,editorType:'singlePS',devices:{device:{deviceName:'stx3j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty3j'      , displayName:'sty3j'      ,editorType:'singlePS',devices:{device:{deviceName:'sty3j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx4j'      , displayName:'stx4j'      ,editorType:'singlePS',devices:{device:{deviceName:'stx4j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty4j'      , displayName:'sty4j'      ,editorType:'singlePS',devices:{device:{deviceName:'sty4j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx5j'      , displayName:'stx5j'      ,editorType:'singlePS',devices:{device:{deviceName:'stx5j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty5j'      , displayName:'sty5j'      ,editorType:'singlePS',devices:{device:{deviceName:'sty5j'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx6jt'     , displayName:'stx6jt'     ,editorType:'singlePS',devices:{device:{deviceName:'stx6jt'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx6jb'     , displayName:'stx6jb'     ,editorType:'singlePS',devices:{device:{deviceName:'stx6jb'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
    },
    'SPC2':{
         'HMI':[
        {systemName:'bmag1p'     , displayName:'bmag1p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'GTS2':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'AX-Line':[
        {systemName:'stx1ax'     , displayName:'stx1ax'     ,editorType:'singlePS',devices:{device:{deviceName:'stx1ax'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty1ax'     , displayName:'sty1ax'     ,editorType:'singlePS',devices:{device:{deviceName:'sty1ax'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx2ax'     , displayName:'stx2ax'     ,editorType:'singlePS',devices:{device:{deviceName:'stx2ax'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2ax'     , displayName:'sty2ax'     ,editorType:'singlePS',devices:{device:{deviceName:'sty2ax'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'SPC2-Central':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'H-Line':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'K-Line':[
        {systemName:'stx1k'      , displayName:'stx1k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx1k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty1k'      , displayName:'sty1k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty1k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx2k'      , displayName:'stx2k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx2k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2k'      , displayName:'sty2k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty2k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx3k'      , displayName:'stx3k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx3k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty3k'      , displayName:'sty3k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty3k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx4k'      , displayName:'stx4k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx4k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty4k'      , displayName:'sty4k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty4k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx5k'      , displayName:'stx5k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx5k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty5k'      , displayName:'sty5k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty5k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx6k'      , displayName:'stx6k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx6k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty6k'      , displayName:'sty6k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty6k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx7k'      , displayName:'stx7k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx7k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty7k'      , displayName:'sty7k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty7k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx8k'      , displayName:'stx8k'      ,editorType:'singlePS',devices:{device:{deviceName:'stx8k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty8k'      , displayName:'sty8k'      ,editorType:'singlePS',devices:{device:{deviceName:'sty8k'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'Q-Line':[
        {systemName:'bmag1q'     , displayName:'bmag1q'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1q'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'bmag2q'     , displayName:'bmag2q'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2q'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'soln2q'     , displayName:'soln2q'     ,editorType:'singlePS',devices:{device:{deviceName:'soln2q'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'soln3q'     , displayName:'soln3q'     ,editorType:'singlePS',devices:{device:{deviceName:'soln3q'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'rot1q'      , displayName:'rot1q'      ,editorType:'singlePS',devices:{device:{deviceName:'rot1q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'rot2q'      , displayName:'rot2q'      ,editorType:'singlePS',devices:{device:{deviceName:'rot2q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'soln4q'     , displayName:'soln4q'     ,editorType:'singlePS',devices:{device:{deviceName:'soln4q'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'soln5q'     , displayName:'soln5q'     ,editorType:'singlePS',devices:{device:{deviceName:'soln5q'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx1q'      , displayName:'stx1q'      ,editorType:'singlePS',devices:{device:{deviceName:'stx1q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty1q'      , displayName:'sty1q'      ,editorType:'singlePS',devices:{device:{deviceName:'sty1q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx2q'      , displayName:'stx2q'      ,editorType:'singlePS',devices:{device:{deviceName:'stx2q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2q'      , displayName:'sty2q'      ,editorType:'singlePS',devices:{device:{deviceName:'sty2q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx3q'      , displayName:'stx3q'      ,editorType:'singlePS',devices:{device:{deviceName:'stx3q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty3q'      , displayName:'sty3q'      ,editorType:'singlePS',devices:{device:{deviceName:'sty3q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx4q'      , displayName:'stx4q'      ,editorType:'singlePS',devices:{device:{deviceName:'stx4q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty4q'      , displayName:'sty4q'      ,editorType:'singlePS',devices:{device:{deviceName:'sty4q'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'Q2-Line':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
    },
    'SSC':{
      'SSC-Injection':[
        {systemName:'bmag1p'     , displayName:'bmag1p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'SSC-Central':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'SSC-Extraction':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'SSC-Probes':[
        {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
    },
    'X-Line':{
      'X-Slits':[
        {systemName:'bmag1x'     , displayName:'bmag1x'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1x'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'X-PowerSups1':[
        {systemName:'bmag1x'     , displayName:'bmag1x'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1x'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    /* {systemName:'stx1x'      , displayName:'stx1x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx1x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},*/
        {systemName:'stx2x'      , displayName:'stx2x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx2x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2x'      , displayName:'sty2x'      ,editorType:'singlePS',devices:{device:{deviceName:'sty2x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2xb'     , displayName:'sty2xb'     ,editorType:'singlePS',devices:{device:{deviceName:'sty2xb'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    /* {systemName:'stxoi'      , displayName:'stxoi'      ,editorType:'singlePS',devices:{device:{deviceName:'stxoi'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},*/
        {systemName:'sty2xc'     , displayName:'sty2xc'     ,editorType:'singlePS',devices:{device:{deviceName:'sty2xc'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'X-PowerSups2':[
        {systemName:'bmag2x'     , displayName:'bmag2x'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2x'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx1x'      , displayName:'stx1x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx1x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty1x'      , displayName:'sty1x'      ,editorType:'singlePS',devices:{device:{deviceName:'sty1x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx3x'      , displayName:'stx3x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx3x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty3x'      , displayName:'sty3x'      ,editorType:'singlePS',devices:{device:{deviceName:'sty3x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx4x'      , displayName:'stx4x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx4x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
   /*  {systemName:'stx4x'      , displayName:'stx4x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx4x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},*/
        {systemName:'sty4x'      , displayName:'sty4x'      ,editorType:'singlePS',devices:{device:{deviceName:'sty4x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
   /*  {systemName:'stx5x'      , displayName:'stx5x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx5x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},*/
        {systemName:'stx5x'      , displayName:'stx5x'      ,editorType:'singlePS',devices:{device:{deviceName:'stx5x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty5x'      , displayName:'sty5x'      ,editorType:'singlePS',devices:{device:{deviceName:'sty5x'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad6x'     , displayName:'quad6x'     ,editorType:'singlePS',devices:{device:{deviceName:'quad6x'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad7x'     , displayName:'quad7x'     ,editorType:'singlePS',devices:{device:{deviceName:'quad7x'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad8x'     , displayName:'quad8x'     ,editorType:'singlePS',devices:{device:{deviceName:'quad8x'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad9x'     , displayName:'quad9x'     ,editorType:'singlePS',devices:{device:{deviceName:'quad9x'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad10x'    , displayName:'quad10x'    ,editorType:'singlePS',devices:{device:{deviceName:'quad10x'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad11x'    , displayName:'quad11x'    ,editorType:'singlePS',devices:{device:{deviceName:'quad11x'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
    },
    'Isotopes':{
      'Horiz':[
        {systemName:'bmag1i'     , displayName:'bmag1i'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1i'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'bmag2i'     , displayName:'bmag2i'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2i'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx0i'      , displayName:'stx0i'      ,editorType:'singlePS',devices:{device:{deviceName:'stx0i'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty0i'      , displayName:'sty0i'      ,editorType:'singlePS',devices:{device:{deviceName:'sty0i'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad10i'    , displayName:'quad10i'    ,editorType:'singlePS',devices:{device:{deviceName:'quad10i'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad11i'    , displayName:'quad11i'    ,editorType:'singlePS',devices:{device:{deviceName:'quad11i'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad12i'    , displayName:'quad12i'    ,editorType:'singlePS',devices:{device:{deviceName:'quad12i'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'switchi'    , displayName:'switchi'    ,editorType:'singlePS',devices:{device:{deviceName:'switchi'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad1ilcr'  , displayName:'quad1ilcr'  ,editorType:'singlePS',devices:{device:{deviceName:'quad1ilcr'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad2ilcr'  , displayName:'quad2ilcr'  ,editorType:'singlePS',devices:{device:{deviceName:'quad2ilcr'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad3ilcr'  , displayName:'quad3ilcr'  ,editorType:'singlePS',devices:{device:{deviceName:'quad3ilcr'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx4ilcr'   , displayName:'stx4ilcr'   ,editorType:'singlePS',devices:{device:{deviceName:'stx4ilcr'   ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty4ilcr'   , displayName:'sty4ilcr'   ,editorType:'singlePS',devices:{device:{deviceName:'sty4ilcr'   ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'Vert':[
        /* test IGOR and vartable examples*/
        {systemName:'quad01i',  displayName:'quad01i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad01i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
        {systemName:'quad02i',  displayName:'quad02i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad02i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
        {systemName:'quad03i',  displayName:'quad03i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad03i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
        {systemName:'quad04i',  displayName:'quad04i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad04i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
        {systemName:'quad05i',  displayName:'quad05i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad05i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
        {systemName:'quad06ii', displayName:'quad06i',editorType:'singlePSVarTable',  devices:{device:{deviceName:'vartable:quad06ii',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
        {systemName:'quad07ii', displayName:'quad07i',editorType:'singlePSVarTable',  devices:{device:{deviceName:'vartable:quad07ii',readback:'actvalue',setpoint:'refvalue',statusText:'actstatustext'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
      ],
    },
    'Therapy':{
      'Proton':[
        {systemName:'stx1tcr'    , displayName:'stx1tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'stx1tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty1tcr'    , displayName:'sty1tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'sty1tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx2tcr'    , displayName:'stx2tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'stx2tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2tcr'    , displayName:'sty2tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'sty2tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx3tcr'    , displayName:'stx3tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'stx3tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty3tcr'    , displayName:'sty3tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'sty3tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad1t'     , displayName:'quad1t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad1t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad2t'     , displayName:'quad2t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad2t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad3t'     , displayName:'quad3t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad3t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad4t'     , displayName:'quad4t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad4t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad5t'     , displayName:'quad5t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad5t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad6t'     , displayName:'quad6t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad6t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'switcht'    , displayName:'switcht'    ,editorType:'singlePS',devices:{device:{deviceName:'switcht'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad1-3tlcr', displayName:'quad1-3tlcr',editorType:'singlePS',devices:{device:{deviceName:'quad1-3tlcr',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad2tlcr'  , displayName:'quad2tlcr'  ,editorType:'singlePS',devices:{device:{deviceName:'quad2tlcr'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad4-6tlcr', displayName:'quad4-6tlcr',editorType:'singlePS',devices:{device:{deviceName:'quad4-6tlcr',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad5tlcr'  , displayName:'quad5tlcr'  ,editorType:'singlePS',devices:{device:{deviceName:'quad5tlcr'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
      'Neutron':[
        {systemName:'stx1tcr'    , displayName:'stx1tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'stx1tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty1tcr'    , displayName:'sty1tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'sty1tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx2tcr'    , displayName:'stx2tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'stx2tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty2tcr'    , displayName:'sty2tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'sty2tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'stx3tcr'    , displayName:'stx3tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'stx3tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'sty3tcr'    , displayName:'sty3tcr'    ,editorType:'singlePS',devices:{device:{deviceName:'sty3tcr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad1t'     , displayName:'quad1t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad1t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad2t'     , displayName:'quad2t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad2t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad3t'     , displayName:'quad3t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad3t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad4t'     , displayName:'quad4t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad4t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad5t'     , displayName:'quad5t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad5t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad6t'     , displayName:'quad6t'     ,editorType:'singlePS',devices:{device:{deviceName:'quad6t'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'switcht'    , displayName:'switcht'    ,editorType:'singlePS',devices:{device:{deviceName:'switcht'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad1-3tlcr', displayName:'quad1-3tlcr',editorType:'singlePS',devices:{device:{deviceName:'quad1-3tlcr',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad2tlcr'  , displayName:'quad2tlcr'  ,editorType:'singlePS',devices:{device:{deviceName:'quad2tlcr'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad4-6tlcr', displayName:'quad4-6tlcr',editorType:'singlePS',devices:{device:{deviceName:'quad4-6tlcr',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
        {systemName:'quad5tlcr'  , displayName:'quad5tlcr'  ,editorType:'singlePS',devices:{device:{deviceName:'quad5tlcr'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      ],
    },
  'Physics':{
    'P1-Line':[
      {systemName:'bmag1p'     , displayName:'bmag1p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag1p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'stx1p'      , displayName:'stx1p'      ,editorType:'singlePS',devices:{device:{deviceName:'stx1p'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'sty1p'      , displayName:'sty1p'      ,editorType:'singlePS',devices:{device:{deviceName:'sty1p'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad1p8i'   , displayName:'quad1p8i'   ,editorType:'singlePS',devices:{device:{deviceName:'quad1p8i'   ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad2p9i'   , displayName:'quad2p9i'   ,editorType:'singlePS',devices:{device:{deviceName:'quad2p9i'   ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad3p1is'  , displayName:'quad3p1is'  ,editorType:'singlePS',devices:{device:{deviceName:'quad3p1is'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    ],
    'P2-Line':[
      {systemName:'bmag2p'     , displayName:'bmag2p'     ,editorType:'singlePS',devices:{device:{deviceName:'bmag2p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad10p'    , displayName:'quad10p'    ,editorType:'singlePS',devices:{device:{deviceName:'quad10p'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad11p'    , displayName:'quad11p'    ,editorType:'singlePS',devices:{device:{deviceName:'quad11p'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad12p'    , displayName:'quad12p'    ,editorType:'singlePS',devices:{device:{deviceName:'quad12p'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad7p'     , displayName:'quad7p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad7p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad8p'     , displayName:'quad8p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad8p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad9p'     , displayName:'quad9p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad9p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad4p2is'  , displayName:'quad4p2is'  ,editorType:'singlePS',devices:{device:{deviceName:'quad4p2is'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad5p3is'  , displayName:'quad5p3is'  ,editorType:'singlePS',devices:{device:{deviceName:'quad5p3is'  ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad6p'     , displayName:'quad6p'     ,editorType:'singlePS',devices:{device:{deviceName:'quad6p'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    ],
    'A-G-Lines':[
      {systemName:'stx1ag'     , displayName:'stx1ag'     ,editorType:'singlePS',devices:{device:{deviceName:'stx1ag'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'sty1ag'     , displayName:'sty1ag'     ,editorType:'singlePS',devices:{device:{deviceName:'sty1ag'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad1ag'    , displayName:'quad1ag'    ,editorType:'singlePS',devices:{device:{deviceName:'quad1ag'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad2ag'    , displayName:'quad2ag'    ,editorType:'singlePS',devices:{device:{deviceName:'quad2ag'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad3ag'    , displayName:'quad3ag'    ,editorType:'singlePS',devices:{device:{deviceName:'quad3ag'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad4ag'    , displayName:'quad4ag'    ,editorType:'singlePS',devices:{device:{deviceName:'quad4ag'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    ],
    'Spectrmtr':[
      {systemName:'switchr'    , displayName:'switchr'    ,editorType:'singlePS',devices:{device:{deviceName:'switchr'    ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'stx1r'      , displayName:'stx1r'      ,editorType:'singlePS',devices:{device:{deviceName:'stx1r'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'sty1r'      , displayName:'sty1r'      ,editorType:'singlePS',devices:{device:{deviceName:'sty1r'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'stx2r'      , displayName:'stx2r'      ,editorType:'singlePS',devices:{device:{deviceName:'stx2r'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'sty2r'      , displayName:'sty2r'      ,editorType:'singlePS',devices:{device:{deviceName:'sty2r'      ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad1r'     , displayName:'quad1r'     ,editorType:'singlePS',devices:{device:{deviceName:'quad1r'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad2r'     , displayName:'quad2r'     ,editorType:'singlePS',devices:{device:{deviceName:'quad2r'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad3r'     , displayName:'quad3r'     ,editorType:'singlePS',devices:{device:{deviceName:'quad3r'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad4r'     , displayName:'quad4r'     ,editorType:'singlePS',devices:{device:{deviceName:'quad4r'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad5r'     , displayName:'quad5r'     ,editorType:'singlePS',devices:{device:{deviceName:'quad5r'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
      {systemName:'quad6r'     , displayName:'quad6r'     ,editorType:'singlePS',devices:{device:{deviceName:'quad6r'     ,readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
    ],
  }
  /*
  ['SPC1']['SPC1-IonSource']
  ['SPC1']['SPC1-Central']
  ['J-Line']['J-Slits']
  ['J-Line']['J-PowerSupplies']
  ['SPC2']['HMI']
  ['SPC2']['GTS2']
  ['SPC2']['AX-Line']
  ['SPC2']['SPC2-Central']
  ['SPC2']['H-Line']
  ['SPC2']['K-Line']
  ['SPC2']['Q-Line']
  ['SPC2']['Q2-Line']
  ['SSC']['SSC-Injection']
  ['SSC']['SSC-Central']
  ['SSC']['SSC-Extraction']
  ['SSC']['SSC-Probes']
  ['X-Line']['X-Slits']
  ['X-Line']['X-PowerSups1']
  ['X-Line']['X-PowerSups2']
  ['Isotopes']['Horiz']
  ['Isotopes']['Vert']
  ['Therapy']['Proton']
  ['Therapy']['Neutron']
  */
}



const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column'
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 0 }}>
      {props.children}
    </Typography>
  );
}

class IvanControlTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={'editorType':'PS',
    'displayEditor':false,
    'editorMacros':{'$(device)':""},
    'editorSystem':{},
    'displayHarps':[
      {systemName:'harp5p' ,displayName:'Harp 5P',inserted:false},
      {systemName:'harp6p' ,displayName:'Harp 6P',inserted:false},
      {systemName:'harp7p' ,displayName:'Harp 7P',inserted:false},
      {systemName:'harp8p' ,displayName: 'Harp 8P',inserted:false},
      {systemName:'harp9p' ,displayName: 'Harp 9P',inserted:false}  ],
      'maxHarpsReached':false,

      'x0GraphPVs':[],
      'y0GraphPVs':[],
      'x0legend':[],
      'y0legend':[],
      'x0GraphKey':"",
      'x1GraphPVs':[],
      'y1GraphPVs':[],
      'x1legend':[],
      'y1legend':[],
      'x1GraphKey':"",
      topTabValue:0,
      sideTabValue:0


    }
    this.handlePsOnClick= this.handlePsOnClick.bind(this);
    this.handleOnSystemClick= this.handleOnSystemClick.bind(this);
    this.handleHarpInserted= this.handleHarpInserted.bind(this);
    this.handleHarpRemoved= this.handleHarpRemoved.bind(this);
  }

  handlePsOnClick(name){

    //  console.log("in control test1 clicked "+name.toString());
    this.setState({['editorType']:'PS',
    ['displayEditor']:true,
    ['editorMacros']:{'$(device)':name}});

    //  this.setState({ ['clicked']: 1});
  }
  handleOnSystemClick=(system)=>{
    //  console.log(system)
    this.setState({['editorType']:system.editorType,
    ['displayEditor']:true,
    ['editorSystem']:system,
    ['editorMacros']:{'$(device)':""}});
    //  console.log("in control test1 clicked "+name.toString());
    //    this.setState({['editorType']:'PS',
    //    ['displayEditor']:true,
    //    ['editorMacros']:{'$(device)':name}});

    //  this.setState({ ['clicked']: 1});
  }
  handleHarpInserted=(name)=>{
    let displayHarps=this.state.displayHarps;
    let harp;
    let x0GraphPVs=[];
    let y0GraphPVs=[];
    let x0legend=[];
    let y0legend=[];
    let x0GraphKey="x0Graph";
    let y0GraphKey="y0Graph";
    let x0RangePV;
    let y0RangePV;
    let x1RangePV;
    let x0SystemName;
    let x1SystemName;
    let y1RangePV;
    let x1GraphPVs=[];
    let y1GraphPVs=[];
    let x1legend=[];
    let y1legend=[];
    let x1GraphKey="x1Graph";
    let y1GraphKey="y1Graph";
    let numberOfInsertedGraphs=0;
    let maxHarpsReached=false;
    for (harp in displayHarps){
      if (displayHarps[harp].systemName===name){
        displayHarps[harp].inserted=true;
      }
      if (displayHarps[harp].inserted===true){
        if(numberOfInsertedGraphs===0){
          x0GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
          x0RangePV='pva://'+displayHarps[harp].systemName+':xrange';
          y0GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
          y0RangePV='pva://'+displayHarps[harp].systemName+':yrange';
          x0legend.push(displayHarps[harp].displayName);
          y0legend.push(displayHarps[harp].displayName);
          x0GraphKey=x0GraphKey+displayHarps[harp].systemName;
          y0GraphKey=y0GraphKey+displayHarps[harp].systemName;
          numberOfInsertedGraphs++;
          x0SystemName=displayHarps[harp].systemName;
        }else{
          x1GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
          x1RangePV='pva://'+displayHarps[harp].systemName+':xrange';
          y1GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
          y1RangePV='pva://'+displayHarps[harp].systemName+':yrange';

          x1legend.push(displayHarps[harp].displayName);
          y1legend.push(displayHarps[harp].displayName);
          x1GraphKey=x1GraphKey+displayHarps[harp].systemName;
          y1GraphKey=y1GraphKey+displayHarps[harp].systemName;
          x1SystemName=displayHarps[harp].systemName;
          numberOfInsertedGraphs++;

        }

      }

    }
    if  (numberOfInsertedGraphs>=2){
      maxHarpsReached=true;
    }

    this.setState({displayHarps:displayHarps,maxHarpsReached:maxHarpsReached,
      x0GraphPVs:x0GraphPVs,y0GraphPVs:y0GraphPVs,x0legend:x0legend,y0legend:y0legend,x0GraphKey:x0GraphKey,y0GraphKey:y0GraphKey,
      x1GraphPVs:x1GraphPVs,y1GraphPVs:y1GraphPVs,x1legend:x1legend,y1legend:y1legend,x1GraphKey:x1GraphKey,y1GraphKey:y1GraphKey,
      x0RangePV:x0RangePV,x1RangePV:x1RangePV,y0RangePV:y0RangePV,y1RangePV:y1RangePV,x0SystemName:x0SystemName,x1SystemName:x1SystemName})
      //      console.log("in control test1 Harp inserted "+name.toString());
      //this.setState({['editorType']:'PS',
      //['displayEditor']:true,
      //['editorMacros']:{'$(device)':name}});

      //  this.setState({ ['clicked']: 1});
    }

    handleTopTabChange = (event, value) => {
      this.setState({ topTabValue:value,displayEditor:false });
    };
    handleSideTabChange = (event, value) => {
      this.setState({ sideTabValue:value,displayEditor:false });
    };
    s
    handleHarpRemoved=(name)=>{
      let displayHarps=this.state.displayHarps;
      let harp;
      let x0GraphPVs=[];
      let y0GraphPVs=[];
      let x0legend=[];
      let y0legend=[];
      let x0GraphKey="x0Graph";
      let y0GraphKey="y0Graph";
      let x1GraphPVs=[];
      let y1GraphPVs=[];
      let x0SystemName;
      let x1SystemName;
      let x0RangePV;
      let y0RangePV;
      let x1RangePV;
      let y1RangePV;
      let x1legend=[];
      let y1legend=[];
      let x1GraphKey="x1Graph";
      let y1GraphKey="y1Graph";
      let numberOfInsertedGraphs=0;
      let maxHarpsReached=false;
      for (harp in displayHarps){
        if (displayHarps[harp].systemName===name){
          displayHarps[harp].inserted=false;
        }
        if (displayHarps[harp].inserted===true){
          if(numberOfInsertedGraphs===0){
            x0GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
            x0RangePV='pva://'+displayHarps[harp].systemName+':xrange';
            y0GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
            y0RangePV='pva://'+displayHarps[harp].systemName+':yrange';
            x0legend.push(displayHarps[harp].displayName);
            y0legend.push(displayHarps[harp].displayName);
            x0GraphKey=x0GraphKey+displayHarps[harp].systemName;
            y0GraphKey=y0GraphKey+displayHarps[harp].systemName;
            x0SystemName=displayHarps[harp].systemName;
            numberOfInsertedGraphs++;
          }else{
            x1GraphPVs.push('pva://'+displayHarps[harp].systemName+':xcur');
            x1RangePV='pva://'+displayHarps[harp].systemName+':xrange';
            y1GraphPVs.push('pva://'+displayHarps[harp].systemName+':ycur');
            y1RangePV='pva://'+displayHarps[harp].systemName+':yrange';

            x1legend.push(displayHarps[harp].displayName);
            y1legend.push(displayHarps[harp].displayName);
            x1GraphKey=x1GraphKey+displayHarps[harp].systemName;
            y1GraphKey=y1GraphKey+displayHarps[harp].systemName;
            x1SystemName=displayHarps[harp].systemName;
            numberOfInsertedGraphs++;

          }

        }

      }
      if  (numberOfInsertedGraphs>=2){
        maxHarpsReached=true;
      }

      this.setState({displayHarps:displayHarps,maxHarpsReached:maxHarpsReached,
        x0GraphPVs:x0GraphPVs,y0GraphPVs:y0GraphPVs,x0legend:x0legend,y0legend:y0legend,x0GraphKey:x0GraphKey,y0GraphKey:y0GraphKey,
        x1GraphPVs:x1GraphPVs,y1GraphPVs:y1GraphPVs,x1legend:x1legend,y1legend:y1legend,x1GraphKey:x1GraphKey,y1GraphKey:y1GraphKey,
        x0RangePV:x0RangePV,x1RangePV:x1RangePV,y0RangePV:y0RangePV,y1RangePV:y1RangePV,x0SystemName:x0SystemName,x1SystemName:x1SystemName})

      }
      render() {
        //      console.log("state: ",this.state);
        //console.log('displayHarps',this.state.displayHarps)

        const { classes } = this.props;
        const topTabValue  = this.state.topTabValue;
        const sideTabValue  = this.state.sideTabValue;
        return (
          <div style={{"overflowX": "hidden",'overflowY':'hidden'}}>
            <SideBar/>
            <Grid container spacing={0}>
              <Grid item sm={1} >
                <AppBar position="static" color="default" >
                  <VerticalTabs
                    value={sideTabValue}
                    onChange={this.handleSideTabChange}

                    indicatorColor="primary"
                    textColor="primary"
                    classes={{flexContainer: {  flexDirection: 'column'  }}}


                    >
                      <Tab label="SPC1" />    {/* side Tab 0*/}
                      <Tab label="J-Line" />  {/* side Tab 1*/}
                      <Tab label="SPC2" />    {/* side Tab 2*/}
                      <Tab label="SSC" />     {/* side Tab 3*/}
                      <Tab label="X-Line" />  {/* side Tab 4*/}
                      <Tab label="Isotopes" />{/* side Tab 5*/}
                      <Tab label="Therapy" /> {/* side Tab 6*/}
                      <Tab label="Physics" /> {/* side Tab 7*/}
                      <Tab label="Other" />   {/* side Tab 8*/}


                    </VerticalTabs>
                  </AppBar>
                </Grid>
                <Grid item sm={8}>
                  <div style={{height:'95vh',marginRight:'12px'}}>

                    {/*SPC1*/}
                    {sideTabValue === 0 && <TabContainer >
                      <AppBar position="static" color="default" >
                        <Tabs
                          value={topTabValue}
                          onChange={this.handleTopTabChange}
                          variant="scrollable"
                          indicatorColor="primary"
                          textColor="primary"
                          classes={{flexContainer: {  flexDirection: 'column'  }}}

                          > <Tab label="SPC1 Ion Source" />
                          <Tab label="SPC1 Power Supplies 1" />
                          <Tab label="SPC1 Power Supplies 2" />
                          <Tab label="SPC1 Central Region " />
                          <Tab label="SPC1 Extraction" />
                          <Tab label="SPC1 Other 1" />
                          <Tab label="SPC1 Other 2" />
                        </Tabs>
                      </AppBar>
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC1']['SPC1-IonSource']}   /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC1']['SPC1-Central']}     /> </TabContainer> }
                    </TabContainer>}

                    {/*J-Line*/}
                    {sideTabValue === 1 && <TabContainer >
                      <AppBar position="static" color="default" >
                        <Tabs
                          value={topTabValue}
                          onChange={this.handleTopTabChange}
                          variant="scrollable"
                          indicatorColor="primary"
                          textColor="primary"
                          classes={{flexContainer: {  flexDirection: 'column'  }}}

                          > <Tab label="J-Slits" />
                          <Tab label="J-PowerSupplies" />
                      </Tabs>
                      </AppBar>
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['J-Line']['J-Slits']}         /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['J-Line']['J-PowerSupplies']} /> </TabContainer> }
                    </TabContainer>}

                    {/*SPC2*/}
                    {sideTabValue === 2 && <TabContainer >
                      <AppBar position="static" color="default" >
                        <Tabs
                          value={topTabValue}
                          onChange={this.handleTopTabChange}
                          variant="scrollable"
                          indicatorColor="primary"
                          textColor="primary"
                          classes={{flexContainer: {  flexDirection: 'column'  }}}

                          > <Tab label="HMI" />
                          <Tab label="GTS2" />
                          <Tab label="AX-Line" />
                          <Tab label="SPC2-Central" />
                          <Tab label="H-Line" />
                          <Tab label="K-Line" />
                          <Tab label="Q-Line" />
                          <Tab label="Q2-Line" />
                      </Tabs>
                      </AppBar>
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['HMI']}          /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['GTS2']}          /> </TabContainer> }
                      {topTabValue === 2 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['AX-Line']}      /> </TabContainer> }
                      {topTabValue === 3 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['SPC2-Central']} /> </TabContainer> }
                      {topTabValue === 4 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['H-Line']}       /> </TabContainer> }
                      {topTabValue === 5 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['K-Line']}       /> </TabContainer> }
                      {topTabValue === 6 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['Q-Line']}       /> </TabContainer> }
                      {topTabValue === 7 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SPC2']['Q2-Line']}      /> </TabContainer> }
                    </TabContainer>}

                    {/*SSC*/}
                    {sideTabValue === 3 && <TabContainer >
                      <AppBar position="static" color="default" >
                        <Tabs
                          value={topTabValue}
                          onChange={this.handleTopTabChange}
                          variant="scrollable"
                          indicatorColor="primary"
                          textColor="primary"
                          classes={{flexContainer: {  flexDirection: 'column'  }}}

                          > <Tab label="Injection" />
                          <Tab label="Central" />
                          <Tab label="Extraction" />
                          <Tab label="Probes" />
                      </Tabs>
                      </AppBar>
                      {/*}  ['SSC']['SSC-Injection']
                      ['SSC']['SSC-Central']
                      ['SSC']['SSC-Extraction']
                      ['SSC']['SSC-Probes']  */}
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SSC']['SSC-Injection']}  /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SSC']['SSC-Central']}    /> </TabContainer> }
                      {topTabValue === 2 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SSC']['SSC-Extraction']} /> </TabContainer> }
                      {topTabValue === 3 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['SSC']['SSC-Probes']}      /> </TabContainer> }
                    </TabContainer>}

                    {/*X-LINE*/}
                    {sideTabValue === 4 && <TabContainer >
                      <AppBar position="static" color="default" >
                        <Tabs
                          value={topTabValue}
                          onChange={this.handleTopTabChange}
                          variant="scrollable"
                          indicatorColor="primary"
                          textColor="primary"
                          classes={{flexContainer: {  flexDirection: 'column'  }}}

                          > <Tab label="X-Slits" />
                          <Tab label="X-PowerSups1" />
                          <Tab label="X-PowerSups2" />
                      </Tabs>
                      </AppBar>
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['X-Line']['X-Slits']}      /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['X-Line']['X-PowerSups1']} /> </TabContainer> }
                      {topTabValue === 2 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['X-Line']['X-PowerSups2']} /> </TabContainer> }
                    </TabContainer>}

                    {/*Isotopes*/}
                    {sideTabValue === 5 && <TabContainer >
                      <AppBar position="static" color="default" >
                        <Tabs
                          value={topTabValue}
                          onChange={this.handleTopTabChange}
                          variant="scrollable"
                          indicatorColor="primary"
                          textColor="primary"
                          classes={{flexContainer: {  flexDirection: 'column'  }}}

                          > <Tab label="Horizontal" />
                          <Tab label="Vertical" />
                      </Tabs>
                      </AppBar>
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Isotopes']['Horiz']}  /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Isotopes']['Vert']}   /> </TabContainer> }
                    </TabContainer>}

                    {/*Therapy*/}
                    {sideTabValue === 6 && <TabContainer >
                      <AppBar position="static" color="default" >
                        <Tabs
                          value={topTabValue}
                          onChange={this.handleTopTabChange}
                          variant="scrollable"
                          indicatorColor="primary"
                          textColor="primary"
                          classes={{flexContainer: {  flexDirection: 'column'  }}}

                          > <Tab label="Horizontal" />
                          <Tab label="Vertical" />
                      </Tabs>
                      </AppBar>
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Therapy']['Proton']}  /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Therapy']['Neutron']}   /> </TabContainer> }
                    </TabContainer>}

                  {/*PHYSICS*/}
                  {sideTabValue === 7 && <TabContainer >
                    <AppBar position="static" color="default" >
                      <Tabs
                        value={topTabValue}
                        onChange={this.handleTopTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        classes={{flexContainer: {  flexDirection: 'column'  }}}
                        >
                          {/*PHYSICS-Columns*/}
                          <Tab label="Physics P1-Line Power Supplies" />
                          <Tab label="Physics P2-Line Power Supplies" />
                          <Tab label="Physics A-G Line Power Supplies" />
                          <Tab label="Physics Spectrometer Power Supplies" />
                        </Tabs>
                      </AppBar>
                      {topTabValue === 0 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Physics']['P1-Line']}   /> </TabContainer> }
                      {topTabValue === 1 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Physics']['P2-Line']}   /> </TabContainer> }
                      {topTabValue === 2 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Physics']['A-G-Lines']} /> </TabContainer> }
                      {topTabValue === 3 && <TabContainer > <ControlCenterTable handleOnSystemClick={this.handleOnSystemClick} systems={systems['Physics']['Spectrmtr']} /> </TabContainer> }
                {/*
                      {/*PHYSICS-Column 1: P1 LINE
                      {topTabValue === 0 && <TabContainer >
                        <ControlCenterTable
                          handleOnSystemClick={this.handleOnSystemClick}
                          systems={systems['P-Line']['tab0']}
                        />
                      </TabContainer>
                    }
                    {/*PHYSICS-Column 2 P2 Line
                    {topTabValue === 1 && <TabContainer >
                      <ControlCenterTable
                        handleOnSystemClick={this.handleOnSystemClick}
                          systems={systems['P-Line']['tab1']}
                      />
                    </TabContainer>
                  }
                  {/*PHYSICS-Column 3 A-G Lines
                  {topTabValue === 2 && <TabContainer >
                    <ControlCenterTable
                      handleOnSystemClick={this.handleOnSystemClick}
                      systems={[
                        {systemName:'quad1ag', displayName:'quad1ag',editorType:'singlePS',devices:{device:{deviceName:'quad1ag',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
                        {systemName:'quad2ag', displayName:'quad2ag',editorType:'singlePS',devices:{device:{deviceName:'quad2ag',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
                        {systemName:'quad3ag', displayName:'quad3ag',editorType:'singlePS',devices:{device:{deviceName:'quad3ag',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
                        {systemName:'quad4ag', displayName:'quad4ag',editorType:'singlePS',devices:{device:{deviceName:'quad4ag',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:3,units:"A",useStatus:true}},
                      ]}
                    />
                  </TabContainer>
                }
                {/*PHYSICS-Column 3
                {topTabValue === 3 && <TabContainer >
                  <ControlCenterTable
                    handleOnSystemClick={this.handleOnSystemClick}
                    systems={[
                      {systemName:'quad01i',  displayName:'quad01i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad01i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                      {systemName:'quad02i',  displayName:'quad02i',editorType:'singlePsSingleIgor',devices:{device:{deviceName:'quad02i',readback:'get-I',setpoint:'put-I',statusText:'get-statusText'}},props:{usePrecision:true,prec:4,units:"A",useStatus:true}},
                    ]}
                  />
                </TabContainer>
              }  */}
            </TabContainer>}
          </div>
        </Grid>
        <Grid item sm={3} >
          {/*Editor Types region 3*/}
          {((this.state['displayEditor']===true) &&(this.state['editorType']==='steererXY'))&&<ControlRightSteererXY key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
          {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePS'))&&<ControlRightSinglePS key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
          {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePSVarTable'))&&<ControlRightSinglePSVarTable key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
          {((this.state['displayEditor']===true) &&(this.state['editorType']==='singlePsSingleIgor'))&&<ControlRightPsSingleIgor key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
          {((this.state['displayEditor']===true) &&(this.state['editorType']==='IonSourcePostion'))&&<ControlRightIonSourcePostion key={'editor-key'+this.state.editorSystem.systemName} system={this.state.editorSystem}/>}
        </Grid>
      </Grid>




    </div>





  );
}
}

IvanControlTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IvanControlTable);
//export default IvanControlTable;
