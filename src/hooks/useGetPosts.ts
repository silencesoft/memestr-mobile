import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { defaultTags } from "src/constants/defaultValues";
import { Filter } from "src/interfaces/nostr/filter";
import { Post, PostLikes } from "src/interfaces/post";
import { User } from "src/interfaces/user/user";
import { getData } from "src/services/getData";
import getUser from "src/services/getUser";
import {
  loadingAtom,
  postsAtom,
  profilesAtom,
  globalAtom,
  postsReactionsAtom,
} from "src/state/Nostr";
import { contactsAtom, getRelaysAtom } from "src/state/User";
import { dateToUnix } from "src/utils/dateToUnix";
import { Post as PostProps } from "src/interfaces/post";
import { getReactions } from "src/services/getReactions";

type Props = {};

export const useGetPosts = (props: Props) => {
  const now = useRef(new Date());
  const contacts = useAtomValue(contactsAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const tags = defaultTags;
  const relays = useAtomValue(getRelaysAtom);
  const [profiles, setProfiles] = useAtom(profilesAtom);
  const [reactions, setReactions] = useAtom(postsReactionsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const global = useAtomValue(globalAtom);
  const [lastDate, setLastDate] = useState(dateToUnix(now.current));
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const filters: Filter[] = [
      {
        type: "tags",
        value: tags,
      },
      { type: "until", value: lastDate },
      { type: "kinds", value: [1] },
      { type: "limit", value: 10 },
    ];

    if (!global) {
      filters.push({
        type: "authors",
        value: contacts,
      });
    }

    const loadPosts = async () => {
      if (!relays.length) {
        return;
      }

      const data: Post[] = await getData<Post>({
        relays,
        filters,
      });
      const newPosts: Post[] = [...posts];
      const userProfiles: User[] = [...profiles];
      const authors: string[] = [];
      const postsList: string[] = [];

      if (!data.length) {
        setEmpty(true);
      }

      data.forEach(async (post) => {
        const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png)/gi;
        let images = post.content.match(imgRegex);

        if (images && images.length) {
          post.comments = [];
          post.image = images;
          const regTags = new RegExp(
            tags.map((tag) => `#${tag}`).join("|"),
            "gi"
          );
          post.content = post.content
            .replace(regTags, "")
            .replace(imgRegex, "")
            .trim()
            .replace(/^\n|\n$/g, "");

          authors.push(post.pubkey);

          newPosts.push(post);
          postsList.push(post.id);
        }
      });

      getReactions({ relays, posts: postsList }).then((data) => {
        const result: PostLikes = {};
        const currentReactions = { ...reactions };

        data?.forEach((reaction) => {
          const eRefs = reaction.tags.filter((tag) => tag[0] === "e");

          if (eRefs.length && reaction.content !== "-") {
            const pubkey = eRefs[0][1];

            if (result[pubkey]) {
              result[pubkey]++;
            } else {
              result[pubkey] = 1;
            }
          }
        });

        setReactions({ ...currentReactions, ...result });
      });

      getUser({
        relays: relays,
        userId: authors,
      })
        .then(async (users) => {
          if (!users?.length) {
            setPosts(newPosts);
            return;
          }

          const usersList = [...userProfiles, ...users];

          await setProfiles(usersList);

          const result = newPosts.map((post) => {
            const author = usersList.filter(
              (profile) => profile.id === post.pubkey
            );
            return { ...post, ...{ author: author.length ? author[0] : {} } };
          });

          await setPosts(result);
        })
        .catch(() => {
          setPosts(newPosts);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (!loading && relays.length) {
      setLoading(true);
      loadPosts();
    }
  }, [lastDate]);

  useEffect(() => {
    const isGlobalOrHasContacts = (!global && contacts.length) || !!global;

    if (
      !posts?.length &&
      !loading &&
      !empty &&
      relays.length &&
      isGlobalOrHasContacts
    ) {
      const newDate = new Date();

      setLastDate(dateToUnix(newDate));
    }
  }, [empty, posts.length, relays.length, contacts.length]);

  const nextPage = () => {
    if (!posts?.length) {
      return;
    }

    const items = posts.filter(
      (value: PostProps, index: number, self: PostProps[]) =>
        self.findIndex((v: { id: string }) => v.id === value.id) === index
    );
    const dates = items.map((e) => e.created_at).sort((a, b) => b - a);
    const last = dates.slice(-2);
    const days = (last[0] - last[1]) / (1000 * 60 * 60 * 24);
    const lastDate = days > 0.01 ? last[0] : last[1];

    if (!loading) {
      setLastDate(lastDate - 1);
    }
  };

  const refresh = () => {
    setEmpty(false);
    setPosts([]);
  };

  useEffect(() => refresh(), [global]);

  return {
    posts,
    loading,
    empty,
    nextPage,
    refresh,
  };
};
