const token = searchParam('token')

if (token) {
  localStorage.setItem("access_token", token)
}

export function getToken() {
  const token = localStorage.getItem('token');
  return token;
}


function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}