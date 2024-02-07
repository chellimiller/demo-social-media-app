import { type SetRequired } from 'type-fest';
import database from './_dexie';
import { Content, ContentId, Person, Username } from './types';
import { getContent, getPerson } from './queries';

export function setPerson(data: Person): Promise<string> {
  return database.person.put(data, data.username);
}

export function removePerson(username: Username): Promise<void> {
  return database.person.delete(username);
}

export function setContent(data: Content): Promise<string> {
  return database.content.put(data, data.id);
}

export async function removeVote(params: {
  username: Username;
  contentId: ContentId;
}): Promise<string | undefined> {
  const { username, contentId } = params;

  const content = await getContent(contentId);
  if (!content) return undefined;

  if (!content.upvotes.has(username) && !content.downvotes.has(username)) {
    return contentId;
  }

  const next = { ...content };

  if (content.upvotes.has(username)) {
    next.upvotes = new Set(content.upvotes);
    next.upvotes.delete(username);
  }

  if (content.downvotes.has(username)) {
    next.downvotes = new Set(content.downvotes);
    next.downvotes.delete(username);
  }

  return setContent(next);
}

export async function upvoteContent(params: {
  username: Username;
  contentId: ContentId;
}): Promise<string | undefined> {
  const { username, contentId } = params;

  const content = await getContent(contentId);
  if (!content) return undefined;

  if (content.upvotes.has(username) && !content.downvotes.has(username)) {
    return contentId;
  }

  const nextContent = { ...content };

  if (content.downvotes.has(username)) {
    nextContent.downvotes = new Set(content.downvotes);
    nextContent.downvotes.delete(username);
  }

  if (!content.upvotes.has(username)) {
    nextContent.upvotes = new Set(content.upvotes);
    nextContent.upvotes.add(username);
  }

  return setContent(nextContent);
}
export async function downvoteContent(params: {
  username: Username;
  contentId: ContentId;
}): Promise<string | undefined> {
  const { username, contentId } = params;

  const person = await getPerson(username);
  if (!person) return undefined;

  const content = await getContent(contentId);
  if (!content) return undefined;

  if (content.downvotes.has(username) && !content.upvotes.has(username)) {
    return contentId;
  }

  const nextContent = { ...content };

  if (content.upvotes.has(username)) {
    nextContent.upvotes = new Set(content.upvotes);
    nextContent.upvotes.delete(username);
  }

  if (!content.downvotes.has(username)) {
    nextContent.downvotes = new Set(content.downvotes);
    nextContent.downvotes.add(username);
  }

  return setContent(nextContent);
}

// export async function createContent(
//   content: Omit<
//     Content,
//     'id' | 'dateCreated' | 'comments' | 'upvotes' | 'downvotes'
//   >
// ): Promise<ContentId> {
//   const { username, ...other } = content;

//   const comments = new Set<ContentId>();
//   const upvotes = new Set<Username>();
//   const downvotes = new Set<Username>();
//   const dateCreated = new Date();

//   // Not ideal, but it works for this mock app use case.
//   const id = `${username}-${dateCreated.getTime()}` as ContentId;

//   await database.content.put(
//     { ...other, username, id, upvotes, downvotes, dateCreated, comments },
//     id
//   );

//   return id;
// }

export async function addPost(content: Content): Promise<ContentId> {
  const {
    username,
    dateCreated = new Date(),
    // Not ideal, but it works for this mock app use case.
    id = `${username}-${dateCreated.getTime()}` as ContentId,
    comments = new Set(),
    upvotes = new Set(),
    downvotes = new Set(),
    ...other
  } = content;

  await database.content.put(
    { ...other, username, id, upvotes, downvotes, dateCreated, comments },
    id
  );

  return id;
}
export async function addComment(
  comment: SetRequired<Content, 'parent'>
): Promise<ContentId> {
  const {
    username,
    dateCreated = new Date(),
    // Not ideal, but it works for this mock app use case.
    id = `${username}-${dateCreated.getTime()}` as ContentId,
    comments = new Set(),
    upvotes = new Set(),
    downvotes = new Set(),
    ...other
  } = comment;

  await database.content.put(
    { ...other, username, id, upvotes, downvotes, dateCreated, comments },
    id
  );

  return id;
}

export async function removeContent(id: ContentId) {
  const content = await getContent(id);
  if (!content) throw new Error(`Cannot find content with id "${id}"`);
}
