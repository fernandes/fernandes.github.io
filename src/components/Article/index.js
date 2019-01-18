import React from 'react'
import ArticleBody from '../ArticleBody'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkBorder'
import classNames from 'classnames'
import { Link } from "gatsby"

const styles = (theme) => ({
  article: {
    marginBottom: 25,
    '&:hover $details': {
      display: 'block'
    },
  },
  header: {
    fontFamily: "'Josefin Sans', sans-serif",
  },
  headerLink: {
    float: 'inherit',
    textDecoration: 'none'
  },
  title: {
    margin: '14px 0px',
    color: 'rgba(0, 0, 0, 0.78)',
    fontWeight: 600,
    fontSize: 32,
    marginBottom: 5,
  },
  details: {
    fontFamily: "arial, sans-serif",
    marginTop: 0,
  },
  detailsMd: {
    lineHeight: '20px',
    margin: 0,
    fontFamily: "arial, sans-serif",
    textAlign: 'left',
  },
  icon: {
    fontSize: 16,
    position: 'relative'
  },
  iconBookmark: {
    top: 3
  },
  iconCalendar: {
    top: 2
  }
})

const Article = ({classes, title, body, date, tags = [], path, media}) => {
  return (
    <Grid container component='article' className={classes.article} direction='row'>
      <Grid item xs={12} className={classes.header}>
        <Link
          className={classes.headerLink}
          to={path}
          activeStyle={{
            color: "red",
          }}
          state={{
            pleasant: "reasonably",
          }}
        >
          <h1 className={classes.title}>{title}</h1>
        </Link>
        <p className={classes.detailsMd}>
          <BookmarkOutlinedIcon className={classNames(classes.icon, classes.iconBookmark)} />{tags.join(", ")}<br />
          <CalendarTodayOutlinedIcon className={classNames(classes.icon, classes.iconCalendar)} /> {date}
        </p>
      </Grid>
      <Grid item xs={12}>
        <ArticleBody body={body} media={media} path={path} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Article)
