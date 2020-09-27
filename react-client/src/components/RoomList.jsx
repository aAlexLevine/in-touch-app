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

const overRide = {
  marginBottom: '10px',
  border: 'none',
  borderRadius: '8px',
};

const RoomList = ({
  rooms,
  toggleRoomIsOpen,
  handleJoinRoom,
  handleUserName,
  isUserNameInvalid
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
                {/* <i className="fab fa-creative-commons-sampling fa-2x"></i> */}
                <i className="fab fa-connectdevelop fa-2x"></i>
                {/* <i className="far fa-circle fa-2x"></i> */}
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
                    {/* handle name input from joiner, 
                send name to video connections,
                decide how to transport name and room data
                can send through params or lift state up  */}
                    <FormInput placeholder="User Name" invalid={isUserNameInvalid}/>
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

export default RoomList;
