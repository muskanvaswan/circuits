import React from "react";
import Calculate from './Calculate';

export default class Multiple extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "calculates": [],
      "count": 0
    };
  }

	render() {
		return (
            <div>
              <div className=" w-100">
                <div key="0">
                  < Calculate />
                </div>
              {this.state.calculates.map((i) =>
                <div key={i} className="my-4 row">
                  <div className="col-md-11">
                    < Calculate />
                  </div>
                  <div className="col-md-1">
                    <button  onClick={this.addCalculate} className="btn btn-danger w-100 h-100 text-center">-</button>
                  </div>
                </div>
              )}
              </div>
            <div className="form-group m-2">
              <button  onClick={this.addCalculate} className="btn btn-primary w-100">+ Add Another Connection</button>
            </div>

            </div>
		);
	}

  addCalculate = () => {
    this.setState(state => ({
      count: state.count+1,
      calculates: [...state.calculates, state.count]
    }))
  }


}
