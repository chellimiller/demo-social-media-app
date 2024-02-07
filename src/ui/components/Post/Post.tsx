import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Content, usePerson } from '../../../state';
import { text } from '../../emotion';
import Button from '../Button';
import { InfoIcon } from '../../icons';
import UserLink from '../UserLink';

/**
 * Props for the Post
 */
export type PostProps = React.HTMLAttributes<HTMLElement> & {
  data?: Content;
};

const Container = styled.article`
  padding: var(--p--md) var(--p--lg);
  border-radius: var(--border-radius--md);
  background: var(--color--neutral--container);
  box-shadow: var(--shadow--sm);
`;

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  ${text.sm};
`;

const Text = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  ${text.md};
  margin: var(--m--md) 0;
`;

const Actions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  ${text.sm};
`;

/**
 * @todo Localization for givenName/familyName order
 *
 * @param props
 * @returns
 */
const Post: React.FC<PostProps> = (props) => {
  const { data, ...forwardedProps } = props;

  const person = usePerson(data?.username);

  if (!data) return null;

  return (
    <Container {...forwardedProps}>
      <Header>
        <span>
          {person && (
            <span
              css={css`
                margin-right: 1rem;
              `}
            >
              {person.givenName} {person.familyName}
            </span>
          )}
          <UserLink username={data.username} />
        </span>
        <span>{data.dateCreated.toDateString()}</span>
      </Header>
      <Text>{data.text}</Text>
      <Actions>
        <div>
          <Button label="Add comment" icon={<InfoIcon />}>
            {data.comments.size} comments
          </Button>
        </div>
        <div>
          <Button iconOnly label="upvote" icon={<InfoIcon />} />
          <Button iconOnly label="downvote" icon={<InfoIcon />} />
        </div>
      </Actions>
    </Container>
  );
};

export default Post;
