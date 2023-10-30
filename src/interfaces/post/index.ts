import { User } from "../user/user";

export interface Refs {
  pos: number;
  value: string;
}

export interface CustomRef {
  kind: number;
  value: string;
  type?: string;
}

export interface Post {
  id: string;
  content: string;
  pubkey: string;
  video: string;
  image: string[];
  tags: string[];
  created_at: number;
  aRefs?: Refs[];
  eRefs?: Refs[];
  pRefs?: Refs[];
  comments: string[];
  author: User;
}

export interface PostLikes {
  [key: string]: string[];
}

export interface Reaction {
  id: string;
  content: string;
  pubkey: string;
  tags: string[];
  created_at: number;
}
