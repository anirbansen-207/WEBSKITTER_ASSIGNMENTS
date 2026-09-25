import { successResponse } from "../utils/response.js";
import {
  createBookingStaffService,
  viewAllDriversService,
  createDriverService,
  viewAllCustomersService,
  viewAllBookingStaffService,
  viewSingleBookingStaffService,
  viewSingleCustomerService,
  viewSingleDriverService,
  updateBookingStaffService,
  updateDriverService,
  deleteDriverService,
  deleteBookingStaffService,
} from "../services/superAdminService.js";

// create Booking staff controller
export const createBookingStaffController = async (req, res, next) => {
  try {
    // extract data from req.body
    // req.boy comes from authMiddleware
    const { name, email, password, phone } = req.body;

    // get super admin ID from req.user(from auhMiddleware)
    const { userId } = req.user;

    // pass this data to service layer
    const staff = await createBookingStaffService({
      name,
      email,
      password,
      phone,
      createdBy: userId,
    });

    // send response
    return successResponse(
      res,
      201,
      "Booking Staff created successfully",
      staff,
    );
  } catch (error) {
    next(error);
  }
};

// create driver controller
export const createDriverController = async (req, res, next) => {
  try {
    // extract data from req.body
    // req.boy comes from authMiddleware
    const { name, email, password, phone } = req.body;

    // get super admin ID from req.user(from auhMiddleware)
    const { userId } = req.user;

    // pass this data to service layer
    const driver = await createDriverService({
      name,
      email,
      password,
      phone,
      createdBy: userId,
    });

    // send response
    return successResponse(res, 201, "Driver created successfully", driver);
  } catch (error) {
    next(error);
  }
};

// view customer controller
export const viewCustomerController = async (req, res, next) => {
  try {
    // call viewAllCustomersService
    const customers = await viewAllCustomersService();

    // send response
    return successResponse(
      res,
      200,
      "Customers fetched successfully",
      customers,
    );
  } catch (error) {
    next(error);
  }
};

// view single customer controller
export const viewSingleCustomerController = async (req, res, next) => {
    try {
      // call viewSingleDriverService
      const driver = await viewSingleCustomerService(req.params.customerId);
  
      // send response
      return successResponse(res, 200, "Customer fetched successfully", driver);
    } catch (error) {
      next(error);
    }
};

// view driver controller
export const viewDriverController = async (req, res, next) => {
  try {
    // call viewAllDriversService
    const drivers = await viewAllDriversService();

    // send response
    return successResponse(res, 200, "Drivers fetched successfully", drivers);
  } catch (error) {
    next(error);
  }
};

// view single driver controller
export const viewSingleDriverController = async (req, res, next) => {
    try {
      // call viewSingleDriverService
      const driver = await viewSingleDriverService(req.params.driverId);
  
      // send response
      return successResponse(res, 200, "Driver fetched successfully", driver);
    } catch (error) {
      next(error);
    }
};

// view booking staff controller
export const viewBookingStaffController = async (req, res, next) => {
    try{
        // call viewAllBookingStaffService
        const staff = await viewAllBookingStaffService();

        // send response
        return successResponse(res, 200, "Booking Staff fetched successfully", staff);
    }catch(error){
        next(error);
    }
}

// view single booking staff controller
export const viewSingleBookingStaffController = async (req, res, next) => {
    try {
      // call viewSingleDriverService
      const bookingStaff = await viewSingleBookingStaffService(req.params.bookingStaffId);
  
      // send response
      return successResponse(res, 200, "Booking Staff fetched successfully", bookingStaff);
    } catch (error) {
      next(error);
    }
};

// update driver controller
export const updateDriverController = async(req, res, next)=>{
  try {
    const {driverId} = req.params;
    // call update driver service.
    const driver = await updateDriverService(
      driverId, 
      req.body
    );

    return successResponse(
      res,
      200,
      "Driver updated successfully",
      driver
    )
  } catch (error) {
    next(error)
  }
}

// update booking staff controller
export const updateBookingStaffController = async(req, res, next)=>{
  try {
    const {bookingStaffId} = req.params;
    // call update driver service.
    const bookingStaff = await updateBookingStaffService(
      bookingStaffId, 
      req.body
    );

    return successResponse(
      res,
      200,
      "Booking Staff updated successfully",
      bookingStaff
    )
  } catch (error) {
    next(error)
  }
}

// delete driver controller
export const deleteDriverController = async(req, res, next)=>{
  try {
    const {driverId} = req.params;
    // call delete driver service.
    const driver = await deleteDriverService(driverId);

    return successResponse(
      res,
      200,
      "Driver deleted successfully",
      driver
    )
  } catch (error) {
    next(error)
  }
}

// delete booking staff controller
export const deleteBookingStaffController = async(req, res, next)=>{
  try {
    const {bookingStaffId} = req.params;
    // call delete booking staff service.
    const bookingStaff = await deleteBookingStaffService(bookingStaffId);

    return successResponse(
      res,
      200,
      "Booking Staff deleted successfully",
      bookingStaff
    )
  } catch (error) {
    next(error)
  }
}