
import AppException from "src/application/exception/app.exception";

export function normalizeTimeFormat(input: string): string {
  if (!input) return input;

  let value = input.trim().toLowerCase();

  // Replace multiple spaces, normalize am/pm
  value = value.replace(/\s+/g, ''); // remove all spaces

  // Ensure we have am/pm
  const match = value.match(/^(\d{1,2})(?::(\d{1,2}))?(am|pm)$/i);
  if (!match) {
    throw new Error(`Invalid time format: ${input}`);
  }

  let [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr, 10);
  let minute = minuteStr ? parseInt(minuteStr, 10) : 0;

  // Validation
  if (hour < 1 || hour > 12) {
    throw new AppException(
      { message: `Invalid hour: ${hour} in "${input}"` },
      'Invalid hour',
      400,
    );

  }
  if (minute < 0 || minute > 59) {
    throw new AppException(
      { message: `Invalid minute: ${minute} in "${input}"` },
      'Invalid minute',
      400,
    );
  }

  // Format with leading zeros
  const formattedHour = hour.toString();
  const formattedMinute = minute.toString().padStart(2, '0');
  const formattedPeriod = period.toUpperCase();

  return `${formattedHour}:${formattedMinute} ${formattedPeriod}`;
}
