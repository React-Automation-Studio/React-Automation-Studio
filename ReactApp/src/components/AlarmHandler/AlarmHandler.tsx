import React, { useState } from "react";
import Layout from "../UI/Layout/ComposedLayouts/TraditionalLayout";
import AlarmSetup from "./AlarmSetup";
import UserNotification from "./UserNotification";

/**
 * This is a preview AlarmHandler component. This component is built on a React Automation Studio based front end that connects
 * to an alarm server back end.
 *
 * The AlarmHandler component is still in development and is not considered production ready. Follow the setup and user guides is the Style
 * Guide to deploy the AlarmHandler for testing and experimentation.
 * <br/><br/>
 */
const AlarmHandler = ({
  titleProps = {},
  alarmDatabaseName = "",
  alarmDatabaseVersion = 1.5,
}: AlarmHandlerProps) => {
  const [tabVal, setTabVal] = useState(0);

  return (
    <Layout
      {...titleProps}
      denseAppBar
      tabs={["Alarm Table", "Notification Setup"]}
      tabValue={tabVal}
      handleTabChange={(event, value) => setTabVal(value)}
    >
      {tabVal === 1 ? (
        <UserNotification
          dbName={alarmDatabaseName}
          AHDBVer={alarmDatabaseVersion}
        />
      ) : (
        <AlarmSetup dbName={alarmDatabaseName} AHDBVer={alarmDatabaseVersion} />
      )}
    </Layout>
  );
};

interface AlarmHandlerProps {
  /** Name of the MongoDB alarm database to connect to */
  alarmDatabaseName: string;
  /** Version of the MongoDB alarm database configuration */
  alarmDatabaseVersion: number;
  /** Props passed to the underlying TraditionalLayout component and style the title displayed in the app bar.
   * See TraditionalLayout component for more information.
   */
  titleProps: object;
}

export default React.memo(AlarmHandler);
