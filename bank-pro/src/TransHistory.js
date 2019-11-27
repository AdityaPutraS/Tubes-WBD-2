import React, { Component } from 'react'
import TransHistoryItem from './TransHistoryItem';
import './temp.css';

export class TransHistory extends Component {
    render() {
        return <div>
            <TransHistoryItem />
            <TransHistoryItem />
            <TransHistoryItem />
        </div>
    }
}

export default TransHistory;
