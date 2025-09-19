import React, { useContext } from "react";
import { DocsContext,Source } from '@storybook/addon-docs/blocks';

export const ImportPath = (props): JSX.Element => {
  const context = useContext(DocsContext);

  const arr = context?.primaryStory?.kind?.split("/");

  const componentName = arr[arr.length - 1];

  const path = `import  ${componentName}  from '${props.libName}/${context?.primaryStory.parameters.fileName.toString().replace(".stories.jsx","").replace(".stories.tsx","").replace(".stories.ts","").replace(".stories.js","").replace("./src/","")}';`;

  return <Source language="js" code={props.fullPath?props.fullPath:path} />;
};

export default ImportPath;
