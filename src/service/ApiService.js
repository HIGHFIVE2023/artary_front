const API_BASE_URL = "http://localhost:8080";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
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

export function login(userDTO) {
  return call("/users/login", "POST", userDTO)
    .then((response) => {
      if (response.token) {
        localStorage.setItem(ACCESS_TOKEN, response.token);
      }
      return response; // 수정된 부분: 응답 반환
    })
    .catch((error) => {
      throw error; // 수정된 부분: 오류 던지기
    });
}

export function logout() {
  return call("/users/logout", "POST");
}

export function updateDiary(diaryId, diaryDto) {
  return call(`/diary/${diaryId}`, "PUT", diaryDto);
}

export function deleteDiary(diaryId) {
  return call(`/diary/${diaryId}`, "DELETE");
}

export function updateUser(userId, userDto) {
  return call(`/users/${userId}`, "PUT", userDto);
}

export function deleteUser(userId, password) {
  return call(
    `/users/delete/${userId}?password=${encodeURIComponent(password)}`,
    "DELETE"
  );
}

export function deleteSticker(diaryId, stickerId) {
  return call(`/diary/${diaryId}/sticker/${stickerId}`, "DELETE");
}
