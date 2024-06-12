import React, { useEffect, useState } from "react";
import useHTTP from "../hooks/useHTTP";

function Places() {
  const [places, setPlaces] = useState([]);
  const { sendRequest, isLoading, error } = useHTTP();
  useEffect(() => {
    async function getAllPlaces() {
      try {
        const response = await sendRequest("/api/places");
        setPlaces(response.places);
      } catch (err) {
        error && console.error(error);
      }
    }
    getAllPlaces();
  });
  return <div>Places</div>;
}

export default Places;
