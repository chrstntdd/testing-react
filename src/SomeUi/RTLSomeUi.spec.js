import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent, waitForElement, wait } from 'react-testing-library';

import SomeUi from '.';

describe.skip('RTL testing', () => {
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

  describe('when the user presses the toggle button', () => {
    it('should reveal the content if it is hidden and hide the content if it is visible', () => {
      const { getByText, queryByText } = render(<SomeUi {...props} />);

      const showButton = getByText(/show/i);

      expect(showButton).toBeInTheDocument();
      expect(queryByText(/hidden content/i)).not.toBeInTheDocument();

      fireEvent.click(showButton);

      const hideButton = getByText(/hide/i);

      expect(hideButton).toBeInTheDocument();
      expect(queryByText(/hidden content/i)).toBeInTheDocument();
      expect(queryByText(/show/i)).not.toBeInTheDocument();

      fireEvent.click(hideButton);

      expect(queryByText(/hidden content/i)).not.toBeInTheDocument();
      expect(queryByText(/show/i)).toBeInTheDocument();
    });
  });

  describe('when the user enters content into the input field', () => {
    it('should update the text content on the page if the inputValue is defined', () => {
      const { getByText, queryByText } = render(<SomeUi {...props} />);

      const showButton = getByText(/show/i);

      expect(showButton).toBeInTheDocument();
      expect(queryByText(/hidden content/i)).not.toBeInTheDocument();

      fireEvent.click(showButton);

      const hideButton = getByText(/hide/i);

      expect(hideButton).toBeInTheDocument();
      expect(queryByText(/hidden content/i)).toBeInTheDocument();
      expect(queryByText(/show/i)).not.toBeInTheDocument();

      fireEvent.click(hideButton);

      expect(queryByText(/hidden content/i)).not.toBeInTheDocument();
      expect(queryByText(/show/i)).toBeInTheDocument();
    });
  });
});
