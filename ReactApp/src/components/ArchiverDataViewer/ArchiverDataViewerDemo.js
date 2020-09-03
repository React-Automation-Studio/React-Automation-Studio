import React, {useState,useEffect} from 'react';
import ArchiverData from '../ArchiverDataViewer/ArchiverData'
import TraditionalLayout from '../UI/Layout/ComposedLayouts/TraditionalLayout.js';
const ArchiverDataViewerDemo=(props)=>{
   
return(
     <TraditionalLayout
      title="Mobile Layout Example"
      denseAppBar
      alignTitle="center"
        >
    <ArchiverData
        debug={true}
        pv={'pva://testIOC:BO1'}
        from={'2020-08-31T12:20:00'}
        to=  {'2020-09-02T15:30:00'}

       
    />
     <ArchiverData
        debug={true}
        pv={'pva://testIOC:BO1'}
        //from={'2020-08-31T12:20:00'}
        //to={'2020-09-02T15:30:00'}

       
    />
   </TraditionalLayout>
)   
    
}
 export default ArchiverDataViewerDemo