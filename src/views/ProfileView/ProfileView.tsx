import * as React from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { Person, Username, useFriends, usePerson, usePosts } from '../../state';
import { Feed, UserLink } from '../../ui/components';
import { heading, text } from '../../ui/emotion';

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
    <ul
      css={css`
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-flow: row wrap;
      `}
    >
      {Array.from(friends).map((friend) => (
        <li
          key={friend.username}
          css={css`
            margin: 0.5rem;
          `}
        >
          <UserLink username={friend.username} />
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

const Divider = () => (
  <span
    css={css`
      margin: 0 0.5rem;
    `}
  >
    &#x25C6;
  </span>
);

/**
 * @todo Get headers and text from a dictionary
 * @todo Localization for givenName/familyName order
 */
const PersonAbout: React.FC<{ person: Person }> = (props) => {
  const { person } = props;

  return (
    <section>
      <h1
        css={css`
          ${heading.lg};
        `}
      >
        {person.givenName} {person.familyName}
      </h1>

      <div>
        {person.location && (
          <>
            <span
              css={css`
                ${text.sm};
              `}
            >
              {person.location?.city ? `${person.location.city}, ` : ''}
              {person.location.country}
            </span>
            <Divider />
          </>
        )}
        <span
          css={css`
            ${text.sm};
          `}
        >
          Languages: {Array.from(person.languages).join(', ')}
        </span>
      </div>
      <h2
        css={css`
          ${heading.sm};
          margin-top: 1rem;
        `}
      >
        About Me
      </h2>
      <p
        css={css`
          ${text.md};
        `}
      >
        {person.about}
      </p>
      <h2
        css={css`
          ${heading.sm};
          margin-top: 1rem;
        `}
      >
        Hobbies
      </h2>
      <ul>
        {person.hobbies.map((hobby) => (
          <li
            key={hobby}
            css={css`
              ${text.sm}
            `}
          >
            {hobby}
          </li>
        ))}
      </ul>
    </section>
  );
};

/**
 * @todo Get headers and text from a dictionary
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
      <PersonAbout person={person} />
      <section>
        <h2
          css={css`
            ${heading.sm};
            margin-top: 1rem;
          `}
        >
          Friends ({person.friends.size})
        </h2>
        <PersonFriends username={person.username} />
      </section>
      <section>
        <h2
          css={css`
            ${heading.md};
            margin-top: 1rem;
          `}
        >
          Activity
        </h2>
        <PersonActivity username={person.username} />
      </section>
    </div>
  );
};

export default ProfileView;
