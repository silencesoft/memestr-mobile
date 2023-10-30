import { atom } from "jotai";
import { atomWithReset, loadable } from "jotai/utils";

import { defaultRelays } from "src/constants/defaultValues";
import { Relay } from "src/interfaces/nostr/relay";
import { Post, PostLikes, Reaction } from "src/interfaces/post";
import { User } from "src/interfaces/user/user";
import getReactions from "src/services/getReactions";
import { getRelaysAtom } from "./User";

export const relaysAtom = atomWithReset<Relay[]>(defaultRelays);

export const profilesAtom = atom<User[]>([]);

export const loadingAtom = atom<boolean>(false);

export const postsAtom = atom<Post[]>([]);

export const globalAtom = atom<boolean>(false);

export const postsReactionsAtom = atom<PostLikes>({});

export const postsLikesAtom = atom<Promise<PostLikes>>(async (get) => {
  const posts = await get(postsAtom);
  const relays = await get(getRelaysAtom);

  if (!posts.length) {
    return {};
  }

  const postsList = [...posts.map((post) => post.id)];

  return getReactions({ relays, posts: [...postsList] }).then(async (data) => {
    const result: PostLikes = {};

    if (data?.length) {
      data.forEach((reaction) => {
        const eRefs = reaction.tags.filter((tag) => tag[0] === "e");

        if (eRefs.length && reaction.content !== "-") {
          const pubkey = eRefs[0][1];

          if (result[pubkey]) {
            if (!result[pubkey].includes(reaction.pubkey)) {
              result[pubkey].push(reaction.pubkey);
            }
          } else {
            result[pubkey] = [reaction.pubkey];
          }
        }
      });
    }

    return result;
  });
});
