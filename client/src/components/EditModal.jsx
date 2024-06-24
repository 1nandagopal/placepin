const { VITE_API_URL } = import.meta.env;
import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import useHTTP from "../hooks/useHTTP";
import {
  addressValidators,
  descriptionValidators,
  titleValidators,
} from "../utils/validators";

function EditModal({ placeId, updatePlace, closeModal }) {
  const [place, setPlace] = useState(null);
  const { sendRequest, error } = useHTTP();

  useEffect(() => {
    const getPlaceById = async (placeId) => {
      const response = await sendRequest(
        `${VITE_API_URL}/api/places/${placeId}`
      );
      const { title, address, description } = response;
      setPlace({ title, address, description });
    };
    if (placeId) getPlaceById(placeId);
  }, []);

  const handleSubmit = async (data) => {
    const { title, address, description } = data;
    await updatePlace({ id: placeId, title, address, description });
    closeModal();
  };

  const modal = (
    <div className="h-screen fixed top-0 left-0 w-full bg-black/70 z-10 text-white flex items-center justify-center">
      <div className="relative w-full max-w-3xl max-h-full rounded-lg border-2 border-gray-700 bg-gray-900 p-10">
        <h2 className="my-4 text-3xl font-semibold">Edit Place</h2>
        <IoCloseOutline
          className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-500"
          onClick={closeModal}
        />
        <Form onSubmit={handleSubmit} defaultValues={place}>
          <Input
            name="title"
            validators={titleValidators}
            label="Title"
            placeholder="Enter updated place title here"
          />
          <Input
            name="description"
            validators={descriptionValidators}
            label="Description"
            type="textarea"
            placeholder="Write updated place description here"
          />
          <Input
            name="address"
            validators={addressValidators}
            label="Address"
            placeholder="Enter updated place address here"
          />
          <div className="text-red-400 text-sm w-full h-6">{error}</div>
          <div className="flex justify-between">
            <Button color="red" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
  return createPortal(modal, document.getElementById("modal"));
}

export default EditModal;
