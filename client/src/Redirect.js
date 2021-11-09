import React from "react";

export class Redirect extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.location = this.props.to;
  }
  render() {
    return <section>Redirecting...</section>;
  }
}

export default Redirect;
