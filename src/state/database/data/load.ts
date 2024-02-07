import { faker } from '@faker-js/faker';
import { Person, Username } from '../types';
import people from './person.json';

export type JsonPerson = Omit<
  Person,
  'joinDate' | 'content' | 'votes' | 'languages' | 'birthDate' | 'friends'
> & {
  birthDate?: string;
  friends?: Username[];
  languages?: string[];
};

export function toPerson(person: JsonPerson): Person {
  const { birthDate, friends = [], languages = [], ...other } = person;
  const joinDate = faker.date.between({ from: '2010-01-01', to: Date.now() });

  return {
    ...other,
    birthDate: birthDate ? new Date(birthDate) : undefined,
    friends: new Set(friends),
    languages: new Set(languages),
    joinDate,
    content: new Set(),
    votes: new Set(),
  };
}

export function getJsonPersonData(): JsonPerson[] {
  return people as JsonPerson[];
}
