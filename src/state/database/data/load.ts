import { Content, Person, Username } from '../types';
import people from './person.json';
import allContent from './content.json';

export type JsonPerson = Omit<
  Person,
  'joinDate' | 'content' | 'votes' | 'languages' | 'birthDate' | 'friends'
> & {
  joinDate: string;
  birthDate?: string;
  friends?: Username[];
  languages?: string[];
};

export type JsonContent = Pick<Content, 'text' | 'username' | 'id'> & {
  dateCreated: string;
};

export function toPerson(person: JsonPerson): Person {
  const {
    birthDate,
    joinDate,
    friends = [],
    languages = [],
    ...other
  } = person;

  return {
    ...other,
    birthDate: birthDate ? new Date(birthDate) : undefined,
    friends: new Set(friends),
    languages: new Set(languages),
    joinDate: new Date(joinDate),
  };
}

export function toContent(content: JsonContent): Content {
  const { dateCreated, ...other } = content;

  return {
    ...other,
    dateCreated: new Date(dateCreated),
    upvotes: new Set(),
    downvotes: new Set(),
    comments: new Set(),
  };
}

export function getJsonPersonData(): JsonPerson[] {
  return people as JsonPerson[];
}

export function getJsonContentData(): JsonContent[] {
  return allContent as JsonContent[];
}
