import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '', name:'', phoneNumber:'', address: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
      name:'', 
      phoneNumber:'', 
      address: '' 
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='name'>Full name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your full name'
            name='name'
            onChange={handleInputChange}
            value={userFormData.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='phoneNumber'>Phone number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your phone number'
            name='phoneNumber'
            onChange={handleInputChange}
            value={userFormData.phoneNumber}
            required
          />
          <Form.Control.Feedback type='invalid'>Number is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='address'>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your address'
            name='address'
            onChange={handleInputChange}
            value={userFormData.address}
            required
          />
          <Form.Control.Feedback type='invalid'>Address is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password && userFormData.name && userFormData.phoneNumber && userFormData.address)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;