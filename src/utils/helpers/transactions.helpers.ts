export const calculatePoints = () => {
  const today = new Date();
  const seasonStart = new Date(
    today.getFullYear(),
    Math.floor(today.getMonth() / 3) * 3,
    1
  );
  const daysSinceStart =
    Math.floor(
      (today.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  if (daysSinceStart === 1) return 2;
  if (daysSinceStart === 2) return 3;

  let prevDayPoints = 3;
  let twoDaysAgoPoints = 2;

  for (let i = 3; i <= daysSinceStart; i++) {
    const todayPoints = Math.round(twoDaysAgoPoints + prevDayPoints * 0.6);
    twoDaysAgoPoints = prevDayPoints;
    prevDayPoints = todayPoints;
  }

  return prevDayPoints > 1000
    ? `${Math.floor(prevDayPoints / 1000)}K`
    : prevDayPoints;
};

export function displayPrice(cents: number): string {
  return `$ ${(cents / 100).toFixed(2)}`;
}
