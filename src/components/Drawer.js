import React from "react"
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import hamb from '../images/hamb.png'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import logo from '../images/logo.jpg'
import { navigate } from "gatsby"

import {
  HomeOutline,
  BookOpenVariant,
  MicrophoneVariant,
  AccountCircleOutline,
  MessageTextOutline,
  Sitemap,
  HeartOutline,
} from 'mdi-material-ui'

const styles = (theme) => ({
  button: {
    backgroundColor: 'white',
    position: 'fixed',
    opacity: 0.9,
    top: 15,
    left: 15,
    [theme.breakpoints.down('sm')]: {
      top: 2,
      left: 2,
    },
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  logo: {
    marginTop: 30,
    width: 20,
    height: 20
  },
  p: {
    fontSize: '34px',
    margin: '32px 0px 15px 0px',
    fontFamily: "'Josefin Sans', sans-serif",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

class Drawer extends React.Component {
  state = {
    drawerOpen: false
  }

  toggleDrawer = () => {
    this.setDrawerState(!this.state.drawerOpen)
  }

  openDrawer = () => {
    this.setDrawerState(true)
  }

  closeDrawer = () => {
    this.setDrawerState(false)
  }

  setDrawerState = (state) => {
    this.setState({
      drawerOpen: state,
    });
  }

  render() {
    const drawerItems = [
      {label: "Home", icon: HomeOutline, link: "/"},
      {label: "Articles", icon: BookOpenVariant, link: "/articles"},
      {label: "Talks", icon: MicrophoneVariant, link: "/talks"},
      {label: "About", icon: AccountCircleOutline, link: "/about"},
      {label: "Contact", icon: MessageTextOutline, link: "/contact"},
      {label: "Sitemap", icon: Sitemap, link: "/sitemap"},
      {label: "Respect", icon: HeartOutline, link: "/respect"}
    ]

    const { drawerOpen } = this.state
    const { classes } = this.props
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const sideList = (
      <div className={classes.list}>
        <div className={classes.logoContainer}>
          <p className={classes.p}>
            Coding
          </p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Divider width='80%' />
        </div>
        <List style={{margin: '10px 0px'}}>
          {drawerItems.map((item) => (
            <ListItem button key={item.label} onClick={ () => navigate(item.link)}>
              <ListItemIcon style={{opacity: '0.9'}}><item.icon /></ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Divider width='80%' />
        </div>
        <div className={classes.logoContainer}>
          <img src={logo} className={classes.logo} alt='Coding Logo' />
        </div>
      </div>
    );
  
    return (
      <>
        <Button className={classes.button} onClick={this.toggleDrawer}>
          <img style={{opacity: 0.7}} width='32' src={hamb} alt='Hamburguer Menu Icon' />
        </Button>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={drawerOpen}
          onClose={this.closeDrawer}
          onOpen={this.openDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.closeDrawer}
            onKeyDown={this.closeDrawer}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </>
    )
  }
}

export default withStyles(styles)(Drawer)
