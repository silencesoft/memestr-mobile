import { atom } from "jotai";
import { atomWithReset, loadable } from "jotai/utils";

import { defaultRelays } from "src/constants/defaultValues";
import { Relay } from "src/interfaces/nostr/relay";
import { Post, PostLikes } from "src/interfaces/post";
import { User } from "src/interfaces/user/user";

export const relaysAtom = atomWithReset<Relay[]>(defaultRelays);

export const profilesAtom = atom<User[]>([]);

export const loadingAtom = atom<boolean>(false);

export const postsAtom = atom<Post[]>([]);

export const globalAtom = atom<boolean>(false);

export const postsReactionsAtom = atom<PostLikes>({});
