// controllers/reservationsController.js
import Reservations from '../models/reservationsModel.js';

const reservationsController = {
  getAllReservations: async (req, res) => {
    try {
      const reservations = await Reservations.getAllReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getReservationById: async (req, res) => {
    try {
      const reservation = await Reservations.getReservationById(req.params.id);
      if (reservation) {
        res.json(reservation);
      } else {
        res.status(404).json({ message: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createReservation: async (req, res) => {
    console.log(req.body,"reservationsController");
    try {
      const newReservation = await Reservations.createReservation(req.body);
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateReservation: async (req, res) => {
    try {
      const updatedReservation = await Reservations.updateReservation(req.params.id, req.body);
      if (updatedReservation) {
        res.json(updatedReservation);
      } else {
        res.status(404).json({ message: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteReservation: async (req, res) => {
    try {
      const deletedReservation = await Reservations.deleteReservation(req.params.id);
      if (deletedReservation) {
        res.json({ message: 'Reservation deleted successfully' });
      } else {
        res.status(404).json({ message: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default reservationsController;
