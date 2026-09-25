import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../../services/tripService";
import { useNavigate } from "react-router-dom";

const CustomerTrips = () => {
  const navigate = useNavigate();

  const {
    data: trips,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips,
  });

  if (isLoading) {
    return <p>Loading trips...</p>;
  }

  if (isError) {
    return <p>Failed to load trips: {error.message}</p>;
  }

  return (
    <div>
      <h1>Available Trips</h1>

      {trips?.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        trips?.map((trip) => (
          <div key={trip._id}>
            <h3>{trip.busId?.busName}</h3>

            <p>From: {trip.routeId?.sourceCity}</p>

            <p>To: {trip.routeId?.destinationCity}</p>

            <p>Travel Date: {trip.travelDate}</p>

            <p>Departure: {trip.departureTime}</p>

            <button onClick={() => navigate(`/customer/trips/${trip._id}`)}>
              View Trip
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerTrips;
