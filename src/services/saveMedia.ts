import { DataURIToBlob } from "src/utils/dataUriToBlob";

export const saveMedia = async (media: string) => {
  if (!media) return "";

  const formData = new FormData();
  const blob = DataURIToBlob(media);
  const ext = media.match(/[^:/]\w+(?=;|,)/)?.[0];

  formData.append("image", blob, "filename." + ext);

  const headers = {
    Accept: "application/json, */*",
    //   'Content-Type': 'multipart/form-data',
  };

  const url = await fetch("https://nostrimg.com/api/upload", {
    headers,
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      const result = await response.json();

      if (result?.imageUrl) {
        return result?.imageUrl;
      } else {
        return "";
      }
    })
    .catch((error) => {
      console.error("upload error", error);
      return "";
    });

  return url;
};
