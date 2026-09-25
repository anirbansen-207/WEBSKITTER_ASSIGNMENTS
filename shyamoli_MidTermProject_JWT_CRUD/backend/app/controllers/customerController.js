import {
  viewOwnProfileService,
  updateOwnProfileService,
  cancelBookingService,
  getOwnBookingsService,
  viewTicketService
} from "../services/customerService.js";
import { successResponse } from "../utils/response.js";




// view own profile controller
export const viewOwnProfileController = async (req, res, next) => {
    try {
        // destructure user from req.user
        const { userId: customerId } = req.user;

        // call viewOwnProfileService
        const user = await viewOwnProfileService(customerId);

        // send response
        return successResponse(res, 200, "User found successfully", user);
    } catch (error) {
        next (error);
    }
};

// update own profile controller
export const updateOwnProfileController = async (req, res, next) => {
    try{
        // destructure user from req.user
        const { userId: customerId } = req.user;
        // call updateOwnProfileService
        const customer = await updateOwnProfileService(customerId, req.body);

        // send response
        return successResponse(res, 200, "User updated successfully", customer);
    }catch(error){
        next (error);
    }
}

// get own bookings by CustomerID
export const getOwnBookingsController = async (req, res, next) => {
    try {
        // destructure user from req.user
        const { userId: customerId } = req.user;

        // call getOwnBookingsService
        const bookings = await getOwnBookingsService(customerId);

        // send response
        return successResponse(res, 200, "Bookings found successfully", bookings);
    } catch (error) {
        next (error);
    }
};

// cancel booking controller
export const cancelBookingController = async (req,res,next)=>{
    try{
        // destructure user from req.user
        const { userId: customerId } = req.user;
        const { bookingId } = req.params;

        // call cancelBookingService
        const booking = await cancelBookingService(customerId,bookingId);

        // send response
        return successResponse(res, 200, "Booking cancelled successfully", booking);
    }catch(error){
        next(error);
    }
};

// view ticket controller
export const viewTicketController = async (req, res, next) => {
    try {
        // destructure user from req.user
        const { userId: customerId } = req.user;
        const { bookingId } = req.params;

        // call viewTicketService
        const ticket = await viewTicketService(customerId,bookingId);

        // send response
        return successResponse(res, 200, "Ticket found successfully", ticket);
    } catch (error) {
        next (error);
    }
}