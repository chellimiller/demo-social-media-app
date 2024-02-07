import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Post from './Post';

describe('Post', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<Post />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
