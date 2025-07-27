export type FileItem = {
  name: string
  type: string
  size: number
  data: Uint8Array // Assuming the file data is stored as a Uint8Array
}
