export default async function handler(req, res) {
  const { taskId } = req.query;
  const apiKey = "470e7nc655sd5d976eihowwjpwvspsw9";

  const url = `https://demonstration.swiftcase.co.uk/api/v2/${apiKey}/task/${taskId}.json`;

  try {
    const apiRes = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
       
      },
    });

    if (!apiRes.ok) {
      throw new Error(`Error fetching details for task ID ${taskId}`);
    }

    const taskDetails = await apiRes.json();
    res.status(200).json(taskDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
