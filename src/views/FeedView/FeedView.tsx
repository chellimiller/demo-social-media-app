import * as React from 'react';
import { Username, useCurrentUsername, useFeed } from '../../state';
import { Post } from '../../ui/components';

/**
 * Props for the FeedView component.
 */
export type FeedViewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 *
 * @todo Localization for givenName/familyName order
 */
const PersonFeed: React.FC<{ username: Username }> = (props) => {
  const { username } = props;
  const posts = useFeed(username);

  return (
    <ul>
      {Array.from(posts).map((post) => (
        <li key={post.id}>
          <Post data={post} />
        </li>
      ))}
    </ul>
  );
};

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const FeedView: React.FC<FeedViewProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;
  const username = useCurrentUsername();

  if (!username) return null;

  return (
    <div {...forwardedProps}>
      <PersonFeed username={username} />
    </div>
  );
};

export default FeedView;
