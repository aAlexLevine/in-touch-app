const roomNameIsValid = (rooms, roomName) => {
  if (roomName === '') {
    return false;
  }
  const roomAlreadyExists = rooms.some((room) => {
    room.name.toLowerCase() === roomName.toLowerCase();
  });
  if (roomAlreadyExists) {
    return false;
  }
  return true;
};

const userNameisValid = (name) => {
  if (name === '') {
    return false;
  }
  return true;
};

export { 
  roomNameIsValid, 
  userNameisValid 
};
