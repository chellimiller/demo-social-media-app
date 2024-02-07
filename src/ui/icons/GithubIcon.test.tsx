import * as React from 'react';
import * as renderer from 'react-test-renderer';
import GithubIcon from './GithubIcon';

describe('GithubIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<GithubIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
