import React from "react";
import ReactDOM from 'react-dom';
import DataRekening from "./DataRekening";

it('data rekening renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataRekening />, div);
    ReactDOM.unmountComponentAtNode(div);
});