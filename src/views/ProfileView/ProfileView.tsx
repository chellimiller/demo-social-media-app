import * as React from 'react';

/**
 * Props for the ProfileView component.
 */
export type ProfileViewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const ProfileView: React.FC<ProfileViewProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  return <div {...forwardedProps} />;
}

export default ProfileView;
