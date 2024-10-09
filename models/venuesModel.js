import db from '../config/db.js'; // Import the Knex instance

const Venues = {
  getAllVenues: () => db('venues').select('*').orderBy('id'),

  getVenueById: (id) => db('venues').where({ id }).first(),

  createVenue: (name, address, city, state, postal_code, coordinates, description, price, capacity, opening_hours, closing_hours) => db('venues').insert(
    {name: name,
address: address,
city: city,
state: state,
postal_code: postal_code,
coordinates: coordinates,
description: description,
price: price,
capacity: capacity,
opening_hours: opening_hours,
closing_hours: closing_hours}
).returning('*'),

  updateVenue: (id, updatedVenueData) => db('venues').where({ id }).update(updatedVenueData).returning('*'),

  deleteVenue: (id) => db('venues').where({ id }).del(),
};

export default Venues;