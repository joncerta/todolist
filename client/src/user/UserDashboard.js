import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteTask, getFilteredTasks } from "../core/apiCore";

const Dashboard = () => {
  const {
    user: { _id, name, lastname, email, role },
    token,
  } = isAuthenticated();
  const [myFilters, setMyFilters] = useState({
    filters: { userRef: [_id] },
  });
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getFilteredTasks(skip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...data.data]);
        setSize(data.size);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredTasks(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log('data', data);
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    console.log('size', size);
    console.log('limit', limit);
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Ver más
        </button>
      )
    );
  };

  const deleteATask = (id) => {
    deleteTask(id, _id, token).then((data) => {
      getFilteredTasks(skip, limit, myFilters.filters).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setFilteredResults([...data.data]);
        }
      });
    });
  };

  useEffect(() => {
    init();
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Links de usuario</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/tasks">
              Crear tarea
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h2 className="card-header">Información de usuario</h2>
        <div className="profile-data">
          <div className="name">{`${name} ${lastname}`}</div>
          <div className="email">{email}</div>
          <div className="role">{role === 1 ? "Admin" : "User"}</div>
        </div>
      </div>
    );
  };
  const taskHistory = () => {
    console.log("filteredResults", filteredResults);
    return (
      <div className="card mb-5">
        <h3 className="card-header">Tareas</h3>
        <div className="content-tasks">
          {filteredResults.length > 0 ? (
            <>
              <div className="header">
                <h2>Titulo</h2>
                <h2>Descripción</h2>
                <h2>Estado</h2>
                <h2>Acciones</h2>
              </div>
              {filteredResults &&
                filteredResults.map((task, index) => (
                  <div key={index} className="content">
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                    <p
                      className={`${
                        task.state === 0
                          ? "text-info"
                          : task.state === 1
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {task.state === 0
                        ? "Creada"
                        : task.state === 1
                        ? "En proceso"
                        : "Finalizada"}
                    </p>
                    <div className="buttons">
                      <button className="btn btn-primary">Editar</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteATask(task._id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                ))}
            </>
          ) : (<div>No tienes tareas</div>)}
        </div>
        <hr />
        {loadMoreButton()}
      </div>
    );
  };
  return (
    <Layout
      title="Dashboard"
      description={`Buenos dias ${name} ${lastname}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {taskHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
