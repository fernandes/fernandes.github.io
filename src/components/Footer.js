import React from "react"
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import gravatar from '../images/gravatar.jpg'
import classNames from 'classnames'
import logo from '../images/logo.jpg'
import Hidden from '@material-ui/core/Hidden'
import {
  GithubCircle
} from 'mdi-material-ui'

import { Link } from "gatsby"

const styles = theme => ({
  footer: {
    borderTop: 'solid 1px #D6D5D5',
    margin: '30px 0px 30px 0px',
    paddingTop: 20
  },
  footerRow: {
    marginBottom: 0,
    [theme.breakpoints.down('md')]: {
      marginBottom: 0
    },
  },
  footerLinks: {
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'black',
    marginTop: 12,
    '&:hover': {
      fontWeight: 'bold',
    }
  },
  footerLinkFirst: {
    marginTop: 16
  },
  footerItemSmall: {
    textAlign: 'center',
    marginTop: 10,
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
  },
  aboutTitle: {
    
  },
  mailxingBox: {
    [theme.breakpoints.up('md')]: {
      padding: '0px 15px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0px 30px',
    },
  },
  aboutBox: {
    padding: '0px 20px 10px 0px',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row'
    },
  },
  aboutDescription: {
    [theme.breakpoints.down('sm')]: {
      order: 1
    },
  },
  aboutAvatar: {
    
  },
  aboutH3: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
  },
  linksTitleSmall: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
  },
  mailingTitle: {
    textAlign: 'center'
  },
  mailingMessage: {
    textAlign: 'center'
  },
  copyright: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10
    },
  },
  logo: {
    textAlign: 'center',
    opacity: 0.7
  },
  github: {
    textAlign: 'right',
    opacity: 0.5,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 10
    },
  },
  lastRowContainer: {
    marginTop: 15,
    [theme.breakpoints.down('sm')]: {
      marginTop: 30
    },
  },
})

const NavLink = ({to, label, className}) => (
  <Link
    to={to}
    activeStyle={{
      // textDecoration: 'none',
      color: "#1A237E",
    }}
    className={className}
  >
    {label}
  </Link>
)

const Footer = ({classes}) => {
  return (
    <Grid container component='footer' className={classes.footer} direction='row'>
      <Grid item xs={12} className={classes.footerRow}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Grid container className={classes.aboutBox}>
              <Grid item xs={12} className={classes.aboutTitle}>
                <h3 className={classes.aboutH3}>About</h3>
              </Grid>
              <Grid item className={classes.aboutDescription}>
                <p>This is my personal space where I take notes about tech/programming things. Being in love with <strong>Linux</strong> since 1998, <strong>Ruby/Rails</strong> since 2010 and <strong>React/ES6</strong> since 2016 you have some idea what you'll find here.</p>
              </Grid>
              <Grid item className={classes.aboutAvatar}>
                <Avatar alt="Celso Fernandes" src={gravatar} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container className={classes.mailingBox} direction='column' alignItems='stretch'>
              <h3 className={classes.mailingTitle}>Mailing</h3>
              <TextField
                id="mailing_name"
                label="Name"
                className={classes.textField}
                type="name"
                name="name"
                autoComplete="name"
                margin="dense"
                variant="outlined"
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
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
              <p className={classes.mailingMessage}><Link to="/respect#mailing-list">Why a mailing list?</Link></p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Hidden mdUp>
              <h3 className={classes.linksTitleSmall}>Links</h3>
              <Grid container direction='row' justifyItems='center'>
                <Grid item xs={4} className={classes.footerItemSmall}><NavLink to="/articles" label="articles" className={classes.footerLinks} /></Grid>
                <Grid item xs={4} className={classes.footerItemSmall}><NavLink to="/talks" label="talks" className={classes.footerLinks} /></Grid>
                <Grid item xs={4} className={classes.footerItemSmall}><NavLink to="/about" label="about" className={classes.footerLinks} /></Grid>
                <Grid item xs={4} className={classes.footerItemSmall}><NavLink to="/contact" label="contact" className={classes.footerLinks} /></Grid>
                <Grid item xs={4} className={classes.footerItemSmall}><NavLink to="/sitemap" label="sitemap" className={classes.footerLinks} /></Grid>
                <Grid item xs={4} className={classes.footerItemSmall}><NavLink to="/respect" label="respect" className={classes.footerLinks} /></Grid>
              </Grid>
            </Hidden>
            <Hidden smDown>
              <Grid container direction='column' alignItems='flex-end'>
                <h3>Links</h3>
                <NavLink to="/articles" label="articles" className={classNames(classes.footerLinkFirst, classes.footerLinks)} />
                <NavLink to="/talks" label="talks" className={classes.footerLinks} />
                <NavLink to="/about" label="about" className={classes.footerLinks} />
                <NavLink to="/contact" label="contact" className={classes.footerLinks} />
                <NavLink to="/sitemap" label="sitemap" className={classes.footerLinks} />
                <NavLink to="/respect" label="respect" className={classes.footerLinks} />
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.footerRow}>
        <Grid className={classes.lastRowContainer} container alignItems='center' direction='row'>
          <Grid item xs={4}>
            <p className={classes.copyright}>
              Copyright (c) <a href='https://registro.br/2/whois?qr=1443807%20coding.com.br#lresp' target="_blank" rel="noopener noreferrer" style={{color: '#000'}}>2003</a>-{(new Date()).getFullYear()}
            </p>
          </Grid>
          <Grid item xs={4}>
            <p className={classes.logo}>
              <img width={24} src={logo} alt='Coding Logo' />
            </p>
          </Grid>
          <Grid item xs={4}>
            <p className={classes.github}>
              <a href='https://github.com/fernandes' target="_blank" style={{color: '#000'}} rel="noopener noreferrer">
                <span role="img" aria-label="Github Logo">
                  <GithubCircle style={{fontSize: 28}} />
                </span>
              </a>
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Footer)