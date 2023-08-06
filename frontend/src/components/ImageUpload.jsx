// components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import "./component_styles/ImageUpload.css"
import {Button, Container, Paper, Stack, Typography} from "@mui/material";

const ImageUpload = () => {
	const [image, setImage] = useState(null);
	const [detections, setDetections] = useState(null);
	const [uploadStatus, setUploadStatus] = useState(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setUploadStatus("")
		setImage(file);
	};

	const handleDetectionsChange = (e) => {
		const file = e.target.files[0];
		setUploadStatus("")
		setDetections(file)
	};

	const handleUpload = async () => {
		try {
			const formData = new FormData();
			formData.append('picture', image);
			formData.append('detections', detections);

			const response = await axios.post('http://localhost:8080/api/upload', formData);
			setUploadStatus(response.data.message);
		} catch (error) {
			console.error(error);
			setUploadStatus('An error occurred while uploading the image.');
		}
	};

	return (
		<div className="imageUpload">
			<Paper elevation={3} style={{padding:80}}>
				<h1>Image Upload Page</h1>
				<h3 className="justify-center">Select Image File</h3>
				<Container maxWidth="sm">
					<Stack direction="row" alignItems="center" className="justify-center" spacing={2}>
						<label htmlFor="upload-image">
							<Button variant="outlined" component="span">
								Upload image file
							</Button>
							<input
								id="upload-image"
								hidden
								type="file" accept="image/*" onChange={handleImageChange}
							/>
						</label>
					</Stack>
					{!!image && <Typography className="justify-center">{image.name}</Typography>}
				</Container>
				{/*<input type="file" accept="image/*" onChange={handleImageChange} />*/}
				<h3 className="justify-center">Select Detections File</h3>
				<Container maxWidth="sm">
					<Stack direction="row" alignItems="center" className="justify-center" spacing={2}>
						<label htmlFor="upload-detections">
							<Button variant="outlined" component="span">
								Upload .txt file
							</Button>
							<input
								id="upload-detections"
								hidden
								type="file" accept=".txt" onChange={handleDetectionsChange}
							/>
						</label>
					</Stack>
					{!!detections && <Typography className="justify-center">{detections.name}</Typography>}
				</Container>
				<div className="justify-center">
					<Button  sx={{mt:6}} variant="contained" onClick={handleUpload} disabled={!image || !detections}>
						Upload
					</Button>
				</div>
				{uploadStatus && <p className="justify-center" style={{marginTop:20, fontSize:20}}>{uploadStatus}</p>}
			</Paper>
		</div>
	);
};

export default ImageUpload;
