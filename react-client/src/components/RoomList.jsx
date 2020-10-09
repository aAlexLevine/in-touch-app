import React from 'react';
import PropTypes from 'prop-types';
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
  const overRide = {
    marginBottom: '10px',
    border: 'none',
    borderRadius: '8px',
  };
  return (
    <div className="participantsList">
      <ListGroup>
        {rooms.map((room) => (
          <div key={room.name} style={overRide}>
            <ListGroupItem>
              <div
                onClick={() => toggleRoomIsOpen(room.name)}
                onKeyPress={() => toggleRoomIsOpen(room.name)}
                role="button"
                tabIndex="0"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <i className="fab fa-connectdevelop fa-2x" />
                <div className="listItemName">{room.name}</div>
                <span className="dot" />
              </div>
            </ListGroupItem>
            <Collapse open={room.isOpen}>
              <div className="p-3 border rounded">
                <p>Enter your name to join the room.</p>
                <Form
                  onSubmit={(event) => handleJoinRoom(event, room.name)}
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

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    isOpen: PropTypes.bool,
  })).isRequired,
  toggleRoomIsOpen: PropTypes.func.isRequired,
  handleJoinRoom: PropTypes.func.isRequired,
  handleUserName: PropTypes.func.isRequired,
  isUserNameInvalid: PropTypes.bool.isRequired,
};

export default RoomList;
