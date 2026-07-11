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
      value: "Welcome to my dynamic ESG & Stewardship Portfolio. This section renders elements loaded straight from our content blocks array in the database. I bridge technical rigor in process sa[...]
      sort_order: 10
    },
    {
      id: "block_2",
      type: "image",
      value: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
      name: "High-Fidelity Assurance Audits",
      sort_order: 20
    },
    {
      id: "block_3",
      type: "text",
      value: "My core methodology focuses on transferring manual checklists into highly automated audit models, cutting anomalies by 40%. Deploying standard frameworks (BRSR, ISO 14001, ISO 9001) [...]
      sort_order: 30
    },
    {
      id: "block_4",
      type: "file_download",
      value: "/uploads/Dikshant_Dahiya_Portfolio_Checklists.xlsx",
      name: "Standard Audit Program & ESG Checklist Template.xlsx",
      sort_order: 40
    }
  ] as any[]
};

// Helper to read database
function readDb() {
  try {
    if (!fs.existsSync(dbPath)) {
      // Ensure directory exists
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
      fs.writeFileSync(dbPath, JSON.stringify(defaultPortfolio, null, 2), "utf8");
      return defaultPortfolio;
    }
    const data = fs.readFileSync(dbPath, "utf8");
    const parsed = JSON.parse(data);
    if (!parsed.assets) {
      parsed.assets = [];
    }
    if (!parsed.blocks) {
      parsed.blocks = defaultPortfolio.blocks;
    }
    return parsed;
  } catch (err) {
    console.error("Error reading database:", err);
    return defaultPortfolio;
  }
}

// Helper to write database
function writeDb(data: typeof defaultPortfolio) {
  try {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing to database:", err);
    return false;
  }
}

// Get portfolio data
app.get("/api/portfolio", (req, res) => {
  const data = readDb();
  res.json(data);
});

// Admin Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  // Constrain email to the user's requested specific address
  if (email.toLowerCase() !== "dikshant9911@gmail.com") {
    res.status(401).json({ error: "Access denied. Unauthorized administrator account." });
    return;
  }

  const configuredPassword = process.env.ADMIN_PASSWORD || "dikshant123";

  if (password === configuredPassword) {
    // Return a simple secure-looking token
    const token = Buffer.from(JSON.stringify({ email, exp: Date.now() + 86450000 })).toString("base64");
    res.json({ token });
  } else {
    res.status(401).json({ error: "Incorrect administrator password" });
  }
});

// Save Portfolio Changes (Authenticated)
app.post("/api/portfolio", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthenticated interface request" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    // Basic verification of our simple token
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    if (payload.email !== "dikshant9911@gmail.com" || payload.exp < Date.now()) {
      res.status(401).json({ error: "Invalid or expired session token" });
      return;
    }
  } catch (err) {
    res.status(401).json({ error: "Failed to decipher secure session token" });
    return;
  }

  const { headline, bio, linkedin, github, youtube, blocks } = req.body;

  if (!headline || !bio) {
    res.status(400).json({ error: "Headline and Bio content must not be empty" });
    return;
  }

  const currentDb = readDb();
  const updatedData = {
    headline: String(headline),
    bio: String(bio),
    linkedin: String(linkedin || ""),
    github: String(github || ""),
    youtube: String(youtube || ""),
    assets: currentDb.assets || [],
    blocks: Array.isArray(blocks) ? blocks : (currentDb.blocks || [])
  };

  const success = writeDb(updatedData);
  if (success) {
    res.json({ success: true, data: updatedData });
  } else {
    res.status(500).json({ error: "Failure writing content updates directly to database storage" });
  }
});

// Upload Asset (Authenticated)
app.post("/api/upload", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthenticated interface request" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    if (payload.email !== "dikshant9911@gmail.com" || payload.exp < Date.now()) {
      res.status(401).json({ error: "Invalid or expired session token" });
      return;
    }
  } catch (err) {
    res.status(401).json({ error: "Failed to decipher secure session token" });
    return;
  }

  const { filename, mimeType, base64Data, size } = req.body;

  if (!filename || !mimeType || !base64Data) {
    res.status(400).json({ error: "Missing uploaded asset components" });
    return;
  }

  try {
    const cleanBase64 = base64Data.replace(/^data:.*?;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    const ext = path.extname(filename) || "." + mimeType.split("/")[1] || "";
    const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueName = `${baseName}_${Date.now()}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, uniqueName);
    fs.writeFileSync(filePath, buffer);

    const liveUrl = `/uploads/${uniqueName}`;

    const currentDb = readDb();
    if (!currentDb.assets) {
      currentDb.assets = [];
    }

    const newAsset = {
      name: filename,
      url: liveUrl,
      size: size || `${(buffer.length / 1024).toFixed(1)} KB`,
      type: mimeType,
      createdAt: new Date().toISOString()
    };

    currentDb.assets.push(newAsset);
    writeDb(currentDb);

    res.json({ success: true, asset: newAsset });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to store uploaded asset safely on container" });
  }
});

// Delete Asset (Authenticated)
app.delete("/api/assets", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthenticated request" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    if (payload.email !== "dikshant9911@gmail.com" || payload.exp < Date.now()) {
      res.status(401).json({ error: "Session expired or invalid" });
      return;
    }
  } catch (err) {
    res.status(401).json({ error: "Invalid token structure" });
    return;
  }

  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "Missing asset identifier URL" });
    return;
  }

  try {
    const currentDb = readDb();
    if (currentDb.assets) {
      const assetToDelete = currentDb.assets.find((a: any) => a.url === url);
      if (assetToDelete) {
        // Try deleting local file
        const filename = path.basename(url);
        const filePath = path.join(process.cwd(), "public", "uploads", filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        // Remove from db tracking
        currentDb.assets = currentDb.assets.filter((a: any) => a.url !== url);
        writeDb(currentDb);
        res.json({ success: true });
        return;
      }
    }
    res.status(404).json({ error: "Asset not found in database tracker" });
  } catch (err) {
    console.error("Delete asset error:", err);
    res.status(500).json({ error: "Failed to release the requested file" });
  }
});

// Setup Vite Dev server or Serve production assets
async function startViteServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    // SPA fallback for production only: serve index.html for all non-API routes
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).json({ error: "index.html not found" });
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startViteServer();
