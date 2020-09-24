import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Button,
  FormInput,
  InputGroup,
  InputGroupAddon,
  Form,
} from 'shards-react';
import RoomList from './RoomList';
import { useHistory } from 'react-router-dom';

const Home = ({ socket }) => {
  const [createRoomCollapse, setCreateRoomCollapse] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  let history = useHistory();

  const toggleCreateRoomCollapse = () => {
    setCreateRoomCollapse((prevCollapse) => !prevCollapse);
  };

  const toggleRoomIsOpen = (roomName) => {
    console.log('toggleroom', roomName);
    const roomsToggled = rooms.map((room) => {
      if (room.name === roomName) {
        room.isOpen = !room.isOpen;
      }
      return room;
    });
    setRooms(roomsToggled);
  };

  const handleJoinRoom = (roomName) => {
    //after type name and submit
    event.preventDefault();
    history.push(`/room/${roomName}`);
  };

  const handleRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoom = (event) => {
    event.preventDefault();
    history.push(`/room/${roomName}`);
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
    });
    return () => {
      console.log('home clean up');
      socket.off('allRooms');
      //fix disconnects socket.leave add socket.off to video and chat components also
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
            <InputGroup>
              <FormInput onChange={handleRoomName} value={roomName} />
              <InputGroupAddon type="append">
                <Button type="submit" outline theme="secondary">
                  +
                </Button>
              </InputGroupAddon>
            </InputGroup>
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
      />
    </div>
  );
};

export default Home;
