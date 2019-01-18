import React from "react"
import Header from './Header'
import Footer from './Footer'
import Drawer from './Drawer'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Helmet } from "react-helmet"

const styles = theme => ({
  centerContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    maxWidth: 800,
    [theme.breakpoints.down('xs')]: {
      padding: '0px 15px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0px 30px'
    },
  },
})

const MainLayout = ({children, classes}) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Coding</title>
        <link rel="canonical" href="https://coding.com.br" />
        <meta name="description" content="Being in love with Linux since 1998, Ruby/Rails since 2010 and React/ES6 since 2016, this is the space where I have some articles about these technologies" />
      </Helmet>
      <Grid container className={classes.centerContainer} direction='row'>
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
      </Grid>
    </>
  )
}

export default withStyles(styles)(MainLayout)
