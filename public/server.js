const express = require("express");
const path = require("path");
const { mediaList } = require("./list");

const app = express();
const PORT = process.env.PORT || 3002;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "")));

const ITEMS_PER_PAGE = 6;

app.get("/api/getMedia", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const totalMedia = mediaList.length;
  const totalPagesMedia = Math.ceil(totalMedia / ITEMS_PER_PAGE);
  const mediaStartIndex = (page - 1) * ITEMS_PER_PAGE;

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const paginatedMedia = mediaList
    .slice(mediaStartIndex, mediaStartIndex + ITEMS_PER_PAGE)
    .map((item) => ({ ...item, url: `${baseUrl}/${item.url}` }));
  path.join(__dirname, "images");

  res.json({
    images: paginatedMedia,
    currentPage: page,
    dirname: path.join(__dirname, ""),
    totalPages: totalPagesMedia,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
