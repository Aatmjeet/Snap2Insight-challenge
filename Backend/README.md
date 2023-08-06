# Node-express backend

This is the backend of my solution, a basic server that
uses `express` npm package to store and serve images and
their respective detections.


## Install

### pre-requisites
To run this application, the user must have **Node** version > `16`.
I am using `v18.17.0`, so that is an idea case.

Simple install, just use
```shell
npm install
```

Now that we have install node packages, we would start the server.
I have multiple configs for running the application, on of which is
compiling application using Typescript and then using it through `/dist`.

But for quick development, I am using `nodemon` for a hot reload server.
To start dev server, simply use
```
nodemon app.ts
```

---

## Provided endpoints

### Upload Image
Following endpoint will upload image and it's detections file
```
POST
http://localhost:8080/api/upload

with Content-Type: mutipart/form-data 
and "picture" and "detections" in body
```


### Gallery API
Following API will give us a list of images with pagination.
The default pagination size is `10`, with `offset=0` and `limit=10`.
```
GET
http://localhost:8080/api/images?limit=10&offset=0
```

The response of the API would be an array of objects in the format:
```
{
    id:  UUID of image to get detections,
    image: {base64_encoded data of image}
}
```

### Image details
This API will provide details on the images by taking
the UUID of .txt file pair and returning detections.
```
GET
http://localhost:8080/api/image/:ID
```

---

#### Note:
These APIs would be digested by the frontend components.
Checkout the parent directory's `README.md` for more information.
