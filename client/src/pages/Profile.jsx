/* eslint-disable */
import NavbarComponent from "../components/NavbarComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Error } from '../helpers/toast'

function Profile() {
  document.title = `Profile | Dumbflix`

  const [userData, setUserData] = useState([])
  const navigate = useNavigate()

  function getUserData() {
    if (!localStorage.getItem("dataLogin")) {
      navigate("/")
      Error({ message: "Silahkan login terlebih dahulu!" })
    }

    const data = JSON.parse(localStorage.getItem("dataLogin"))
    console.log(data)
    setUserData(data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <NavbarComponent />
      <div className="bg-black h-100">
        <Container
          fluid
          className="bg-black pb-5"
          style={{ color: "white", height: "100vh", paddingTop: "69px" }}
        >
          <Row className="bg-dark m-auto w-50 p-4 ">
            <Col sm={12} md={12} lg={8} xl={8}>
              <h1>Personal info</h1>
              <div className="d-flex pt-3">
                <img src={'/assets/icon/avatar.svg'} alt="avatar" />
                <div className="p-2">
                  <h6 className="mb-1">{userData.fullName}</h6>
                  <h6
                    style={{
                      fontSize: "10px",
                      marginBottom: "0px",
                      color: "#8A8C90",
                    }}
                  >
                    Full Name
                  </h6>
                </div>
              </div>
              <div className="d-flex">
                <img src={'/assets/icon/letter.svg'} alt="avatar" />
                <div className="p-2">
                  <h6 className="mb-1">{userData.email}</h6>
                  <h6
                    style={{
                      fontSize: "10px",
                      marginBottom: "0px",
                      color: "#8A8C90",
                    }}
                  >
                    Email
                  </h6>
                </div>
              </div>
              <div className="d-flex">
                <img src={'/assets/icon/shape.svg'} alt="avatar" />
                <div className="p-2">
                  <h6 className="mb-1">{userData.status}</h6>
                  <h6
                    style={{
                      fontSize: "10px",
                      marginBottom: "0px",
                      color: "#8A8C90",
                    }}
                  >
                    Status
                  </h6>
                </div>
              </div>
              <div className="d-flex">
                <img src={'/assets/icon/gender.svg'} alt="avatar" />
                <div className="p-2">
                  <h6 className="mb-1">{userData.gender}</h6>
                  <h6
                    style={{
                      fontSize: "10px",
                      marginBottom: "0px",
                      color: "#8A8C90",
                    }}
                  >
                    Gender
                  </h6>
                </div>
              </div>
              <div className="d-flex">
                <img src={'/assets/icon/phone.svg'} alt="avatar" />
                <div className="p-2">
                  <h6 className="mb-1">{userData.phone}</h6>
                  <h6
                    style={{
                      fontSize: "10px",
                      marginBottom: "0px",
                      color: "#8A8C90",
                    }}
                  >
                    Mobile phone
                  </h6>
                </div>
              </div>
              <div className="d-flex">
                <img src={'/assets/icon/map.svg'} alt="avatar" />
                <div className="p-2">
                  <h6 className="mb-1">
                    {userData.email}
                  </h6>
                  <h6
                    style={{
                      fontSize: "10px",
                      marginBottom: "0px",
                      color: "#8A8C90",
                    }}
                  >
                    Address
                  </h6>
                </div>
              </div>
            </Col>
            <Col sm={12} md={12} lg={4} xl={4} className="p-0 justify-content-center">
              <img
                src={userData.image}
                alt="profile"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                className="rounded mb-2"
              />
              <div>
                <button
                  style={{
                    background: "red",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "5px",
                  }}
                  className="w-100"
                >
                  Change Photo Profile
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Profile;
