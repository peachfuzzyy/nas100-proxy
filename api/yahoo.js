export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { path } = req.query;

  try {
    // Step 1: get crumb cookie
    const cookieRes = await fetch("https://query2.finance.yahoo.com/v1/test/getcrumb", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    const cookies = cookieRes.headers.get("set-cookie") || "";
    const crumb = await cookieRes.text();

    // Step 2: fetch actual data with crumb + cookie
    const r = await fetch(`https://query2.finance.yahoo.com/${path}${path.includes("?") ? "&" : "?"}crumb=${encodeURIComponent(crumb)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Cookie": cookies,
      },
    });

    const d = await r.json();
    res.json(d);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
