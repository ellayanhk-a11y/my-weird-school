export const maxDuration = 30;

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'No id' });

  const url = `${process.env.KV_REST_API_URL}/get/${id}`;
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
  });
  const json = await r.json();
  if (!json.result) return res.status(404).json({ error: 'Not found' });

  return res.status(200).json(JSON.parse(json.result));
}
