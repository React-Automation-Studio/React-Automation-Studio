

TraditionalLayout with styled app bar, footer and custom footerContent.
```js
import Content from '../../../../docs/content/LayoutContent.js';
import TraditionalLayout from './TraditionalLayout'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Grid from '@material-ui/core/Grid';

const username = 'Guest'

const footerContents=(
    <Grid container direction="row" justify="flex-start" alignItems="center" style={{color:"white"}} >
        <Grid item xs={10} style={{paddingLeft:"1em"}}>
            React Automation Studio Style Guide
        </Grid>
        <Grid item xs={2} container direction="row" justify="center" alignItems="center" style={{color:"white"}} >
            <Grid item>
                <AccountCircle/>
            </Grid>
            <Grid item style={{paddingLeft:"1em"}}>
                Guest
            </Grid>
        </Grid>
    </Grid>
)

;
<TraditionalLayout
    title="My App Title"
    alignTitle="center"
    denseAppBar
    showFooter
    footerHeight={40}
    footerContents={footerContents}
>
    <Content/>   
</TraditionalLayout>
```