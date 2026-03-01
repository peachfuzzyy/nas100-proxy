export default async function handler(req, res) {
  const { endpoint } = req.query;
  const FINNHUB_KEY = "d6h86v1r01qnjncnn6k0d6h86v1r01qnjncnn6kg";
  const r = await fetch(`https://finnhub.io/api/v1/${endpoint}&token=${FINNHUB_KEY}`);
  const d = await r.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(d);
}
