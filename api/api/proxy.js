export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "No URL provided" });
  try {
    const r = await fetch(decodeURIComponent(url), {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const d = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(d);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
