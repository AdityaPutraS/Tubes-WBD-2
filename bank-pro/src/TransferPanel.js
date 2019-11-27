import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

const useStyles = makeStyles(theme => ({
  buttonBack: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(9.5),
  },
}));

function SuccessModal() {
  const classes = useStyles();
  const clicked = (event) => {
    document.getElementById('success').style.display='none';
  }
  return (
    <div id="success" className="modal">
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
    document.getElementById('failed').style.display='none';
  }
  return (
    <div id="failed" className="modal">
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
    this.setState({selected: event.target.value});
  }
  rekeningHandler = (event) => {
    this.setState({rekening: event.target.value});
  }
  jumlahHandler = (event) => {
    this.setState({jumlah: parseInt(event.target.value, 10)});
  }
  transferClicked = (event) => {
    document.getElementById('success').style.display='block';
    this.setState({selected: "", rekening: "", jumlah: 0})
    /*var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8888/ws/users', true);

    // build SOAP request
    var sr = 
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mav="http://mavenproject1.mycompany.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
        '<mav:findUser>' +
            '<arg0>'+ this.state.rekening+'</arg0>' +
        '</mav:findUser>' +
      '</soapenv:Body>' +
    '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
              alert(xmlhttp.responseText);
              // alert('done. use firebug/console to see network response');
          }
      }
    }

    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');
    xmlhttp.send(sr);*/

  }

  validateNumber(x){
    var num = "";
    if (Number.isNaN(x) || x===0){
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
        <SuccessModal/>
        <FailedModal/>
      </div>
    );
  }
}

export default TransferPanel;
