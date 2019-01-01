import React from "react"
import withRoot from '../withRoot'
import MainLayout from '../components/MainLayout'
import { Link } from 'gatsby'

const SitemapPage = () => {
  return (
    <MainLayout>
      <h1>Sitemap</h1>

      <p>This is the simplest sitemap ever, just to make sure you enjoy in it's fully potential, here are the links to the most interesting (or not) content.</p>

      <ul>
        <li><Link to="/">Coding Home</Link> : Here is where everything starts</li>
        <li><Link to="/articles">Articles</Link> : Some interesting essays organized by category, curated manually (not automatically generated) by me</li>
        <li><Link to="/talks">Talks</Link> : I love to share some ideas personally with other people, here is where I had the opportunity to</li>
        <li><Link to="/about">About</Link> : Some random information about me, so you can know who writes here <span role="img" aria-label="Wink">😉</span></li>
        <li><Link to="/contact">Contact</Link> : Wanna tell me something? Just send a message!</li>
        <li><Link to="/sitemap">Sitemap</Link> : Probably this page</li>
        <li><Link to="/respect#respect">Respect</Link> : Here I described, in some legal terms too, how I respect you, your data and what you can expect from this site.</li>
        <li style={{listStyleType: 'none'}}>
          <ul>
            <li><Link to="/respect#creative-commons">Creative Commons</Link> : How the content is licensed</li>
            <li><Link to="/respect#privacy-policy">Privacy Policy</Link> : Legal statement about privacy policy</li>
          </ul>
        </li>
      </ul>
    </MainLayout>
  )
}

export default withRoot(SitemapPage)
