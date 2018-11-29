import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SomeUi from '.';

configure({ adapter: new Adapter() });

describe.skip('Enzyme testing', () => {
  let props;

  beforeEach(() => {
    props = {
      propFuncReq: jest.fn(),
      propA: { key1: true, key2: 'variant1' },
      propB: new Map([['a', 'b'], [1, 2]]),
      propC: false
    };
  });

  describe('toggleVisibility method', () => {
    const render = SomeUi.prototype.render;
    const componentDidUpdate = SomeUi.prototype.componentDidUpdate;

    beforeAll(() => {
      SomeUi.prototype.render = jest.fn();
      SomeUi.prototype.componentDidUpdate = jest.fn();
    });

    afterAll(() => {
      SomeUi.prototype.render = render;
      SomeUi.prototype.componentDidUpdate = componentDidUpdate;
    });

    it('should toggle the visibility', () => {
      const wrapper = shallow(<SomeUi {...props} />);

      wrapper.instance().toggleVisibility();

      expect(wrapper.state().hidden).toBe(false);

      wrapper.instance().toggleVisibility();

      expect(wrapper.state().hidden).toBe(true);
    });
  });

  describe('handleInputChange method', () => {
    const render = SomeUi.prototype.render;
    const componentDidUpdate = SomeUi.prototype.componentDidUpdate;

    beforeAll(() => {
      SomeUi.prototype.render = jest.fn();
      SomeUi.prototype.componentDidUpdate = jest.fn();
    });

    afterAll(() => {
      SomeUi.prototype.render = render;
      SomeUi.prototype.componentDidUpdate = componentDidUpdate;
    });

    it('should update the internal state that tracks the value of the input', () => {
      const wrapper = shallow(<SomeUi {...props} />);

      const newValue = 'something';

      wrapper.instance().handleInputChange({ target: { value: newValue } });

      expect(wrapper.state().inputValue).toEqual(newValue);
    });
  });

  describe('componentDidUpdate method', () => {
    const render = SomeUi.prototype.render;

    beforeAll(() => {
      SomeUi.prototype.render = jest.fn();
    });

    afterAll(() => {
      SomeUi.prototype.render = render;
    });

    it('should call propFuncReq when propC changes', () => {
      const wrapper = shallow(<SomeUi {...props} />);

      wrapper.setProps({ propC: !props.propC });

      expect(props.propFuncReq).toHaveBeenCalledTimes(1);
    });

    it('should **NOT** call propFuncReq when propC **DOES NOT** change', () => {
      const wrapper = shallow(<SomeUi {...props} />);

      wrapper.setProps({});

      expect(props.propFuncReq).toHaveBeenCalledTimes(0);
    });
  });

  describe('componentWillUnmount method', () => {
    const render = SomeUi.prototype.render;
    const componentDidUpdate = SomeUi.prototype.componentDidUpdate;

    beforeAll(() => {
      SomeUi.prototype.render = jest.fn();
      SomeUi.prototype.componentDidUpdate = jest.fn();
    });

    afterAll(() => {
      SomeUi.prototype.render = render;
      SomeUi.prototype.componentDidUpdate = componentDidUpdate;
    });

    it('should call a cleanup function', () => {
      props = { ...props, propFuncOpt: jest.fn() };
      const wrapper = shallow(<SomeUi {...props} />);

      wrapper.unmount();

      expect(props.propFuncOpt).toHaveBeenCalledTimes(1);
    });
  });

  describe('render method', () => {
    const componentDidUpdate = SomeUi.prototype.componentDidUpdate;

    beforeAll(() => {
      SomeUi.prototype.componentDidUpdate = jest.fn();
    });

    afterAll(() => {
      SomeUi.prototype.componentDidUpdate = componentDidUpdate;
    });

    it('should render some content', () => {
      const wrapper = shallow(<SomeUi {...props} />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
