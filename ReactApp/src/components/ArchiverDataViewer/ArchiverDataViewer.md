Example trace prop:
```js static

 traces={
            [
                {
                    pv:'pva://testIOC:BO1',
                    yAxis:0
                },
                {   pv:'pva://testIOC:amplitude',
                    yAxis:1
                },
                {   pv:'pva://testIOC:BO2',
                    yAxis:2
                }
            ]
        }

```
Note: for plotly to display the traces correctly the yAxis:0 always needs to be assigned.

Example yAxes prop:
```js static

 traces={
           yAxes={
            [
                {
                    title: "BO1",
                },
                {
                    title: "Amplitude",
                },
                {
                    title: "BO2",
                },

            ]}
        }

```


```js
import ToggleButton from '../../components/BaseComponents/ToggleButton.js';
import ThumbWheel from '../../components/BaseComponents/ThumbWheel.js';
<div>
    <ArchiverDataViewer
        debug={true}
        archiver={"DEMO_ARCHIVER"}
        title={"Demo Archiver Viewer"}
        showButtons={true}
        traces={
            [
                {
                    pv:'pva://testIOC:BO1',
                    yAxis:0
                },
                {   pv:'pva://testIOC:amplitude',
                    yAxis:1
                },
                {   pv:'pva://testIOC:BO2',
                    yAxis:2
                },
            ]}
            yAxes={
            [
                {
                    title: "BO1",
                },
                {
                    title: "Amplitude",
                },
                {
                    title: "BO2",
                },

            ]}
    />

    <ToggleButton
        style={{paddingTop:32}}
        usePvLabel={true}
        pv='pva://testIOC:BO1'
    />
    <ToggleButton
        style={{paddingTop:32}}
        usePvLabel={true}
        pv='pva://testIOC:BO2'
    />
    <div style={{paddingTop:32}}>
        <ThumbWheel
            usePvLabel={true}
            pv='pva://testIOC:amplitude'
            usePvMinMax={true}
        />
    </div>
</div>
```



