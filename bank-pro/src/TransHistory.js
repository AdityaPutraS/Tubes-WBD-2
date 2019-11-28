import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransHistoryItem from './TransHistoryItem';
import './temp.css';
import axios from 'axios';
import { getCookie } from './utility';

export class TransHistory extends Component {

    componentDidMount() {
        var userId = getCookie("userBankPro");
        var xmlsId = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsb="http://wsbank.wbd.com/"> <soapenv:Header/><soapenv:Body><wsb:getTransactionHistory><arg0>'+userId+'</arg0></wsb:getTransactionHistory></soapenv:Body></soapenv:Envelope>';
        axios.post('http://localhost:8080/WebServiceBank/users?wsdl', xmlsId, {
            headers: { 'Content-Type': 'text/xml' }
        }).then((res) => {
            let domPar = new DOMParser();
            let doc = domPar.parseFromString(res.data, "text/xml");
            let riwayat = doc.getElementsByTagName("riwayatTransaksi");
            let arr = [];
            for (let i = 0; i < riwayat.length; i++) {
                const r = riwayat[i];
                let penerima = r.getElementsByTagName("penerima")[0].innerHTML;
                // let pengirim = r.getElementsByTagName("pengirim")[0].innerHTML;
                let jumlah = r.getElementsByTagName("jumlah")[0].innerHTML;
                let waktu = r.getElementsByTagName("waktu")[0].innerHTML;
                let jenis = r.getElementsByTagName("jenis")[0].innerHTML;
                arr.push(<TransHistoryItem tujuan={penerima} tipe={jenis} jumlah={jumlah} tanggal={waktu}/>);
            }
            ReactDOM.render(arr, document.getElementById("listTransaksi"));
        })
    }

    render() {
        return <div id="listTransaksi">
        </div>
    }
}

export default TransHistory;
