import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { IoMdAttach } from "react-icons/io";
import NavbarComponent from "../components/NavbarComponent";
import { React, useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

async function Payment() {
  document.title = `Payment | Dumbflix`;

  let Navigate = useNavigate();

  let { data: profile, refetch: profileRefetch } = useQuery(
    "profileCache",
    async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      };
      const response = await API.get("/check-auth", config);
      return response.data.data;
    }
  );

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-aAfwA9NGkcUy4r0-";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // Insert transaction data
  const response = await API.post("/transaction", config);

  const token = response.data.token;

  window.snap.pay(token, {
    onSuccess: function (result) {
      /* You may add your own implementation here */
      console.log(result);
      history.push("/");
    },
    onPending: function (result) {
      /* You may add your own implementation here */
      console.log(result);
      history.push("/");
    },
    onError: function (result) {
      /* You may add your own implementation here */
      console.log(result);
    },
    onClose: function () {
      /* You may add your own implementation here */
      alert("you closed the popup without finishing the payment");
    },
  });

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
                      style={{
                        width: "325px",
                        color: "white",
                        backgroundColor: "#4C4C4C",
                      }}
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
