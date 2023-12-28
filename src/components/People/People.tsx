import { Avatar, Card, Col, Modal, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import "./People.css";
import { getUsersFromDb } from "../../services/api";
import Profile from "../Profile/Profile";
function People() {
  const [users, setUsers]: any = useState([]);
  const [modalState, setModalState]: any = useState(false);
  const [currentUser, setCurrentUserState]: any = useState(null);
  const _getUsers = async () => {
    const res = await getUsersFromDb();
    console.log(res);
    setUsers([...res]);
  };
  useEffect(() => {
    _getUsers();
  }, []);

  return (
    <div className="peopleContainer">
      <Row style={{ marginTop: "50px" }} gutter={[18, 18]}>
        {users &&
          users.map((item: any, idx: any) => (
            <Col key={idx}>
              <Card
                onClick={() => {
                  setCurrentUserState(item);
                  setModalState(true);
                }}
                hoverable
                className="peopleCards"
                cover={
                  <img
                    className="h-[250px]"
                    alt="user"
                    src={`${process.env.REACT_APP_BASEURL}/profiles/${item.img}`}
                  />
                }
              >
                <b>
                  <p>{item.fullname}</p>
                </b>
                <hr />
                <div className="cardData">
                  <p>{item.role}</p>

                  <p>{item.phoneno}</p>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      {modalState ? (
        <Modal
          className="peopleModal"
          width="40vw"
          footer={null}
          title="Profile"
          open={modalState}
          onCancel={() => {
            setModalState(false);
            _getUsers();
          }}
        >
          <Profile user={currentUser} />
        </Modal>
      ) : null}
    </div>
  );
}

export default People;
