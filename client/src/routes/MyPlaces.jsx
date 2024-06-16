import React, { useState } from "react";
import PlaceList from "../components/PlaceList";

function MyPlaces() {
  const [places, setPlaces] = useState([]);
  return (
    <div>
      <h2 className="text-3xl my-4">My Places</h2>
      <PlaceList places={places} />
    </div>
  );
}

export default MyPlaces;
