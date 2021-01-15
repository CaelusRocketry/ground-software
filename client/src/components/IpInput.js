import React from 'react'
var addresses = ["127.0.0.1"];
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      addresses.push(this.state.value);
      alert("added "+this.state.value);
      this.setState({value: ""});
      event.preventDefault();
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Address: &nbsp;
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          <div>
              <ul>
                  {addresses.map(item=> (
                      <li key={item}>{item}</li>
                  ))}
              </ul>
          </div>
        </form>
      );
    }/*
    render() {
        return (
            <div>
                <ul>
                    {addresses.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }*/
}

const IpInput = ({ children }) => (
    //<h3 className="text-lg font-bold">{children}</h3>
    <React.Fragment>
        <h3 className = "text-lg font-bold">{children}</h3>
        <NameForm />
    </React.Fragment>

  );
export{addresses};
export default IpInput;