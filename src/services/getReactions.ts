import { Event } from "nostr-tools";

import { Filter } from "src/interfaces/nostr/filter";
import { Relay } from "src/interfaces/nostr/relay";
import { getData } from "./getData";
import { Reaction } from "src/interfaces/post";

type Props = {
  relays: Relay[];
  posts: string[];
};

export const getReactions = async ({ relays, posts }: Props) => {
  if (!posts.length) {
    return;
  }

  const filters: Filter[] = [
    { type: "events", value: posts },
    { type: "kinds", value: [7] },
  ];

  const data: Event[] = await getData<Event>({ relays, filters });

  return data as unknown as Reaction[];
};

export default getReactions;
