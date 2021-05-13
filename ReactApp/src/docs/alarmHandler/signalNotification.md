To enable Signal notifications first set the server port and the Signal account number through environment variables.

The server port defaults to 8000 if not set.

The Signal account number must be in E.164 format as per https://en.wikipedia.org/wiki/E.164 .

Edit .env file and set:

```bash
    SIGNAL_ACC_NUMBER=+12345678901
    SIGNAL_CLI_REST_API_PORT=8000
```

<br/>

The next step is to link the Signal account (number above) to the server. **To link the device you will require a mobile smartphone with the Signal app installed and logged in with the above Signal account number.**

On a browser navigate to the signal-cli-rest-api web server which can be found at http://localhost:8000/docs if RAS is running on the local PC or at http://XXX.XXX.XXX.XXX:8000/docs where XXX... is the IP of the remote server.

<br/>

You will be presented with the web interface below.

<center>
<img src="img/alarmHandler/signal-cli-rest-api.png" alt="signal-cli-rest-api" width="100%"/>
</center>
<center>*signal-cli-rest-api web server*</center>
<br/><br/>

To link the device follow the steps below:
1. On the signal-cli-rest-api web server under the **register** methods click on **/register/{number}/link**
2. Click on the **[Try it out]** button
3. Enter the Signal account number (as above in E.164 format) in the **number** input field and click on the **[Execute]** button
4. After a few seconds a response will be shown with a QR code, ensure the response code is 200 - HTTP OK success response
5. In the Signal app on the mobile smartphone:
   * Navigate to **Settings** > **Linked devices**
   * Click on the **(+)** icon to link a new device
   * Use the smartphone camera to scan the QR code shown on the webserver from above
   * Click **Link device** when prompted
   * A **Device approved** message will confirm that the device has been linked

To verify the link on the server:
   * Navigate from the React Automation Studio root folder to `./signalcli/signal-cli-config/data/`
   * Verify that a file with filename of the Signal account number has been created at that location