

TraditionalLayout with no moreVert drawer and custom items in side drawer
```js
import Content from '../../../../docs/content/LayoutContent';
import TraditionalLayout from './TraditionalLayout'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TouchAppIcon from '@mui/icons-material/TouchApp';

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

;

<TraditionalLayout
    title="My App Title"
    alignTitle="center"
    denseAppBar
    hideMoreVertMenu
    drawerItems={drawerItems}
>
    <Content/>   
</TraditionalLayout>
```


