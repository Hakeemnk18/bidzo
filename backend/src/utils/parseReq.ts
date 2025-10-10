import { Request } from "express";
import { buildFilters } from "./buildFilters";

export interface IParseResult {
  page: number;
  search: string;
  limit: number;
  sortValue: string;
  filters: Record<string, any>;
}

export function parseReq(req: Request, filtersArr: [string]): IParseResult {
  const filters = buildFilters(filtersArr, req.query);
  const page = parseInt(req.query.page as string) || 1;
  const search = (req.query.search as string) || "";
  let limit = parseInt(req.query.limit as string, 10);
  if (isNaN(limit) || limit <= 0) limit = 2;
  const sortValue = (req.query.sort as string) || "";

  return { page, search, limit, sortValue, filters };
}
