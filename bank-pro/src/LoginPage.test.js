import React from "react";
import LoginPage from "./LoginPage";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { createShallow } from '@material-ui/core/test-utils';

// describe('<LoginPage />', () => {
//   let shallow;

//   beforeAll(() => { 
//     shallow = createShallow();
//   });

//   it("ngecek fungsi rekening handler", () => {
//     const wrapper = shallow(<LoginPage />);
//     expect(wrapper.dive().state('rekening')).toBe('');
//     let coba;
//     beforeAll(() => { 
//       coba = createShallow({untilSelector: 'TextField'});
//     });
//     const coba1 = shallow(<Box/>);
//     coba1
//     .find(TextField)
//     .at(0)
//     .simulate("change", { target: { value: '08123'} });
//     expect(wrapper.dive().state('rekening')).toEqual('08123');
//   });
// });