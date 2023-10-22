import { Event as NostrEvent, SimplePool } from "nostr-tools";

import { Relay } from "src/interfaces/nostr/relay";

type Props = {
  relays: Relay[];
  newEvent: NostrEvent;
};

export const sendPost = async ({ relays, newEvent }: Props) => {
  const relayPool = new SimplePool();
  const currentRelays = relays.map((relay) => relay.relay);
  const pubs = relayPool.publish(currentRelays, newEvent);

  await Promise.all(pubs);

  relayPool.close(currentRelays);
};

export default sendPost;
