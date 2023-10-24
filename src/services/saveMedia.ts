import * as mime from "mime";

export const saveMedia = async (media: string) => {
  if (!media) return "";

  const formData = new FormData();
  const type =
    media.indexOf("base64") >= 0
      ? media.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0]
      : mime.getType(media);

  //@ts-ignore
  formData.append("file", {
    uri: media,
    type,
    name: "picture",
  });
  formData.append("submit", "Upload Image");

  const headers = {
    Accept: "application/json, */*",
    // "Content-Type": "multipart/form-data",
  };

  const url = await fetch("https://nostr.build/api/v2/upload/files", {
    headers,
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      const result = await response.json();

      if (result?.data?.[0].url) {
        return result.data[0].url;
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
