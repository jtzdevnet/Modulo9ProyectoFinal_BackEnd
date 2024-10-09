// models/usersModel.js
import db from '../config/db.js';

const Users = {
  getAllUsers: () => db('users').select('*'),
  getUserById: (id) => db('users').where({ id }).first(),
  getUserByEmail: (email) => db('users').where({ email }).first(),
  createUser: (userData) => db('users').insert(userData).returning('*'),
  updateUser: (id, newUserData) => db('users').where({ id }).update(newUserData).returning('*'),
  deleteUser: (id) => db('users').where({ id }).del(),
};

export default Users;