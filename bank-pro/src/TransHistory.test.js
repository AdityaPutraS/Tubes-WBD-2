import React from "react";
import ReactDOM from 'react-dom';
import TransHistory from "./TransHistory";

it('transaction history renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransHistory />, div);
    ReactDOM.unmountComponentAtNode(div);
});