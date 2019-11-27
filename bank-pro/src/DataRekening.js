import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import { getCookie } from './utility';

export class DataRekening extends Component {

    constructor(props) {
        super(props);
        this.state = { nama: "John Doe", noRek: "00000000", saldo: 0 };
    }

    componentWillMount() {
        //Get id user dari backend
        var userId = getCookie("userBankPro");
        var xmlsId = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsb="http://wsbank.wbd.com/"><soapenv:Header/><soapenv:Body><wsb:getId><arg0>' + userId + '</arg0></wsb:getId></soapenv:Body></soapenv:Envelope>';
        axios.post('http://localhost:8080/WebServiceBank/users?wsdl', xmlsId, {
            headers: { 'Content-Type': 'text/xml' }
        }).then((res) => {
            let domPar = new DOMParser();
            let doc = domPar.parseFromString(res.data, "text/xml");
            let id = doc.getElementsByTagName("return")[0].innerHTML;
            var xmlsAkun = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsb="http://wsbank.wbd.com/"><soapenv:Header/><soapenv:Body><wsb:getUserData><arg0>'+id+'</arg0></wsb:getUserData></soapenv:Body></soapenv:Envelope>';
            axios.post('http://localhost:8080/WebServiceBank/users?wsdl', xmlsAkun, {
                headers: { 'Content-Type': 'text/xml' }
            }).then((res) => {
                console.log(res);
                let domPar = new DOMParser();
                let doc = domPar.parseFromString(res.data, "text/xml");
                // console.log(doc);
                let nama = doc.getElementsByTagName("nama")[0].innerHTML;
                let noRekening = doc.getElementsByTagName("noRekening")[0].innerHTML;
                let saldo = doc.getElementsByTagName("saldo")[0].innerHTML;
                this.setState({nama:nama, noRek:noRekening, saldo:saldo});
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Typography>Nama</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>: {this.state.nama}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Nomor Rekening</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>: {this.state.noRek}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Saldo</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>: Rp. {this.state.saldo}</Typography>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default DataRekening;