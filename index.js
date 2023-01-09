const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { ppid } = require("process");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buff) => {
      if (err) return err;

      const filename = buff.toString("hex") + path.extname(file.originalname);

      cb(null, filename);
    });
  },
});

const upload = multer({ storage });



app.get("/upload", (req, res) => {
  res.sendFile("/home/giguchi/Documents/dev_walk_arounds/uploads/upload_on_server/index.html")
})



app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);

  res.status(200).json({
    message: "upload success",
  });
});



const PORT = process.env.PORT

app.listen(PORT || 8080, () => {
  console.log("server is up and running on", PORT || "8080");
});
