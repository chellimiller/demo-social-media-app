import { useLiveQuery } from 'dexie-react-hooks';
import { Content, Person, Username } from './types';
import { getFriends, getPerson, getPosts, getFeed } from './queries';

export function usePerson(username: Username | undefined): Person | undefined {
  return useLiveQuery(() => getPerson(username), [username]);
}

export function useFriends(username: Username): Person[] {
  return useLiveQuery(() => getFriends(username), [username]) ?? [];
}

export function usePosts(username: Username): Content[] {
  return useLiveQuery(() => getPosts(username), [username]) ?? [];
}

export function useFeed(username: Username): Content[] {
  return useLiveQuery(() => getFeed(username), [username]) ?? [];
}
