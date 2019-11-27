import React from "react";
import ReactDOM from 'react-dom';
import TransHistoryItem from "./TransHistoryItem";

it('transaction history item renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransHistoryItem />, div);
    ReactDOM.unmountComponentAtNode(div);
});