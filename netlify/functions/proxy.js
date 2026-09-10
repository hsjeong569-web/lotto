exports.handler = async function(event) {
  const target = event.queryStringParameters && event.queryStringParameters.url;
  if (!target) {
    return { statusCode: 400, body: 'No URL' };
  }
  try {
    const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
    const res = await fetch(target, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const body = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: body
    };
  } catch(e) {
    return { statusCode: 502, body: e.message };
  }
};
