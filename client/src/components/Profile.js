import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

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
  }
}));


class Profile extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        reviews: [],
    }
  }

  componentDidMount(){
    fetch("https://web-final-demo.azurewebsites.net/api/user/profile", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    })
    .then(res => res.json())
    .then(res => res.reviews)
    .then(reviews => this.setState({reviews: reviews}))
  }

  render(){
    if (localStorage.getItem('is_login') === null){
      return (<Redirect to='/login'></Redirect>)
    }else{
      return (
        <div className={this.props.classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h2' className={this.props.classes.profileHead}>
                Welcome, {this.state.name}
              </Typography>
              <Divider variant="middle" />
            </Grid>
            {/* user avatar */}
            <Grid item xs={4}>
              <Paper className={this.props.classes.profileContent}>
                <Avatar alt="User Avatar" variant="circle" className={this.props.classes.userInfo}>
                  <AccountCircle className={this.props.classes.userInfo}/>
                </Avatar>
              </Paper>
            </Grid>
            {/* user information */}
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
            {/* user reviews */}
            <Grid item xs={12}>
              <Typography variant='h5' >
                Reviews
              </Typography>
              <List className={this.props.classes.root}>
                {this.state.reviews.map(review => {
                  return (
                    <div key={review.movie_id}>
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
                      {/* uncomment it to allow user to delete movie review */}
                      {/* <ListItemSecondaryAction key='button'>
                        <IconButton onClick={(e) => {e.preventDefault(); this.deleteReview(id)}} edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </div>
                  )
                })}
                </List>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

export default function Hook(props) {
  const classes = useStyles();
  return <Profile classes={classes} routerProps={props}>Hook</Profile>;
}