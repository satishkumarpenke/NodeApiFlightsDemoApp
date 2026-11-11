// const admins = require("../model/admin");
const { response } = require("express");
const {flights}= require('../database/connection')
exports.dashboard = async (req, res) => {
  try {
    const item = flights
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.flightById = async (req, res) => {
  try {

    const item = flights.find(i => i.id === parseInt(req.params.id, 10));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.flightDataUpdateById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const flight = flights.find(i => i.id === id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    const {
      flightNumber,
      callsign,
      aircraftType,
      origin,
      destination,
      status,
      departureTime,
      arrivalTime
    } = req.body;

    // Update top-level fields only if provided in the request
    if (flightNumber !== undefined) flight.flightNumber = flightNumber;
    if (callsign !== undefined) flight.callsign = callsign;
    if (aircraftType !== undefined) flight.aircraftType = aircraftType;
    if (status !== undefined) flight.status = status;
    if (departureTime !== undefined) flight.departureTime = departureTime;
    if (arrivalTime !== undefined) flight.arrivalTime = arrivalTime;

    // Safely merge nested origin & destination objects without losing existing keys
    if (origin && typeof origin === 'object') {
      flight.origin = { ...flight.origin, ...origin };
    }

    if (destination && typeof destination === 'object') {
      flight.destination = { ...flight.destination, ...destination };
    }

    return res.status(200).json(flight);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.flightDataDeleteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = flights.findIndex(i => i.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Remove the flight from the array
    const [deletedFlight] = flights.splice(index, 1);

    return res.status(200).json({
      message: 'Flight deleted successfully',
      deletedFlight
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};


