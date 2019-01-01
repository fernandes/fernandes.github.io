import React from 'react'
import ArticleBody from '../ArticleBody'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkBorder'
import classNames from 'classnames'
import Hidden from '@material-ui/core/Hidden'
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
    [theme.breakpoints.up('lg')]: {
      float: 'left',
    },
    textDecoration: 'none'
  },
  title: {
    margin: '14px 0px',
    color: 'rgba(0, 0, 0, 0.78)',
    fontWeight: 600,
    fontSize: 32,
    [theme.breakpoints.down('md')]: {
      marginBottom: 5,
    },
  },
  details: {
    fontFamily: "arial, sans-serif",
    [theme.breakpoints.up('lg')]: {
      textAlign: 'right',
      display: 'none'
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
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
        <Hidden mdDown>
          <p className={classes.details}>
            <BookmarkOutlinedIcon className={classNames(classes.icon, classes.iconBookmark)} />{tags.join(", ")} &nbsp;&nbsp;
            <CalendarTodayOutlinedIcon className={classNames(classes.icon, classes.iconCalendar)} /> {date}
          </p>
        </Hidden>
        <Hidden lgUp>
          <p className={classes.detailsMd}>
            <BookmarkOutlinedIcon className={classNames(classes.icon, classes.iconBookmark)} />{tags.join(", ")}<br />
            <CalendarTodayOutlinedIcon className={classNames(classes.icon, classes.iconCalendar)} /> {date}
          </p>
        </Hidden>
      </Grid>
      <Grid item xs={12}>
        <ArticleBody body={body} media={media} path={path} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Article)
