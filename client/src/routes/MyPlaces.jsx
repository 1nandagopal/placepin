import React, { useContext, useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import useHTTP from "../hooks/useHTTP";
import { AuthContext } from "../context/authContext";

function MyPlaces() {
  const [places, setPlaces] = useState([]);
  const { sendRequest, error } = useHTTP();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await sendRequest(`/api/places/user/${auth.userId}`);
        setPlaces(response.places);
      } catch (err) {
        if (err) console.error(error);
      }
    };
    if (auth.isLoggedIn) getPlaces();
  }, [auth]);

  return (
    <div>
      <h2 className="text-3xl my-4">My Places</h2>
      <PlaceList places={places} />
    </div>
  );
}

export default MyPlaces;
