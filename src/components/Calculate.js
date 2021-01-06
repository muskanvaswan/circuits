import React from "react";
import parallel from './../operations/parallel.js'
import series from './../operations/series.js'


export default class Calculate extends React.Component {
  constructor(props){
    super(props);
    this.state = {"resistances": [0,0,], "type": "p", "answer":0};
  }

	render() {
		return (
      <div>
        <div className="row">
          <div className="col-md-8 row">
            {this.state.resistances.map((resistance, i) =>
              <div className="col-md-6">
              <div key={i} className=" d-flex form-group input-group border rounded bg-light ">
                <label htmlFor={i}  className="my-auto mx-1">R{i+1}</label>
                <input name={i} value={resistance} onChange={this.handleChange} onDragOver={this.dropHandler} onDrop={this.handleDrop} className="form-control"></input>
                <button data-index={i} onClick={this.deleteResistor} className="btn btn-danger">-</button>
              </div>
              </div>
            )}
          </div>
          <div className="col-md-4">
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
          <button onClick={this.addResistor} className="btn btn-primary w-100">+ Add Resistor</button>
          </div>
          <div className="col-md-6">
            <button onClick={this.calculate} className="btn btn-success w-100"> ReCalculate</button>
          </div>
        </div>
        <h2 draggable onDragStart={this.dragStart}>{this.state.answer}</h2>
      </div>
    );
	}
  dragStart = (e) => {
    var ans = this.state.answer;
    e.dataTransfer.setData('val', ans)
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
    console.log(this.state.type)
    if (this.state.type == "p"){
      this.setState(state => ({
        answer: parallel(state.resistances)
      }));
    }
    else{
      this.setState(state => ({
        answer: series(state.resistances)
      }));
    }
  }

}