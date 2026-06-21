export const maxDuration = 30;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { words, title } = req.body;
  if (!words || !words.length) {
    return res.status(400).json({ error: 'No words provided' });
  }

  const id = Math.random().toString(36).slice(2, 8);
  const payload = JSON.stringify({ words, title: title || 'My Weird School', createdAt: Date.now() });

  const baseUrl = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  // 存入 Upstash，有效期 30 天
  const r = await fetch(`${baseUrl}/set/${id}?ex=2592000`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await r.json();
  console.log('save result:', JSON.stringify(result));

  return res.status(200).json({ id });
}
