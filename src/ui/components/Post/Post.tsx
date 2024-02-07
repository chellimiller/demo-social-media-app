import * as React from 'react';
// eslint-disable-next-line no-restricted-imports
import { Link } from 'react-router-dom';
import { Content } from '../../../state';

/**
 * Props for the Post
 */
export type PostProps = React.HTMLAttributes<HTMLDivElement> & {
  data?: Content;
};

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const Post: React.FC<PostProps> = (props) => {
  const { data, ...forwardedProps } = props;

  if (!data) return null;

  return (
    <div {...forwardedProps}>
      <div>{data.text}</div>
      <div>
        <span>
          <Link to={`/profile/${data.username}`}>@{data.username}</Link>
        </span>
        <span>{data.dateCreated.toDateString()}</span>
      </div>
    </div>
  );
};

export default Post;
