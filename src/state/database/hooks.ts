import { useLiveQuery } from 'dexie-react-hooks';
import { Person, Username } from './types';
import { getFriends, getPerson } from './queries';

export function usePerson(username: Username | undefined): Person | undefined {
  return useLiveQuery(() => getPerson(username), [username]);
}

export function useFriends(username: Username): Person[] {
  return useLiveQuery(() => getFriends(username), [username]) ?? [];
}
