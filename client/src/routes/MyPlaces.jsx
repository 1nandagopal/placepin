const { VITE_API_URL } = import.meta.env;
import React, { useContext, useEffect, useState } from "react";

import PlaceList from "../components/PlaceList";
import useHTTP from "../hooks/useHTTP";
import { AuthContext } from "../context/authContext";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import NavBar from "../components/NavBar";

function MyPlaces() {
  const [places, setPlaces] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { sendRequest, error } = useHTTP();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await sendRequest(
          `${VITE_API_URL}/api/places/user/${auth.userId}`
        );
        setPlaces(response.places);
      } catch (err) {
        if (err) console.error(error);
      }
    };
    if (auth.isLoggedIn) getPlaces();
  }, [auth]);

  const handleDeletePlace = (placeId) => {
    setDeleteModal(placeId);
  };

  const deletePlace = async (id) => {
    try {
      await sendRequest(`${VITE_API_URL}/api/places/${id}`, "delete", null, {
        Authorization: "Bearer " + auth.token,
      });
      setDeleteModal(false);
      setPlaces((state) => state.filter((place) => place.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlace = async ({ id, title, address, description }) => {
    try {
      const response = await sendRequest(
        `${VITE_API_URL}/api/places/${id}`,
        "patch",
        { title, address, description },
        { Authorization: "Bearer " + auth.token }
      );
      setPlaces((state) =>
        state.map((place) => (place.id === response.id ? response : place))
      );
      setEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleEditPlace = (placeId) => {
    setEditModal(placeId);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  return (
    <div>
      <NavBar />
      {editModal && (
        <EditModal
          placeId={editModal}
          updatePlace={updatePlace}
          closeModal={closeEditModal}
        />
      )}
      {deleteModal && (
        <DeleteModal
          id={deleteModal}
          deletePlace={deletePlace}
          closeModal={closeDeleteModal}
        />
      )}
      <div className="px-2">
        <h2 className="text-3xl my-4">My Places</h2>
        <PlaceList
          places={places}
          editPlace={handleEditPlace}
          deletePlace={handleDeletePlace}
        />
      </div>
    </div>
  );
}

export default MyPlaces;
