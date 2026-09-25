import {
  createRouteService,
  getAllRoutesService,
  getSingleRouteService,
  updateRouteService,
  deleteRouteService,
} from "../services/routeService.js";

import { successResponse } from "../utils/response.js";


// CREATE ROUTE
export const createRouteController = async (req, res, next) => {
  try {
    const route = await createRouteService(req.body);

    return successResponse(
      res,
      201,
      "Route created successfully",
      route
    );
  } catch (error) {
    next(error);
  }
};


// GET ALL ROUTES
export const getAllRoutesController = async (req, res, next) => {
  try {
    const routes = await getAllRoutesService();

    return successResponse(
      res,
      200,
      "Routes fetched successfully",
      routes
    );
  } catch (error) {
    next(error);
  }
};


// GET SINGLE ROUTE
export const getSingleRouteController = async (req, res, next) => {
  try {
    const { routeId } = req.params;

    const route = await getSingleRouteService(routeId);

    return successResponse(
      res,
      200,
      "Route fetched successfully",
      route
    );
  } catch (error) {
    next(error);
  }
};


// UPDATE ROUTE
export const updateRouteController = async (req, res, next) => {
  try {
    const { routeId } = req.params;

    const updatedRoute = await updateRouteService(
      routeId,
      req.body
    );

    return successResponse(
      res,
      200,
      "Route updated successfully",
      updatedRoute
    );
  } catch (error) {
    next(error);
  }
};


// DELETE ROUTE
export const deleteRouteController = async (req, res, next) => {
  try {
    const { routeId } = req.params;

    const deletedRoute = await deleteRouteService(routeId);

    return successResponse(
      res,
      200,
      "Route deleted successfully",
      deletedRoute
    );
  } catch (error) {
    next(error);
  }
};