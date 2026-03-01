export default async function handler(req, res) {
  const { path } = req.query;
  const r = await fetch(`https://query2.finance.yahoo.com/${path}`, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });
  const d = await r.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(d);
}
