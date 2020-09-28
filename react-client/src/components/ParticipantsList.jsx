import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'shards-react';
import { useParams, useLocation } from 'react-router-dom';

const ParticipantsList = ({socket}) => {
  const { roomName } = useParams();
  const { userName } = useLocation();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!socket) return
    socket.on('roomParticipants', (users) => {
      console.log('**********', users)
      setParticipants(users)
    });
    return () => {
      socket.off('roomParticipants')
    }
  }, [])

  return (
    <div className="participantsList">
      <ListGroup flush={false}>
        <ListGroupItem className="listGroupItem-first" style={overRide}>
          <span style={{fontSize: '20px'}}>
            {roomName} 
            </span>
        </ListGroupItem>
        {participants.map((participant) => (
          <ListGroupItem style={overRide} key={participant.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-user-circle fa-2x"></i>
        <div className="listItemName">{participant.userName}</div>
              <span className="dot"></span>
            </div>
          </ListGroupItem>

        ))}
        {/* <ListGroupItem style={overRide}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-user-circle fa-2x"></i>
            <div className="listItemName">User Name</div>

            <span className="dot"></span>
          </div>
        </ListGroupItem>
        <ListGroupItem style={overRide}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-user-circle fa-2x"></i>
            <div className="listItemName">User Name</div>

            <span className="dot"></span>
          </div>
        </ListGroupItem>
        <ListGroupItem style={overRide}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-user-circle fa-2x"></i>
            <div className="listItemName">User Name</div>

            <span className="dot"></span>
          </div>
        </ListGroupItem>
        <ListGroupItem style={overRide}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-user-circle fa-2x"></i>
            <div className="listItemName">User Name</div>

            <span className="dot"></span>
          </div>
        </ListGroupItem> */}
      </ListGroup>
    </div>
  );
};

  const overRide = {
    marginBottom: '10px',
    border: 'none',
    borderRadius: '8px',
  };

  // const icon = {
  //   display: 'flex',
  //   alignSelf: 'flex-start',
  // };

export default ParticipantsList;
