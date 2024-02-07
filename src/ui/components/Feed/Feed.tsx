import styled from '@emotion/styled';
import * as React from 'react';
import { Content } from '../../../state';
import Post from '../Post';

/**
 * Props for the Feed
 */
export type FeedProps = React.HTMLAttributes<HTMLUListElement> & {
  data: Content[];
};

/**
 * @todo Use CSS variables and design tokens
 */
const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-flow: column nowrap;
  padding: 0.5rem 1rem;
`;

/**
 * @todo Use CSS variables and design tokens
 */
const ListItem = styled.li`
  margin: 0.5rem;
`;

/**
 * @todo Virtualization
 *
 * @param props
 * @returns
 */
const Feed: React.FC<FeedProps> = (props) => {
  const { data, ...forwardedProps } = props;

  return (
    <List {...forwardedProps}>
      {data.map((content) => (
        <ListItem key={content.id}>
          <Post data={content} />
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(Feed);
