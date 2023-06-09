import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";
import {
  getClientData,
  getUserDataByEmail,
  logoutUser,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import PopUpLogin from "../../Views/Login/PopUpLogin";
import { useLocation } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Image, Img } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import DrawerMenu from "./Drawer";

function NavBar() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  const location = useLocation();
  const emailCurrent = localStorage.getItem("email");
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    dispatch(getUserDataByEmail(email));
  }, [email]);

  //asd
  return (
    <div className={styles.mainContainer}>
      <div className={styles.divLeft}>
        <DrawerMenu />
        <NavLink to="/" className={styles.link}>
          <h1 className={styles.tittle}>
            <Text
              fontWeight={"semibold"}
              display={"inline"}
              color={"lightseagreen"}
              marginRight={-3}
              fontFamily="Montserrat"
            >
              {" "}
              Vegan
            </Text>{" "}
            <Text display="inline" fontFamily="Montserrat">World!</Text>
          </h1>
        </NavLink>
      </div>
      <div className={styles.divMid}>
        {location.pathname === "/OurProducts" ? <SearchBar /> : ""}
      </div>
      <div className={styles.divRight}>
        <NavLink to="/Cart" className={styles.link}>
          <FontAwesomeIcon
            icon={faCartShopping}
            className={styles.fontAwesome}
          />
        </NavLink>
        {email ? (
          <Box>
            <NavLink to="/MyProfile">
              <Image
                w={"50px"}
                h={"50px"}
                borderRadius={"50%"}
                src={user.imagen}
              ></Image>
            </NavLink>
          </Box>
        ) : (
          <PopUpLogin />
        )}
        {!email ? (
          ""
        ) : (
          <NavLink to="/" className={styles.link}>
            <FontAwesomeIcon
              onClick={handleLogout}
              icon={faRightFromBracket}
              className={styles.fontAwesome}
            />
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;
