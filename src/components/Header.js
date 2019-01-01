import React from "react"
import Nav from './Nav'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { navigate } from "gatsby"

const styles = (theme) => ({
  header: {
    marginTop: 15,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 30,
    },
  },
  title: {
    fontFamily: "'Josefin Sans', sans-serif",
    // border: 'solid 1px green',
    textAlign: 'center',
    cursor: 'pointer',
  },
  p: {
    fontSize: '74px',
    margin: '32px 0px 15px 0px'
  },
  subTitle: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontWeight: 600,
    textAlign: 'center',
    color: '#686868',
    fontSize: '12px'
  },
  itemNav: {
    marginTop: 36,
    [theme.breakpoints.only('xs')]: {
      marginTop: 0
    },
  }
})

const Header = ({classes}) => {
  return (
    <Grid container component='header' className={classes.header} direction='column' alignItems='stretch'>
      <Grid item className={classes.title} onClick={ () => navigate("/")}>
        <p className={classes.p}>
          Coding
        </p>
      </Grid>
      <Grid item component='span' className={classes.subTitle}>
        Some ideas about writing code, since 2003
      </Grid>
      <Grid item className={classes.itemNav}>
        <Nav />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Header)
