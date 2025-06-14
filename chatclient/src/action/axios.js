import axios from "axios";
import { StorageConstants } from "../constants/storage-constants";
import { BASE_URL } from "../api";

const get = async (urlPath, accessToken = false) => {
  let token = "";
  if (accessToken) {
    token = `Bearer ${localStorage.getItem(StorageConstants.token)}`;
  }
  const configHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  configHeaders.headers["Access-Control-Allow-Origin"] = "*";
  configHeaders.headers["Access-Control-Allow-Credentials"] = "true";

  let url = BASE_URL + urlPath;

  return new Promise((resolve, reject) => {
    axios
      .get(url, configHeaders)
      .then((response) => {
        if (response.status === 200 && response.data) {
          if (response.data.error) {
            reject(response.data);
          } else {
            resolve(response.data);
          }
        } else if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 204
        ) {
          reject({ error: "Status : " + response.status + " no content." });
        } else {
          reject({
            error: response.status
              ? "An status : " + response.status + " has occurred."
              : "An unexpected error has occurred.",
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          reject({
            error: error.response || "An unexpected error has occurred.",
          });
        } else {
          reject({ error: "An unexpected error has occurred." });
        }
      });
  });
};

const post = async (
  urlPath = "",
  req,
  accessToken = false,
  requestSecret = null,
  isMultiPart = false
) => {
  console.log({ req });

  let token = "";
  if (accessToken) {
    token = `Bearer ${localStorage.getItem(StorageConstants.token)}`;
  }
  const configHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  configHeaders.headers["Access-Control-Allow-Origin"] = "*";
  configHeaders.headers["Access-Control-Allow-Credentials"] = "true";

  let url = BASE_URL + urlPath;
  return new Promise((resolve, reject) => {
    axios
      .post(url, req, configHeaders)
      .then((response) => {
        if (response.status === 200 && response.data) {
          if (response.data.error) {
            reject(response.data);
          } else {
            resolve(response.data);
          }
        } else if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 204
        ) {
          reject({ error: "Status : " + response.status + " no content." });
        } else {
          reject({
            error: response.status
              ? "An status : " + response.status + " has occurred."
              : "An unexpected error has occurred.",
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          reject({
            error: error.response || "An unexpected error has occurred.",
          });
        } else {
          reject({ error: "An unexpected error has occurred." });
        }
      });
  });
};

const put = async (
  urlPath = "",
  req,
  accessToken = false,
  requestSecret = null
) => {
  let token = "";
  if (accessToken) {
    token = `Bearer ${localStorage.getItem(StorageConstants.token)}`;
  }
  const configHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  configHeaders.headers["Access-Control-Allow-Origin"] = "*";
  configHeaders.headers["Access-Control-Allow-Credentials"] = "true";

  let url = BASE_URL + urlPath;

  return new Promise((resolve, reject) => {
    axios
      .put(url, req, configHeaders)
      .then((response) => {
        if (response.status === 200 && response.data) {
          if (response.data.error) {
            reject(response.data);
          } else {
            resolve(response.data);
          }
        } else if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 204
        ) {
          reject({ error: "Status : " + response.status + " no content." });
        } else {
          reject({
            error: response.status
              ? "An status : " + response.status + " has occurred."
              : "An unexpected error has occurred.",
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          reject({
            error: error.response || "An unexpected error has occurred.",
          });
        } else {
          reject({ error: "An unexpected error has occurred." });
        }
      });
  });
};

const api_delete = async (
  urlPath = "",
  accessToken = false,
  requestSecret = null
) => {
  let token = "";
  if (accessToken) {
    token = `Bearer ${localStorage.getItem(StorageConstants.token)}`;
  }
  const configHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  configHeaders.headers["Access-Control-Allow-Origin"] = "*";
  configHeaders.headers["Access-Control-Allow-Credentials"] = "true";

  let url = BASE_URL + urlPath;

  return new Promise((resolve, reject) => {
    axios
      .delete(url, configHeaders)
      .then((response) => {
        if (
          (response.status === 202 || response.status === 200) &&
          response.data
        ) {
          if (response.data.error) {
            reject(response.data);
          } else {
            resolve(response.data);
          }
        } else if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 204
        ) {
          reject({ error: "Status : " + response.status + " no content." });
        } else {
          reject({
            error: response.status
              ? "An status : " + response.status + " has occurred."
              : "An unexpected error has occurred.",
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          reject({
            error: error.response || "An unexpected error has occurred.",
          });
        } else {
          reject({ error: "An unexpected error has occurred." });
        }
      });
  });
};

export { get, post, put, api_delete };
