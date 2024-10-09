import Amenities from '../models/amenitiesModel.js';

const amenitiesController = {
  getAllAmenities: async (req, res) => {
    try {
      const amenities = await Amenities.getAllAmenities();
      res.json(amenities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAmenityById: async (req, res) => {
    try {
      const amenity = await Amenities.getAmenityById(req.params.id);
      if (amenity) {
        res.json(amenity);
      } else {
        res.status(404).json({ message: 'Amenity not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAmenityByName: async (req, res) => {
    try {
      const amenity = await Amenities.getAmenityByName(req.body.name);
      if (amenity) {
        res.json(amenity);
      } else {
        res.status(404).json({ message: 'Amenity not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAmenity: async (req, res) => {
    const { name, icon } = req.body;
    try {
      //console.log(req.body);
      const newAmenity = await Amenities.createAmenity({name, icon});
      res.status(201).json(newAmenity);
      //res.status(201);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateAmenity: async (req, res) => {
    try {
      const updatedAmenity = await Amenities.updateAmenity(req.params.id, req.body);
      if (updatedAmenity) {
        res.json(updatedAmenity);
      } else {
        res.status(404).json({ message: 'Amenity not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteAmenity: async (req, res) => {
    try {
      const deletedAmenity = await Amenities.deleteAmenity(req.params.id);
      if (deletedAmenity) {
        res.json({ message: 'Amenity deleted successfully' });
      } else {
        res.status(404).json({ message: 'Amenity not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default amenitiesController;