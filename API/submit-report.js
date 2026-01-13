import formidable from "formidable";
import axios from "axios";

export const config = { api: { bodyParser: false } };

const WEBDAV = process.env.NEXTCLOUD_WEBDAV_URL;
const AUTH = {
  username: process.env.NEXTCLOUD_USER,
  password: process.env.NEXTCLOUD_PASSWORD
};

export default async function handler(req, res) {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const siteId = fields.siteId;
    const basePath = `/Relatorios/${siteId}`;

    try {
      // Criar pasta do site
      await axios({ method: "MKCOL", url: `${WEBDAV}${basePath}`, auth: AUTH });

      // Criar pasta fotos
      await axios({ method: "MKCOL", url: `${WEBDAV}${basePath}/fotos`, auth: AUTH });

      // Salvar dados.json
      await axios.put(`${WEBDAV}${basePath}/dados.json`, JSON.stringify(fields, null, 2), {
        auth: AUTH,
        headers: { "Content-Type": "application/json" }
      });

      // Salvar fotos
      const uploaded = Array.isArray(files.photos_0) ? files.photos_0 : [files.photos_0];
      for (const file of uploaded) {
        const fs = await import("fs");
        const buffer = fs.readFileSync(file.filepath);
        await axios.put(`${WEBDAV}${basePath}/fotos/${file.originalFilename}`, buffer, {
          auth: AUTH,
          headers: { "Content-Type": "application/octet-stream" }
        });
      }

      res.json({ success: true, siteId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
