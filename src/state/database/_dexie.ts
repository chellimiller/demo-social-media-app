/* eslint-disable no-console */
import Dexie, { Table } from 'dexie';
import { Content, ContentId, Person, Username } from './types';
import { JsonPerson, getJsonPersonData, toPerson } from './data/load';

class DexieDatabase extends Dexie {
  person!: Table<Person, Username>;

  content!: Table<Content, ContentId>;

  constructor() {
    super('demo-social-media-app');
    this.version(1).stores({
      person: '++username',
      content: '++id',
    });
  }
}

const database = new DexieDatabase();

async function initializePerson(person: JsonPerson) {
  const { username } = person;
  const existing = await database.person.get(username);
  if (existing) return false;
  return database.person.add(toPerson(person), username);
}

async function initializePeople() {
  const people = await Promise.all(getJsonPersonData().map(initializePerson));
  return people.filter((person) => !!person);
}

initializePeople().then(
  (people) => {
    if (people.length) console.log(`Initialized: ${people.join(', ')}`);
  },
  (error) => console.error('Error while initializing people', error)
);

export default database;
