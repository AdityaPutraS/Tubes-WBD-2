import React, { Component } from 'react'
import TransHistoryItem from './TransHistoryItem';
import './temp.css';

export class TransHistory extends Component {

    componentWillMount() {
        var userId = getCookie("userBankPro");
        var xmlsId = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsb="http://wsbank.wbd.com/"><soapenv:Header/><soapenv:Body><wsb:getId><arg0>' + userId + '</arg0></wsb:getId></soapenv:Body></soapenv:Envelope>';
        axios.post('http://localhost:8080/WebServiceBank/users?wsdl', xmlsId, {
            headers: { 'Content-Type': 'text/xml' }
        }).then((res) => {
            let domPar = new DOMParser();
            let doc = domPar.parseFromString(res.data, "text/xml");
            let id = doc.getElementsByTagName("return")[0].innerHTML;
            //Get trans history
            var xmlsHistory = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsb="http://wsbank.wbd.com/"><soapenv:Header/><soapenv:Body><wsb:getTransactionHistory><arg0>'+id+'</arg0></wsb:getTransactionHistory></soapenv:Body></soapenv:Envelope>';
            axios.post('http://localhost:8080/WebServiceBank/users?wsdl', xmlsHistory, {
                headers: { 'Content-Type': 'text/xml' }
            }).then((res) => {
                // console.log(res);
                let domPar = new DOMParser();
                let doc = domPar.parseFromString(res.data, "text/xml");
                console.log(doc);
            })
        })
    }

    render() {
        return <div id="listTransaksi">
            <TransHistoryItem />
            <TransHistoryItem />
            <TransHistoryItem />
        </div>
    }
}

export default TransHistory;
