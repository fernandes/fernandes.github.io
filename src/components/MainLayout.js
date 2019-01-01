import React from "react"
import Header from './Header'
import Footer from './Footer'
import Drawer from './Drawer'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    padding: '0px 80px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 15px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0px 30px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0px 80px'
    },
  },
})

const MainLayout = ({children, classes}) => {
  return (
    <>
      <Grid container className={classes.root} direction='row'>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
      <Drawer />
    </>
  )
}

export default withStyles(styles)(MainLayout)
