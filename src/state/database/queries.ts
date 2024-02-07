import database from './_dexie';
import { Content, ContentId, Person, Username } from './types';

export async function getPerson(
  username: Username | undefined
): Promise<Person | undefined> {
  if (!username) return undefined;
  return database.person.get(username);
}

export async function getAllPeople(): Promise<Person[]> {
  return database.person.toArray();
}

export async function getFriends(username: Username): Promise<Person[]> {
  const person = await getPerson(username);
  if (!person) return [];
  const friends = await database.person.bulkGet(Array.from(person.friends));
  return friends.filter((friend) => !!friend) as Person[];
}

export function getContent(id: ContentId): Promise<Content | undefined> {
  return database.content.get(id);
}

export async function getPosts(username: Username): Promise<Content[]> {
  const data = await database.content
    .filter((content) => content.username === username)
    .toArray();

  return data.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());
}

export async function getFeed(username: Username): Promise<Content[]> {
  const person = await getPerson(username);
  if (!person) return [];

  const data = await database.content
    .filter((content) => person.friends.has(content.username))
    .toArray();

  console.log(data);

  return data.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());
}
