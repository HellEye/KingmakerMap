import React from 'react';
import { render } from '@testing-library/react';
import App from 'kingmaker_map_react/src/components/board/Map';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
