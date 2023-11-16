import React, { useContext } from "react";
import { DocsContext, Source } from "@storybook/addon-docs";

export const ImportPath = (props): JSX.Element => {
  const context = useContext(DocsContext);
  console.log(context);
  const arr = context?.primaryStory?.kind?.split("/");

  const componentName = arr[arr.length - 1];
 
  const path = `import  ${componentName}  from '${props.libName}/${context?.primaryStory?.kind}';`;

  return <Source language="js" code={props.fullPath?props.fullPath:path} />;
};

export default ImportPath;
