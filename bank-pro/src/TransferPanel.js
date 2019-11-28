import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import axios from 'axios';
import { getCookie } from './utility';
import TransHistory from './TransHistory';

const useStyles = makeStyles(theme => ({
  buttonBack: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(9.5),
  },
}));

function SuccessModal() {
  const classes = useStyles();
  const clicked = (event) => {
    document.getElementById('success').style.display = 'none';
  }
  return (
    <div id="success" className="modal" style={{display: 'none'}}>
      <div className="modal-content">
        <p className="judul">TRANSAKSI SUKSES!</p>
        <p className="content">Cek transaksi pada halaman riwayat</p>
        <Button className={classes.buttonBack} onClick={clicked} variant="contained" color="secondary">Kembali</Button>
      </div>
    </div>
  );
}

function FailedModal() {
  const classes = useStyles();
  const clicked = (event) => {
    document.getElementById('failed').style.display = 'none';
  }
  return (
    <div id="failed" className="modal" style={{display: 'none'}}>
      <div className="modal-content">
        <p className="judul">TRANSAKSI GAGAL!</p>
        <p className="content">Terjadi kesalahan. Silahkan coba kembali.</p>
        <Button className={classes.buttonBack} onClick={clicked} variant="contained" color="secondary">Kembali</Button>
      </div>
    </div>
  );
}

class TransferPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      rekening: "",
      jumlah: 0,
    };
  }
  radioCheck = (event) => {
    this.setState({ selected: event.target.value });
  }
  rekeningHandler = (event) => {
    this.setState({ rekening: event.target.value });
  }
  jumlahHandler = (event) => {
    this.setState({ jumlah: parseInt(event.target.value, 10) });
  }
  transferClicked = (event) => {
    document.getElementById('success').style.display = 'block';
    this.setState({ selected: "", rekening: "", jumlah: 0 })
    var userId = getCookie("userBankPro");
    var xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsb="http://wsbank.wbd.com/"><soapenv:Header/><soapenv:Body><wsb:transfer><arg0>' + userId + '</arg0><arg1>' + this.state.rekening + '</arg1><arg2>' + this.state.jumlah + '</arg2></wsb:transfer></soapenv:Body></soapenv:Envelope>';
    // console.log(xmls);
    axios.post('http://localhost:8080/WebServiceBank/transfer?wsdl', xmls, {
      headers: { 'Content-Type': 'text/xml' }
    }).then((res) => {
      let domPar = new DOMParser();
      let doc = domPar.parseFromString(res.data, "text/xml");
      let riwayat = doc.getElementsByTagName("return")[0].innerHTML;
      if (riwayat === "true") {
        document.getElementById('success').style.display = 'block';
        ReactDOM.render(<TransHistory/>, document.getElementById("transferHistory"));
      } else {
        document.getElementById('failed').style.display = 'block';
      }
    });
  }

  validateNumber(x) {
    var num = "";
    if (Number.isNaN(x) || x === 0) {
      num = "";
    } else {
      num = x;
    }
    return num;
  }
  render() {
    var jumlah = this.validateNumber(this.state.jumlah);
    return (
      <div className="transfer-panel">
        <div id="modal">
          <SuccessModal/>
          <FailedModal/>
        </div>
        <Radio
          checked={this.state.selected === 'rek'}
          onChange={this.radioCheck}
          value="rek"
        />
        <span>Rekening Lain</span>
        <Radio
          checked={this.state.selected === 'virtual'}
          onChange={this.radioCheck}
          value="virtual"
        />
        <span>Akun Virtual</span>
        <form className="transfer-form" noValidate autoComplete="off">
          <div>
            <TextField
              label="Nomor Rekening"
              className="text-field"
              margin="normal"
              onChange={this.rekeningHandler}
              value={this.state.rekening}
            />
          </div>
          <div>
            <TextField
              label="Jumlah"
              className="text-field"
              margin="normal"
              onChange={this.jumlahHandler}
              value={jumlah}
            />
          </div>
          <div className="button">
            <Button variant="contained" color="secondary" onClick={this.transferClicked}>
              Transfer
            </Button>
          </div>
        </form>
        <SuccessModal />
        <FailedModal />
      </div>
    );
  }
}

export default TransferPanel;
