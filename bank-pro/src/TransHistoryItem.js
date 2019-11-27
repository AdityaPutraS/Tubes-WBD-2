import React, { Component } from 'react'
import './temp.css';


export class TransHistoryItem extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="box">
                {/* <span>13517025</span>
                <span>20000</span>
                <span>debit</span>
                <span>23/11/19</span> */}
                <span>{this.props.tujuan}</span>
                <span>{this.props.jumlah}</span>
                <span>{this.props.tipe}</span>
                <span>{this.props.tanggal}</span>
            </div>
        )
    }
}

export default TransHistoryItem;
