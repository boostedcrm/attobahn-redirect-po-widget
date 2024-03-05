import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import logo from "./auttobahn.png";
const ZOHO = window.ZOHO;

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [zohoInitialized, setZohoInitialized] = useState(false);
  const [prevPoRequest, setPrevPoRequest] = useState(null);

  useEffect(() => {
    let paData = "";
    ZOHO.embeddedApp.on("PageLoad", async function (data) {
      ZOHO.CRM.UI.Resize({ height: "200", width: "800" });
      await ZOHO.CRM.API.getRecord({
        Entity: data?.Entity,
        RecordID: data?.EntityId,
      }).then(async function (data) {
        setPrevPoRequest(data?.data[0]);
        paData = data?.data[0];
        const newUrl =
        "https://books.zoho.com/app/746629578#/purchaseorders/" + paData?.PO_Id;
      console.log({ newUrl });
  
      // Open the URL in a new tab
      const newWindow = window.open(newUrl, "_blank");
      // Close the current tab after a delay
      setTimeout(() => {
        console.log("testing");
        handleCloseWidget();
      }, 1000);
  
      // Function to close the current tab
      const handleCloseWidget = () => {
        ZOHO.CRM.UI.Popup.close().then(function (data) {
          console.log(data);
        });
      };
      });
    });

    ZOHO.embeddedApp.init().then(() => {
      setZohoInitialized(true);
    });
  }, []);



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Box>
        <img src={logo} width={200} alt="logo" />
        <Typography variant="h6" sx={{ mt: 2 }} align="center">
          Please wait...
          <CircularProgress size={20} />
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
