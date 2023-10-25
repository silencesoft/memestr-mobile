import { atom } from "jotai";
import { atomWithDefault, loadable } from "jotai/utils";
import { SimplePool, getPublicKey, nip19 } from "nostr-tools";

import { Relay } from "src/interfaces/nostr/relay";
import getRelays from "src/services/getRelays";
import getUser from "src/services/getUser";
import { defaultRelays } from "src/constants/defaultValues";
import { getValueFor } from "src/utils/storage";
import { save } from "src/utils/storage";
import { getContacts } from "src/services/getContacts";

export const loadLoginKeyAtom = atomWithDefault<Promise<string | null>>(
  async () => (await getValueFor("loginKey")) as string
);

const saveloginKeyAtomAtom = atom<string | null>(null);

export const loginKeyAtom = atom(
  (get) => get(saveloginKeyAtomAtom) ?? get(loadLoginKeyAtom),
  (get, set, newValue) => {
    const nextValue =
      typeof newValue === "function"
        ? newValue(get(loadLoginKeyAtom))
        : newValue;

    save("loginKey", nextValue);
    set(saveloginKeyAtomAtom, nextValue);
  }
);

export const privKeyAtom = atom<Promise<string>>(async (get) => {
  const loginKey = await get(loginKeyAtom);
  let nsecKey = "";

  if (!loginKey) {
    return "";
  }

  const isNsec = loginKey.startsWith("nsec");

  if (isNsec) {
    try {
      const { data } = await nip19.decode(loginKey);
      nsecKey = data.toString();
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  const privKey = isNsec ? nsecKey : loginKey;

  return privKey;
});

export const pubKeyAtom = atom<Promise<string>>(async (get) => {
  const privKey = await get(loginKeyAtom);
  let nsecKey = "";

  if (!privKey) {
    return "";
  }

  const isNsec = privKey.startsWith("nsec");

  if (isNsec) {
    try {
      const { data } = await nip19.decode(privKey);
      nsecKey = data.toString();
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  const pubKey = getPublicKey(isNsec ? nsecKey : privKey);

  return pubKey;
});

export const profileAtom = atom<Promise<any>>(async (get) => {
  const relays = await get(getRelaysAtom);
  const pubkey = await get(pubKeyAtom);

  const user = getUser({
    relays: relays,
    userId: [pubkey],
  })
    .then(async (user) => {
      console.log(user);

      return user;
    })
    .catch(() => {})
    .finally(() => {});

  return user;
});

export const getRelaysAtom = atom<Promise<Relay[]>>(async (get) => {
  const relays = defaultRelays;
  const pubkey = await get(pubKeyAtom);
  const userRelays: Relay[] = [];

  if (!pubkey) {
    return relays;
  }

  const events = await getRelays({ relays, userId: [pubkey] });

  if (events?.length) {
    events.forEach(async (event) => {
      await event.tags.forEach(async (tag) => {
        userRelays.push({ relay: tag[1], type: tag?.[2] || "" });
      });
    });
  }

  return userRelays.length ? userRelays : relays;
});

export const testAtom = atom<Relay[]>([]);

export const testAAtom = atomWithDefault<Relay[]>(() => defaultRelays);

const asyncContactsAtom = atom<Promise<string[]>>(
  async (get): Promise<string[]> => {
    const user = await get(pubKeyAtom);
    const contacts = await getContacts({
      userId: user.toString(),
      relays: defaultRelays,
    });

    return contacts;
  }
);

const loadContactsAtom = loadable<Promise<string[]>>(asyncContactsAtom);

const contactsWrittenAtom = atom<string[] | null>(null);

export const contactsAtom = atom(
  (get) => get(contactsWrittenAtom) ?? get(loadContactsAtom).data,
  (get, set, newValue) => {
    const nextValue =
      typeof newValue === "function"
        ? newValue(get(loadContactsAtom).data)
        : newValue;

    set(contactsWrittenAtom, nextValue);
  }
);
