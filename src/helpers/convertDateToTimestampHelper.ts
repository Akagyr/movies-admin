export function convertDateToTimestamp(date: string) {
  const months: Record<string, number> = {
    января: 1,
    февраля: 2,
    марта: 3,
    апреля: 4,
    мая: 5,
    июня: 6,
    июля: 7,
    августа: 8,
    сентября: 9,
    октября: 10,
    ноября: 11,
    декабря: 12,
  };

  const parts = date.split(' ');
  if (parts.length < 3) return null;

  const day = parseInt(parts[0], 10);
  const month = months[parts[1].toLowerCase()];
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || month === undefined || isNaN(year)) return null;

  const dateObject = new Date(year, month - 1, day);
  return dateObject.getTime();
}
