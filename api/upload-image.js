// api/upload-image.js
// Admin panel se image upload karta hai Vercel Blob mein

import { put } from '@vercel/blob';

export const config = {
  api: { bodyParser: false }, // Raw body for file upload
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  // Password check
  const adminPassword = req.headers['x-admin-password'];
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const section = req.headers['x-section']; // 'hero' | 'about' | 'cursor'
  if (!section) {
    return res.status(400).json({ error: 'Section required' });
  }

  try {
    // File read karo raw body se
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Content type nikalo
    const contentType = req.headers['content-type'] || 'image/png';

    // Blob mein save karo — section ke hisab se naam
    const filename = `portfolio-${section}-photo.${contentType.split('/')[1] || 'png'}`;

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType,
      addRandomSuffix: false, // Same naam rakhega, overwrite karega
    });

    return res.status(200).json({
      url: blob.url,
      section,
      message: `${section} image updated successfully!`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
}
