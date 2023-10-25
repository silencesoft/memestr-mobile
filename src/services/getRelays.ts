import { Event } from "nostr-tools";

import { Filter } from "src/interfaces/nostr/filter";
import { Relay } from "src/interfaces/nostr/relay";
import { getData } from "./getData";

type Props = {
  relays: Relay[];
  userId: string[];
};

export const getRelays = async ({ relays, userId }: Props) => {
  if (!userId.length) {
    return;
  }

  const filters: Filter[] = [
    { type: "authors", value: userId },
    { type: "kinds", value: [10002] },
  ];

  const data: Event[] = await getData<Event>({ relays, filters });

  return data;
};

export default getRelays;
