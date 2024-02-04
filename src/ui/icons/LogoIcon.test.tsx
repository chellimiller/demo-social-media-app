import * as React from 'react';
import * as renderer from 'react-test-renderer';
import LogoIcon from './LogoIcon';

describe('LogoIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<LogoIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
