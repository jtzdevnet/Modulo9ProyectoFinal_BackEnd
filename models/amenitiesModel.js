import db from '../config/db.js';

const Amenities = {
  getAllAmenities: () => db('amenities').select('*'),

  getAmenityById: (id) => db('amenities').where({ id }).first(),

  getAmenityByName: (name) => db('amenities').where({ name }).first(),

  createAmenity: (data) => db('amenities').insert(data).returning('*'),

  updateAmenity: (id, updatedAmenityData) => db('amenities').where({ id }).update(updatedAmenityData).returning('*'),

  deleteAmenity: (id) => db('amenities').where({ id }).del(),
};

export default Amenities;