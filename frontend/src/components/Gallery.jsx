import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import "./component_styles/Gallery.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ImageWithBoxes from "./ImageWithBoxes";
import BarShareDonutGraph from "./BarShareDonutGraph";
import ShelfAnalysisGraph from "./BrandDataAnalysis";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  const loadImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/images");
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleImageClick = async (id, imageData) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/image/${id}`);
      const rawCSV = response.data;
      const cleanedData = rawCSV.map((el) => {
        let keys = Object.keys(el)[0]
          .split(",")
          .map((el) => el.trim());
        let values = Object.values(el)[0]
          .split(",")
          .map((el) => el.trim());
        return keys.reduce((map, key, index) => {
          map[key] = values[index];
          return map;
        }, {});
      });
      setSelectedImage({
        id: id,
        imageData: imageData,
        contentInformation: cleanedData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Gallery">
      <div style={{ fontSize: 24, fontWeight: 500, marginTop: 20 }}>
        {!!selectedImage ? "Expanded image" : "Gallery"}
      </div>
      {!!selectedImage && (
        <Button variant="contained" onClick={clearSelectedImage}>
          <ArrowBack /> Go back to Gallery
        </Button>
      )}

      {!!selectedImage && (
        <BarShareDonutGraph products={selectedImage.contentInformation} />
      )}
      {!!selectedImage && !!selectedBrand && (
        <ShelfAnalysisGraph
          selectedBrand={selectedBrand}
          shelfAnalysisData={selectedImage.contentInformation}
        />
      )}

      {!!!images.length && (
        <div style={{ fontSize: 16 }}>
          No images uploaded, start by uploading <Link to={"/"}>images</Link>
        </div>
      )}

      {!!selectedImage ? (
        <ImageWithBoxes
          imageData={selectedImage}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
        />
      ) : (
        <Masonry
          className="justify-center"
          style={{ flexDirection: "row" }}
          columns={2}
          spacing={2}
        >
          {images.map((image, index) => (
            <Paper
              elevation={3}
              key={index}
              style={{ padding: 5, width: "max-content" }}
            >
              <img
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "auto",
                  height: 160,
                  cursor: "pointer",
                }}
                src={`data:image/png;base64, ${image.image}`}
                alt={`Image ${image.id}`}
                onClick={() => handleImageClick(image.id, image.image)}
              />
            </Paper>
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default Gallery;
