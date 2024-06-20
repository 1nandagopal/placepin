import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Button from "./Button";
import { useLocation } from "react-router-dom";

function PlaceItem({ place, editPlace, deletePlace }) {
  const { id, title, description, image, address, creator } = place;
  const { pathname } = useLocation();

  const isEdittable = editPlace && deletePlace && true;

  const handleDelete = () => {
    if (deletePlace) deletePlace(id);
  };

  const handleEdit = () => {
    if (editPlace) editPlace(id);
  };

  return (
    <div className="group border rounded bg-gray-800 border-gray-700 text-white flex overflow-hidden min-h-64">
      <div className="relative w-2/5">
        <img
          className="absolute w-full h-full object-cover object-bottom"
          src={`http://localhost:5000/${image}`}
        />
        {isEdittable && (
          <div className="absolute w-full bottom-0 flex gap-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button onClick={handleEdit} classes="rounded-md p-1 flex-1">
              EDIT
            </Button>
            <Button
              onClick={handleDelete}
              color="red"
              classes="rounded-md p-1 flex-1"
            >
              DELETE
            </Button>
          </div>
        )}
      </div>
      <div className="relative p-3 space-y-4 w-3/5 mb-6">
        <h1 className="text-2xl font-semibold capitalize">{title}</h1>
        <p className="text-sm text-justify pr-2 h-24 break-words line-clamp-5 group-hover:overflow-y-auto group-hover:line-clamp-none">
          {description}
        </p>
        <div className="flex items-center gap-1">
          <FaLocationDot className="shrink-0" />
          <h3 title={address} className="line-clamp-2 leading-tight">
            {address}
          </h3>
          {pathname !== "/myplaces" && (
            <span className="absolute -bottom-4">By {creator.userName}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceItem;
