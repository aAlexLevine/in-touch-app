import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Collapse,
  Button,
  FormInput,
  InputGroup,
  Form,
} from 'shards-react';
import RoomList from './RoomList';
import { roomNameIsValid, userNameisValid } from './homeUtils.js';

const fakeRooms = [
  { name: 'Code Review', isOpen: false },
  { name: 'Marketing Dept...', isOpen: false },
  { name: 'Product Updates', isOpen: false },
  { name: 'SomeMeeting', isOpen: false },
  { name: 'AnotherMeeting', isOpen: false },
];

const Home = ({ socket }) => {
  const [createRoomCollapse, setCreateRoomCollapse] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [isRoomNameInvalid, setIsRoomNameInvalid] = useState(false);
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
  let history = useHistory();

  const toggleCreateRoomCollapse = () => {
    setCreateRoomCollapse((prevCollapse) => !prevCollapse);
  };

  const toggleRoomIsOpen = (roomName) => {
    const roomsToggled = rooms.map((room) => {
      if (room.name === roomName) {
        room.isOpen = !room.isOpen;
      } else {
        room.isOpen = false;
      }
      return room;
    });
    setRooms(roomsToggled);
  };

  const handleUserName = (event) => {
    setIsUserNameInvalid(false);
    setUserName(event.target.value);
  };

  const handleJoinRoom = (roomName) => {
    event.preventDefault();
    const userNameClean = userName.trim();
    if (userNameisValid(userNameClean)) {
      history.push({ pathname: `/room/${roomName}`, userName: userNameClean });
    } else {
      setIsUserNameInvalid(true);
    }
  };

  const handleRoomName = (event) => {
    setIsRoomNameInvalid(false);
    setRoomName(event.target.value);
  };

  const handleCreateRoom = (event) => {
    event.preventDefault();
    const roomNameClean = roomName.trim();
    const userNameClean = userName.trim();
    if (!roomNameIsValid(rooms, roomNameClean)) {
      setIsRoomNameInvalid(true);
    }
    if (!userNameisValid(userNameClean)) {
      setIsUserNameInvalid(true);
    }
    if (
      userNameisValid(userNameClean) &&
      roomNameIsValid(rooms, roomNameClean)
    ) {
      history.push({
        pathname: `/room/${roomNameClean}`,
        userName: userNameClean,
      });
    }
  };

  const getRoomsWithNames = (allRooms) => {
    const roomsArray = Object.keys(allRooms);
    const roomsWithNames = roomsArray.filter(
      (room) => room.slice(0, 6) === '_room_'
    );

    const roomsWithIsOpen = roomsWithNames.map((room) => {
      const roomObj = {};
      roomObj.name = room.slice(6);
      roomObj.isOpen = false;
      return roomObj;
    });

    return roomsWithIsOpen;
  };

  useEffect(() => {
    if (!socket) return;
    socket.emit('getAllRooms');
    socket.on('allRooms', (allRooms) => {
      console.log('heard allRooms', allRooms);
      setRooms(getRoomsWithNames(allRooms));
      // setRooms(fakeRooms);
    });
    return () => {
      console.log('home clean up');
      socket.off('allRooms');
    };
  }, [socket]);

  return (
    <div className="home-container">
      <Collapse open={createRoomCollapse}>
        <div className="p-3 mt-3 border rounded">
          <p>
            Add a new room to the List. You will automatically enter the new
            room.
          </p>
          <Form onSubmit={handleCreateRoom}>
            <InputGroup className="mb-2">
              <FormInput
                onChange={handleUserName}
                placeholder="User Name"
                invalid={isUserNameInvalid}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormInput
                onChange={handleRoomName}
                value={roomName}
                placeholder="Room Name"
                invalid={isRoomNameInvalid}
              />
            </InputGroup>
            <Button type="submit" block theme="secondary">
              Join
            </Button>
          </Form>
        </div>
      </Collapse>
      <Button block theme="dark" onClick={toggleCreateRoomCollapse}>
        Create Room
      </Button>
      <RoomList
        rooms={rooms}
        toggleRoomIsOpen={toggleRoomIsOpen}
        handleJoinRoom={handleJoinRoom}
        handleUserName={handleUserName}
        isUserNameInvalid={isUserNameInvalid}
      />
    </div>
  );
};

export default Home;
