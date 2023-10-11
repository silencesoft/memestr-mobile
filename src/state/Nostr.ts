import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { defaultRelays } from "src/constants/defaultValues";
import { Relay } from "src/interfaces/nostr/relay";
import { User } from "src/interfaces/user/user";

export const relaysAtom = atomWithReset<Relay[]>(defaultRelays);

export const profilesAtom = atom<User[]>([]);
