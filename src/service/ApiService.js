const API_BASE_URL = "http://localhost:8080";

export function call(api, method, request, config) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  if (config && config.headers) {
    Object.keys(config.headers).forEach((key) => {
      headers.append(key, config.headers[key]);
    });
  }

  let options = {
    headers: headers,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(API_BASE_URL + api, options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw error;
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

export function signup(userDto) {
  return call("/users/signup", "POST", userDto);
}

export function checkEmailDuplicate(email) {
  return call(`/users/signup/email/${email}/exists`, "GET");
}

export function checkNicknameDuplicate(nickname) {
  return call(`/users/signup/nickname/${nickname}/exists`, "GET");
}

export function sendMailConfirm(email) {
  return call("/users/password/mailConfirm", "POST", { email });
}

export function login(userDto) {
  return call("/users/login", "POST", userDto);
}

export function logout() {
  return call("/users/logout", "POST");
}