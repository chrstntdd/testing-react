import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';

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

  describe('when the user presses the toggle button', () => {
    it('should reveal the content if it is hidden and hide the content if it is visible', () => {
      const { getByText, queryByText } = render(<SomeUi {...props} />);

      const showButton = getByText(/show/i);

      expect(showButton).toBeInTheDocument();
      expect(queryByText(/hidden content/i)).not.toBeInTheDocument();

      fireEvent.click(showButton);

      const hideButton = getByText(/hide/i);

      expect(hideButton).toBeInTheDocument();
      expect(getByText(/hidden content/i)).toBeInTheDocument();
      expect(queryByText(/show/i)).not.toBeInTheDocument();

      fireEvent.click(hideButton);

      expect(queryByText(/hidden content/i)).not.toBeInTheDocument();
      expect(getByText(/show/i)).toBeInTheDocument();
    });
  });

  describe('when the user enters content into the input field', () => {
    it('should update the text content on the page if the inputValue is defined', () => {
      const { getByText, getByPlaceholderText } = render(<SomeUi {...props} />);

      const input = getByPlaceholderText(/enter some text whydontcha/i);

      const testText = 'some text';

      fireEvent.change(input, { target: { value: testText } });

      expect(getByText(testText)).toBeInTheDocument();
    });
  });

  describe('when propC changes', () => {
    it('should call propFuncReq', () => {
      const { rerender } = render(<SomeUi {...props} />);

      const newProps = { ...props, propC: true };

      rerender(<SomeUi {...newProps} />);

      expect(props.propFuncReq).toHaveBeenCalledTimes(1);
    });
  });

  describe('when propC **DOES NOT** changes', () => {
    it('should **NOT** call propFuncReq', () => {
      const { rerender } = render(<SomeUi {...props} />);

      rerender(<SomeUi {...props} />);

      expect(props.propFuncReq).toHaveBeenCalledTimes(0);
    });
  });

  describe('when the component unmounts', () => {
    it('should call propFuncOpt', () => {
      props = { ...props, propFuncOpt: jest.fn() };
      const { unmount } = render(<SomeUi {...props} />);

      unmount();

      expect(props.propFuncOpt).toHaveBeenCalledTimes(1);
    });
  });
});
