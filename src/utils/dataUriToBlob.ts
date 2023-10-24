import * as mime from "mime";

// From https://stackoverflow.com/a/61321728}
// DINESH Adhikari - https://stackoverflow.com/users/8595704/dinesh-adhikari
export const DataURIToBlob = (dataURI: string) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString =
    splitDataURI[0].indexOf("base64") >= 0
      ? splitDataURI[0].split(":")[1].split(";")[0]
      : mime.getType(dataURI) || "";

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
};
