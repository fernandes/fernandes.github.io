import React from "react"
import withRoot from '../withRoot'
import { graphql } from "gatsby"
import MainLayout from '../components/MainLayout'

const BlogIndex = ({
  classes,
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <MainLayout>
      <h1>Articles</h1>
    </MainLayout>
  )
}

export default withRoot(BlogIndex)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/(posts)/.*.md$/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            layout
            date(formatString: "MMMM DD, YYYY")
            path
            title
            tags
            media {
              type
              source
              alt
              caption
            }
          }
        }
      }
    }
  }
`
