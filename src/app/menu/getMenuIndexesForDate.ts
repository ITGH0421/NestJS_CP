import { parseISO, differenceInCalendarDays } from "date-fns";

const BASE_DATE = parseISO("2025-01-01"); // Rotation starts from here
const RECOVERY_LENGTH = 7;
const NOURISH_LENGTH = 21;

export function getMenuIndexesForDate(date: Date): {
  recoveryIndex: number;
  nourishIndex: number;
} {
  const daysSinceBase = differenceInCalendarDays(date, BASE_DATE);

  // Recovery Menu = Days 7 & Nourish Menu = Days 28 on 01/01/2025
  const recoveryIndex = (6 + daysSinceBase) % RECOVERY_LENGTH;
  const nourishIndex = (20 + daysSinceBase) % NOURISH_LENGTH;

  return {
    recoveryIndex,
    nourishIndex,
  };
}
