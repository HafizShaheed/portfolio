// api/upload-image.js
import { put } from '@vercel/blob';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const adminPassword = req.headers['x-admin-password'];
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const section = req.headers['x-section'];
  if (!section) {
    return res.status(400).json({ error: 'Section required' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const contentType = req.headers['content-type'] || 'image/webp';
    const filename = `portfolio-${section}-photo.webp`;

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'image/webp',
      allowOverwrite: true, // ← FIX: overwrite allow karo
    });

    return res.status(200).json({
      url: blob.url,
      section,
      message: `${section} image updated!`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
}