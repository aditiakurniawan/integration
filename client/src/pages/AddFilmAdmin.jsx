/* eslint-disable */
import NavbarComponent from "../components/NavbarComponent";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { IoMdAttach } from "react-icons/io";
import { BsCaretDown, BsPlus } from "react-icons/bs";
import { useState } from "react";

function AddFilmAdmin() {

  document.title = "Add Film | Dumbflix"

  const [episodeCounter, setEpisodeCounter] = useState(1)

  function handlePlusEpisode(e) {
    e.preventDefault()
    console.log("add plus")
  }

  return (
    <>
      <NavbarComponent />
      <div
        className="bg-black text-white py-5"
        style={{ padding: "0px 170px" }}
      >
        <h5 className="fw-bold mb-5 ">Add Film</h5>
        <Form className="secondary">
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="Title"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                }}
              />
            </Col>

            <Col md={12} lg={4} xl={3}>
              <label
                htmlFor="attach"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  // width: "350px",
                  // height: "50px",
                  padding: "8px 40px 8px 40px",
                  color: "#6C757D",
                  borderRadius: "6px",
                  border: "1px solid white",
                  fontSize: "14px",
                  fontWeight: "lighter",
                }}
              >
                Attach Thumbnail
                <IoMdAttach
                  style={{
                    color: "#E50914",
                    // marginLeft: "70px",
                    fontSize: "30px",
                    marginLeft: "8px",
                  }}
                />
              </label>
              <input type="file" name="attach" id="attach" hidden />
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Control
              style={{
                background: "rgba(210, 210, 210, 0.25)",
                height: "50px",
              }}
              type="number"
              placeholder="Year"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridAddress2">
            <Dropdown align={{ lg: "end" }}>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
                className="py-1  w-100 "
                style={{
                  border: "1px solid white",
                  background: "rgba(210, 210, 210, 0.25)",
                  color: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                }}
              >
                <div className="d-grid gap-3 d-md-flex justify-content-md-between">
                  <label
                    htmlFor=""
                    style={{
                      marginTop: "6px",
                    }}
                  >
                    Category
                  </label>
                  <BsCaretDown
                    style={{
                      color: "#6C757D",
                      fontSize: "30px",
                      marginTop: "4px",
                    }}
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                variant="dark"
                className="bg-black mt-4"
                style={{
                  border: "1px solid white",
                  backgroundColor: "rgba(210, 210, 210, 0.25)",
                }}
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Commedy</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Romance</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Fight</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            style={{
              background: "rgba(210, 210, 210, 0.25)",
              marginBottom: "66px",
              resize: "none",
              height: "177px",
            }}
          />

          {/* episode */}

          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="Title"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                }}
              />
            </Col>
            <Col md={12} lg={4} xl={3}>
              <label
                htmlFor="attach"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  padding: "8px 40px 8px 40px",
                  color: "#6C757D",
                  borderRadius: "6px",
                  border: "1px solid white",
                  fontSize: "14px",
                  fontWeight: "lighter",
                }}
              >
                Attach Thumbnail
                <IoMdAttach
                  style={{
                    color: "#E50914",
                    fontSize: "30px",
                    marginLeft: "8px",
                  }}
                />
              </label>
              <input type="file" name="attach" id="attach" hidden />
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Control
              style={{
                background: "rgba(210, 210, 210, 0.25)",
                height: "50px",
              }}
              type="url"
              placeholder="Link Film"
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formGridAddress1">
            <div>
              <button
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  width: "100%",
                  height: "50px",
                  borderRadius: "6px",
                  border: "1px solid white",
                }}
                onClick={handlePlusEpisode}
              >
                <BsPlus
                  style={{
                    color: "#E50914",
                    fontSize: "30px",
                    fontWeight: "bolder",
                  }}
                />
              </button>
            </div>
          </Form.Group>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
              type="submit"
              style={{
                width: "200px",
                height: "40px",
                background: "#E50914",
                border: "1px solid black",
                fontWeight: "bold",
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddFilmAdmin;
