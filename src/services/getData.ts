import { Filter, SimplePool } from "nostr-tools";

import { Relay } from "src/interfaces/nostr/relay";
import { Filter as AppFilter } from "src/interfaces/nostr/filter";
import { getFilters } from "src/utils/getFilters";

type Props = {
  relays: Relay[];
  filters: AppFilter[];
};

type TGetDataFunc = <T>(props: Props) => Promise<T[]>;

export const getData: TGetDataFunc = async <T>({ relays, filters }: Props) => {
  const relayPool = new SimplePool();
  const currentRelays = relays.map((relay) => relay.relay);
  const currentFilters: Filter = getFilters(filters);

  let data = await relayPool.list(currentRelays, [currentFilters]);

  relayPool.close(currentRelays);

  return data as T[];
};
