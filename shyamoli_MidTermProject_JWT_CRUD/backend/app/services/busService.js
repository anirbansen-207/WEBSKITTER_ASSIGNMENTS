import Bus from "../models/Bus.js";
import Trip from "../models/Trip.js";

// CREATE BUS
export const createBusService = async ({
  busNumber,
  busName,
  busType,
  totalSeats,
  ticketPrice,
  createdBy,
}) => {
  try {
    const existingBus =
      await Bus.findOne({
        busNumber,
      });

    if (existingBus) {
      const error = new Error(
        "Bus already exists",
      );

      error.statusCode = 409;
      throw error;
    }

    const createBus =
      await Bus.create({
        busNumber,
        busName,
        busType,
        totalSeats,
        availableSeats:
          totalSeats,
        ticketPrice,
        createdBy,
        isActive: true,
      });

    return createBus;
  } catch (error) {
    throw error;
  }
};

// GET ALL BUS
export const getAllBusService =
  async () => {
    try {
      const allBus =
        await Bus.find({
          isActive: true,
        });

      return allBus;
    } catch (error) {
      throw error;
    }
  };

// GET SINGLE BUS
export const getSingleBusService =
  async (busId) => {
    try {
      const singleBus =
        await Bus.findOne({
          _id: busId,
          isActive: true,
        });

      if (!singleBus) {
        const error = new Error(
          "Bus not found",
        );

        error.statusCode = 404;
        throw error;
      }

      return singleBus;
    } catch (error) {
      throw error;
    }
  };

// UPDATE BUS
export const updateBusService =
  async (busId, data) => {
    try {
      const updateBus = {};

      if (data.busName !== undefined) {
        updateBus.busName =
          data.busName;
      }

      if (data.busType !== undefined) {
        updateBus.busType =
          data.busType;
      }

      if (
        data.ticketPrice !==
        undefined
      ) {
        updateBus.ticketPrice =
          data.ticketPrice;
      }

      const updatedBus =
        await Bus.findOneAndUpdate(
          {
            _id: busId,
            isActive: true,
          },
          updateBus,
          {
            new: true,
            runValidators: true,
          },
        );

      if (!updatedBus) {
        const error = new Error(
          "Bus not found",
        );

        error.statusCode = 404;
        throw error;
      }

      return updatedBus;
    } catch (error) {
      throw error;
    }
  };

// DELETE BUS
export const deleteBusService =
  async (busId) => {
    try {
      const bus =
        await Bus.findOne({
          _id: busId,
          isActive: true,
        });

      if (!bus) {
        const error = new Error(
          "Bus not found",
        );

        error.statusCode = 404;
        throw error;
      }

      // Don't delete a bus referenced by a trip
      const trip =
        await Trip.findOne({
          busId,
        });

      if (trip) {
        const error = new Error(
          "Bus cannot be deleted because it is used by a trip",
        );

        error.statusCode = 400;
        throw error;
      }

      await Bus.findByIdAndDelete(
        busId,
      );

      return bus;
    } catch (error) {
      throw error;
    }
  };

// GET BUS BY NUMBER
export const getBusDetailsByBusNumberService =
  async (busNumber) => {
    try {
      const busDetails =
        await Bus.findOne({
          busNumber,
          isActive: true,
        });

      if (!busDetails) {
        const error = new Error(
          "Bus not found",
        );

        error.statusCode = 404;
        throw error;
      }

      return busDetails;
    } catch (error) {
      throw error;
    }
  };

// ADJUST BUS SEATS
export const adjustBusSeatService =
  async (
    busNumber,
    totalSeats,
  ) => {
    try {
      const bus =
        await Bus.findOne({
          busNumber,
          isActive: true,
        });

      if (!bus) {
        const error = new Error(
          "Bus not found",
        );

        error.statusCode = 404;
        throw error;
      }

      const bookedSeats =
        bus.totalSeats -
        bus.availableSeats;

      if (totalSeats < bookedSeats) {
        const error = new Error(
          "New total seats cannot be less than already booked seats",
        );

        error.statusCode = 400;
        throw error;
      }

      const newAvailableSeats =
        totalSeats -
        bookedSeats;

      const updatedBus =
        await Bus.findOneAndUpdate(
          {
            busNumber,
            isActive: true,
          },
          {
            totalSeats,
            availableSeats:
              newAvailableSeats,
          },
          {
            new: true,
            runValidators: true,
          },
        );

      return updatedBus;
    } catch (error) {
      throw error;
    }
  };