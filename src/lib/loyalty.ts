export function calculateLoyaltyPoints(amount: number) {
  if (amount <= 0) {
    return 0;
  }

  return Math.floor(amount / 100);
}