import { Event, Kind } from "nostr-tools";

import { Filter } from "src/interfaces/nostr/filter";
import { Relay } from "src/interfaces/nostr/relay";
import { User } from "src/interfaces/user/user";
import { getData } from "./getData";

type Props = {
  relays: Relay[];
  userId: string;
};

export const getContacts = async ({ relays, userId }: Props) => {
  const filters: Filter[] = [
    { type: "authors", value: [userId] },
    { type: "kinds", value: [3] },
  ];

  const data: Event[] = await getData<Event>({ relays, filters });
  const results: string[] = [];

  data.forEach((item) => {
    item.tags.forEach((tag) => results.push(tag[1]));
  });

  return results;
};

export default getContacts;
