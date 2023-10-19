import { Event } from "nostr-tools";

import { Filter } from "src/interfaces/nostr/filter";
import { Relay } from "src/interfaces/nostr/relay";
import { User } from "src/interfaces/user/user";
import { getData } from "./getData";

type Props = {
  relays: Relay[];
  userId: string[];
};

export const getUser = async ({ relays, userId }: Props) => {
  const filters: Filter[] = [
    { type: "authors", value: userId },
    { type: "kinds", value: [0] },
  ];

  const data: Event[] = await getData<Event>({ relays, filters });

  const results = data.map((item) => {
    return { ...JSON.parse(item.content), id: item.pubkey };
  });

  return results as unknown as User[];
};

export default getUser;
