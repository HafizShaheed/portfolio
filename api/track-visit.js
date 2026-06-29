// api/track-visit.js
// Har visit pe counters update karta hai Redis mein

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // jaise "2026-06-29"

    // Sirf POST request pe naya visit count karo (GET sirf stats fetch karne ke liye)
    if (req.method === 'POST') {
      await redis.incr('visits:total');
      await redis.incr(`visits:${today}`);
      // Daily key 35 din baad expire ho jaye (zyada purana data store nahi karna)
      await redis.expire(`visits:${today}`, 60 * 60 * 24 * 35);
    }

    // Stats calculate karo response ke liye
    const total = await redis.get('visits:total') || 0;
    const todayCount = await redis.get(`visits:${today}`) || 0;

    // Last 7 din ke counts add karo "this week" ke liye
    let weekCount = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      const count = await redis.get(`visits:${dateKey}`) || 0;
      weekCount += Number(count);
    }

    return res.status(200).json({
      today: Number(todayCount),
      week: weekCount,
      total: Number(total),
    });

  } catch (error) {
    console.error('Visit tracking error:', error);
    return res.status(500).json({ error: 'Failed to track visit' });
  }
}