import { Person, Username, usePerson } from './database';

export * from './database';
export * from './store';

const signedInUsername: Username = 'examplehuman' as Username;

export function useCurrentPerson(): Person | undefined {
  return usePerson(signedInUsername);
}

export function getCurrentUsername(): Promise<Username> {
  return Promise.resolve(signedInUsername);
}

export function useCurrentUsername(): Username | undefined {
  return signedInUsername;
}
