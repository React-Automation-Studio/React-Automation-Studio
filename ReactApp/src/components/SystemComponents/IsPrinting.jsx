import useMediaQuery from '@mui/material/useMediaQuery';

export default function IsPrinting({children}) {
  const printingMode = useMediaQuery('print');
  return children(printingMode===false);
}
