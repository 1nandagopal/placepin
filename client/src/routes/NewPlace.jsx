import React, { useContext, useEffect } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import useHTTP from "../hooks/useHTTP";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  addressValidators,
  descriptionValidators,
  imageValidators,
  titleValidators,
} from "../utils/validators";
import NavBar from "../components/NavBar";

function NewPlace() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest, isLoading, error } = useHTTP();

  useEffect(() => {
    if (!auth.isLoggedIn) navigate("/auth");
  }, []);

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
    auth.isLoggedIn && (
      <>
        <NavBar />
        <div className="mx-auto max-w-3xl text-white">
          <h2 className="my-4 text-3xl font-semibold">Add a new place</h2>
          <Form onSubmit={handleFormSubmit}>
            <Input
              name="title"
              validators={titleValidators}
              label="Title"
              placeholder="Enter place title here"
            />
            <Input
              name="image"
              validators={imageValidators}
              label="Upload image"
              type="file"
            />
            <Input
              name="description"
              validators={descriptionValidators}
              label="Description"
              type="textarea"
              placeholder="Write place description here"
            />
            <Input
              name="address"
              validators={addressValidators}
              label="Address"
              placeholder="Enter place address here"
            />
            <div className="text-red-400 text-sm w-full h-6">{error}</div>
            <Button
              type="submit"
              isLoading={isLoading}
              classes="text-base w-32"
            >
              Add Place
            </Button>
          </Form>
        </div>
      </>
    )
  );
}

export default NewPlace;
