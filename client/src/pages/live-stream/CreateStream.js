import React, { useCallback, useState } from 'react'
import { Button, Col, Form, Row } from 'reactstrap'
import { toast } from 'react-toastify'

import InputField from 'components/InputField'
import { imageValidation, validateStreamDetails } from './helper'

const INITIAL_DETAILS = {
  title: '',
  description: '',
  streamDate: '',
  streamTime: '',
  streamType: '',
  streamCost: '',
  streamPoster: null
}

const CreateStream = () => {

  const [streamDetails, setStreamDetails] = useState(Object.assign({}, INITIAL_DETAILS))
  const [errors, setErrors] = useState({})
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleChangeInput = useCallback((event, id) => {
    event.preventDefault()
    const updatedDetails = Object.assign({}, streamDetails)
    if (id === "streamPoster") {
      const validateImage = imageValidation(event.target.files[0])
      if (validateImage) return toast.error(validateImage)
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      const objectURL = window.URL.createObjectURL(event.target.files[0])
      setPreviewUrl(objectURL)
      updatedDetails[id] = event.target.files[0]
    } else {
      updatedDetails[id] = event.target.value
    }
    setStreamDetails(updatedDetails)
  }, [streamDetails, previewUrl])

  const handleCreateStream = useCallback((event) => {
    event.preventDefault()
    const validate = validateStreamDetails(streamDetails)
    if (!!Object.keys(validate).length) {
      setErrors(validate)
      return
    }
    setErrors({})
  }, [streamDetails])

  const handleRemoveImage = useCallback(() => {
    window.URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setStreamDetails({
      ...streamDetails,
      streamPoster: null
    })
  }, [previewUrl, streamDetails])

  return (
    <div className='videos'>
      <h2 className='text-center'>Create New Stream</h2>
      <Form onSubmit={handleCreateStream}>
        <Row>
          <Col md={6}>
            <InputField
              id="title"
              name='title'
              isLabelRequired
              isRequired
              errors={errors}
              type='text'
              inputLabel='Stream Title'
              placeholder='stream title'
              value={streamDetails.title}
              onChangeInput={handleChangeInput}
            />
          </Col>
          <Col md={6}>
            <InputField
              id="description"
              name='description'
              isLabelRequired
              isRequired
              errors={errors}
              type='textarea'
              inputLabel='Stream Description'
              placeholder='stream description'
              value={streamDetails.description}
              onChangeInput={handleChangeInput}
            />
          </Col>
          <Col md={6}>
            <InputField
              id="streamDate"
              name='streamDate'
              isLabelRequired
              isRequired
              errors={errors}
              type='date'
              inputLabel='Stream Date'
              placeholder='stream date'
              value={streamDetails.streamDate}
              onChangeInput={handleChangeInput}
            />
          </Col>
          <Col md={6}>
            <InputField
              id="streamTime"
              name='streamTime'
              isLabelRequired
              isRequired
              errors={errors}
              type='time'
              inputLabel='Stream Time'
              placeholder='stream time'
              value={streamDetails.streamTime}
              onChangeInput={handleChangeInput}
            />
          </Col>
          <Col md={6}>
            <InputField
              id="streamType"
              name='streamType'
              isLabelRequired
              isRequired
              errors={errors}
              type='select'
              inputLabel='Stream Type'
              placeholder='stream type'
              value={streamDetails.streamType}
              onChangeInput={handleChangeInput}
            >
              <option>Choose Stream Type</option>
              <option>Free</option>
              <option>Paid</option>
            </InputField>
          </Col>
          {
            streamDetails.streamType === "Paid" && (
              <Col md={6}>
                <InputField
                  id="streamCost"
                  name='streamamount'
                  isLabelRequired
                  isRequired
                  errors={errors}
                  type='number'
                  inputLabel='Stream Amount'
                  placeholder='stream cost'
                  value={streamDetails.streamCost}
                  onChangeInput={handleChangeInput}
                />
              </Col>
            )
          }
          <Col md={6}>
            <InputField
              id="streamPoster"
              name='streamPoster'
              isLabelRequired
              isRequired
              type='file'
              accept="image/*"
              errors={errors}
              inputLabel='Stream Poster Image'
              onChangeInput={handleChangeInput}
            />
          </Col>
          {
            previewUrl && (
              <Col md={6} className='d-flex'>
                <img src={previewUrl} alt='' className='img-fluid' />
                <span className='remove-icon' onClick={handleRemoveImage}>X</span>
              </Col>
            )
          }
          <Button type='submit' color='primary'>Create Stream</Button>
        </Row>
      </Form>
    </div>
  )
}

export default CreateStream