import * as React from 'react';
import * as renderer from 'react-test-renderer';
import DownvoteIcon from './DownvoteIcon';

describe('DownvoteIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<DownvoteIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
