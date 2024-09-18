const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

// Set EJS as templating engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "")));
// app.use(express.static(path.join(__dirname, "/public")));

// Sample media data (you can expand this)
const images = [
  "images/image1.jpeg",
  "images/image2.jpeg",
  "images/image3.jpeg",
  "images/image4.jpeg",
  "images/image5.jpg",
  "images/image6.jpg",
  "images/image7.jpg",
  "images/image8.jpg",
  "images/image9.jpg",
  "images/image10.jpg",
  "images/image11.jpg",
  "images/image12.jpg",
  "images/image13.jpg",
  "images/image14.jpg",
  "images/image15.jpg",
  "images/image16.jpg",
  "images/image17.jpg",
  "images/image18.jpg",
  "images/image19.jpg",
  "images/image20.jpg",
  "images/image21.jpg",
  "images/image22.jpg",
  "images/image23.jpg",
  "images/image24.jpg",
  "images/image25.jpg",
  "images/image26.jpg",
  "images/image27.jpg",
  "images/image28.jpg",
];

const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4",
  "videos/video5.mp4",
];

// Pagination parameters
const ITEMS_PER_PAGE = 2;

app.get("/api/images", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const totalImages = images.length;
  const totalPagesImages = Math.ceil(totalImages / ITEMS_PER_PAGE);
  const imageStartIndex = (page - 1) * ITEMS_PER_PAGE;

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const paginatedImages = images
    .slice(imageStartIndex, imageStartIndex + ITEMS_PER_PAGE)
    .map((image) => {
      return `${baseUrl}/${image}`;
    });

  res.json({
    images: paginatedImages,
    dirname: path.join(__dirname, "/images"),
    currentPage: page,
    totalPages: totalPagesImages,
  });
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "images/image1.jpeg"));
  console.log(path.join(__dirname, "images/image1.jpeg"));
});

app.get("/api/videos", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const totalVideos = videos.length;
  const totalPagesVideos = Math.ceil(totalVideos / ITEMS_PER_PAGE);
  const videoStartIndex = (page - 1) * ITEMS_PER_PAGE;

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const paginatedVideos = videos
    .slice(videoStartIndex, videoStartIndex + ITEMS_PER_PAGE)
    .map((video) => {
      return `${baseUrl}/${video}`;
    });

  res.json({
    videos: paginatedVideos,
    dirname: path.join(__dirname, "/videos"),
    currentPage: page,
    totalPages: totalPagesVideos,
  });
});

// Render the main page
app.get("/", (req, res) => {
  res.send("<h1>Hi Lalit</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
