export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.notion.com/v1/databases/0ba6975cae0f4040adca5c0cafcc1e6c/query",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          filter: {
            property: "Publish",
            checkbox: {
              equals: true
            }
          }
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
