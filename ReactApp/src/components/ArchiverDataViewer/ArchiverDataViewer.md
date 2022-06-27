{% raw %}

Example trace prop:
```js static

 traces={
            [
                {
                    pv:'testIOC:BO1',
                    yAxis:0
                },
                {   pv:'testIOC:amplitude',
                    yAxis:1
                },
                {   pv:'testIOC:BO2',
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
        title={"Archived Data"}
        showButtons={true}
        defaultButtonsExpanded={true}
        livePolling={true}
        fromTimeOffset={'1m'}
        traces={
            [
                {
                    pv:'testIOC:BO1',
                    yAxis:0
                },
                {   pv:'testIOC:amplitude',
                    yAxis:1
                },
                {   pv:'testIOC:BO2',
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
        pv='testIOC:BO1'
    />
    <ToggleButton
        style={{paddingTop:32}}
        usePvLabel={true}
        pv='testIOC:BO2'
    />
    <div style={{paddingTop:32}}>
        <ThumbWheel
            usePvLabel={true}
            pv='testIOC:amplitude'
            usePvMinMax={true}
        />
    </div>
</div>
```
{% endraw %}
