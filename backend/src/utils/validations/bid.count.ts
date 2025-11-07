import z from "zod";
import { IBidCountDto } from "../../dtos/bid.count.dto";
import { CustomError } from "../customError";
import { ResponseMessages } from "../../constants/responseMessages";
import { HttpStatusCode } from "../../constants/httpStatusCode";

export const createBidCountSchema = z.object({
  bidCount: z.coerce.number().min(1, "Bid count must be greater than 0"),
  amount: z.coerce.number().min(1, "Amount is required"),
});





export const validateBidPack = (bidCounts: IBidCountDto[], bidCount: IBidCountDto) => {
  
 let highest = null;
let lowest = null;
let isValid = true;

for (let i = 0; i < bidCounts.length; i++) {
  if (bidCounts[i].bidCount === bidCount.bidCount) {
    throw new CustomError(ResponseMessages.DUPLICATE_BID_COUNT, HttpStatusCode.BAD_REQUEST);
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
    throw new CustomError(ResponseMessages.AMOUNT_GREATER_THAN_PREVIOUS, HttpStatusCode.BAD_REQUEST);
  } else if (highestUnitAmount <= currentUnitAmount) {
    throw new CustomError(ResponseMessages.UNIT_PRICE_LOWER_THAN_PREVIOUS, HttpStatusCode.BAD_REQUEST);
  }
}

if (lowest) {
  const lowestUnitAmount =
    Math.floor((lowest.amount / lowest.bidCount) * 2) / 2;

  if (lowest.amount <= bidCount.amount) {
    throw new CustomError(ResponseMessages.AMOUNT_LOWER_THAN_NEXT, HttpStatusCode.BAD_REQUEST);
  } else if (lowestUnitAmount >= currentUnitAmount) {
    throw new CustomError(ResponseMessages.UNIT_PRICE_HIGHER_THAN_NEXT, HttpStatusCode.BAD_REQUEST);
  }
}

return { isValid };
}
