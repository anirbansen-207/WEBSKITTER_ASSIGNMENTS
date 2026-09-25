import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    sourceCity: {
      type: String,
      required: true,
      trim: true,
    },

    destinationCity: {
      type: String,
      required: true,
      trim: true,
    },

    intermediateStops: {
      type: [String],
      default: [],
    },

    boardingPoints: {
      type: [String],
      default: [],
    },

    droppingPoints: {
      type: [String],
      default: [],
    },

    routeDistance: {
      type: Number,
      required: true,
      min: 0,
    },

    routeStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("Route", routeSchema);

export default Route;