import React from "react"
import withRoot from '../withRoot'
import MainLayout from '../components/MainLayout'
import MessageForm from '../components/MessageForm'

const ContactPage = () => {
  return (
    <MainLayout>
      <h1>Contact</h1>
      <MessageForm />
    </MainLayout>
  )
}

export default withRoot(ContactPage)
