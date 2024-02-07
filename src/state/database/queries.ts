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
