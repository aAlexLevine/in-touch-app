import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'shards-react';
import { useParams } from 'react-router-dom';

const ParticipantsList = ({ socket }) => {
  const { roomName } = useParams();
  const [participants, setParticipants] = useState([]);
  const overRide = {
    marginBottom: '10px',
    border: 'none',
    borderRadius: '8px',
  };

  useEffect(() => {
    // if (!socket) return;
    socket.on('roomParticipants', (users) => {
      // console.log('**********', users);
      setParticipants(users);
    });
    return () => {
      socket.off('roomParticipants');
    };
  }, [socket]);

  return (
    <div className="participantsList">
      <ListGroup flush={false}>
        <ListGroupItem className="listGroupItem-first" style={overRide}>
          <span style={{ fontSize: '20px' }}>{roomName}</span>
        </ListGroupItem>
        {participants.map((participant) => (
          <ListGroupItem style={overRide} key={participant.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-user-circle fa-2x" />
              <div className="listItemName">{participant.userName}</div>
              <span className="dot" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

ParticipantsList.propTypes = {
  socket: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ParticipantsList;
