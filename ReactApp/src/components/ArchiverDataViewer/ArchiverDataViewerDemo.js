import React, {useState,useEffect} from 'react';
import ArchiverData from '../ArchiverDataViewer/ArchiverData'

const ArchiverDataViewerDemo=(props)=>{
   
return(
    <div style={{width:'100%'}}>
    <ArchiverData
        debug={true}
        pv={'pva://testIOC:BO1'}
        options={'&donotchunk'}
    />
    </div>
)   
    
}
 export default ArchiverDataViewerDemo