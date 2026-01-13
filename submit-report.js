import formidable from 'formidable';
import axios from 'axios';
import fs from 'fs';

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
      await axios({ method: 'MKCOL', url: `${WEBDAV}${basePath}`, auth: AUTH }).catch(() => {});

      // Criar pasta fotos
      await axios({ method: 'MKCOL', url: `${WEBDAV}${basePath}/fotos`, auth: AUTH }).catch(() => {});

      // Salvar dados.json
      await axios.put(`${WEBDAV}${basePath}/dados.json`, JSON.stringify(fields, null, 2), {
        auth: AUTH,
        headers: { 'Content-Type': 'application/json' }
      });

      // Salvar fotos
      for (const key in files) {
        const uploaded = Array.isArray(files[key]) ? files[key] : [files[key]];

        for (const file of uploaded) {
          const buffer = fs.readFileSync(file.filepath);
          await axios.put(`${WEBDAV}${basePath}/fotos/${file.originalFilename}`, buffer, {
            auth: AUTH,
            headers: { 'Content-Type': 'application/octet-stream' }
          });
        }
      }

      res.json({ success: true, siteId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
