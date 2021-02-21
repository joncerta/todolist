import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    document_number: '',
    error: '',
    success: false,
  });

  const { name, lastname, email, password, phone, document_number, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false})
    signup({ name, lastname, email, password, phone, document_number })
    .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            document_number: '',
            error: '',
            success: true,
          });
        }
      }
    );
  };

  const signupForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Lastname</label>
        <input
          onChange={handleChange('lastname')}
          type='text'
          className='form-control'
          value={lastname}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Phone</label>
        <input
          onChange={handleChange('phone')}
          type='number'
          className='form-control'
          value={phone}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Document number</label>
        <input
          onChange={handleChange('document_number')}
          type='number'
          className='form-control'
          value={document_number}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Registrarse
      </button>
    </form>
  );
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-danger'
      style={{ display: success ? '' : 'none' }}
    >
      Cuenta creada. Por favor inicia sesión <Link to="/signin">aqui</Link>.
    </div>
  );
  return (
    <Layout title='Signup' description='Signup Ecommerce' className='container'>
      {showError()}
      {showSuccess()}
      {signupForm()}
    </Layout>
  );
};

export default Signup;
