import { atom } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { getPublicKey, nip19 } from "nostr-tools";

import { getValueFor } from "src/utils/storage";
import { save } from "src/utils/storage";

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
