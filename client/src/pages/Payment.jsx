import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import { IoMdAttach } from "react-icons/io";
import NavbarComponent from "../components/NavbarComponent";

function Payment() {
  document.title = `Payment | Dumbflix`

  return (
    <>
      <NavbarComponent />
      <div className="bg-black" style={{ height: "637px", padding: "53px" }}>
        <Container style={{ color: "white", margin: "auto" }}>
          <div>
            <Stack gap={3} className=" mx-auto pb-4">
              <h1 className="text-center fw-bolder py-4">Premium</h1>
              <h6 className="text-center " style={{ fontSize: "18px" }}>
                Bayar sekarang dan nikmati streaming film-film yang kekinian
                dari
                <span
                  style={{
                    color: "#E50914",
                    fontWeight: "bold",
                    margin: "2pt",
                  }}
                >
                  DUMBFLIX
                </span>
              </h6>
              <h6 className="text-center fw-bold" style={{ fontSize: "18px" }}>
                <span style={{ color: "#E50914" }}> DUMBFLIX </span>: 0981312323
              </h6>
            </Stack>
            <div className="d-flex w-100 justify-content-center align-items-center">
              <form action="" style={{ width: "350px" }}>
                <div className="d-flex">
                  <InputGroup className="mb-3 mx-auto w-100">
                    <Form.Control
                      placeholder="Input yout account number"
                      className="py-2 px-5 white-placeholder"
                      type="number"
                      style={{ width: "325px", color: "white", backgroundColor: "#4C4C4C" }}
                    />
                  </InputGroup>
                </div>
                <div className="d-flex">
                  <div className="mx-auto bg-primary w-100">
                    <label
                      htmlFor="attach"
                      style={{
                        backgroundColor: "white",
                        padding: "8px 10px",
                        color: "#E50914",
                        borderRadius: "6px",
                        fontSize: "18px",
                        fontWeight: "bolder",
                        display: "auto",
                        textAlign: "center",
                      }}
                      className="w-100"
                    >
                      Attache proof of transfer
                      <IoMdAttach
                        style={{
                          color: "#E50914",
                          marginLeft: "70px",
                          fontSize: "30px",
                        }}
                      />
                    </label>
                    <input type="file" name="attach" id="attach" hidden />
                  </div>
                </div>
                <div className="d-flex my-5">
                  <Button
                    className=" mb-3 w-100 mx-auto "
                    style={{ backgroundColor: "#E50914", border: "1px white" }}
                  >
                    Kirim
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Payment;
