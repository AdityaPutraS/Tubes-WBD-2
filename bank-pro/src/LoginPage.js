import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import  { Redirect } from 'react-router-dom'
import './App.css';

const styles = theme => ({
  card: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginTop: 135,
    marginBottom: 100,
    width: 350,
    textAlign: 'center',
    padding: 20,
    borderRadius: 10,
  },
  content: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 300,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    width: 250,
  },
  text_field: {
    width: 250,
  },  
});

const useStyles = makeStyles(theme => ({
  buttonBack: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(9.5),
  },
}));

function FailedLogin() {
  const classes = useStyles();
  const clicked = (event) => {
    document.getElementById('failed-login').style.display='none';
  }
  return (
    <div id="failed-login" className="modal">
      <div className="modal-content">
          <p className="judul">LOGIN GAGAL!</p>
          <p className="content">Terjadi kesalahan. Silahkan coba kembali.</p>
          <Button className={classes.buttonBack} onClick={clicked} variant="contained" color="secondary">Kembali</Button>
      </div>
    </div>
  );
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
    this.state = { 
      rekening: "",
      navigate: false,
    };
  }

  rekeningHandler = (event) => {
    this.setState({rekening: event.target.value});
  }

  checkLogin(){
    //CHECK DARI WS BANK
    this.setState({navigate: true});
    //KALO GA KELUARIN MODAL
    //document.getElementById('failed-login').style.display='block';
  }

  render() { 
    if (this.state.navigate) {
      return (<Redirect to='/Home' />);
    } else {
      const { classes } = this.props;
      return (
        <div>
          <div className="login">
            <Box className={classes.card} boxShadow={10}>
              <h1>Bank Pro</h1>
              <CardContent className={classes.content}>
                <TextField
                  label="Nomor Rekening"
                  className={classes.text_field}
                  margin="normal"
                  onChange={this.rekeningHandler}
                  value={this.state.rekening}
                />
                <div>
                  <Button variant="contained" color="secondary" className={classes.button} onClick={this.checkLogin}>
                    Login
                  </Button>
                </div>
              </CardContent>
            </Box>
          </div>
          <FailedLogin />  
        </div>
      );
    }
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);