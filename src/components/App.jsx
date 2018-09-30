import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, Button, LinearProgress, Chip } from '@material-ui/core';

const styles = {
  button: {
    margin: '10px 5px 10px 0px'
  },
  chip: {
    margin: '5px 15px'
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      estado: 0,
      text: 'Presione iniciar para encender la mesaXY'
    };
    this.cancel = this.cancel.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    this.algo = 'soy io xd';
    console.log('didmount');

    this.intervalo = setInterval(() =>
      fetch('https://mesaxy.herokuapp.com/state', {
        credentials: 'same-origin'
      })
        .then(res => res.json())
        .then(json => { this.setState({ estado: json.state, readState: false }); console.log('Intervalo aplicado'); })
        .catch(err => console.log(`Error en fetch: ${err}`))
    , 2000);
  }

  cancel() {
    fetch('https://mesaxy.herokuapp.com/cancel', {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(json => {
        console.log(`cancelar: ${json.ok}`);
        this.setState({
          text: 'Operación cancelada',
          readState: false
        });
      })
      .catch(err => console.log(`Error en fetch: ${err}`));
  }

  start() {
    fetch('https://mesaxy.herokuapp.com/start', {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(json => {
        console.log(`Iniciar: ${json.ok}`);
        this.setState({
          text: 'En ejecución',
          readState: true
        });
      })
      .catch(err => console.log(`Error en fetch: ${err}`));
  }

  stop() {
    fetch('https://mesaxy.herokuapp.com/stop', {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(json => {
        console.log(`Parar: ${json.ok}`);
        this.setState({
          text: 'En pausa',
          readState: false
        });
      })
      .catch(err => console.log(`Error en fetch: ${err}`));
  }


  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Visualizador Mesa XY - UAO
            </Typography>
          </Toolbar>
        </AppBar>
          <div className="Mesaxy-container">
            <Card>
              <CardContent style={{ position: 'relative' }}>
                {!this.state.estado && <LinearProgress style={{ position: 'absolute', left: '0', top: '0', width: '100%' }} variant="query" />}
                <Typography variant="title" style={{ display: 'inline-block' }}>
                  Estado Actual
                </Typography>
                <Chip
                  label={this.state.estado === 0 ? '(Cargando...)' : this.state.estado}
                  style={styles.chip}
                />
                <Typography variant="caption" color="inherit">
                  {this.state.text}
                </Typography>
                <Button onClick={this.start} className="Mesaxy-btn" disabled={this.state.estado === 0} variant="outlined" color="primary" style={styles.button}>
                  Iniciar
                </Button>
                <Button onClick={this.stop} className="Mesaxy-btn" disabled={this.state.estado === 0} variant="outlined" color="primary" style={styles.button}>
                  Parar
                </Button>
                <Button onClick={this.cancel} className="Mesaxy-btn" disabled={this.state.estado === 0} variant="outlined" color="secondary" style={styles.button}>
                  cancelar
                </Button>
                <br />
                <svg version="1.1" id="Capa_1" width="250px" height="250px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" style={{ enableBackground: 'new 0 0 800 800' }} xmlSpace="preserve">
                  <polyline className={`st0 estado${this.state.estado}`} points="400.5,32.5 400.5,782.5 32.5,398.5 400.5,32.5 766.5,400.5 32.5,398.5 400.5,782.5 766.5,400.5 " />
                </svg>
              </CardContent>
            </Card>
          </div>
      </React.Fragment>
    );
  }
}

export default App;
