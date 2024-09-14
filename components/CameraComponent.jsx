import React, { useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { Button, Box } from "@mui/material";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

const buttonColor = {
  backgroundColor: "#36CA86",
  color: "#FFFFFF",
};

const CameraComponent = () => {
  const [cameraInstance, setCameraInstance] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);

  // Load cocoSsd model when component mounts
  useEffect(() => {
    const loadModel = async () => {
      await cocoSsd.load();
    };
    loadModel();
  }, []);

  // Handle taking a photo
  const handleTakePhoto = () => {
    if (cameraInstance) {
      const photo = cameraInstance.takePhoto();
      setImageSrc(photo);
      detectObjects(photo);
    }
  };

  // Detect objects in the captured image
  const detectObjects = async (image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image;

    // Load the cocoSsd model
    const model = await cocoSsd.load();

    // Wait for the image to load fully before running predictions
    imgElement.onload = async () => {
      const predictions = await model.detect(imgElement);
      console.log("Predictions: ", predictions);
      setPredictions(predictions);
    };
  };

  return (
    <div>
      {imageSrc ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <div style={{ position: "relative" }}>
            <img
              src={imageSrc}
              alt="Captured"
              style={{
                maxWidth: "60%",
                maxHeight: "60%",
                border: "solid 1px black",
              }}
            />
            {predictions.map((prediction, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${prediction.bbox[0]}px`,
                  top: `${prediction.bbox[1]}px`,
                  width: `${prediction.bbox[2]}px`,
                  height: `${prediction.bbox[3]}px`,
                  border: "2px solid red",
                  color: "white",
                  background: "rgba(255, 0, 0, 0.5)",
                  zIndex: 1,
                }}
              >
                {prediction.class}
              </div>
            ))}
          </div>
          <Button style={buttonColor}>Save</Button>
        </Box>
      ) : (
        <>
          <Camera
            onTakePhoto={handleTakePhoto}
            numberOfCamerasCallback={(num) => console.log(num)}
            refCallback={(cam) => setCameraInstance(cam)} // Use refCallback to capture camera instance
          />
          <Box
            height={"45vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"end"}
          >
            <Button style={buttonColor} onClick={handleTakePhoto}>
              Take a photo
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default CameraComponent;
