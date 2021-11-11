import React, { useState, useEffect } from 'react';
import { database } from './firestoreconfig';

function App() {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      getUserAux();
    };
    getUsers();
  }, []);

  const getUserAux = async () => {
    const { docs } = await database.collection('agenda').orderBy("name", "asc").get();
    const auxArrray = docs.map(item => ({ id: item.id, ...item.data() }));
    setUsers(auxArrray);
    // console.log(auxArrray);
  };

  const deleteUser = async (id) => {
    try {
      await database.collection('agenda').doc(id).delete();
      getUserAux();
    } catch (error) {
      console.log(error);
    }
  };

  const btnUpdateUser = async (id) => {
    try {
      const data = await database.collection('agenda').doc(id).get();
      setIsUpdate(true);
      const { id, name, phone } = data.data()

      // console.log(auxData);
      setName(name);
      setPhone(phone);
      // getUserAux();
    } catch (error) {
      console.log(error);
    }
  };

  const saveUsers = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El campo nombre está vacío');
    }
    if (!phone.trim()) {
      setError('El campo teléfono está vacío');
    }
    setError('');

    const user = {
      name: name,
      phone: phone
    }

    try {
      const data = await database.collection('agenda').add(user);
      console.log('Tarea completada');

      getUserAux();

      setName('');
      setPhone('');
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h2>Formulario de Usuario</h2>
          <form className='form-group' onSubmit={saveUsers}>
            <input className='form-control'
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              placeholder='Introduce el nombre'
               />
            <input className='form-control mt-3'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type='text'
              placeholder='Introduce el número'
               />
            <input className='btn btn-dark btn-block mt-3'
              type='submit' value='Registrar' />
          </form>
          {
            error ?
              (
                <div>
                  {error}
                </div>
              )
              :
              (<span></span>)
          }
        </div>
        <div className='col'>
          <h2>Lista de Agenda</h2>
          <ul className='list-group'>
            {
              users.length !== 0 ?
                (
                  users.map(item => (
                    <li className='list-group-item' key={item.id}>
                      {item.name} -- {item.phone}
                      <button className="btn btn-danger float-right" onClick={(id) => { deleteUser(item.id) }}>Borrar</button>
                      <button className="btn btn-info float-right mr-3" onClick={(id) => { btnUpdateUser(item.id) }}>Actualizar</button>
                    </li>
                  ))
                )
                :
                (
                  <div>No hay usuarios</div>
                )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
