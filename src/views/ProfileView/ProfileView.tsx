import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Username, useFriends, usePerson, usePosts } from '../../state';
import { Feed } from '../../ui/components';

/**
 * Props for the ProfileView component.
 */
export type ProfileViewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 *
 * @todo Localization for givenName/familyName order
 */
const PersonFriends: React.FC<{ username: Username }> = (props) => {
  const { username } = props;
  const friends = useFriends(username);

  return (
    <ul>
      {Array.from(friends).map((friend) => (
        <li key={friend.username}>
          <Link to={`/profile/${friend.username}`}>
            {friend.givenName} {friend.familyName}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const PersonActivity: React.FC<{ username: Username }> = (props) => {
  const { username } = props;
  const posts = usePosts(username);

  return <Feed data={posts} />;
};

/**
 * @todo Get headers and text from a dictionary
 * @todo Localization for givenName/familyName order
 *
 * @param props
 * @returns
 */
const ProfileView: React.FC<ProfileViewProps> = (props) => {
  const { username } = useParams<{ username: Username }>();
  const person = usePerson(username);

  if (!person) return null;

  return (
    <div {...props}>
      <h1>
        {person.givenName} {person.familyName}
      </h1>
      {person.location && (
        <p>
          {person.location?.city ? `${person.location.city}, ` : ''}
          {person.location.country}
        </p>
      )}
      <section>
        <h2>About</h2>
        <p>{person.about}</p>
        <h3>Hobbies</h3>
        <ul>
          {person.hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
        <h3>Languages</h3>
        <ul>
          {Array.from(person.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Friends</h2>
        <PersonFriends username={person.username} />
      </section>
      <section>
        <h2>Activity</h2>
        <PersonActivity username={person.username} />
      </section>
    </div>
  );
};

export default ProfileView;
