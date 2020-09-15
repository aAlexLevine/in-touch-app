import React from 'react';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    console.log('did mount')
    this.setState((prevState => ({data: [...prevState.data, 'boop']})))
  }

  componentDidUpdate(prevState, prevProps) {
    // if ()
    console.log('did update')
  }

  render() {
    console.log('render')
    return (
      <div>
        some data
      </div>
    )
  }
}

export default Test;