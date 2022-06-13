import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function IsPrinting({children}) {
  const printingMode = useMediaQuery('print');
  return children(printingMode===false);
}
