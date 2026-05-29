export type DayHours = {
  day: string;
  dayIndex: number;
  open: string | null;
  close: string | null;
  closed?: boolean;
};

export const storeHours: DayHours[] = [
  { day: "Monday", dayIndex: 1, open: "09:00", close: "17:30" },
  { day: "Tuesday", dayIndex: 2, open: "09:00", close: "17:30" },
  { day: "Wednesday", dayIndex: 3, open: "09:00", close: "17:30" },
  { day: "Thursday", dayIndex: 4, open: "09:00", close: "17:30" },
  { day: "Friday", dayIndex: 5, open: "09:00", close: "17:30" },
  { day: "Saturday", dayIndex: 6, open: "09:00", close: "14:00" },
  {
    day: "Sunday",
    dayIndex: 0,
    open: null,
    close: null,
    closed: true,
  },
];

export function formatHoursDisplay(h: DayHours): string {
  if (h.closed || !h.open || !h.close) return "Closed";
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return m === 0 ? `${hour} ${period}` : `${hour}:${m.toString().padStart(2, "0")} ${period}`;
  };
  return `${fmt(h.open)} to ${fmt(h.close)}`;
}

export function getStoreStatus(now: Date = new Date()): {
  isOpen: boolean;
  label: string;
  todayHours: DayHours;
} {
  const dayIndex = now.getDay();
  const today = storeHours.find((h) => h.dayIndex === dayIndex)!;

  if (today.closed || !today.open || !today.close) {
    return { isOpen: false, label: "Closed Now", todayHours: today };
  }

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen =
    currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    label: isOpen ? "Open Now" : "Closed Now",
    todayHours: today,
  };
}
