import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { defaultRelays } from "src/constants/defaultValues";
import { Filter } from "src/interfaces/nostr/filter";
import { Post } from "src/interfaces/post";
import { User } from "src/interfaces/user/user";
import { getData } from "src/services/getData";
import getUser from "src/services/getUser";
import { profilesAtom } from "src/state/Nostr";
import { dateToUnix } from "src/utils/dateToUnix";

type Props = {};

export const useGetPosts = (props: Props) => {
  const now = useRef(new Date());
  const [posts, setPosts] = useState<Post[]>([]);
  const tags = ["memes", "meme", "funny", "memestr"];
  const relays = defaultRelays;
  const [profiles, setProfiles] = useAtom(profilesAtom);
  const [loading, setLoading] = useState(false);
  const [lastDate, setLastDate] = useState(dateToUnix(now.current));

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

    const loadPosts = async () => {
      const data: Post[] = await getData<Post>({
        relays,
        filters,
      });
      const newPosts: Post[] = [...posts];

      data.forEach(async (post) => {
        const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png)/g;
        let images = imgRegex.exec(post.content);

        if (images?.length) {
          post.comments = [];
          post.image = images[0];
          const regTags = new RegExp(
            tags.map((tag) => `#${tag}`).join("|"),
            "gi"
          );
          post.content = post.content
            .replace(regTags, "")
            .replace(images[0], "")
            .trim()
            .replace(/^\n|\n$/g, "");

          let profile = profiles.filter(
            (profile) => profile.id === post.pubkey
          );

          if (!profile.length) {
            const user = await getUser({
              relays: [relays[0]],
              userId: post.pubkey,
            });

            setProfiles([...profiles, ...[user]]);
            profile = [user];
          }

          if (profile.length) {
            post.author = profile[0];
          }

          newPosts.push(post);
        }
      });

      setPosts(newPosts);
      setLoading(false);
    };

    if (!loading) {
      setLoading(true);
      loadPosts();
    }
  }, [lastDate]);

  useEffect(() => {
    if (!posts.length && !loading) {
      const newDate = new Date();

      setLastDate(dateToUnix(newDate));
    }
  }, [posts]);

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
    setPosts([]);
  };

  return {
    posts,
    loading,
    nextPage,
    refresh,
  };
};
