import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from './Snackbar'
import axios from 'axios'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
  },
})

class MailingForm extends React.Component {
  state = {
    name: '',
    email: '',
    form: {},
    snackbarOpen: false,
    snackbarUndo: false,
    nameError: false,
    emailError: false,
    submitted: false
  }

  handleChange = (field, value) => {
    const newState = {}
    newState[field] = value
    newState[`${field}Error`] = false
    this.setState(newState)
  }

  handleBlur = (field) => {
    if (this.state[field] === '') {
      const newState = {}
      newState[`${field}Error`] = true
      this.setState(newState)
    }
  }

  componentDidMount() {
    const mailing = localStorage.getItem('mailing')
    if (mailing === 'true') {
      this.setState({submitted: true})
    }
  }

  subscriptionStatus = (status) => {
    axios({
      method: 'post',
      url: `${process.env.API_URL}/api/v1/subscriptions`,
      data: {
        name: this.state.name,
        email: this.state.email,
        status: status
      }
    });
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } else if (reason === 'undo') {
      this.subscriptionStatus('undo')
      localStorage.setItem('mailing', false)
      this.setState({
        snackbarOpen: false,
        snackbarUndo: true,
        submitted: false
      });
    } else {
      this.subscriptionStatus('confirmed')
      localStorage.setItem('mailing', true)
      this.setState({
        name: '',
        email: '',
        snackbarOpen: false,
        snackbarUndo: false,
        submitted: true
      });
    }
  };

  handleSnackbarUndoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } else if (reason === 'undo') {
      this.subscriptionStatus('redo')
      localStorage.setItem('mailing', true)
      this.setState({
        submitted: true,
        snackbarOpen: true,
        snackbarUndo: false
      });
    } else {
      this.subscriptionStatus('cancelled')
      localStorage.setItem('mailing', false)
      this.setState({ snackbarUndo: false, submitted: false });
    }
  };

  handleSubmit = (e) => {
    localStorage.setItem('name', this.state.name)
    localStorage.setItem('email', this.state.email)
    localStorage.setItem('mailing', true)
    e.preventDefault()
    const newState = {}
    if (this.state.name === '') {
      newState['nameError'] = true
    }
    if (this.state.email === '') {
      newState['emailError'] = true
    }
    if (newState['nameError'] || newState['mailError']) {
      this.setState(newState)
    } else {
      this.subscriptionStatus('subscribed')
      this.setState({
        snackbarOpen: true,
        submitted: true
      });
    }
  }

  thankYou = () => {
    return (
      <>
        <div display='flex' style={{textAlign: 'center'}}>
          <h4>Thank you for subscribing</h4>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message='Thank you for subscribing! :)'
          handleClose={this.handleSnackbarClose}
          undo={true}
        />
      </>
    )
  }

  mailingForm = () => {
    const { classes } = this.props
    const {
      name,
      email,
      nameError,
      emailError
    } = this.state

    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <TextField
          id="mailing_name"
          label="Name"
          className={classes.textField}
          type="name"
          name="name"
          autoComplete="name"
          margin="dense"
          variant="outlined"
          value={name}
          error={nameError}
          helperText={nameError && 'Please, tell me your name'}
          onBlur={() => this.handleBlur('name')}
          onChange={(e) => this.handleChange('name', e.target.value)}
        />
        <TextField
          id="mailing_email"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="dense"
          variant="outlined"
          value={email}
          error={emailError}
          helperText={emailError && 'Please, tell me your e-mail'}
          onBlur={() => this.handleBlur('email')}
          onChange={(e) => this.handleChange('email', e.target.value)}
        />
        <Button variant="contained" color="primary" type='submit' value='Submit'>
          Subscribe
        </Button>
        <Snackbar
          open={this.state.snackbarUndo}
          message='Sad you gave up! :('
          undoMessage='REDO'
          undo={true}
          handleClose={this.handleSnackbarUndoClose}
        />
      </form>
    )
  }

  isSubmitted = () => {
    const { submitted } = this.state
    if (submitted === true) {
      return this.thankYou()
    } else {
      return this.mailingForm()
    }
  }

  render() {
    return this.isSubmitted();
  }
}

export default withStyles(styles)(MailingForm)
