import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CommentIcon from './CommentIcon';

describe('CommentIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<CommentIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
