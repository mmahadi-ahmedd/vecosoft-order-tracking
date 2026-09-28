const date = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})
const time = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

export const formatDate = (iso: string) => date.format(new Date(iso))
export const formatTime = (iso: string) => time.format(new Date(iso))
export const formatDateTime = (iso: string) =>
  `${formatDate(iso)}, ${formatTime(iso)}`

export function formatWindow(start: string, end: string) {
  const sameDay = new Date(start).toDateString() === new Date(end).toDateString()
  return sameDay
    ? `${formatDate(start)}, ${formatTime(start)} – ${formatTime(end)}`
    : `${formatDate(start)} – ${formatDate(end)}`
}

export const formatMoney = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)