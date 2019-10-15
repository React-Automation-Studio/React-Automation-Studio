import React, { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function IsPrinting({children}) {
  const printingMode = useMediaQuery('print');
//  useEffect(() => {
//
//    props.isPrinting(matches);
//  });

  return children(printingMode===false);
}
