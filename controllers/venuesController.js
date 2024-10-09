import Venues from '../models/venuesModel.js';
import Amenities from '../models/amenitiesModel.js';
import db from '../config/db.js'; // Import the Knex instance

const venuesController = {
  getAllVenues: async (req, res) => {
    try {
      const venues = await Venues.getAllVenues();
      
      res.json(venues);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getVenueById: async (req, res) => {
    try {
      const venue = await Venues.getVenueById(req.params.id);
      const amenities = await db.raw('SELECT a.id, a.name, a.icon, va.value FROM venues_amenities va JOIN amenities a ON va.amenity_id = a.id WHERE va.venue_id = ?;', [req.params.id]);
      let venue_amenities_array = [];
      venue_amenities_array.push(venue);
      venue_amenities_array.push(amenities.rows);
      //console.log(typeof(venue));
      if (venue) {
        res.json(venue_amenities_array);
      } else {
        res.status(404).json({ message: 'Venue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createVenue: async (req, res) => {
    try {
      const {name, address, city, state, postal_code, coordinates, description, price, capacity, opening_hours, closing_hours} = req.body;
      const newVenue = await Venues.createVenue(name, address, city, state, postal_code, coordinates, description, price, capacity, opening_hours, closing_hours);
      // amenities array example
      //  [
      //    {id:"", name:"", icon:"", value:""},
      //    {id:"", name:"", icon:"", value:""},
      //  ]
      if(req.body.amenities){
        for (let i = 0; i < req.body.amenities.length; i++) {
          if (req.body.amenities[i].id != "") {
            console.log(newVenue);
            await db('venues_amenities').insert({venue_id:newVenue[0].id, amenity_id:req.body.amenities[i].id, value:req.body.amenities[i].value}).returning('*');
          }
          else{
            const newAmenity = await Amenities.createAmenity(req.body.amenities[i].name, req.body.amenities[i].icon);
            await db('venues_amenities').insert({venue_id:newVenue[0].id, amenity_id:newAmenity[0].id, value:req.body.amenities[i].value}).returning('*');
          }
        }
      }
      res.status(201).json(newVenue);
    } catch (error) {
      res.status(500).json({ error: error, message: error.message });
    }
  },

  updateVenue: async (req, res) => {
    try {
      const updatedVenue = await Venues.updateVenue(req.params.id, req.body);
      if (updatedVenue) {
        res.json(updatedVenue);
      } else {
        res.status(404).json({ message: 'Venue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteVenue: async (req, res) => {
    try {
      const deletedVenue = await Venues.deleteVenue(req.params.id);
      if (deletedVenue) {
        res.json({ message: 'Venue deleted successfully' });
      } else {
        res.status(404).json({ message: 'Venue not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default venuesController;