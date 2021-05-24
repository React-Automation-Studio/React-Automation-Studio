 ``` js
import BeamLineCanvas from '../SvgBeamlineComponents/BeamLineCanvas';
import HorizontalBeamline from '../SvgBeamlineComponents/HorizontalBeamline';
<BeamLineCanvas 
  width={600} 
  height={300} 
  //debugBorder={true}
  >
    <HorizontalBeamline 
      x={0}
      y={50}
      pv={'testIOC:BeamlineA:BeamOn'}
      width={'600px'}
    />
  
    <SvgComponent
      x={50}
      y={50}
      pv={'$(IOC):$(device):Readback'}
      macros=
        {{
          '$(IOC)': 'testIOC',
          '$(device)': 'PS3',
        }}
      usePvUnits={true}
      usePvLabel={false}
      alarmSensitive={true}
      label='Star1'
      componentShadow={false}
      textShadow={false}
      componentGradient={true}
    >
      <svg x={-25} y={-25} width={50} height={50} viewBox="0 0 13.229 13.229" >
        <path
           d="M10.141 294.374l-3.398-1.67-3.303 1.853.538-3.748-2.783-2.568 3.731-.647 1.582-3.44 1.769 3.349 3.76.441-2.638 2.717z"
          transform="matrix(1.2128 .0345 -.03564 1.27522 8.86 -362.544)"
        />
      </svg>
    </SvgComponent>
    <SvgComponent
      x={120}
      y={50}
      pv={'$(IOC):$(device):Readback'}
      macros=
        {{
          '$(IOC)': 'testIOC',
          '$(device)': 'PS3',
        }}
      usePvUnits={true}
      usePvLabel={false}
      alarmSensitive={true}
      label='Star1'
      componentShadow={false}
      textShadow={false}
      componentGradient={true}
    >
      <svg x={-25} y={-25} width={50} height={50} viewBox="0 0 13.229 13.229" >
        <path
           d="M5.717 294.518l-1.425 2.469H1.44l-1.426-2.47 1.426-2.468h2.85z"
          transform="matrix(2.3042 0 0 2.6704 .01 -779.873)"
        />
      </svg>
    </SvgComponent>
      <SvgComponent
      x={180}
      y={50}
      pv={'$(IOC):$(device):Readback'}
      macros=
        {{
          '$(IOC)': 'testIOC',
          '$(device)': 'PS3',
        }}
      usePvUnits={true}
      usePvLabel={false}
      alarmSensitive={false}
      label='V1'
      componentShadow={false}
      textShadow={false}
      componentGradient={true}
      showValue={false}
    >
      <svg x={-25} y={-26} width={50} height={50} viewBox="0 0 13.229 13.229" >
     <g >
       <path  d="M.013 5.305h16.046v2.62H.013z" />
        <path
          d="M13.015 5.156h-.591c-.004 0-.008-.003-.01-.004l-.324-.29c-.083-.076-.224-.196-.313-.117h-.605v-.013c0-.22-.199-.398-.443-.398h-.457c-.244 0-.443.179-.443.398v.013h-.605a.466.466 0 00-.314.117l-.323.29c-.002.003-.007.002-.01.004h-.834v-.75c0-.004.002-.006.004-.008l.324-.29a.377.377 0 00.13-.282v-.544h.014c.244 0 .442-.18.442-.399v-.41c0-.22-.23-.521-.442-.4h-.929v-.23h1.843a.704.704 0 00.512-.213.564.564 0 00.15-.491C9.74.85 9.444.635 9.104.635h-1.65L7.38.43C7.288.184 7.032.018 6.742.018h-.255c-.29 0-.546.166-.637.413l-.076.204h-1.65c-.339 0-.634.216-.686.504a.564.564 0 00.15.49.704.704 0 00.512.214h1.843v.23h-.929c-.244 0-.442.18-.442.4v.41c0 .22.436.152.442.399h.015v.544c0 .106.046.206.13.282l.323.29.004.008v.75h-.834c-.004 0-.007-.003-.01-.004l-.323-.29c-.084-.076-.224-.196-.313-.117H3.4v-.013c0-.22-.198-.398-.443-.398H2.5c-.244 0-.443.179-.443.398v.013h-.605a.466.466 0 00-.313.117l-.323.29a.013.013 0 01-.01.004H.213c-.118 0-.214.086-.214.193v3.006c0 .106.096.192.214.192h.591c.004 0 .008.003.01.004l.324.29c.083.076.224.196.313.117h.605v.013c0 .22.199.398.443.398h.457c.245 0 .443-.618.443-.398v-.013h.606c.118 0 .229-.041.313-.117l.323-.29a.013.013 0 01.01-.004h3.925c.004 0 .007.003.01.004l.323.29a.466.466 0 00.314.117h.605v.013c0 .22.199.398.443.398h.457c.244 0 .443-.179.443-.398v-.013h.605c.119 0 .23-.041.313-.117l.324-.29a.013.013 0 01.01-.004h.59c.12 0 .215-.086.215-.193V5.348c0-.106-.096-.192-.214-.192z"
         
        />
      </g>
        
      </svg>
    </SvgComponent>

    
  </BeamLineCanvas>

```