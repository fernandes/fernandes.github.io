import React from "react"
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from "gatsby"

const styles = theme => ({
  nav: {
    borderBottom: 'solid 1px #D6D5D5',
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    },
  },
  ul: {
    padding: 0,
    listStyleType: 'none',
  },
  li: {
    textTransform: 'uppercase',
    flex: '1 1 auto',
    textAlign: 'center',
    fontFamily: "arial, sans-serif",
    fontWeight: 'bold',
    '&:hover': {
      color: 'rgba(0, 0, 0, 1)'
    },
    '& a': {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.78)',
    }
  }
})

const NavLink = ({to, label}) => (
  <Link
    to={to}
    activeStyle={{
      textDecoration: 'none',
      color: "#1A237E",
    }}
  >
    {label}
  </Link>
)
const Nav = ({classes}) => {
  return (
    <Grid container component='nav' className={classes.nav} direction='row'>
      <Grid item xs={12}>
        <Grid container component='ul' className={classes.ul}>
          <Grid item component='li' key='home' className={classes.li}><NavLink to="/" label="home" /></Grid>
          <Grid item component='li' key='articles' className={classes.li}><NavLink to="/articles" label="articles" /></Grid>
          <Grid item component='li' key='talks' className={classes.li}><NavLink to="/talks" label="talks" /></Grid>
          <Grid item component='li' key='about' className={classes.li}><NavLink to="/about" label="about" /></Grid>
          <Grid item component='li' key='contact' className={classes.li}><NavLink to="/contact" label="contact" /></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Nav)
