import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='ml-sm-5'>
      <InputGroup style={{ minWidth: '300px' }}>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          style={{
            borderRadius: '8px 0 0 8px',
            border: '2px solid #374151',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            padding: '0.6rem 1rem'
          }}
          className='search-input'
        />
        <Button 
          type='submit' 
          variant='primary'
          style={{
            borderRadius: '0 8px 8px 0',
            padding: '0.6rem 1.5rem',
            fontWeight: '600'
          }}
        >
          <i className='fas fa-search'></i>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
