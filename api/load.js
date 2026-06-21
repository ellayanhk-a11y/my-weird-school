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
    console.log('load raw:', JSON.stringify(json));
    
    if (!json.result) {
      return res.status(404).json({ error: 'Not found', debug: json });
    }

    let data;
    try {
      data = JSON.parse(json.result);
    } catch(e) {
      data = json.result;
    }
    
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
