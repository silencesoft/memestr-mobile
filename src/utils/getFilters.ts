import { Filter } from "nostr-tools";

import { Filter as AppFilter } from "src/interfaces/nostr/filter";

export const getFilters = (filters: AppFilter[]): Filter => {
  const eventFilter: Filter = {};

  filters.forEach((filter: AppFilter) => {
    if (filter?.type) {
      let type: keyof Filter;
      if (typeof filter.value === "string") {
        switch (filter.type) {
          case "tag":
            type = "#t";
            eventFilter[type] = [filter.value];
            break;
          case "author":
            type = "authors";
            eventFilter[type] = [filter.value];
            break;
          case "post":
            type = "ids";
            eventFilter[type] = [filter.value];
            break;
          default:
            break;
        }
      } else if (typeof filter.value === "number") {
        switch (filter.type) {
          case "until":
            type = "until";
            eventFilter[type] = filter.value;
            break;
          case "limit":
            type = "limit";
            eventFilter[type] = filter.value;
            break;
          default:
            break;
        }
      } else if (typeof filter.value === typeof []) {
        switch (filter.type) {
          case "kinds":
            type = "kinds";
            eventFilter[type] = filter.value as number[];
            break;
          case "tags":
            type = "#t";
            eventFilter[type] = filter.value as string[];
            break;
          case "events":
            type = "#e";
            eventFilter[type] = filter.value as string[];
            break;
          case "posts":
            type = "ids";
            eventFilter[type] = filter.value as string[];
            break;
          case "authors":
            type = "authors";
            eventFilter[type] = filter.value as string[];
            break;
          default:
            break;
        }
      }
    }
  });

  return eventFilter;
};
