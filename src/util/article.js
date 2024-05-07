import axios from "axios";

const host = process.env.REACT_APP_URL_PATH;

export function httpRequest2(method, url, body, success, fail) {
  axios({
    method: method,
    url: host + url,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json',
    },
    data: body,
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return success(response);
      }

    })
    .catch((error) => {
      if (error && error.response.status === 401) {
        console.log('error');
        axios.post(host + '/api/token/createToken', {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
          .then(res => {
            if (res.status === 200) {
              console.log(res.data)
              localStorage.setItem('access_token', res.data.accessToken);
              httpRequest2(method, url, body, success, fail);
            }
          })
          .catch((error) => fail(error));
      } else {
        return fail(error);
      }
    });
}