import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from "gatsby"

const styles = (theme) => ({
  div: {
    maxWidth: 341,
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56.25%',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%'
    },
  },
  figure: {
    margin: 0,
    position: 'relative',
    // top: 0,
    // left: 0,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      position: 'absolute',
      height: '100%',
      top: 0,
      left: 0,
    },
  },
  image: {
    position: 'relative',
    width: '100%',
    maxHeight: 170,
  },
  caption: {
    textAlign: 'right',
    fontFamily: 'arial',
    fontSize: 12,
  }
})

const ArticleImage = ({classes, alt, caption, source, path, data, author, date, comment, replies}) => {
  return (
    <div className={classes.div}>
      <figure className={classes.figure}>
        <Link to={path}>
          <img className={classes.image} src={require(`../../images/posts/${source}`)} alt={alt} />
        </Link>
        <figcaption className={classes.caption}>{caption}</figcaption>
      </figure>
    </div>
  )
}

export default withStyles(styles)(ArticleImage)
