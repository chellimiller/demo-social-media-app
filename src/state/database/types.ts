// Types are kept outside of the './entities' file to avoid circular dependencies.

import { Opaque } from 'type-fest';

/**
 * Example entity stored in Dexie.
 */
export type Entity = {
  id: string;
  name: string;
};

export type Username = Opaque<string>;
export type ContentId = Opaque<string>;

/**
 * Based on Person from schema.org
 *
 * @see https://schema.org/Person
 */
export type Person = {
  username: Username;
  givenName: string;
  familyName: string;
  joinDate: Date;
  birthDate?: Date;
  profileImageUrl?: string;
  friends: Set<Username>;
  email?: string;
  telephone?: string;
  about: string;
  occupation?: string;
  hobbies: string[];
  languages: Set<string>;
  location?: {
    city?: string;
    country: string;
  };
  /** Tracks interactions with both upvotes and downvotes */
  votes: Set<ContentId>;
  content: Set<ContentId>;
};

/**
 * Based on Comment from schema.org. Applies to posts, comments, and other shared content.
 *
 * @see https://schema.org/Comment
 */
export type Content = {
  id: ContentId;
  dateCreated: Date;
  /** Comments on this work, typically from users. */
  comments: Set<ContentId>;
  creator: Username;
  text: string;
  /** A work such as an image, video, or audio clip shared as part of this posting. */
  sharedContent?: ContentId;
  upvotes: Set<Username>;
  downvotes: Set<Username>;
  audio?: unknown;
  video?: unknown;
  parent?: ContentId;
};
