export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { slug } = req.query;
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DB_ID = process.env.NOTION_DB_ID;

  if (slug) {
    // Fetch single post blocks
    const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${slug}/children`, {
      headers: { 'Authorization': `Bearer ${NOTION_TOKEN}`, 'Notion-Version': '2022-06-28' }
    });
    const data = await blocksRes.json();
    return res.json(data);
  }

  // Fetch post list
  const response = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Date', direction: 'descending' }]
    })
  });

  const data = await response.json();
  res.json(data);
}
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { pageId } = req.query;
  const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28'
    }
  });
  const data = await response.json();
  res.json(data);
}
