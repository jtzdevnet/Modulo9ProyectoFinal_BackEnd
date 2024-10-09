// models/reservationsModel.js
import db from '../config/db.js'; 

const Reservations = {
  getAllReservations: () => 
    db('reservations')
    .join('users', 'reservations.user_id', 'users.id')
    .join('venues', 'reservations.venue_id', 'venues.id')
    .select(
      'reservations.id',
      'venues.name as venue_name',
      db.raw("CONCAT(users.name, ' ', users.lastname) as user_full_name"),
      'users.phone as user_phone',
      'users.email as user_email',
      'reservations.assistants_number',
      'reservations.event_date',
      'reservations.event_hours',
      'reservations.created_at'
    ),
      // .join('users', 'reservations.user_id', 'users.id')
      // .join('venues', 'reservations.venue_id', 'venues.id')
      // .select(knex.raw('reservations.id, venues.name AS venue_name, CONCAT(users.name, ' ', users.lastname) AS user_full_name, users.phone AS user_phone, users.email AS user_email, reservations.assistants_number, reservations.event_date, reservations.event_hours, reservations.created_at')),
      // .select(
      //   'reservations.*', 
      //   'users.name as user_name', 
      //   'venues.name as venue_name'
      // ),
      

  getReservationById: (id) => 
    db('reservations')
      .where({ 'reservations.id': id })
      .join('users', 'reservations.user_id', 'users.id')
      .join('venues', 'reservations.venue_id', 'venues.id')
      .select(
        'reservations.*', 
        'users.name as user_name', 
        'venues.name as venue_name'
      )
      .first(),

  createReservation: (reservationData) => 
    db('reservations')
      .insert(reservationData)
      .returning('*'),

  updateReservation: (id, updatedReservationData) => 
    db('reservations')
      .where({ id })
      .update(updatedReservationData)
      .returning('*'),

  deleteReservation: (id) => 
    db('reservations')
      .where({ id })
      .del(),
};

export default Reservations;
