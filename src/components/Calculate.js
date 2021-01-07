import React from "react";
import parallel from './../operations/parallel.js'
import parallel_current from './../operations/parallel_current.js'
import series_voltage from './../operations/series_voltage.js'


import series from './../operations/series.js'
// Current from './Current';



export default class Calculate extends React.Component {
  constructor(props){
    super(props);
    var i = parallel_current(0, [0,0,], 0);
    this.state = {
      "resistances": [0,0,],
      "type": "p",
      "answer":0,
      "currents": i,
      "current": 0,
      "volatge": 0,
      "voltages": i,
      "toggle": true,
    };
  }

	render() {
		return (
      <div className="row container border border-info p-3 rounded m-0">
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-8 row">
              {this.state.resistances.map((resistance, i) =>
                <div className="col-md-6 my-1">
                  <div key={i} className=" d-flex border rounded bg-light w-100">
                    <label htmlFor={i}  className="my-auto mx-1">R{i+1}</label>
                    <input name={i} value={resistance} draggable onDragStart={this.dragStartResistor} onChange={this.handleChange} onDragOver={this.dropHandler} onDrop={this.handleDrop} className="form-control"></input>
                    <button data-index={i} onClick={this.deleteResistor} className="btn btn-danger">-</button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-4 my-1">
            <div className="form-group">
              <select value={this.state.type} name="type" onChange={this.handleSelect} className="form-control">
                <option value="s">Series</option>
                <option value="p">parallel</option>
              </select>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <button onClick={this.addResistor} className="btn btn-primary my-1 w-100">+ Add Resistor</button>
            </div>
            <div className="col-md-6">
              <button onClick={this.calculate} className="btn btn-success my-1 w-100"> ReCalculate</button>
            </div>
          </div>
          <div className="m-2 mt-4 d-flex">
            <p onClick={this.handleToggle} className=" text-primary text-center w-100 mx-auto">
              {this.state.toggle===false? "Hide " : "View " }
              {this.state.type==="p"? "Current Division" : "Volatge Division" }
            </p>
          </div>

        </div>
        <div draggable onDragStart={this.dragStartAnswer} className="col-md-2 border rounded p-4 d-flex bg-light overflow-auto">
          <h2   className="mx-auto">{this.state.answer}</h2>
        </div>
        {/*<!-- currrent division -->*/}
        {this.state.type==="p" && <div className="container-fluid">
          <div className={this.state.toggle===false? null : "collapse" }>
            <div className="row my-2">

              <div className="d-flex form-group col-md-3 my-3 bg-light rounded input-group mr-1">
                <label className="my-auto mx-1" htmlFor="current">Total Current</label>
                <input name="current" onChange={this.handleCurrent} value={this.state.current} draggable  className="form-control p-2 my-auto"></input>
              </div>
              <div className="d-flex form-group col-md-3 my-3 bg-light rounded input-group mr-1">
                <label className="my-auto mx-1" htmlFor="current">Voltage</label>
                <input name="voltage" onChange={this.handleVoltage} value={this.state.voltage} draggable  className="form-control p-2 my-auto"></input>
              </div>
              {this.state.currents.map((c, i) =>
                <div className="col-md my-3" key={i}>
                  <div className=" border rounded p-1 d-flex bg-light overflow-auto">
                    <p className="text-muted">I{i+1}</p>
                    <h2   className="m-auto ">{c}</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>}
        {/*<!-- end currrent division -->*/}
        {/*<!-- volatge division -->*/}
        {this.state.type==="s" && <div className="container-fluid">
          <div className={this.state.toggle===false? null : "collapse" }>
            <div className="row my-2">

              <div className="d-flex form-group col-md-3 my-3 bg-light rounded input-group mr-1">
                <label className="my-auto mx-1" for="voltage">Total Volatge</label>
                <input name="volatge" onChange={this.handleVoltage} value={this.state.voltage} draggable  className="form-control p-2 my-auto"></input>
              </div>
              <div className="d-flex form-group col-md-3 my-3 bg-light rounded input-group mr-1">
                <label className="my-auto mx-1" for="current2">Current</label>
                <input name="current2" onChange={this.handleCurrent} value={this.state.current} draggable  className="form-control p-2 my-auto"></input>
              </div>

              {this.state.voltages.map((c, i) =>
                <div className="col-md my-3" key={i}>
                  <div className=" border rounded p-1 d-flex bg-light overflow-auto">
                    <p className="text-muted">V{i+1}</p>
                    <h2   className="m-auto ">{c}</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>}
        {/*<!-- end voltage division -->*/}
      </div>
    );
	}
  dragStartAnswer = (e) => {
    var ans = this.state.answer;
    e.dataTransfer.setData('val', ans)
  }
  dragStartResistor = (e) => {
    var r = e.target.value;
    e.dataTransfer.setData('val', r)
  }
  dropHandler = (e) =>{
    e.preventDefault();
  }
  handleDrop = (e) => {
    var val = e.dataTransfer.getData('val');
    this.setState(state => {
      var l = state.resistances
      l.[e.target.name]= val
      return{resistances: l};

    });
    this.handleChange(e);

  }
  handleCurrent = (e) =>{
    this.setState({
      current: e.target.value,
      voltage: e.target.value * this.state.answer
    });
    if (this.state.type==="p"){
      this.currentCalculate();
    }
  }

  currentCalculate = () => {
    this.setState(state => ({
      currents: parallel_current(state.current, state.resistances, state.answer),
    }))
  }

  handleVoltage = (e) =>{
    this.setState({
      voltage: e.target.value,
      current: e.target.value / this.state.answer
    });
    if (this.state.type ==="s"){
      this.voltageCalculate();
    }
  }

  voltageCalculate = () => {
    this.setState(state => ({
      voltages: series_voltage(state.voltage, state.resistances, state.answer),
    }));
  }

  deleteResistor = (event) => {
    const index = event.target.dataset.index
    this.setState(state => {
      var l = state.resistances
      l.splice(index, 1)
      return{resistances: l};

    }, this.calculate)
  }
  addResistor = () => {
    this.setState(state => ({
      resistances: [...state.resistances, 0]
    }))
  }

  handleSelect = (event) => {
    this.setState({
      type: event.target.value
    }, this.calculate)
  }

  handleChange = (event) => {
    var index = parseInt(event.target.name)
    var l = this.state.resistances
    l[index] = event.target.value
    this.setState({
      resistances: l
    })
    this.calculate();
  }

  calculate = () =>{
    if (this.state.type === "p"){
      this.setState(state => ({
        answer: parallel(state.resistances),
        voltage: state.current*parallel(state.resistances)
      }));
      this.currentCalculate();

    }
    else{
      this.setState(state => ({
        answer: series(state.resistances),
        current: state.voltage/series(state.resistances)
      }));
      this.voltageCalculate()

    }
  }

  handleToggle = () => {
    this.setState(state => ({toggle: !state.toggle}))
  }


}
