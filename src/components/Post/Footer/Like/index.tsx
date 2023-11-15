import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native-paper";

import ButtonIcon from "src/components/ButtonIcon";
import { useSendEvents } from "src/hooks/useSendEvent";
import { postsLikesAtom } from "src/state/Nostr";
import { pubKeyAtom } from "src/state/User";

type Props = {
  id: string;
  authorkey: string;
};

const Like = ({ id, authorkey }: Props) => {
  const userKey = useAtomValue(pubKeyAtom);
  const reactions = useAtomValue(postsLikesAtom);
  const likes = reactions?.[id] || [];
  const liked = likes?.includes(userKey);
  const { like } = useSendEvents({});
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    console.log({liked, authorkey, id});
    if (liked) return;

    if (authorkey && id) {
      like(authorkey, id, setLoading);
    }
  };

  return (
    <>
      {!loading ? (
        <ButtonIcon
          icon={liked ? "md-heart-sharp" : "md-heart-outline"}
          handleClick={() => handleLike()}
        />
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default Like;
