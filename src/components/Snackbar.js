import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class SimpleSnackbar extends React.Component {
  render() {
    const { classes, open, message, handleClose, undoMessage, undo } = this.props;
    const actionsArray = []
    if (undo) {
      actionsArray.push(
        <Button key="undo" color="secondary" size="small" onClick={(e) => handleClose(e, 'undo')}>
          {undoMessage}
        </Button>
      )
    }
    actionsArray.push(
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={(e) => handleClose(e, 'close')}
      >
        <CloseIcon />
      </IconButton>
    )

    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={actionsArray}
        />
    );
  }
}

SimpleSnackbar.defaultProps = {
  undoMessage: 'UNDO',
  undo: false
};

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  undo: PropTypes.bool,
  undoMessage: PropTypes.string,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(SimpleSnackbar)