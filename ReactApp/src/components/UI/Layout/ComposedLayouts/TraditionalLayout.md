Simple TraditionalLayout with default app bar styling, drawers and no footer.
```js
import Content from '../../../../docs/content/LayoutContent.js';

    <TraditionalLayout
        title="My App Title"
    >
        <Content/>   
    </TraditionalLayout>
```

TraditionalLayout with styled app bar, footer and custom footerContent.
```js
import Content from '../../../../docs/content/LayoutContent.js';

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

;<TraditionalLayout
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

TraditionalLayout with no moreVert drawer and custom items in side drawer
```js
import Content from '../../../../docs/content/LayoutContent.js';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TouchAppIcon from '@material-ui/icons/TouchApp';

const username = 'Guest'

const handleClickMe2 = () => {
    alert("Thank you for clicking me 2!")
}

const drawerItems=(
    <React.Fragment>
        <ListItem button onClick={()=>alert("Thank you for clicking me!")}>
            <ListItemIcon >
                <TouchAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={"Click me!"} />
        </ListItem>
        <ListItem button onClick={handleClickMe2}>
            <ListItemIcon >
                <TouchAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={"Click me 2!"} />
        </ListItem>
    </React.Fragment>
)

;<TraditionalLayout
    title="My App Title"
    alignTitle="center"
    denseAppBar
    hideMoreVertMenu
    drawerItems={drawerItems}
>
    <Content/>   
</TraditionalLayout>
```

TraditionalLayout that hides drawers after item click
```js
import Content from '../../../../docs/content/LayoutContent.js';

;<TraditionalLayout
    title="My App Title"
    alignTitle="center"
    denseAppBar
    hideDrawerAfterItemClick
    hideMoreVertDrawerAfterItemClick
>
    <Content/>   
</TraditionalLayout>
```