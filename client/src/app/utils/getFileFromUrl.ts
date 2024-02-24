import mime from "mime"

export async function getFileFromUrl(url?: string, fileName?: string) {
  if (!url || !fileName) {
    return
  }

  //filename have to contain extension
  const res = await fetch(url)
  const ext = fileName.split(".").at(-1)
  const file = new File([await res.blob()], fileName, {
    type: mime.getType(ext || "") || "",
  })

  return file
}