import axios from "axios";
import fs from "fs-extra";
import { localMemePath } from "./storage.js";

const API = process.env.API || "https://meme.adityaraul.in";

export async function fetchRemoteMemes() {
  const { data } = await axios.get(`${API}/memes`);
  return data;
}

export async function downloadMeme(name) {
  const res = await axios({
    url: `${API}/memes/${name}`,
    method: "GET",
    responseType: "stream"
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(localMemePath(name));
    res.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}