import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UserLink from './UserLink';

describe('UserLink', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<UserLink />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
