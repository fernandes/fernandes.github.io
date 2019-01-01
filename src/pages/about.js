import React from "react"
import withRoot from '../withRoot'
import MainLayout from '../components/MainLayout'

const AboutPage = () => {
  return (
    <MainLayout>
      <h1>About</h1>
    </MainLayout>
  )
}

export default withRoot(AboutPage)
