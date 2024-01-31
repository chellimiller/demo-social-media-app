import * as React from 'react';

/**
 * Props for the FeedView component.
 */
export type FeedViewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const FeedView: React.FC<FeedViewProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  return <div {...forwardedProps} />;
}

export default FeedView;
