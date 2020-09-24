import React, { Children } from 'react';
import { ListGroupItem } from 'shards-react';

const ListItem = ({ onSelect, name, icon, status }) => {
  return (
    <ListGroupItem>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <i className="fas fa-user-circle fa-2x"></i> */}
        {icon && <i className={icon}></i>}
        {name && <div className="listItemName">{name}</div>}
        {status && <span className="dot"></span>}
        {Children}
      </div>
    </ListGroupItem>
  );
};

export default ListItem;
