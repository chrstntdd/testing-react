import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SomeUi from '.';

configure({ adapter: new Adapter() });

describe('Enzyme testing', () => {
  let props;

  beforeEach(() => {
    props = {
      propFuncReq: jest.fn(),
      propA: { key1: true, key2: 'variant1' },
      propB: new Map([['a', 'b'], [1, 2]]),
      propC: false
    };
  });

  it('should work', () => {
    const wrapper = shallow(<SomeUi {...props} />);

    expect(wrapper).toBeDefined();
  });

  describe('toggleVisibility method', () => {
    const render = SomeUi.prototype.render;

    beforeAll(() => {
      SomeUi.prototype.render = jest.fn();
    });

    afterAll(() => {
      SomeUi.prototype.render = render;
    });

    it('should toggle the visibility', () => {
      const wrapper = shallow(<SomeUi {...props} />);

      wrapper.instance().toggleVisibility();

      expect(wrapper.state().hidden).toBe(false);
    });
  });
});
