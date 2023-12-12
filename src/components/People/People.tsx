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
  useEffect(() => {
    const _getUsers = async () => {
      const res = await getUsersFromDb();
      console.log(res);
      setUsers([...res]);
    };
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
                    height="200px"
                    alt="example"
                    src={
                      "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    }
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
          width="50vw"
          footer={null}
          title="Profile"
          open={modalState}
          onCancel={() => {
            setModalState(false);
          }}
        >
          <Profile user={currentUser} />
        </Modal>
      ) : null}
    </div>
  );
}

export default People;
