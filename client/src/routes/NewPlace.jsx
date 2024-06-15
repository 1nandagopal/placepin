import React from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

function NewPlace() {
  return (
    <div className="mx-auto max-w-3xl text-white">
      <h2 className="my-4 text-3xl font-semibold">Add a new place</h2>
      <Form>
        <Input
          name="title"
          label="Title"
          placeholder="Enter place title here"
        />
        <Input name="image" label="Upload image" type="file" />
        <Input
          name="description"
          label="Description"
          type="textarea"
          placeholder="Write place description here"
        />
        <Input
          name="address"
          label="Address"
          placeholder="Enter place address here"
        />
        <Button type="submit" isLoading={false} classes="text-base w-32">
          Add Place
        </Button>
      </Form>
    </div>
  );
}

export default NewPlace;
