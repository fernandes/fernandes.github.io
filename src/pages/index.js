import React from "react"
import Main from '../components/Main'
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
      <Main posts={edges} />
    </MainLayout>
  )
}

export default withRoot(BlogIndex)

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {fileAbsolutePath: {regex: "/(posts)/.*.md$/"}, frontmatter: {featured: {eq: true}}}
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
            featured
            excerpt
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
