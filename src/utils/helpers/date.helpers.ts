import { format } from "date-fns";

export const formatSeconds = (seconds: number) => {
  const milliseconds = seconds * 1000;
  return format(new Date(milliseconds), "mm:ss");
};

export function transformDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayOfWeek;
  } else {
    const formattedDate = date.toLocaleDateString("en-GB"); // "dd/mm/yyyy"
    return formattedDate.split("/").reverse().join("."); // "dd.mm.yy"
  }
}

export function extractTime(dateString: string): string {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time;
}
