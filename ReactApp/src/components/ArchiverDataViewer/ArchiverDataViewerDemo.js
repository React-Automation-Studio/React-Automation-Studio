import React, {useState,useEffect} from 'react';
import ArchiverData from '../ArchiverDataViewer/ArchiverData'

const ArchiverDataViewerDemo=(props)=>{
   
return(
    <div style={{width:'100%'}}>
    <ArchiverData
        debug={true}
        pv={'pva://testIOC:BO1'}
        from={'2020-08-31T12:20:00Z'}
        to={'2020-08-31T15:30:00Z'}

       
    />
    </div>
)   
    
}
 export default ArchiverDataViewerDemo