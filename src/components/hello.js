import React from "react";

class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.first_name} {this.props.last_name}</div> ;
  }
}

export default Hello;
