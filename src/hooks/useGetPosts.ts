import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { defaultRelays } from "src/constants/defaultValues";
import { Filter } from "src/interfaces/nostr/filter";
import { Post } from "src/interfaces/post";
import { User } from "src/interfaces/user/user";
import { getData } from "src/services/getData";
import getUser from "src/services/getUser";
import {
  loadingAtom,
  postsAtom,
  profilesAtom,
  contactsAtom,
  asyncContactsAtom,
} from "src/state/Nostr";
import { dateToUnix } from "src/utils/dateToUnix";

type Props = {};

export const useGetPosts = (props: Props) => {
  const now = useRef(new Date());
  const contacts = useAtomValue(asyncContactsAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const tags = ["memes", "meme", "funny", "memestr"];
  const relays = defaultRelays;
  const [profiles, setProfiles] = useAtom(profilesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [lastDate, setLastDate] = useState(dateToUnix(now.current));
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const filters: Filter[] = [
      {
        type: "authors",
        value: contacts,
      },
      {
        type: "tags",
        value: tags,
      },
      { type: "until", value: lastDate },
      { type: "kinds", value: [1] },
      { type: "limit", value: 10 },
    ];

    const loadPosts = async () => {
      const data: Post[] = await getData<Post>({
        relays,
        filters,
      });
      const newPosts: Post[] = [...posts];
      const userProfiles: User[] = [...profiles];
      const authors: string[] = [];

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
        }
      });

      getUser({
        relays: relays,
        userId: authors,
      })
        .then(async (users) => {
          await setProfiles([...userProfiles, ...users]);

          const result = newPosts.map((post) => {
            const author = users.filter(
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

    if (!loading) {
      setLoading(true);
      loadPosts();
    }
  }, [lastDate]);

  useEffect(() => {
    if (!posts.length && !loading && !empty) {
      const newDate = new Date();

      setLastDate(dateToUnix(newDate));
    }
  }, [empty, posts]);

  const nextPage = () => {
    if (!posts.length) {
      return;
    }

    const lastDate = Math.min(...posts.map((e) => e.created_at));

    if (!loading) {
      setLastDate(lastDate - 1);
    }
  };

  const refresh = () => {
    setEmpty(false);
    setPosts([]);
  };

  return {
    posts,
    loading,
    empty,
    nextPage,
    refresh,
  };
};
