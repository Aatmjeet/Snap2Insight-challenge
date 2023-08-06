import fs from 'fs'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import csv from 'csv-parser'

const setFileName = (files) => {
	const unique_id = uuidv4()
	files.forEach((file) => {
		let extension = path.extname(file.originalname);
		file.originalname = unique_id + extension
	})
}

// Function to handle image upload
export const uploadImage = (req, res) => {
	try {
		const { picture, detections } = req.files;

		setFileName([picture[0], detections[0]])

		if(!!!picture && !!!detections)
		{
			throw new Error("Picture and/or detections not uploaded!")
		}

		// Save the image to the local disk
		fs.writeFileSync(path.join(__dirname, '../uploads/', picture[0].originalname), picture[0].buffer);

		// Save the detections file to the local disk
		fs.writeFileSync(path.join(__dirname, '../uploads/', detections[0].originalname), detections[0].buffer);

		res.status(200).json({ message: 'Image uploaded successfully' });
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'An error occurred while uploading the image' });
	}
};

// Function to get all previously uploaded images
export const getAllImages = (req, res) => {
	try {

		let offset = !!req.query.page ? parseInt(req.query.page) : 0 ;
		let limit = !!req.query.limit ? parseInt(req.query.limit) : 10;

		// Fetch all images from the 'uploads' folder on the local disk
		const fileList = fs.readdirSync(path.join(__dirname, '../uploads/'));

		const files = []
		fileList.forEach(file => {
			if (path.extname(file) !== ".txt")
			{
				let base64_encoded_file = fs.readFileSync(path.join(__dirname, '../uploads/', file)).toString('base64')
				files.push({
					id:file.replace(path.extname(file),""),
					image: base64_encoded_file
				})
			}
		})
		// Return the list of image filenames
		res.status(200).json(files.slice(offset, limit));
	} catch (error) {
		res.status(500).json({ error: 'An error occurred while fetching images' });
	}
};

// Function to get details of a specific image by its filename
export const getImageDetails = (req, res) => {

	const { detections_id } = req.params

	if(!fs.existsSync(path.join(__dirname, '../uploads/', `${detections_id}.txt`)))
		res.status(404).json({ error: "The target file doesn't exist" });
	else{
		const csvData = [];
		fs.createReadStream(path.join(__dirname, '../uploads/', `${detections_id}.txt`)) // Replace with the actual path to your .txt file
			.pipe(csv({ separator: '\t' })) // If the .txt file is tab-separated, adjust the separator accordingly
			.on('data', (row) => {
				csvData.push(row);
			})
			.on('end', () => {
				res.setHeader('Content-Type', 'text/csv')
				res.status(200).json(csvData);
			})
			.on('error', (error) => {
				res.status(500).json({ error: 'Error reading the CSV file' });
			});
	}
};

