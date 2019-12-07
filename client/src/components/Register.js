import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlinedIcon from '@material-ui/icons/Lock';
import Email from '@material-ui/icons/Email';
import Password from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// generate style attributes
const useStyles = makeStyles(theme => ({
  // style for current page
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // style for icon
  icon: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  // style for email&password input form
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  grid: {
    padding: theme.spacing(1),
  },
  // style for sign in button
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

// function to check login
const login = function(e, email, password) {
  e.preventDefault();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  if (email === undefined || password === undefined) {
    window.alert("Please provide valid email or password");
  } else if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    fetch(proxyUrl+'https://project3b-kam455.glitch.me/api/brand/microsoft', {
      method: 'GET',
      // body: JSON.stringify({'email': email, 'password': password}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  } else {
    window.alert('invalid email');
  }
}

// Register component
class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  handleChangeEmail(event) { this.setState({email: event.target.value}); }
  handleChangePassword(event) { this.setState({password: event.target.value}); }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.icon}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <form className={this.props.classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              type='email'
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
              }}
              type="password"
              autoComplete="current-password"
            />
            <Grid container>
              <Grid item xs className={this.props.classes.grid}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                  onClick={(e) => {login(e, this.state.email, this.state.password)}}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs className={this.props.classes.grid}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={this.props.classes.submit}
                  onClick={(e) => { e.preventDefault(); window.alert(this.state.password); }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default function Hook() {
  const classes = useStyles();
  return <Register classes={classes}>Hook</Register>;
}