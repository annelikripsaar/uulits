import React, { useState } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import styled from "@emotion/styled"
import { UulitsField } from "./UulitsField"
import { UulitsTextarea } from "./UulitsTextarea"
import { Button } from "../Button"
import CrossSeparator from "../CrossSeparator"
import { screenSize } from "../../styles/screenSize"

const Container = styled.div`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-size: 12px;
  padding: 24px 0;

  label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  ${screenSize.sm} {
    padding: 0 16px;
  }
`

const Heading = styled.h2`
  line-height: 1;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 56px;
`

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${screenSize.sm} {
    width: 100%;
  }
`

const InputContainer = styled.div`
  position: relative;
  width: 320px;
  margin-bottom: 56px;

  &:first-of-type {
    margin-right: 56px;
  }

  ${screenSize.sm} {
    width: 100%;

    &:first-of-type {
      margin-right: 0;
    }
  }
`

const MessageContainer = styled.div`
  position: relative;
  width: 450px;
  margin-bottom: 56px;

  ${screenSize.sm} {
    width: 100%;
  }
`

export default function ContactForm() {
  const [serverState, setServerState] = useState()

  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg })
  }

  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "https://formspree.io/xpzyeyve",
      data: values,
    })
      .then(response => {
        actions.setSubmitting(false)
        actions.resetForm()
        handleServerResponse(true, "Thanks!")
      })
      .catch(error => {
        actions.setSubmitting(false)
        handleServerResponse(false, error.response.data.error)
      })
  }

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    message: Yup.string(),
  })

  return (
    <Container>
      <Heading>Get in touch with us</Heading>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form id="fs-frm" noValidate>
            <FormContainer>
              <FormRow>
                <InputContainer>
                  <label htmlFor="name">Your Name</label>
                  <Field as={UulitsField} id="name" name="name" />
                  <ErrorMessage
                    name="email"
                    className="errorMsg"
                    component="p"
                  />
                </InputContainer>
                <InputContainer>
                  <label htmlFor="email">Your Email</label>
                  <Field
                    as={UulitsField}
                    id="email"
                    type="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    className="errorMsg"
                    component="p"
                  />
                </InputContainer>
              </FormRow>
              <FormRow>
                <MessageContainer>
                  <label htmlFor="message">Your Message</label>
                  <Field as={UulitsTextarea} id="message" name="message" />
                  <ErrorMessage
                    name="message"
                    className="errorMsg"
                    component="p"
                  />
                </MessageContainer>
              </FormRow>
              <Button type="submit" disabled={isSubmitting}>
                Get in touch ›
              </Button>
              {serverState && (
                <p className={!serverState.ok ? "errorMsg" : ""}>
                  {serverState.msg}
                </p>
              )}
            </FormContainer>
          </Form>
        )}
      </Formik>
      <CrossSeparator />
    </Container>
  )
}
