
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email, firstName, petName } = req.body;
  
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: firstName, PET_NAME: petName },
      listIds: [6],
      updateEnabled: true
    })
  });
  
  res.status(response.ok ? 200 : 400).json({ ok: response.ok });
}
