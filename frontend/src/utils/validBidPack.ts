import type { IBidCount } from "../types/bid.type";

export const validateBidPack = (bidCounts: IBidCount[], bidCount: IBidCount) => {
  
  let highest = undefined;
  let lowest = undefined;
  let isValid = true;
  let reason = '';
 
  for (let i = 0; i < bidCounts.length; i++) {

    if (bidCounts[i].bidCount == bidCount.bidCount) {
      
      return { isValid: false, reason: 'Duplicate bid count.' };
    }
    if (bidCounts[i].bidCount < bidCount.bidCount) {
      highest = bidCounts[i];
    } else if (bidCounts[i].bidCount > bidCount.bidCount && !lowest) {
      lowest = bidCounts[i];
      break;
    }
  }

  const currentUnitAmount =
    Math.floor((bidCount.amount / bidCount.bidCount) * 2) / 2;

  if (highest) {
    const highestUnitAmount =
      Math.floor((highest.amount / highest.bidCount) * 2) / 2;

    if (highest.amount >= bidCount.amount) {
      isValid = false;
      reason = 'Amount must be greater than previous pack.';
    } else if (highestUnitAmount <= currentUnitAmount) {
      isValid = false;
      reason = 'Unit price must be lower than previous pack.';
    }
  }

  if (lowest) {
    const lowestUnitAmount =
      Math.floor((lowest.amount / lowest.bidCount) * 2) / 2;

    if (lowest.amount <= bidCount.amount) {
      isValid = false;
      reason = 'Amount must be lower than next pack.';
    } else if (lowestUnitAmount >= currentUnitAmount) {
      isValid = false;
      reason = 'Unit price must be higher than next pack.';
    }
  }

  return { isValid, reason };
}
