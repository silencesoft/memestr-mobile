import React from "react";
import {
  Event as NostrEvent,
  finishEvent,
  getEventHash,
  verifySignature,
} from "nostr-tools";
import { useAtom, useAtomValue } from "jotai";

import { dateToUnix } from "src/utils/dateToUnix";
import sendPost from "src/services/sendPost";
import { getRelaysAtom, loginKeyAtom, pubKeyAtom } from "src/state/User";
import { resetPostLikesAtom } from "src/state/Nostr";

type Props = {};

export const useSendEvents = (props: Props) => {
  const relays = useAtomValue(getRelaysAtom);
  const pubkey = useAtomValue(pubKeyAtom);
  const loginkey = useAtomValue(loginKeyAtom);
  const [resetLikes, setResetLikes] = useAtom(resetPostLikesAtom);

  const like = async (
    authorkey: string,
    notekey: string,
    setLoading: (value: boolean) => void
  ) => {
    setLoading(true);
    const now = new Date();
    const date = dateToUnix(now);

    const event: NostrEvent = {
      content: "+",
      kind: 7,
      created_at: date,
      pubkey: pubkey || "",
      id: "",
      sig: "",
      tags: [
        ["p", authorkey],
        ["e", notekey],
      ],
    };

    try {
      event.id = getEventHash(event);

      const signedEvent = finishEvent(event, loginkey || "");

      await sendPost({ relays, newEvent: signedEvent });

      const ok = verifySignature(event);

      setLoading(false);
      setResetLikes(!resetLikes);
    } catch (e) {
      console.log({ e });
      setLoading(false);
      setResetLikes(!resetLikes);
      // setError('title', { message: 'Error in server or event signature' });
    }
  };

  return {
    like,
  };
};
