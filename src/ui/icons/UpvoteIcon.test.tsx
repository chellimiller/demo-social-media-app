import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UpvoteIcon from './UpvoteIcon';

describe('UpvoteIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<UpvoteIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
