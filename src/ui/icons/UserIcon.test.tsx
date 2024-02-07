import * as React from 'react';
import * as renderer from 'react-test-renderer';
import UserIcon from './UserIcon';

describe('UserIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<UserIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
