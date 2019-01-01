import React from 'react'
import ArticleVideo from '../ArticleVideo'
import ArticleImage from '../ArticleImage'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  container: {

  },
  media: {
    maxWidth: '100%',
    float: 'left',
    margin: '0px 30px 5px 0px',
    height: 200,
    [theme.breakpoints.only('xs')]: {
      margin: '0px 0px 10px 0px',
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%'
    },
  },
  body: {
    '-moz-osx-font-smoothing': 'grayscale',
    '-webkit-font-smoothing': 'subpixel-antialiased !important',
    '-moz-font-smoothing': 'subpixel-antialiased !important',
    textRendering: 'optimizelegibility !important',
    color: 'rgb(27, 27, 27, 0.9)',
    textAlign: 'start',
    wordWrap: 'break-word',
    letterSpacing: '.01em',
    fontFamily: '"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 16,
    lineHeight: 1.5,
  }
})

const ArticleBody = ({classes, body, media, path}) => {
  const mediaComponent = (path, props) => {
    switch(props.type) {
      case "video":
        return <ArticleVideo {...props} />
      case "image":
        return <ArticleImage {...props} path={path} />
      default:
        return <></>
    }
  }

  return(
    <div className={classes.container} direction='row' wrap='wrap'>
      {(media.type === 'video' || media.type === 'image') && 
        <div className={classes.media}>{mediaComponent(path, media)}</div>
      }
      <div>
        <p className={classes.body} dangerouslySetInnerHTML={{ __html: body }}></p>
      </div>
    </div>
  )
}

export default withStyles(styles)(ArticleBody)
