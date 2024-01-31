export default async function handler(req, res) {
  const statusId = req.query.statusId;
  const apiKey = "470e7nc655sd5d976eihowwjpwvspsw9";
  const url = `https://demonstration.swiftcase.co.uk/api/v2/${apiKey}/status/${statusId}.json`;

  try {
    const apiRes = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!apiRes.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
