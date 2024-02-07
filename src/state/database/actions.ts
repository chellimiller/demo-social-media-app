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

  const person = await getPerson(username);
  if (person && person.votes.has(contentId)) {
    const votes = new Set(person.votes);
    votes.delete(contentId);
    await setPerson({ ...person, votes });
  }

  const content = await getContent(contentId);
  if (!content) return undefined;

  if (!content.upvotes.has(username) && !content.downvotes.has(username)) {
    return contentId;
  }

  const nextContent = { ...content };

  if (content.upvotes.has(username)) {
    nextContent.upvotes = new Set(content.upvotes);
    nextContent.upvotes.delete(username);
  }

  if (content.downvotes.has(username)) {
    nextContent.downvotes = new Set(content.downvotes);
    nextContent.downvotes.delete(username);
  }

  return setContent(nextContent);
}

export async function upvoteContent(params: {
  username: Username;
  contentId: ContentId;
}): Promise<string | undefined> {
  const { username, contentId } = params;

  const person = await getPerson(username);
  if (!person) return undefined;

  const content = await getContent(contentId);
  if (!content) return undefined;

  if (!person.votes.has(contentId)) {
    const votes = new Set(person.votes);
    votes.add(contentId);
    await setPerson({ ...person, votes });
  }

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

  if (!person.votes.has(contentId)) {
    const votes = new Set(person.votes);
    votes.add(contentId);
    await setPerson({ ...person, votes });
  }

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

export async function createContent(
  content: Omit<
    Content,
    'id' | 'dateCreated' | 'dateModified' | 'comments' | 'upvotes' | 'downvotes'
  >
): Promise<ContentId> {
  const { creator, ...other } = content;

  const person = await getPerson(creator);
  if (!person) throw new Error(`Cannot find person with username "${creator}"`);

  const comments = new Set<ContentId>();
  const upvotes = new Set<Username>();
  const downvotes = new Set<Username>();
  const dateCreated = new Date();

  // Not ideal, but it works for this mock app use case.
  const id = `${creator}-${dateCreated.getTime()}` as ContentId;

  await database.content.put(
    { ...other, creator, id, upvotes, downvotes, dateCreated, comments },
    id
  );

  await setPerson({ ...person, content: new Set(person.content).add(id) });

  return id;
}

export async function removeContent(id: ContentId) {
  const content = await getContent(id);
  if (!content) throw new Error(`Cannot find content with id "${id}"`);
}
