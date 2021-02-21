import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { createTask } from './apiUser';

const AddTask = () => {
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    title: '',
    description: '',
    state: '',
    userRef: '',
    photo: '',
    loading: false,
    error: '',
    createdTask: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();

  const {
    title,
    description,
    state,
    userRef,
    photo,
    loading,
    error,
    createdTask,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    setValues({ ...values, formData: new FormData() });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    formData.set('userRef', user._id);
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    setValues({ ...values, userRef: user._id });
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    console.log('formData', formData);
    createTask(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          description: '',
          state: '',
          photo: '',
          userRef: user._id,
          loading: false,
          createdTask: data.name,
        });
        setRedirect(true);
      }
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/user/dashboard' />;
    }
  };

  const newPostFrom = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            type='file'
            onChange={handleChange('photo')}
            name='photo'
            accept='image/*'
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Title</label>
        <input
          type='text'
          onChange={handleChange('title')}
          className='form-control'
          value={title}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Descripción</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
          name=''
          id=''
          cols='30'
          rows='3'
        ></textarea>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Estado</label>
        <select
          type='text'
          onChange={handleChange('state')}
          className='form-control'
        >
          <option>Selecciona una opción</option>
          <option value='0'>Creado</option>
          <option value='1'>En proceso</option>
          <option value='2'>Finalizado</option>
        </select>
      </div>
      <button className='btn btn-outline-primary'>Crear</button>
      <Link to={`/user/dashboard`}>
      <button className='btn btn-outline-danger float-right'>Atras</button>
      </Link>
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
      className='alert alert-info'
      style={{ display: createdTask ? '' : 'none' }}
    >
      <h2>La tarea fue creada</h2>
    </div>
  );

  const showLoading = () =>
    loading &
    (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title='Agregar nueva tarea'
      description={`Buenos dias ${user.name}, listo para crear una nueva tarea`}
    >
      <div className='row'>
        <div className='offset-2 col-8'>
        {shouldRedirect(redirect)}
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostFrom()}
        </div>
      </div>
    </Layout>
  );
};

export default AddTask;
