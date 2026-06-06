export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { destination } = req.body;
  const origin = '200 Brown Rd, Fremont, CA 94538';
  const key = process.env.GOOGLE_MAPS_KEY;
  
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=imperial&key=${key}`;
  
  const r = await fetch(url);
  const data = await r.json();
  
  if(data.rows?.[0]?.elements?.[0]?.status === 'OK'){
    const meters = data.rows[0].elements[0].distance.value;
    res.status(200).json({ miles: Math.round(meters / 1609.34) });
  } else {
    res.status(400).json({ error: 'Could not calculate distance' });
  }
}
