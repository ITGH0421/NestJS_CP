import { addDays, format, isAfter } from "date-fns";

const BASE_DATE = new Date("2025-01-01");
const RECOVERY_LENGTH = 7;
const NOURISH_LENGTH = 21;

export function getMenuIndexesForDate(
  selectedDate: Date,
  nonOperatingDays: string[]
) {
  const allDates: Date[] = [];
  let current = BASE_DATE;

  while (!isAfter(current, selectedDate)) {
    const dateStr = format(current, "yyyy-MM-dd");
    if (!nonOperatingDays.includes(dateStr)) {
      allDates.push(current);
    }
    current = addDays(current, 1);
  }

  const dayCount = allDates.length;

  // 🟡 Preserving offset: Recovery Day 7, Nourish Day 28 on 01/01/2025
  const recoveryIndex = (6 + dayCount - 1) % RECOVERY_LENGTH;
  const nourishIndex = (20 + dayCount - 1) % NOURISH_LENGTH;

  return { recoveryIndex, nourishIndex };
}

