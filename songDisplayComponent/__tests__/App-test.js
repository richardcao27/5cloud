// jest.disableAutomock();

import React from 'react';
import App from '../client/App';
import renderer from 'react-test-renderer';

test('Component is rendered', () => {
  let component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
