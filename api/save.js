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
  const data = JSON.stringify({ words, title: title || 'My Weird School', createdAt: Date.now() });

  const url = `${process.env.KV_REST_API_URL}/set/${id}`;
  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.status(200).json({ id });
}
