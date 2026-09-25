import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import { getSingleTrip } from "../../services/tripService";

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const {
    data: trip,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getSingleTrip(tripId),
    enabled: !!tripId,
  });

  if (isLoading) {
    return <p>Loading trip details...</p>;
  }

  if (isError) {
    return <p>Failed to load trip: {error.message}</p>;
  }

  if (!trip) {
    return <p>Trip not found.</p>;
  }

  return (
    <div>
      <h1>Trip Details</h1>

      <h2>{trip.busId?.busName}</h2>

      <p>Bus Number: {trip.busId?.busNumber}</p>

      <p>From: {trip.routeId?.sourceCity}</p>

      <p>To: {trip.routeId?.destinationCity}</p>

      <p>Travel Date: {trip.travelDate}</p>

      <p>Departure: {trip.departureTime}</p>

      <p>Trip Status: {trip.tripStatus}</p>

      <button onClick={() => navigate(`/customer/trips/${tripId}/seats`)}>
        Select Seats
      </button>
    </div>
  );
};

export default TripDetails;
