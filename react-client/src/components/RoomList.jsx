import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Collapse,
  FormInput,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
} from 'shards-react';

const RoomList = ({
  rooms,
  toggleRoomIsOpen,
  handleJoinRoom,
  handleUserName,
  isUserNameInvalid,
}) => {
  return (
    <div className="participantsList">
      <ListGroup>
        {rooms.map((room, index) => (
          <div key={index} style={overRide}>
            <ListGroupItem>
              <div
                onClick={() => toggleRoomIsOpen(room.name)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <i className="fab fa-connectdevelop fa-2x"></i>
                <div className="listItemName">{room.name}</div>
                <span className="dot"></span>
              </div>
            </ListGroupItem>
            <Collapse open={room.isOpen}>
              <div className="p-3 border rounded">
                <p>Enter your name to join the room.</p>
                <Form
                  onSubmit={() => handleJoinRoom(room.name)}
                  onChange={handleUserName}
                >
                  <InputGroup>
                    <FormInput
                      placeholder="User Name"
                      invalid={isUserNameInvalid}
                    />
                    <InputGroupAddon type="append">
                      <Button outline theme="secondary">
                        Join
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Form>
              </div>
            </Collapse>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

const overRide = {
  marginBottom: '10px',
  border: 'none',
  borderRadius: '8px',
};

export default RoomList;
