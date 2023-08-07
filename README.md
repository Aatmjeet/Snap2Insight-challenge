# Snap2Insight-challenge

This is my solution to Snap2Insight's Challenge.
Problem link: https://gist.github.com/akashraj9828/8eb17530a4e5ea2393744454a651a842#file-task-md

---

### Description of solution
My solution contains 2 components `/frontend` and `/Backend`
components. Testing data is in the `_test_data` directory.

The frontend is a React based application which has an image upload component
and a gallery component, which can be used to upload images and it's detections and
analyse it on the gallery component.

The backend is a Lightweight Nodejs server which handles image and detections
upload through `mutipart/form-data` POST API request. This is parsed using `multer` package.
This server also serves these images to gallery component and data analysis components using `GET` resources.

---

### Important information

To run the projects, we'll have to run both the components simultaneously.
Install steps for both the projects are given in their respective `README.md` files.

#### Approach to start application
- First browse to the backend application in a shell and run the backend application
- Now that we have our backend running, we open out frontend module in a separate
shell and run the frontend application.

More information on both components can be found in their respective `README.md` files.
These files are put in separate repositories to maintain modularity of components.

---

