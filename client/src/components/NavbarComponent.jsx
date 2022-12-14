/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Image,
  InputGroup,
  Nav,
  Navbar,
  Alert,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import user from "../fakeData/user.json";
import { Error, Success } from "../helpers/toast";
import { AiOutlineTransaction } from "react-icons/ai";
import MediaQuery from "react-responsive";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

function NavbarComponent() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState(true);
  const [state, dispatch] = useContext(UserContext);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const navigate = useNavigate();

  function checkUserLogin() {
    const dataLogin = JSON.parse(localStorage.getItem("dataLogin"));
    const email = dataLogin.email;
    const password = dataLogin.password;
    const data = user?.filter(
      (item) => item.email == email && item.password == password
    );
    data[0].role == "admin" ? setIsAdmin(true) : setIsAdmin(false);
    if (!data.length) {
      setIsLogin(false);
      localStorage.removeItem("dataLogin");
      Error({ message: "Silahkan login kembali!" });
    }
    setIsLogin(true);
    setUserData(data[0]);
  }

  useEffect(() => {
    if (localStorage.getItem("dataLogin")) checkUserLogin();
  }, []);

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  // const { email, password, fullName, gender, phone, address } = dataRegister;
  // const { email, password } = dataLogin;

  function handleChangeLogin(e) {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogout() {
    localStorage.removeItem("dataLogin");
    setIsLogin(false);
    setIsAdmin(false);
    Success({ message: "Logout berhasil!" });
  }

  function handleSubmitLogin() {
    const login = user.filter(
      (item) =>
        item.email === dataLogin.email && item.password === dataLogin.password
    );
    console.log(login);
    if (!login.length) {
      return Error({ message: "Email / password salah!" });
    }
    localStorage.setItem("dataLogin", JSON.stringify(login[0]));
    console.log("Login berhasil sebagai", login[0].role);
    setShowLogin(false);
    checkUserLogin();
    Success({ message: "Login berhasil!" });
  }

  function handleChangeRegister(e) {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmitRegister() {
    console.log(dataRegister);
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(dataRegister);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // if (response?.status === 200) {
      //   // Send data to useContext
      //   dispatch({
      //     type: "LOGIN_SUCCESS",
      //     payload: response.data.data,
      //   });

      //   // Status check
      //   if (response.data.data.status === "admin") {
      //     navigate("/transaction");
      //   } else {
      //     navigate("/");
      //   }
      //   const alert = (
      //     <Alert variant="success" className="py-1">
      //       Login success
      //     </Alert>
      //   );
      //   setMessage(alert);
      // }
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  const handleLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(dataLogin);

      // Insert data user to database
      const response = await API.post("/login", body, config);
      console.log(response);

      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status === "admin") {
          navigate("/");
        } else {
          navigate("/");
        }
        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }

      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#1F1F1F" }}
        expand="lg"
        className="fixed-top"
      >
        <div className="mx-5 w-100">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ borderColor: "white", backgroundColor: "white" }}
          />
          <MediaQuery minWidth={1000}>
            <div
              className="position-absolute"
              style={
                !isAdmin
                  ? { top: "15px", left: "45%" }
                  : { top: "15px", left: "5%" }
              }
            >
              <Image src={" /assets/images/dumbflix.png"} />
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={1000}>
            <div
              className="position-absolute"
              style={
                !isAdmin
                  ? { top: "15px", left: "45%" }
                  : { top: "15px", left: "45%" }
              }
            >
              <Image src={" /assets/images/dumbflix.png"} />
            </div>
          </MediaQuery>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100">
              {!isAdmin && (
                <>
                  <Link
                    className="text-white fw-bold d-flex justify-content-start text-decoration-none d-flex align-items-center pt-2 pb-2"
                    style={{ width: "100px" }}
                    to={"/"}
                    id="RouterNavLink"
                  >
                    Home
                  </Link>
                  <Link
                    className="text-white fw-bold d-flex justify-content-start text-decoration-none d-flex align-items-center pt-2 pb-2"
                    style={{ width: "130px" }}
                    to={"/tvseries"}
                    id="RouterNavLink"
                  >
                    TV Shows
                  </Link>
                  <Link
                    className="text-white fw-bold d-flex justify-content-start text-decoration-none d-flex align-items-center pt-2 pb-2"
                    style={{ width: "130px" }}
                    to={"/movies"}
                    id="RouterNavLink"
                  >
                    Movies
                  </Link>
                </>
              )}
              <div className="d-flex w-100 justify-content-end">
                {!isLogin ? (
                  <>
                    <Button
                      style={{
                        backgroundColor: "white",
                        color: "#E50914",
                        fontWeight: "bold",
                        width: "100px",
                        marginRight: "20px",
                      }}
                      onClick={handleShowRegister}
                    >
                      Register
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#E50914",
                        color: "white",
                        fontWeight: "bold",
                        width: "100px",
                      }}
                      onClick={handleShowLogin}
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="black"
                        style={{ backgroundColor: "" }}
                        id="dropdown-basic"
                      >
                        <Image
                          src={userData.image}
                          style={{
                            objectFit: "cover",
                            width: "30px",
                            height: "30px",
                            border: "1px solid white",
                          }}
                          className="rounded-circle"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{
                          backgroundColor: "#1F1F1F",
                          marginTop: "35px",
                        }}
                        className="dropdown-menu-end"
                      >
                        <div
                          style={{
                            width: "0",
                            height: "0",
                            borderLeft: "15px solid transparent",
                            borderRight: "15px solid transparent",
                            borderBottom: "15px solid #1F1F1F",
                            position: "absolute",
                            right: "10px",
                            top: "-15px",
                          }}
                        ></div>
                        {isAdmin && (
                          <>
                            <Dropdown.Item
                              style={{ color: "white" }}
                              className="d-flex align-items-center"
                              onClick={() => navigate("/listfilm")}
                            >
                              <Image
                                src="/assets/icon/film-dd.svg"
                                style={{
                                  objectFit: "cover",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                              <b className="ms-2">Film</b>
                            </Dropdown.Item>
                            <Dropdown.Item
                              style={{ color: "white" }}
                              className="d-flex align-items-center mt-2"
                              onClick={() => navigate("/listtransaction")}
                            >
                              <AiOutlineTransaction
                                style={{
                                  objectFit: "cover",
                                  width: "20px",
                                  height: "20px",
                                  color: "#E50914",
                                }}
                              />
                              <b className="ms-2">Transaction</b>
                            </Dropdown.Item>
                          </>
                        )}
                        {!isAdmin && (
                          <>
                            <Dropdown.Item
                              style={{ color: "white" }}
                              className="d-flex align-items-center"
                              onClick={() => navigate("/profile")}
                            >
                              <Image
                                src="/assets/icon/profile-dd.svg"
                                style={{
                                  objectFit: "cover",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                              <b className="ms-2">Profile</b>
                            </Dropdown.Item>
                            <Dropdown.Item
                              style={{ color: "white" }}
                              className="d-flex align-items-center mt-2"
                              onClick={() => navigate("/payment")}
                            >
                              <Image
                                src="/assets/icon/pay-dd.svg"
                                style={{
                                  objectFit: "cover",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                              <b className="ms-2">Pay</b>
                            </Dropdown.Item>
                          </>
                        )}
                        <hr style={{ color: "white" }} />
                        <Dropdown.Item
                          style={{ color: "white" }}
                          className="d-flex align-items-center"
                          onClick={handleLogout}
                        >
                          <Image
                            src="/assets/icon/logout-dd.svg"
                            style={{
                              objectFit: "cover",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <b className="ms-2">Logout</b>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* // Login Modal */}
      {message && message}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Body
          style={{
            backgroundColor: "#1F1F1F",
            color: "white",
            padding: "30px",
            border: "2px solid black",
          }}
          className="rounded"
        >
          <h2>
            <b>Login</b>
          </h2>
          <Form className="mt-4" onSubmit={(e) => handleLogin.mutate(e)}>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Email"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeLogin}
                name="email"
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitLogin();
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Password"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeLogin}
                name="password"
                type="password"
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitLogin();
                }}
              />
            </InputGroup>
            <Button
              style={{
                backgroundColor: "#E50914",
                color: "white",
                borderRadius: "5px",
              }}
              className="w-100 pt-2 pb-2 mt-3"
              onClick={handleSubmitLogin}
              type="submit"
            >
              <b>Login</b>
            </Button>
            <div className="mt-3 w-100 d-flex justify-content-center">
              <p>
                Don't have an account ?
                <b
                  style={{ cursor: "pointer" }}
                  className="ms-1"
                  onClick={() => {
                    console.log("oke");
                    handleCloseLogin();
                    handleShowRegister();
                  }}
                >
                  Register Here
                </b>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* // Register Modal */}
      {message && message}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Body
          style={{
            backgroundColor: "#1F1F1F",
            color: "white",
            padding: "30px",
            border: "2px solid black",
          }}
          className="rounded"
        >
          <h2>
            <b>Register</b>
          </h2>
          <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Email"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                name="email"
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Password"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                type="password"
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="password"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Full Name"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="fullName"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Gender"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="gender"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Phone"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="phone"
              />
            </InputGroup>
            <InputGroup className="mb-3 mt-3">
              <Form.Control
                placeholder="Address"
                style={{
                  backgroundColor: "#4C4C4C",
                  borderColor: "white",
                  color: "white",
                }}
                onChange={handleChangeRegister}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleSubmitRegister();
                }}
                name="address"
              />
            </InputGroup>
            <Button
              style={{
                backgroundColor: "white",
                color: "#E50914",
                borderRadius: "5px",
              }}
              type="submit"
              className="w-100 pt-2 pb-2 mt-3"
              onClick={handleSubmitRegister}
            >
              <b>Register</b>
            </Button>
            <div className="mt-3 w-100 d-flex justify-content-center">
              <p>
                Already have an account ?
                <b
                  style={{ cursor: "pointer" }}
                  className="ms-1"
                  onClick={() => {
                    console.log("oke");
                    handleCloseRegister();
                    handleShowLogin();
                  }}
                >
                  Login Here
                </b>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <div style={{ marginBottom: "50px" }}></div>
    </>
  );
}

export default NavbarComponent;
