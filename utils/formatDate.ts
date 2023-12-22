export default function formateDate(str: string): string {
  return str.replace('T', ' ').substring(0, 16)
}
