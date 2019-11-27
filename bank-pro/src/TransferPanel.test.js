import React from "react";
import TransferPanel from "./TransferPanel";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import { createShallow } from '@material-ui/core/test-utils';

describe('<TransferPanel />', () => {
  let shallow;

  beforeAll(() => { 
    shallow = createShallow();
  });

  it("ngecek fungsi radio check", () => {
    const wrapper = shallow(<TransferPanel />);
    expect(wrapper.state('selected')).toBe('');
    wrapper
      .find(Radio)
      .at(0)
      .simulate("change", { target: { selected: true, value: 'rek'} });
    expect(wrapper.state('selected')).toBe('rek');
  });

  it("ngecek fungsi rekening handler", () => {
    const wrapper = shallow(<TransferPanel />);
    expect(wrapper.state('rekening')).toBe('');
    wrapper
      .find(TextField)
      .at(0)
      .simulate("change", { target: { value: '08123'} });
    expect(wrapper.state('rekening')).toBe('08123');
  });

  it("ngecek fungsi jumlah handler", () => {
    const wrapper = shallow(<TransferPanel />);
    expect(wrapper.state('jumlah')).toBe(0);
    wrapper
      .find(TextField)
      .at(1)
      .simulate("change", { target: { value: '18' } });
    expect(wrapper.state('jumlah')).toEqual(18);
  });
});