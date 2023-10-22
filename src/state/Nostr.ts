import { atom } from "jotai";
import { atomWithReset, loadable } from "jotai/utils";

import { defaultRelays } from "src/constants/defaultValues";
import { Relay } from "src/interfaces/nostr/relay";
import { Post } from "src/interfaces/post";
import { User } from "src/interfaces/user/user";
import { pubKeyAtom } from "./User";
import getContacts from "src/services/getContacts";

export const relaysAtom = atomWithReset<Relay[]>(defaultRelays);

export const profilesAtom = atom<User[]>([]);

export const loadingAtom = atom<boolean>(false);

export const postsAtom = atom<Post[]>([]);

export const asyncContactsAtom = atom<Promise<string[]>>(async (get): Promise<string[]> => {
  const user = await get(pubKeyAtom);
  const contacts = await getContacts({
    userId: user.toString(),
    relays: defaultRelays,
  });

  return contacts;
});

export const contactsAtom = loadable<Promise<string[]>>(asyncContactsAtom);

export const globalAtom = atom<boolean>(false);
