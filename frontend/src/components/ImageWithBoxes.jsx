import { Tooltip } from "@mui/material";
import React, { useState } from "react";

const ImageWithBoxes = ({ imageData, selectedBrand, setSelectedBrand }) => {
  const imageRef = React.useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Function to convert pixel co-ordinates to percentage values
  const convertToPercentage = (value, total) => {
    return (value / total) * 100;
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
        ref={imageRef}
        src={`data:image/png;base64, ${imageData.imageData}`}
        alt={`Image ${imageData.id}`}
        onLoad={() => {
          const { naturalWidth, naturalHeight } = imageRef.current;
          imageData.contentInformation.forEach((box) => {
            box.x = convertToPercentage(box.x, naturalWidth);
            box.y = convertToPercentage(box.y, naturalHeight);
            box.width = convertToPercentage(box.width, naturalWidth);
            box.height = convertToPercentage(box.height, naturalHeight);
          });
          setImageLoaded(true);
        }}
      />
      {imageLoaded && (
        <>
          {imageData.contentInformation.map((el, index) => (
            <Tooltip title={el.brandName} placement="top">
              <div
                onClick={() => setSelectedBrand(el.brandName)}
                key={index}
                style={{
                  zIndex: 200,
                  cursor: "pointer",
                  position: "absolute",
                  top: `${el.y}%`, // Replace with the actual y-coordinate
                  left: `${el.x}%`, // Replace with the actual x-coordinate
                  width: `${el.width}%`, // Replace with the actual box width
                  height: `${el.height}%`, // Replace with the actual box height
                  border:
                    selectedBrand === el.brandName
                      ? "2px solid yellow"
                      : "2px solid cyan", // You can customize the box style
                }}
              />
            </Tooltip>
          ))}
        </>
      )}
    </div>
  );
};

export default ImageWithBoxes;
