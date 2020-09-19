import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'shards-react';

const ParticipantsList = () => {
  const overRide = {
    marginBottom: '10px',
    border: 'none',
    borderRadius: '12px'
  };
  return (
    <div className="participantsList">
      {/* <label>Participants</label> */}
      <ListGroup flush="false">
        <ListGroupItem style={overRide}>
          {/* <ListGroupItemHeading> */}
          <span class="fa-stack fa-2x">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fas fa-users fa-stack-1x fa-inverse"></i>
          </span>
          Room Name
          {/* <i class="fas fa-users"></i> Room123 */}
          {/* </ListGroupItemHeading> */}
          {/* <ListGroupItemText> 1</ListGroupItemText> */}
        </ListGroupItem>
        <ListGroupItem style={overRide}>
          <i class="fas fa-user-circle fa-2x"></i>1
        </ListGroupItem>
        <ListGroupItem style={overRide}>
          <i class="fas fa-user-circle"></i>2
        </ListGroupItem>
        {/* <ListGroupItem>3</ListGroupItem>
        <ListGroupItem>4</ListGroupItem>
        <ListGroupItem>1</ListGroupItem>
        <ListGroupItem>2</ListGroupItem>
        <ListGroupItem>3</ListGroupItem>
        <ListGroupItem>4</ListGroupItem> */}
      </ListGroup>
    </div>
  );
};
export default ParticipantsList;
