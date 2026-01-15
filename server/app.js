// ===== Core modules =====
const path = require("path");
const fs = require("fs");
const https = require("https");

// ===== Third-party modules =====
const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

// ===== Local modules =====
const db = require("./config/connect_database.config");
const SystemConst = require("./common/consts/system_const");
const logger = require("./config/logger.config");
const dailyJob = require("./jobs/daily_check");
const monthlyJob = require("./jobs/monthly_job");
const router = require("./router/router");

// ===== Config =====
dotenv.config({ path: "./.env" });
const app = express();
const portHttps = SystemConst.PORT_HTTPS;

// ===== Jobs =====
dailyJob();
monthlyJob();

// ===== Middlewares =====
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views/admin")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// JSON parser + raw body capture
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// JSON parse error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("=== JSON PARSE ERROR ===");
    console.error("➡️ METHOD:", req.method);
    console.error("➡️ URL:", req.originalUrl);
    console.error("➡️ Content-Type:", req.headers["content-type"]);
    console.error("➡️ RAW BODY:", req.rawBody);
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  next();
});

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 300,            // tối đa 300 request
  message: "Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau một lúc."
});
app.use(limiter);

// ===== Router =====
app.use("/", router);
app.set("view engine", "ejs");

// ===== File streaming route =====
app.get("/file/:file", (req, res) => {
  try {
    const filePath = path.join(__dirname, "public/images", req.params.file);

    if (!fs.existsSync(filePath)) {
      return res.status(404).render("admin/error/404");
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

      if (start >= fileSize) {
        return res.status(416).send("Requested range not satisfiable");
      }

      const chunkSize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      });

      fileStream.pipe(res);
    } else {
      res.sendFile(filePath);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ===== Request logging =====
app.use((req, res, next) => {
  req.reqId = Date.now() + "-" + Math.random().toString(36).slice(2);
  console.log(`[${req.reqId}]  ${req.method} ${req.originalUrl}`);
  next();
});

// ===== Server start =====
app.listen(portHttps, () => {
  console.log("Server running on port " + portHttps);
});