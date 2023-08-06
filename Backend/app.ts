import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import ImageRoutes from "./routes/imageRoutes";



const app = express();

app.use(cors())

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use("/api",ImageRoutes);

// Start the server
app.listen(8080, () => {
	console.log('Server started on port 8080');
});
