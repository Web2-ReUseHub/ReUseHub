const http = require('http');
const data = JSON.stringify({
  f_name: 'Mayar',
  l_name: 'Nazeeh',
  email: 'mayar@example.com',
  password: '123456',
  phone: '0599999999',
  address: 'Nablus'
});

const options = {
  hostname: '127.0.0.1',
  port: 5004,
  path: '/user/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('HEADERS', res.headers);
    console.log('BODY', body);
  });
});

req.on('error', (err) => {
  console.error('REQUEST ERROR', err.message);
});

req.write(data);
req.end();
