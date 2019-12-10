import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profileHead: {
    height: theme.spacing(20),
    position: 'relative',
    margin: theme.spacing(8, 5, -2, 5),
  },
  profileContent: {
    padding: theme.spacing(3, 2),
    height: theme.spacing(20),
  },
  userInfo: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    textAlign: 'center',
    display: 'inline-block',
    align: 'center',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }
}));


class Profile extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        name: window.sessionStorage.getItem('name'),
        email: window.sessionStorage.getItem('email'),
        reviews: [],
    }
    this.showWelcome = this.showWelcome.bind(this);
    this.showUserAvatar = this.showUserAvatar.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.showReviews = this.showReviews.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  showWelcome(){
    return (
      <Grid item xs={12}>
        <Typography variant='h2' className={this.props.classes.profileHead}>
          Welcome, {this.state.name}
        </Typography>
        <Divider variant="middle" />
      </Grid>
    )
  }

  showUserAvatar(){
    return (
      <Grid item xs={4}>
        <Paper className={this.props.classes.profileContent}>
          <Avatar alt="User Avatar" variant="circle" className={this.props.classes.userInfo}>
            <AccountCircleIcon className={this.props.classes.userInfo}/>
          </Avatar>
        </Paper>
      </Grid>
    )
  }

  showUserInfo(){
    return (
      <Grid item xs={8}>
        <Paper className={this.props.classes.profileContent}>
          <List>
            <ListItem>
              <ListItemText primary="Name" secondary={this.state.name} />
            </ListItem>
            <Divider variant='middle'/>
            <ListItem>
              <ListItemText primary="Email" secondary={this.state.email} />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    )
  }

  showReviews(){
    return (
      <Grid item xs={12}>
        <Typography variant='h5' >
          Reviews
        </Typography>
        <List className={this.props.classes.root}>
          {this.state.reviews.map(review => {
            return (
              <div key={review._id}>
                <ListItem alignItems="flex-start">
                <ListItemText
                  primary={review.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='button'
                        className={this.props.classes.block}
                        color='textPrimary'
                      >
                      {review.userName}
                      </Typography>
                      {review.content}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction key='button'>
                  <IconButton onClick={(e) => {e.preventDefault(); this.deleteReview(review._id)}} edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              </div>
            )
          })}
          </List>
      </Grid>
    )
  }

  deleteReview(review_id){
    fetch('https://web-final-demo.azurewebsites.net/api/movie/' + review_id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      })
    })
    .then(res => res.json())
    .then(res => window.alert(res.message))
    .then(res => window.location.reload(true))
  }

  componentDidMount(){
    fetch("https://web-final-demo.azurewebsites.net/api/user/profile", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      })
    })
    .then(res => res.json())
    .then(res => res.reviews)
    .then(reviews => this.setState({reviews: reviews}))
  }

  render(){
    if (window.sessionStorage.getItem('is_login') === null){
      return (<Redirect to='/login'></Redirect>)
    }else{
      return (
        <div className={this.props.classes.root}>
          <Grid container spacing={3}>
            {/* welcome user */}
            {this.showWelcome()}
            {/* user avatar */}
            {this.showUserAvatar()}
            {/* user information */}
            {this.showUserInfo()}
            {/* user reviews */}
            {this.showReviews()}
          </Grid>
        </div>
      );
    }
  }
}

// use Hook to wrap styles classes with Profile component
export default function Hook(props) {
  const classes = useStyles();
  return <Profile classes={classes} routerProps={props}>Hook</Profile>;
}