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

const Label = styled.label`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.2s;
  ${p => p.moved && `transform: translate(-50%, -100%)`};
`

const Container = styled.div`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-size: 12px;
  padding: 24px 0;

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

  &:not(:last-of-type) {
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

  const [nameLabelMove, setNameLabelMove] = useState(false)
  const [emailLabelMove, setEmailLabelMove] = useState(false)
  const [subjectLabelMove, setSubjectLabelMove] = useState(false)
  const [messageLabelMove, setMessageLabelMove] = useState(false)

  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg })
  }

  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "https://formspree.io/f/xeqpgwzb",
      data: values,
    })
      .then(response => {
        actions.setSubmitting(false)
        actions.resetForm()
        handleServerResponse(true, "Aitäh! Kiri on teele saadetud.")
      })
      .catch(error => {
        actions.setSubmitting(false)
        handleServerResponse(false, error.response.data.error)
      })
  }

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Nõutud väli"),
    email: Yup.string().email("Palun sisesta kehtiv meiliaadress").required("Nõutud väli"),
    _subject: Yup.string(),
    message: Yup.string(),
  })

  const handleNameFieldSelect = () => {
    setNameLabelMove(true)
  }

  const handleNameFieldBlur = e => {
    if (e.target.value === "") {
      setNameLabelMove(false)
    }
  }

  const handleEmailFieldSelect = () => {
    setEmailLabelMove(true)
  }

  const handleEmailFieldBlur = e => {
    if (e.target.value === "") {
      setEmailLabelMove(false)
    }
  }

  const handleSubjectFieldSelect = () => {
    setSubjectLabelMove(true)
  }

  const handleSubjectFieldBlur = e => {
    if (e.target.value === "") {
      setSubjectLabelMove(false)
    }
  }

  const handleMessageFieldSelect = () => {
    setMessageLabelMove(true)
  }

  const handleMessageFieldBlur = e => {
    if (e.target.value === "") {
      setMessageLabelMove(false)
    }
  }

  return (
    <Container>
      <Heading>Get in touch with us</Heading>
      <Formik
        initialValues={{ name: "", email: "", message: "", _subject: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form id="fs-frm" noValidate>
            <FormContainer>
              <FormRow>
                <InputContainer>
                  <Label htmlFor="name" moved={nameLabelMove}>
                    Nimi
                  </Label>
                  <Field
                    as={UulitsField}
                    id="name"
                    name="name"
                    onFocus={handleNameFieldSelect}
                    onBlur={handleNameFieldBlur}
                  />
                  <ErrorMessage
                    name="name"
                    className="errorMsg"
                    component="p"
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor="email" moved={emailLabelMove}>
                    Meiliaadress
                  </Label>
                  <Field
                    as={UulitsField}
                    id="email"
                    type="email"
                    name="email"
                    onFocus={handleEmailFieldSelect}
                    onBlur={handleEmailFieldBlur}
                  />
                  <ErrorMessage
                    name="email"
                    className="errorMsg"
                    component="p"
                  />
                </InputContainer>
              </FormRow>
              <FormRow>
                <InputContainer>
                  <Label htmlFor="subject" moved={subjectLabelMove}>
                    Pealkiri
                  </Label>
                  <Field
                    as={UulitsField}
                    id="subject"
                    name="_subject"
                    onFocus={handleSubjectFieldSelect}
                    onBlur={handleSubjectFieldBlur}
                  />
                  <ErrorMessage
                    name="_subject"
                    className="errorMsg"
                    component="p"
                  />
                </InputContainer>
              </FormRow>
              <FormRow>
                <MessageContainer>
                  <Label htmlFor="message" moved={messageLabelMove}>
                    Sõnum
                  </Label>
                  <Field
                    as={UulitsTextarea}
                    id="message"
                    name="message"
                    onFocus={handleMessageFieldSelect}
                    onBlur={handleMessageFieldBlur}
                  />
                  <ErrorMessage
                    name="message"
                    className="errorMsg"
                    component="p"
                  />
                </MessageContainer>
              </FormRow>
              <Button type="submit" disabled={isSubmitting}>
                Võta ühendust ›
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
