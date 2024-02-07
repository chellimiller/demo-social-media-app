import * as React from 'react';
import styled from '@emotion/styled';
// eslint-disable-next-line no-restricted-imports
import { Link } from 'react-router-dom';
import { Username } from '../../../state';

/**
 * Props for the UserLink
 */
export type UserLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  username: Username;
  profileImageUrl?: string;
};

const StyledLink = styled.a`
  text-decoration: none;
  color: var(--link--color);

  &:hover {
    color: var(--link--hover);
  }
`.withComponent(Link);

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const UserLink: React.FC<UserLinkProps> = (props) => {
  const { username, profileImageUrl, ...forwardedProps } = props;

  return (
    <StyledLink {...forwardedProps} to={`/profile/${username}`}>
      @{username}
    </StyledLink>
  );
};

export default UserLink;
