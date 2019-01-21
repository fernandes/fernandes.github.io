import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
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

class MessageForm extends React.Component {
  state = {
    name: '',
    email: '',
    mailing: false,
    body: '',
    snackbarOpen: false,
    nameError: false,
    emailError: false,
    bodyError: false,
    mailSubscribed: false,
    submitted: false
  }

  componentDidMount() {
    const mailing = localStorage.getItem('mailing')
    const newState = {}
    if (mailing === 'true') {
      newState['mailSubscribed'] = true
      const mailingName = localStorage.getItem('name')
      const mailingEmail = localStorage.getItem('email')
      newState['name'] = mailingName
      newState['email'] = mailingEmail
      this.setState(newState)
    }
  }

  handleCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

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

  sendMessage = () => {
    axios({
      method: 'post',
      url: `${process.env.API_URL}/v1/messages`,
      data: {
        name: this.state.name,
        email: this.state.email,
        mailing: this.state.mailing,
        body: this.state.body
      }
    });
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleSubmit = (e) => {
    // localStorage.setItem('name', this.state.name)
    // localStorage.setItem('email', this.state.email)
    // localStorage.setItem('mailing', true)
    e.preventDefault()
    const newState = {}
    if (this.state.name === '') {
      newState['nameError'] = true
    }
    if (this.state.email === '') {
      newState['emailError'] = true
    }
    if (this.state.body === '') {
      newState['bodyError'] = true
    }
    if (newState['nameError'] || newState['mailError'] || newState['bodyError']) {
      this.setState(newState)
    } else {
      this.sendMessage()
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
          <h4>Thank you for your message</h4>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message='Message Sent! :)'
          handleClose={this.handleSnackbarClose}
          undo={false}
        />
      </>
    )
  }

  messageForm = () => {
    const { classes } = this.props
    const {
      name,
      email,
      mailing,
      body,
      nameError,
      emailError,
      bodyError,
      mailSubscribed
    } = this.state

    let mailingCheckbox
    if (mailSubscribed) {
      mailingCheckbox = <p>You are already subscribed, thank you!</p>
    } else {
      mailingCheckbox = <FormControlLabel
                          control={
                            <Checkbox
                              checked={mailing}
                              onChange={this.handleCheckbox('mailing')}
                              color="primary"
                              value="checkedA"
                            />
                          }
                          label="Subscribe to Mailing List"
                        />
    }

    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <TextField
          id="message_name"
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
          id="message_email"
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
        {mailingCheckbox}
        <TextField
          id="message_body"
          label="Message"
          className={classes.textField}
          name="body"
          margin="dense"
          variant="outlined"
          value={body}
          error={bodyError}
          multiline
          rows="4"
          helperText={bodyError && 'Please, tell me something'}
          onBlur={() => this.handleBlur('body')}
          onChange={(e) => this.handleChange('body', e.target.value)}
        />
        <Button variant="contained" color="primary" type='submit' value='Submit'>
          Send!
        </Button>
      </form>
    )
  }

  isSubmitted = () => {
    const { submitted } = this.state
    if (submitted === true) {
      return this.thankYou()
    } else {
      return this.messageForm()
    }
  }

  render() {
    return this.isSubmitted();
  }
}

export default withStyles(styles)(MessageForm)
