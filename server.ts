import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

const dbPath = path.join(process.cwd(), "src", "data", "portfolio_db.json");

const defaultPortfolio = {
  headline: "Engineering a Sustainable Future.",
  bio: "Professional journey of Dikshant Dahiya. Bridging technical rigor in process safety engineering with high-fidelity ESG research and system audit standards.",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  youtube: "https://youtube.com",
  assets: [] as any[],
  blocks: [
    {
      id: "block_1",
      type: "text",
      value: "Welcome to my dynamic ESG & Stewardship Portfolio.",
      sort_order: 10
    }
  ] as any[]
};

// Database persistence helpers
function readDb() {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
      fs.writeFileSync(dbPath, JSON.stringify(defaultPortfolio, null, 2), "utf8");
      return defaultPortfolio;
    }
    const data = fs.readFileSync(dbPath, "utf8");
    const parsed = JSON.parse(data);
    if (!parsed.assets) parsed.assets = [];
    return parsed;
  } catch (err) {
    console.error("DB Read Error:", err);
    return defaultPortfolio;
  }
}

function writeDb(data: any) {
  try {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("DB Write Error:", err);
    return false;
  }
}

// API Endpoints
app.get("/api/portfolio", (req, res) => {
  res.status(200).json(readDb());
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  if (email.toLowerCase() !== "dikshant9911@gmail.com") {
    return res.status(401).json({ error: "Access denied" });
  }

  const configuredPassword = process.env.ADMIN_PASSWORD || "dikshant123";
  if (password === configuredPassword) {
    const token = Buffer.from(JSON.stringify({ email, exp: Date.now() + 86400000 })).toString("base64");
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: "Incorrect password" });
  }
});

// Middleware for authenticated routes
const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    if (payload.email === "dikshant9911@gmail.com" && payload.exp > Date.now()) {
      return next();
    }
  } catch (e) {}
  return res.status(401).json({ error: "Invalid session" });
};

app.post("/api/portfolio", authMiddleware, (req, res) => {
  if (writeDb(req.body)) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: "Failed to update database" });
  }
});

app.post("/api/upload", authMiddleware, (req, res) => {
  const { filename, mimeType, base64Data, size } = req.body;
  if (!filename || !mimeType || !base64Data) return res.status(400).json({ error: "Incomplete data" });

  try {
    const cleanBase64 = base64Data.replace(/^data:.*?;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");
    const uniqueName = `${path.basename(filename, path.extname(filename))}_${Date.now()}${path.extname(filename)}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    fs.writeFileSync(path.join(uploadsDir, uniqueName), buffer);

    const db = readDb();
    const newAsset = { name: filename, url: `/uploads/${uniqueName}`, size: size || `${(buffer.length/1024).toFixed(1)}KB`, type: mimeType, createdAt: new Date().toISOString() };
    db.assets.push(newAsset);
    writeDb(db);

    res.status(200).json({ success: true, asset: newAsset });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

app.delete("/api/assets", authMiddleware, (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  const db = readDb();
  const asset = db.assets.find((a: any) => a.url === url);
  if (asset) {
    const filePath = path.join(process.cwd(), "public", "uploads", path.basename(url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    db.assets = db.assets.filter((a: any) => a.url !== url);
    writeDb(db);
    return res.status(200).json({ success: true });
  }
  res.status(404).json({ error: "Asset not found" });
});

// SPA Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
    app.use("/api/*", (req, res) => res.status(404).json({ error: "Endpoint not found" }));
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api/")) return next();
      res.sendFile(path.join(distPath, "index.html"));
    });
    app.use("/api/*", (req, res) => res.status(404).json({ error: "Endpoint not found" }));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`[SYSTEM] Server listening at port ${PORT}`));
}

startServer();
