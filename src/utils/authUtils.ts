import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function loginGitHub(code: string) {
  const headers = { "headers": { "Accept": "application/json" } };

  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
  });

  const URL_CONSTRUCTOR = "https://github.com/login/oauth/access_token?" + params.toString()
  const promise = await axios.post(URL_CONSTRUCTOR, null, headers);

  return promise.data;
}

export async function getUserDataGitHub(token: string, tokenType: string) {
  const headers = { "headers": { "Authorization": `${tokenType} ${token}` } };

  const URL_CONSTRUCTOR = "https://api.github.com/user";
  const promise = await axios.get(URL_CONSTRUCTOR, headers);

  return promise.data;
}