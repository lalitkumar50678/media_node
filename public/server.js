const express = require("express");
const path = require("path");
const { mediaList } = require("./list");

const app = express();
const PORT = process.env.PORT || 3002;

// Set EJS as templating engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "")));
// app.use(express.static(path.join(__dirname, "/public")));

// Pagination parameters
const ITEMS_PER_PAGE = 4;

app.get("/api/getMedia", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const totalMedia = mediaList.length;
  const totalPagesMedia = Math.ceil(totalMedia / ITEMS_PER_PAGE);
  const mediaStartIndex = (page - 1) * ITEMS_PER_PAGE;

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const paginatedMedia = mediaList
    .slice(mediaStartIndex, mediaStartIndex + ITEMS_PER_PAGE)
    .map((image) => {
      return `${baseUrl}/${image}`;
    });

  res.json({
    images: paginatedMedia,
    dirname: path.join(__dirname, "/images"),
    currentPage: page,
    totalPages: totalPagesMedia,
  });
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
