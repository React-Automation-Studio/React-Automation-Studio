

```js
import HorizontalBeamline from './HorizontalBeamline';
import QuadrapoleMagnet from './QuadrapoleMagnet';
import BendingMagnet from './BendingMagnet';
import SteererMagnet from './SteererMagnet';
<BeamLineCanvas width={600} height={300} >
	<HorizontalBeamline 
		x={0}
		y={50}
		pv={'pva://testIOC:BeamlineA:BeamOn'}
		width={'113px'}
	/>
	<HorizontalBeamline 
		x={'113px'}
		y={50}
		pv={'pva://testIOC:BeamlineB:BeamOn'}
		width={'148px'}
	/>
	<HorizontalBeamline 
		x={'261px'}
		y={50}
		pv={'pva://testIOC:BeamlineC:BeamOn'}
		width={'150px'}
	/>
	<QuadrapoleMagnet
		x={50}
		y={50}
	 	system={{ systemName: '$(IOC):$(device)',
            displayName: 'Q1',
            editorType: 'editorSinglePS',
            setpointPv: '$(IOC):$(device):Setpoint',
            readbackPv: '$(IOC):$(device):Readback',
            onOffPv: '$(IOC):$(device):On',
            statusTextPv: '$(IOC):$(device):On',
            scanPv: '$(IOC):$(device):SimReadback.SCAN',
            orocPv: '$(IOC):$(device):SimReadback.OROC',
            rampRatePv: '$(IOC):$(device):RampRate',
            macros:
            {
              '$(IOC)': 'pva://testIOC',
              '$(device)': 'PS1',
            },
            }}
	  	usePvUnits={true}
		usePvLabel={false}
		alarmSensitive={true}
		
		componentShadow={true}
		textShadow={false}
		componentGradient={true}
	/>
	<BendingMagnet
		x={100}
		y={50}
		system={{
			systemName: '$(IOC):$(device)',
			displayName: 'BM1',
			editorType: 'editorSinglePS',
			setpointPv: '$(IOC):$(device):Setpoint',
			readbackPv: '$(IOC):$(device):Readback',
			onOffPv: '$(IOC):$(device):On',
			statusTextPv: '$(IOC):$(device):On',
			scanPv: '$(IOC):$(device):SimReadback.SCAN',
			orocPv: '$(IOC):$(device):SimReadback.OROC',
			rampRatePv: '$(IOC):$(device):RampRate',
			macros:
			{
			'$(IOC)': 'pva://testIOC',
			'$(device)': 'PS4',
			},
		}}
		usePvUnits={true}
		usePvLabel={false}
		alarmSensitive={true}
		label='BM1'
		componentShadow={true}
		textShadow={false}
		componentGradient={true}
	/>
	<SteererMagnet
		system={{
		systemName:'testIOC:STR3',
		displayName:'STR3Y',
		editorType:'singlePS',
		devices:
			{
				device:
					{
						deviceName:'testIOC:STR3:Y',
						readback:'Readback',
						setpoint:'Setpoint'
					}
				}
		}}
		x={150}
		y={50}
		usePvUnits={true}
		prec={3}
		alarmSensitive={true}
		labelOffsetY={0}
		labelOffsetX={0}
		valueOffsetY={0}
		valueOffsetX={0}
		componentShadow={true}
		textShadow={false}
		componentGradient={true}
	/>
</BeamLineCanvas>
```