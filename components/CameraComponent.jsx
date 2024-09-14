import React, { useState, useRef, forwardRef } from "react";
import { Camera } from "react-camera-pro";
import { Button, Box } from "@mui/material";

const buttonColor = {
  backgroundColor: "#36CA86",
  colors: "FFFFFF",
};

const CameraComponent = forwardRef((props, ref) => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const imageRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleTakePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      console.log("Photo taken:", photo); // display the photo taken
      imageRef.current = photo;
      setOpen(true);
    } else {
      console.log("Camera ref is null");
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      {imageRef.current ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <img
            src={imageRef.current}
            alt="Image preview"
            style={{
              maxWidth: "60%",
              maxHeight: "60%",
              border: "solid 1px black",
            }}
          />
          <Button style={{ ...buttonColor, paddingTop: "10px" }}>
            <div>Save</div>
          </Button>
        </Box>
      ) : (
        <>
          <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} />
          <Box
            height={"45vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"end"}
          >
            <Button style={{ ...buttonColor, paddingTop: "10px" }} onClick={handleTakePhoto}>
              <div>Take a photo</div>
            </Button>
          </Box>
        </>
      )}
    </div>
  );
});

CameraComponent.displayName = "Camera";

export default CameraComponent;
