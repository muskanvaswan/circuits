import React from "react";
import parallel_current from './../operations/parallel_current.js'


export default class Current extends React.Component {
  constructor(props){
    super(props);
    var i = parallel_current(0, this.props.resistances, this.props.req);
    this.state = {
      "currents": i,
      "current": 0,
      "volatge": 0
    };
  }

	render() {
		return (
      <div>
        <div className="row my-2">
          <input onChange={this.handleChange} value={this.state.current} draggable  className="form-control"></input>

          {this.state.currents.map((c, i) =>
            <div className="col-md">
              <div key={i} className=" d-flex form-group input-group border rounded bg-light ">
                <label htmlFor={i}  className="my-auto mx-1">I{i+1} for R{i+1}:</label>
                <h5>{c}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
		);
	}

  handleChange = (e) =>{
    this.setState({
      current: e.target.value,
      currents: parallel_current(e.target.value, this.props.resistances, this.props.req)
    });

  }

}
