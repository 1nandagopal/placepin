import React from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "./Button";

function DeleteModal({ id, deletePlace, closeModal }) {
  const handleDelete = () => deletePlace(id);

  const modal = (
    <div className="h-screen fixed top-0 left-0 w-full bg-black/70 z-10 text-white flex items-center justify-center">
      <div className="relative w-full max-w-xl max-h-full rounded-lg border-2 border-gray-700 bg-gray-900 p-10 space-y-5">
        <IoCloseOutline
          className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-500"
          onClick={closeModal}
        />
        <h2 className="text-3xl font-semibold">Delete Place</h2>
        <p>Are you sure you want to delete this place?</p>
        <div className="flex justify-between">
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            color="red"
            onClick={handleDelete}
            classes="flex items-center gap-1"
          >
            <FaRegTrashAlt />
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
  return createPortal(modal, document.getElementById("modal"));
}

export default DeleteModal;
