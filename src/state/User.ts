import { atomWithDefault } from "jotai/utils";
import { getValueFor } from "src/utils/store";

export const loginKeyAtom = atomWithDefault<Promise<string>>(
  async () => (await getValueFor("loginKey")) as string
);
