export const maxDuration = 30;

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'No id' });

  const baseUrl = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  const r = await fetch(`${baseUrl}/get/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const json = await r.json();
  console.log('load result:', JSON.stringify(json));

  if (!json.result) return res.status(404).json({ error: 'Not found' });

  const data = JSON.parse(json.result);
  return res.status(200).json(data);
}
