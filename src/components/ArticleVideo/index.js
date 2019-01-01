import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  div: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
    paddingBottom: '56.25%',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      marginBottom: 30,
    },
  },
  video: {
    position: 'relative',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  }
})

const ArticleVideo = ({classes, author, date, comment, replies}) => {
  return (
    <div className={classes.div}>
      <iframe title='Video' className={classes.video} src="https://www.youtube.com/embed/-5EQIiabJvk" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default withStyles(styles)(ArticleVideo)
