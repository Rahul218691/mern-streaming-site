import React, { useCallback, useState } from 'react'
import { Col, Row } from 'reactstrap'
import InputField from 'components/InputField'

const INITIAL_STATE = {
  name: '',
  image: '',
  description: ''
}

const CreateArtist = ({
  errors,
  onCloseAddScreen = () => { }
}) => {

  const [artistInfo] = useState(Object.assign({}, INITIAL_STATE))

  const handleChangeInput = useCallback((e, id) => {

  }, [])

  return (
    <div className='table__add__data'>
      <div className='add__data__header'>
        <h4>Add Artist</h4>
        <i className='bx bx-window-close' onClick={onCloseAddScreen}></i>
      </div>
      <div className='add__link__fields row'>
        <Col md={6}>
          <InputField
            id="name"
            name='name'
            isLabelRequired
            isRequired
            type='text'
            inputLabel='Artist Name'
            placeholder='Artist name'
            errors={errors}
            value={artistInfo.name}
            onChangeInput={handleChangeInput}
          />
        </Col>
        <Col md={6}>
          <InputField
            id="image"
            name='image'
            isLabelRequired
            isRequired
            type='file'
            inputLabel='Artist Image'
            placeholder='file url'
            errors={errors}
            value={artistInfo.image}
            onChangeInput={handleChangeInput}
          />
        </Col>
        <Col md={6}>
          <InputField
            id="description"
            name='description'
            isLabelRequired
            isRequired
            type='textarea'
            inputLabel='Artist Description'
            placeholder='description'
            errors={errors}
            value={artistInfo.description}
            onChangeInput={handleChangeInput}
          />
        </Col>
      </div>
      <Row className='form__buttons'>
        <button className='common__button' type='button'>Clear</button>
        <button className='common__button' type='button' >Create Artist</button>
      </Row>
    </div>
  )
}

export default CreateArtist