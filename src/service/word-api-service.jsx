import axios from "axios";

export const validate = (palabra) => {
  return axios.get(`https://word-api-hmlg.vercel.app/api/validate?word=${palabra}`);
}
