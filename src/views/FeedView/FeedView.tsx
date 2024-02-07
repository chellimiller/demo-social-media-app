import * as React from 'react';
import { Username, useCurrentUsername, useFeed } from '../../state';
import { Feed } from '../../ui/components';

/**
 * Props for the FeedView component.
 */
export type FeedViewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 *
 * @todo Virtualization
 */
const PersonFeed: React.FC<{ username: Username }> = (props) => {
  const { username } = props;
  const posts = useFeed(username);

  return <Feed data={posts} />;
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
