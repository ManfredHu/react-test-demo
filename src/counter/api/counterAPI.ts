// A mock function to mimic making an async request for data

export interface FetchCountResp {
  data: number
}
export function fetchCount(amount = 1): Promise<FetchCountResp> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
