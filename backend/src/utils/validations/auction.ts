import { z } from "zod";


export const createAuctionSchema = z
  .object({
    product: z.string().trim().min(1, "Product is required"),

    basePrice: z.coerce 
      .number()
      .positive("Base price must be greater than zero"),

    reservePrice: z.coerce
      .number()
      .positive("Reserve price must be greater than zero"),

    auctionType: z.enum(["NORMAL", "LIVE"], {
      message: 'Auction type must be either "NORMAL" or "LIVE"'
    }),

    startAt: z.coerce 
      .date()
      .refine((date) => date > new Date(), {
        message: "Start date must be in the future",
      }),

    endAt: z.coerce.date(),
  })
  .refine((data) => data.endAt > data.startAt, {
    message: "End date must be after the start date",
    path: ["endAt"], 
  })
  .refine((data) => data.reservePrice >= data.basePrice, {
    message: "Reserve price cannot be less than the base price",
    path: ["reservePrice"], 
  });


