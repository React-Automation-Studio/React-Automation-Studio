 ``` js

<div style={{position:'relative'}}>
       <HorizontalBeamline 
          x={0}
          y={20}
       
          pv={'pva://testIOC:BeamlineA:BeamOn'}
          width={'113px'}
          debug={true}
        />
        <HorizontalBeamline 
          x={'113px'}
          y={20}
          pv={'pva://testIOC:BeamlineB:BeamOn'}
          width={'148px'}
          debug={true}
        />
        <HorizontalBeamline 
          x={'261px'}
          y={20}
          pv={'pva://testIOC:BeamlineC:BeamOn'}
          width={'150px'}
          debug={true}
        />
        </div>

```