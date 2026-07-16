// api/get-images.js
// Current images ki URLs fetch karta hai

import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  try {
    const { blobs } = await list({ prefix: 'portfolio-' });

    // Har section ki current image URL nikalo
    const images = {
      hero: null,
      about: null,
      cursor: null,
    };

    blobs.forEach(blob => {
      if (blob.pathname.includes('hero')) images.hero = blob.url;
      if (blob.pathname.includes('about')) images.about = blob.url;
      if (blob.pathname.includes('cursor')) images.cursor = blob.url;
    });

    return res.status(200).json(images);

  } catch (error) {
    console.error('Get images error:', error);
    return res.status(500).json({ error: 'Failed to fetch images' });
  }
}
