import * as React from 'react';
import * as renderer from 'react-test-renderer';
import InfoIcon from './InfoIcon';

describe('InfoIcon', () => {
  // Dummy test to get you started
  it('should render without errors', () => {
    // Act
    const tree = renderer.create(<InfoIcon />).toJSON();

    // Assert
    expect(tree).toBeTruthy();
  });
});
