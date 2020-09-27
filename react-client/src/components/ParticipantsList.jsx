import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'shards-react';
import { useParams, useLocation } from 'react-router-dom';

const ParticipantsList = () => {
  const { roomName } = useParams();
  const { userName } = useLocation();

  const overRide = {
    marginBottom: '10px',
    border: 'none',
    borderRadius: '8px',
  };

  const icon = {
    display: 'flex',
    alignSelf: 'flex-start'

  };
  console.log('room', roomName, 'userName', userName)
  return (
    <div className="participantsList">
      <ListGroup flush={false}>
        <ListGroupItem className= "listGroupItem-first" style={overRide}>
          Room:{roomName} User: {userName}
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
      </ListGroup>
    </div>
  );
};
export default ParticipantsList;
