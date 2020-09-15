import React from 'react';
// import e from 'express';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      currentlySelected: 'here',
      count: 0,
      fakeData: []
    };
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.selectOption = this.selectOption.bind(this)
  }

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  selectOption(e, index) {
    console.log(index)
    this.setState({ currentlySelected: this.props.options[index] });
    this.toggleDropdown();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
    if (prevState.count !== this.state.count) {
      this.setState({fakeData:[...this.state.fakeData, 'newData']})

    }
  }

  render() {
    const { onSelect, options } = this.props;
    const { showDropdown, currentlySelected } = this.state;
    console.log('dropdown render')
    return (
      <div>
        <div onClick={()=>{
          console.log('setState clicked')
          this.setState({count: this.state.count + 1})
        }
        }>add one</div>
        <div onClick={this.toggleDropdown}>{currentlySelected}</div>
        {showDropdown
          ? options.map((option, index) => (
              // <DropdownMenuOption />
              <div key={option} onClick={(e) => this.selectOption(e, index)}>{option}</div>
            ))
          : null}
      </div>
      //options should have prop for onSelect to take this action
    );
  }
}

export default DropdownMenu;
