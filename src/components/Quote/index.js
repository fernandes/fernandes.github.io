import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkBorder'
import classNames from 'classnames'

const styles = (theme) => ({
  article: {
    marginTop: 25,
    '&:hover $gridDetails': {
      display: 'block'
    },
  },
  header: {
    fontFamily: "'Josefin Sans', sans-serif",
  },
  title: {
    margin: '14px 0px',
    marginBottom: 5,
  },
  gridDetails: {
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
  },
  gridQuote: {
    borderLeft: 'solid 1px #D6D5D5',
    paddingLeft: 10,
    paddingBottom: 14,
    [theme.breakpoints.only('xs')]: {
      marginTop: 20,
    },
  },
  quoteBlock: {
    margin: 10,
  },
  quoteParagraph: {
    fontSize: 20,
    fontStyle: 'italic',
    fontVariant: 'normal',
    fontWeight: 100,
    lineHeight: '24px',
    color: '#5E5E5E',
  },
  quoteAuthor: {
    color: '#5E5E5E',
    fontSize: 20,
    margin: 10,
  }
})

const Quote = ({classes, title, tags = [], date, body, media}) => {
  return (
    <Grid container component='article' className={classes.article}>
      <Grid item xs={12}>
        <Grid container component='header' className={classes.header}>
          <Grid item xs={12} lg={7}>
            <h1 className={classes.title}>{title}</h1>
          </Grid>
          <Grid item xs={12} lg={5} className={classNames('details', classes.gridDetails)}>
            <p className={classes.detailsMd}>
              <BookmarkOutlinedIcon className={classNames(classes.icon, classes.iconBookmark)} />{tags.join(", ")}<br />
              <CalendarTodayOutlinedIcon className={classNames(classes.icon, classes.iconCalendar)} /> {date}
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.gridQuote}>
        <blockquote className={classes.quoteBlock}>
          <p className={classes.quoteParagraph}>{body}</p>
        </blockquote>
        <cite className={classes.quoteAuthor}>
          {media.author}
        </cite>
      </Grid>
    </Grid>
  )
}

// <div>
//   <blockquote cite="https://www.huxley.net/bnw/four.html">
//     <p>{body}</p>
//   </blockquote>
//
//   <cite>– {media.author}</cite>
//   <hr />
// </div>

export default withStyles(styles)(Quote)
