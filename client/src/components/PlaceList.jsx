import React from "react";
import PlaceItem from "./PlaceItem";

function PlaceList({ places }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {places.map((place) => (
        <PlaceItem place={place} key={place.id} />
      ))}
    </div>
  );
}

export default PlaceList;
