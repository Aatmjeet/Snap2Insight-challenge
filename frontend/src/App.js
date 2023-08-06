import './App.css';
import { BrowserRouter , Routes,Route, Link } from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import Gallery from './components/Gallery';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

function App() {
  return (
	  <BrowserRouter>
		  <AppBar component="nav">
			  <Toolbar>
				  <Typography
					  variant="h6"
					  component="div"
					  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
				  >
					  Snap2Insight dashboard
				  </Typography>

				  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					  <Button sx={{ color: '#fff' }}>
						  <Link className="navbar-item" to="/gallery">Gallery</Link>
					  </Button>
					  <Button sx={{ color: '#fff' }}>
						  <Link className="navbar-item" to="/">Image Upload</Link>
					  </Button>
				  </Box>
			  </Toolbar>
		  </AppBar>
		  <div className="navbar">
			  <Link className="navbar-item" to="/gallery">Gallery</Link>
			  <Link className="navbar-item" to="/">Image Upload</Link>
		  </div>
		  <Routes>
			  <Route path="/" exact element={<ImageUpload/>} />
			  <Route path="/gallery" element={<Gallery/>} />
		  </Routes>

	  </BrowserRouter>
  );
}

export default App;
