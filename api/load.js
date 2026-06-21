export const maxDuration = 30;

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'No id' });

  const baseUrl = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  try {
    const r = await fetch(`${baseUrl}/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await r.json();
    if (!json.result) return res.status(404).json({ error: 'Not found' });

    // 双重解析处理双重序列化问题
    let data = json.result;
    if (typeof data === 'string') data = JSON.parse(data);
    if (typeof data === 'string') data = JSON.parse(data);

    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
