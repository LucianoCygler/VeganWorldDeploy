import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientData,
  deleteClient,
  updateClientData,
  cleanClient_Id,
  getUserDataByEmail,
} from "../../redux/actions/actions";
import style from "./MyProfile.module.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Login/LoginForm";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";

import axios from "axios";

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/da6d9ru3s/upload",
      formData
    );
    console.log("Imagen subida:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    alert("Error al cargar la imagen:", error);
    return null;
  }
};

const MyData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const {
    nombre,
    apellido,
    email,
    direccion,
    telefono,
    dni,
    ciudad,
    id,
    imagen,
  } = user;
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(user?.nombre || "");
  const [editedSurname, setEditedSurname] = useState(user?.apellido || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [editedPhone, setEditedPhone] = useState(user?.telefono || "");
  const [editedCity, setEditedCity] = useState(user?.ciudad || "");
  const [editedDNI, setEditedDNI] = useState(user?.dni || "");
  const [editedAddress, setEditedAddress] = useState(user?.direccion || "");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedUser, setselectedUser] = useState(user);
  const emailCurrent = localStorage.getItem("email");

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleEditUser = () => {
    setEditMode(true);
  };

  const handleDeleteUser = () => {
    dispatch(deleteClient(id));
    alert("Account deleted");
    window.location.reload();
  };

  const handleSaveUser = async () => {
    try {
      if (profileImage) {
        // Subir imagen a Cloudinary
        const url = await uploadImage(profileImage);
        if (url) {
          var imageUrl = url;
        }
      }

      const newUser = {
        nombre: editedName,
        apellido: editedSurname,
        email: editedEmail,
        ciudad: editedCity,
        telefono: editedPhone,
        direccion: editedAddress,
        DNI: editedDNI,
        imagen: imageUrl,
      };

      setselectedUser(newUser);
      dispatch(updateClientData(id, newUser));
      alert("Client Data updated");
      setEditMode(false);
    } catch (error) {
      alert("Error al guardar los datos del cliente");
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(getUserDataByEmail(emailCurrent));
  }, [emailCurrent]);

  useEffect(() => {
    if (user) {
      dispatch(getClientData(user.id));
    }
  }, [selectedUser, editMode]);

  return (
    <div>
      {!emailCurrent ? (
        <div className={style.divLogin}>
          <h2>
            Hey, I see that you are trying to access your Profile, but to do so,
            you must first be logged in.
          </h2>
          <Button variant="primary" onClick={handleShowModal}>
            Click here to log in!{" "}
          </Button>
        </div>
      ) : (
        <div className={style.container}>
          {editMode ? (
            <div className={style.edit}>
              <div className={style.divFlex}>
                <h3 className={style.h3}>First Name:</h3>
                <input
                  className={style.input1}
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className={style.divFlex}>
                <h3 className={style.h3}>Surname:</h3>
                <input
                  className={style.input2}
                  type="text"
                  value={editedSurname}
                  onChange={(e) => setEditedSurname(e.target.value)}
                />
              </div>
              <div className={style.divFlex}>
                <h3 className={style.h3}>Email:</h3>
                <input
                  className={style.input3}
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>
              <div className={style.divFlex}>
                <h3 className={style.h3}>Phone:</h3>
                <input
                  className={style.input4}
                  type="text"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
              </div>
              <div className={style.divFlex}>
                <h3 className={style.h3}>City:</h3>
                <input
                  className={style.input5}
                  type="text"
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                />
              </div>
              <div className={style.divFlex}>
                <h3 className={style.h3}>Address</h3>
                <input
                  className={style.input6}
                  type="text"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                />{" "}
              </div>
              <input
                className={style.input8B}
                type="file"
                onChange={handleImageChange}
              />{" "}
              <Button
                right={"170px"}
                onClick={handleSaveUser}
                marginTop={"10em"}
                marginBottom={"3em"}
              >
                Save Data
              </Button>
            </div>
          ) : (
            <Box>
              <Box marginTop={"7em"}>
                <Text
                  fontSize={"30px"}
                  color="white"
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                  position="relative"
                >
                  PROFILE
                  <Text
                    as="span"
                    position="absolute"
                    left={"212px"}
                    bottom={-5} // Ajusta este valor según el espaciado deseado
                    width="30%"
                    height="3px"
                    background="orange"
                  />
                </Text>
              </Box>
              <div className={style.c}>
                {imagen ? (
                  <Image
                    w={"220px"}
                    h={"220px"}
                    borderRadius={"50%"}
                    alt="Default Profile"
                    src={imagen}
                    margin={"auto"}
                    marginBottom={"3em"}
                  />
                ) : (
                  <Box w={"30%"} margin={"1em"}>
                    {/* <Avatar bg="teal.500" size={60} /> */}
                    <Image
                      borderRadius={100}
                      src="https://bit.ly/ryan-florence"
                      alt="Default Profile"
                    />
                  </Box>
                )}
                <Box
                  borderRadius={"2em"}
                  margin={"3em"}
                  paddingTop={"2em"}
                  backgroundColor={"#adadad"}
                  boxShadow={"5px 8px 22px 5px rgba(0,0,0,0.85)"}
                >
                  <Text
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
                    marginBottom={"2em"}
                  >
                    {" "}
                    <h2>
                      {nombre} {apellido}
                    </h2>
                  </Text>
                  <Text color="white" textShadow="2px 2px 4px rgba(0, 0, 0,12)">
                    <p>
                      <span style={{ fontWeight: "bold" }}> Email: </span>
                      {email}
                    </p>
                  </Text>
                  <Text
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
                  >
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Phone Number:{" "}
                      </span>
                      {telefono}
                    </p>
                  </Text>
                  <Text
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
                  >
                    {" "}
                    <p>
                      <span style={{ fontWeight: "bold" }}> City: </span>
                      {ciudad}
                    </p>
                  </Text>
                  <Text
                    color="white"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 12)"
                  >
                    {" "}
                    <p>
                      <span style={{ fontWeight: "bold" }}> Address: </span>
                      {direccion}
                    </p>
                  </Text>
                  {/* {!dni ? (
            " "
          ) : (
            <p>
              <span style={{ fontWeight: "bold" }}> DNI: </span> {dni}
            </p>
          )} */}

                  <Button
                    shadow="2px 2px 4px rgba(0, 0, 0, 1)"
                    w={"100px"}
                    h={"40px"}
                    variant="solid"
                    colorScheme="teal"
                    marginTop={4}
                    marginBottom={4}
                    onClick={handleEditUser}
                  >
                    <Text fontSize={"15px"} margin={"10px"}>
                      Edit User
                    </Text>
                  </Button>
                </Box>
              </div>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default MyData;
