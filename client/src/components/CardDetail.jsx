/* eslint-disable */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import dataFilm from "../fakeData/datafilm.json";

function CardDetail(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataFilm.filter((item) => item.id == props.id)[0]);
  }, []);

  document.title = `${data?.title} | Dumbflix`;

  return (
    <Card
      style={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "0px",
      }}
    >
      <Container
        style={{
          margin: "0px",
        }}
      >
        <Row>
          <Col sm={3}>
            <Card.Img
              variant="top"
              src={data?.image}
              style={{
                width: "200px",
                height: "300px",
                margin: " 30px 0px 58px 87px ",
              }}
            />
          </Col>
          <Col sm={5}>
            <Card.Body>
              <h1>{data?.title}</h1>
              <div
                style={{
                  display: "flex",
                  marginBottom: "37px",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    color: "#929292",
                    paddingRight: "41px",
                    fontsize: "17px",
                    marginBottom: "0px",
                  }}
                >
                  2017
                </p>
                <Button
                  variant="dark"
                  style={{
                    backgroundColor: "black",
                    color: "#929292",
                    border: "1px solid #929292 ",
                    borderRadius: "5px",
                    fontsize: "17px",
                    padding: "0px 5px ",
                  }}
                  h
                >
                  {data?.category}
                </Button>
              </div>
              <Card.Text
                style={{
                  textAlign: "justify",
                  marginRight: "107px",
                  fontsize: "18px",
                }}
              >
                {data?.description}
              </Card.Text>
            </Card.Body>
          </Col>
          <Col sm={4}>
            <button className="bg-black">
              <Card.Img
                variant="top"
                src={`https://img.youtube.com/vi/${data?.trailerId}/maxresdefault.jpg`}
                style={{
                  position: "absolute",
                  width: "494px",
                  height: "272px",
                  margin: "30px 108px 116px 0px",
                }}
              />
              <Card.Img
                variant="top"
                src={" /assets/images/transparans.svg"}
                style={{
                  position: "absolute",
                  width: "494px",
                  height: "272px",
                  margin: "30px 108px 116px 0px",
                }}
              />
            </button>
            <h4
              style={{
                position: "absolute",
                margin: "129px 184px 102px 182px",
                fontWeight: "bolder",
              }}
            >
              {props.isVideoPlaying == "play"
                ? "Is Play Now"
                : props.isVideoPlaying == "pause"
                ? "Video Paused"
                : ""}
            </h4>
            {/* <button className="bg-dark" onClick={() => props.setIsVideoPlaying(true)}>
              <GoPlay
                style={{
                  height: "70px",
                  width: "48px",
                  color: "gray",
                  position: "absolute",
                  margin: "220px 0px 0px 10px",
                }}
              />
            </button> */}
            <p
              style={{
                position: "absolute",
                margin: "305px 184px 10px 15px",
              }}
            >
              {data?.title}
            </p>
          </Col>
          {/* <Col sm={1} className="ps-5">
            <button className="bg-dark ms-5 ps-5 ">
              <MdArrowForwardIos
                style={{
                  height: "70px",
                  width: "48px",
                  color: "red",
                  position: "absolute",
                  margin: "120px 108px 116px 45px",
                }}
              />
            </button>
          </Col> */}
        </Row>
      </Container>
    </Card>
  );
}

export default CardDetail;
