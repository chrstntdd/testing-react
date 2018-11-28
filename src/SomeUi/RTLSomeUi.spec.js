import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent, waitForElement, wait } from 'react-testing-library';

import SomeUi from '.';

describe('RTL testing', () => {
  let props;

  beforeEach(() => {
    props = {
      propFuncReq: jest.fn(),
      propA: { key1: true, key2: 'variant1' },
      propB: new Map([['a', 'b'], [1, 2]]),
      propC: false
    };
  });

  afterEach(cleanup);

  it('should render some content', () => {
    const { container } = render(<SomeUi {...props} />);

    expect(container).toBeDefined();
  });

  describe('when the user presses the toggle button', () => {
    it('should reveal the content if it is hidden', () => {
      const { getByText, queryByText } = render(<SomeUi {...props} />);

      const showButton = getByText(/show/i);

      expect(showButton).toBeInTheDocument();
      expect(queryByText(/hidden content/i)).not.toBeInTheDocument();

      fireEvent.click(showButton);

      expect(getByText(/hide/i)).toBeInTheDocument();
      expect(queryByText(/hidden content/i)).toBeInTheDocument();
      expect(queryByText(/show/i)).not.toBeInTheDocument();
    });

    it('should hide the content if it is visible', () => {
      const { getByText, queryByText } = render(<SomeUi {...props} />);

      const showButton = getByText(/show/i);

      expect(showButton).toBeInTheDocument();

      fireEvent.click(showButton);

      expect(getByText(/hide/i)).toBeInTheDocument();
      expect(queryByText(/show/i)).not.toBeInTheDocument();
    });
  });
});
