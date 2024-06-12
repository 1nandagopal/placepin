import React, { useEffect, useState } from "react";
import useHTTP from "../hooks/useHTTP";
import PlaceList from "../components/PlaceList";

function Places() {
  const [places, setPlaces] = useState([]);
  const { sendRequest, isLoading, error } = useHTTP();

  useEffect(() => {
    async function getAllPlaces() {
      try {
        const response = await sendRequest("/api/places");
        setPlaces(response.places);
      } catch (err) {
        if (err) console.error(error);
      }
    }
    getAllPlaces();
  }, []);

  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : places.length > 0 ? (
        <PlaceList places={places} />
      ) : (
        <Link to="/auth">
          <div className="flex flex-col p-10 mt-24 space-y-5 justify-center items-center max-w-md border-2 border-gray-400 rounded-lg border-dashed m-auto">
            <GoPlusCircle className="text-4xl" />
            <h3 className="text-xl">No places found</h3>
            <h2 className="text-2xl">Click to create places</h2>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Places;
