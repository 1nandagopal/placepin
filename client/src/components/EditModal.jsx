import React from "react";
import { createPortal } from "react-dom";

import { IoCloseOutline } from "react-icons/io5";
import Form from "../components/Form";

function EditModal() {
  const modal = (
    <div>
      <div>
        <h2>Edit Place</h2>
        <IoCloseOutline
          className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-500"
          onClick={closeModal}
        />
        <Form>
          <Input
            name="title"
            label="Title"
            placeholder="Enter updated place title here"
          />
          <Input
            name="description"
            label="Description"
            type="textarea"
            placeholder="Write updated place description here"
          />
          <Input
            name="address"
            label="Address"
            placeholder="Enter updated place address here"
          />
          <div className="flex justify-between">
            <Button color="red">Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  );
  return createPortal;
}

export default EditModal;
