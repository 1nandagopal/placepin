import React, { useContext } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import useHTTP from "../hooks/useHTTP";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function NewPlace() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest, isLoading, error } = useHTTP();

  const handleFormSubmit = async (data) => {
    try {
      await sendRequest(
        "/api/places/new",
        "post",
        { ...data, image: data.image[0] },
        {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/myplaces");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl text-white">
      <h2 className="my-4 text-3xl font-semibold">Add a new place</h2>
      <Form onSubmit={handleFormSubmit}>
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
        <div className="text-red-400 text-sm w-full h-6">{error}</div>
        <Button type="submit" isLoading={isLoading} classes="text-base w-32">
          Add Place
        </Button>
      </Form>
    </div>
  );
}

export default NewPlace;
