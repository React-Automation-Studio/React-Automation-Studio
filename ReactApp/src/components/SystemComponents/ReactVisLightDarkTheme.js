import Loadable from 'react-loadable';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const LoadableReactVisLightCompoment = Loadable({
  loader: () => import('../../CSS/ReactVisLightCompoment'),
  loading() {
    return <div>Loading LoadableReactVisLightCompoment</div>
  }
});
/**
* LoadableReactVisDarkCompoment
*/
const LoadableReactVisDarkCompoment = Loadable({
  loader: () => import('../../CSS/ReactVisDarkCompoment'),
  loading() {
    return <div>Loading LoadableReactVisLightCompoment</div>
  }
});

const styles = theme => ({

  lineSeries: {

    stroke:theme.palette.type==='dark'?'orange':'default'


  },
});

class ReactVisLightDarkTheme extends React.Component {
  constructor(props) {

    super(props);
    let state={};
    this.state=state;
  }
  render(){
    const theme=this.props.theme;
    return(
      <React.Fragment>
        {theme.palette.type==='dark'&& <LoadableReactVisDarkCompoment/>}
        {theme.palette.type==='light'&& <LoadableReactVisLightCompoment/>} */}
      </React.Fragment>

    )
  }
}
export default withStyles(styles,{withTheme:true})(ReactVisLightDarkTheme)
