import * as React from 'react';
import * as renderer from 'react-test-renderer';
import AddFriendIcon from './AddFriendIcon';

describe('AddFriendIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<AddFriendIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
