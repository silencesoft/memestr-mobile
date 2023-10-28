export type FilterType =
  | "tag"
  | "author"
  | "post"
  | "slug"
  | "until"
  | "limit"
  | "kinds"
  | "posts"
  | "tags"
  | "authors"
  | "events"
  | "";

export interface Filter {
  type: FilterType;
  value: string | number | string[] | number[];
}
