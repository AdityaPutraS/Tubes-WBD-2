import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

export class DataRekening extends Component {

    ws = new WebSocket('ws://localhost:3000/ws');

    constructor(props) {
        super(props);
        this.state = { noRek: "00000000", saldo: 0 }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Grid container spacing={3}>
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
                            <Typography>: Rp. {this.state.saldo},00</Typography>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default DataRekening;