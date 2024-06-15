import React from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

function NewPlace() {
  return (
    <Form>
      <Input name="title" label="Title" placeholder="Enter place title here" />
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
  );
}

export default NewPlace;
