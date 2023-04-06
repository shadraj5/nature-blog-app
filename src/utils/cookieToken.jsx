export function getToken(req) {
  const token = req.headers.cookie
    ?.split(';')
    .find((c) => c.trim().startsWith('token='))
    ?.split('=')[1];
  return token;
}
