const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set("view engine", "ejs");

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/videos", express.static(path.join(__dirname, "public/videos")));

// Sample media data (you can expand this)
const images = [
  "images/image1.jpg",
  "images/image2.jpg",
  "images/image3.jpg",
  "images/image4.jpg",
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
  const totalVideos = videos.length;

  const totalPagesImages = Math.ceil(totalImages / ITEMS_PER_PAGE);
  const totalPagesVideos = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  const imageStartIndex = (page - 1) * ITEMS_PER_PAGE;
  const videoStartIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedImages = images.slice(
    imageStartIndex,
    imageStartIndex + ITEMS_PER_PAGE
  );
  const paginatedVideos = videos.slice(
    videoStartIndex,
    videoStartIndex + ITEMS_PER_PAGE
  );

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      images: paginatedImages,
      videos: paginatedVideos,
      currentPage: page,
      totalPagesImages,
      totalPagesVideos,
    })
  );
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
