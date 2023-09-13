export default function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date(dateString))
}