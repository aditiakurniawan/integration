/* eslint-disable */
import { Container } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import NavbarComponent from "../components/NavbarComponent";
import { AiFillCaretDown } from "react-icons/ai";
import transaction from "../fakeData/transaction.json";

function ListTransactionAdmin() {
  document.title = `List Transaction | Dumbflix`;

  return (
    <>
      <NavbarComponent />
      <div
        className="px-5 pt-5 bg-black text-white "
        // style={{ height: "100vh" }}
      >
        <Container style={{ height: "100vh", background: "black" }}>
          <h2 className="fw-bold mb-5">Incoming Transaction</h2>
          <Table
            striped
            className="table align-middle"
            variant="dark"
            responsive
            style={{ color: "white" }}
          >
            <thead
              className="table align-middle justify-center"
              style={{
                color: "red",
                backgroundColor: "#1F1F1F",
                height: "74px",
              }}
            >
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Bukti Transfer</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((item, index) => {
                return (
                  <tr key={index} style={{ height: "74px" }}>
                    <td>{index + 1}</td>
                    <td>{item.users}</td>
                    <td>
                      <u>{item.bukti}</u>
                    </td>
                    <td>{item.remaining}</td>
                    <td
                      className={
                        item.status == "Active" ? "text-success" : "text-danger"
                      }
                    >
                      {item.status}
                    </td>
                    <td
                      className={
                        item.payment == "Approve"
                          ? "text-success"
                          : item.payment == "Pending"
                          ? "text-warning"
                          : "text-danger"
                      }
                    >
                      {item.payment}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          className="position-relative"
                          variant="outline"
                        >
                          <div>
                            <AiFillCaretDown
                              className="position-absolute"
                              style={{
                                color: "#1C9CD2",
                                width: "40px",
                                height: "40px",
                                left: "0",
                                top: "0",
                              }}
                            />
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark" className="bg-black ">
                          <Dropdown.Item className="text-success">
                            Approved
                          </Dropdown.Item>
                          <Dropdown.Item className="text-danger">
                            Cancel
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}

export default ListTransactionAdmin;
