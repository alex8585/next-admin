import { filterArrToFilterStr } from "@/support/helpers";
import axiosClient from "@/support/axiosClient";
export async function fetchMany(
  url: string,
  page = 1,
  perPage = 5,
  orderBy = "id",
  descending = true,
  filter: any
) {
  const filterStr = filterArrToFilterStr(filter);
  let tagsUrl = `${url}/?page=${page}&perPage=${perPage}&orderBy=${orderBy}&descending=${descending}`;

  if (filterStr) {
    tagsUrl = `${tagsUrl}${filterStr}`;
  }
  return await axiosClient.get<any>(tagsUrl);
}

export async function fetchAll(url: string) {
  const allUrl = `${url}?perPage=-1`;
  return await axiosClient.get<any>(allUrl);
}

export async function fetchUrl(url: string) {
  return await axiosClient.get<any>(url);
}
