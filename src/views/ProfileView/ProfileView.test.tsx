import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ProfileView from './ProfileView';

describe('ProfileView', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<ProfileView />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
