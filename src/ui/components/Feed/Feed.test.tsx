import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Feed from './Feed';

describe('Feed', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<Feed />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
