import React, { useContext, useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import useHTTP from "../hooks/useHTTP";
import { AuthContext } from "../context/authContext";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

function MyPlaces() {
  const [places, setPlaces] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const { sendRequest, error } = useHTTP();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await sendRequest(`/api/places/user/${auth.userId}`);
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
      await sendRequest(`/api/places/${id}`, "delete", null, {
        Authorization: "Bearer " + auth.token,
      });
      setDeleteModal(false);
      setPlaces((state) => state.filter((place) => place.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <div>
      {deleteModal && (
        <DeleteModal
          id={deleteModal}
          deletePlace={deletePlace}
          closeModal={closeDeleteModal}
        />
      )}
      <EditModal />
      <h2 className="text-3xl my-4">My Places</h2>
      <PlaceList places={places} deletePlace={handleDeletePlace} />
    </div>
  );
}

export default MyPlaces;
