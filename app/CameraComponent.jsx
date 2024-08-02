import React, { useState, useRef, forwardRef } from "react";
import { Camera } from "react-camera-pro";
import { Button, Box, Modal } from "@mui/material";

const CameraComponent = forwardRef((props, ref) => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const imageRef = useRef(null);
  // the following line is wrong
  // const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false)

  const handleTakePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      console.log("Photo taken:", photo); // display the photo taken
      imageRef.current = photo;
      console.log(imageRef.current, "image is here");
      setOpen(true)
    } else {
      console.log("Camera ref is null");
    }
  };

  // const handleClose = () => setOpen(false);

  return (
    <div>
      <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} />
      {imageRef.current && (
        <Box
        // width="100vw"
        // height="100vh"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        // gap={2}
        >
        <Modal
        open={open}
        // onClose={handleClose}
      >
          <img
            src={imageRef.current}
            alt="Image preview"
            style={{ maxWidth: "20%", maxHeight: "20%", border: "solid 1px black" }}
          />
          <Button variant="contained">
          <div>Save</div>
        </Button>
        </Modal>
        </Box>
      )}
      <Box
        height={"90vh"}
        display={"flex"}
        justifyContent={"center"}
        // flexDirection={"column"}
        alignItems={"end"}
      >
        <Button variant="contained" onClick={handleTakePhoto}>
          <div>Take a photo</div>
        </Button>
      </Box>
    </div>
  );
});

// set the display name in case there is error message and tool name display
CameraComponent.displayName = "Camera";

export default CameraComponent;
