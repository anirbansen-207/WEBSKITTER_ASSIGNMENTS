import {
  createBusService,
  getAllBusService,
  getSingleBusService,
  updateBusService,
  deleteBusService,
  getBusDetailsByBusNumberService,
  adjustBusSeatService,
} from "../services/busService.js";
import { successResponse } from "../utils/response.js";

// create bus controller
export const createBusController = async (req, res, next) => {
  try {
    const { busNumber, busName, busType, totalSeats,ticketPrice } = req.body;

    // pass this data to service layer
    const bus = await createBusService({
      busNumber,
      busName,
      busType,
      totalSeats,
      ticketPrice,
      createdBy: req.user.userId,
    });

    // send response
    return successResponse(res, 201, "Bus created successfully", bus);
  } catch (error) {
    next(error);
  }
};

// view all buses controller
export const getAllBusController = async (req, res, next) => {
  try {
    // call viewAllBusesService
    const allBus = await getAllBusService();

    // send response
    return successResponse(res, 200, "Buses fetched successfully", allBus);
  } catch (error) {
    next(error);
  }
};

// view single bus controller
export const getSingleBusController = async (req, res, next) => {
  try {
    // call viewSingleBusService
    const singleBus = await getSingleBusService(req.params.busId);

    // send response
    return successResponse(res, 200, "Bus fetched successfully", singleBus);
  } catch (error) {
    next(error);
  }
};

// update bus controller
export const updateBusController = async (req, res, next) => {
  try {
    // call updateBusService
    const updatedBus = await updateBusService(req.params.busId, req.body);

    // send response
    return successResponse(res, 200, "Bus updated successfully", updatedBus);
  } catch (error) {
    next(error);
  }
};

// delete bus controller
export const deleteBusController = async (req, res, next) => {
  try {
    //call deleteBusService
    const deletedBus = await deleteBusService(req.params.busId);

    // send response
    return successResponse(res, 200, "Bus deleted successfully", deletedBus);
  } catch (error) {
    next(error);
  }
};

// getbus by bus number controller
export const getBusDetailsByBusNumberController = async (req, res, next) => {
  try {
    // call getBusByBusNumberService
    const busByNumber = await getBusDetailsByBusNumberService(
      req.params.busNumber,
    );

    // send response
    return successResponse(
      res,
      200,
      "Bus fetched successfully by bus number",
      busByNumber,
    );
  } catch (error) {
    next(error);
  }
};

// adjust seat by Bus number controller
export const adjustBusSeatController = async (req, res, next) => {
  try {
    // call adjustBusSeatService
    const busByNumber = await adjustBusSeatService(
      req.params.busNumber,
      req.body.totalSeats,
    );

    // send response
    return successResponse(
      res,
      200,
      "Bus seat adjusted successfully",
      busByNumber,
    );
  } catch (error) {
    next(error);
  }
};
