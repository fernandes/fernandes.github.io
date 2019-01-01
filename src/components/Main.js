import React from "react"
import { withStyles } from '@material-ui/core/styles'
import Article from './Article'
import Quote from './Quote'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  main: {
    // display: 'flex',
  }
})

const Main = ({classes, posts, text}) => {
  const postComponent = (post) => {
    const { frontmatter } = post
    const body = frontmatter.excerpt ? frontmatter.excerpt : post.excerpt
    const tags = frontmatter.tags ? frontmatter.tags.split(" ") : []
    switch(frontmatter.layout) {
      case "article":
        return <Article key={post.id} {...frontmatter} body={body} tags={tags} />
      case "quote":
        return <Quote key={post.id} {...frontmatter} body={body} tags={tags} />
      default:
        return <Article key={post.id} {...frontmatter} body={body} tags={tags} />
    }
  }

  return (
    <Grid container component='main' className={classes.main} direction='row'>
      {posts.map((post, index) => {
        return (
          <Grid item xs={12} key={index}>
            { postComponent(post.node) }
          </Grid>
        )
      })}
    </Grid>
  )
}

export default withStyles(styles)(Main)
