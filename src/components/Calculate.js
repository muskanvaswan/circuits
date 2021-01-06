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
        {this.state.resistances.map((resistance, i) =>
          <div key={i} className=" d-flex form-group">
            <label htmlFor={i}  >R{i+1}</label>
            <input name={i} value={resistance} onChange={this.handleChange} onDragOver={this.dropHandler} onDrop={this.handleDrop} className="form-control"></input>
            <button data-index={i} onClick={this.deleteResistor} className="btn btn-danger">-</button>
          </div>
        )}
        <div className="form-group">
        <select value={this.state.type} name="type" onChange={this.handleSelect} className="form-control">
          <option value="s">Series</option>
          <option value="p">parallel</option>
        </select>
        </div>
        <button onClick={this.addResistor} className="btn btn-primary">+ Add Resistor</button>
        {/*<button onClick={this.calculate} className="btn btn-success"> Calculate</button>*/}
        <h2 draggable onDragStart={this.dragStart}>{this.state.answer}</h2>
      </div>
    );
	}
  dragStart = (e) => {
    var ans = this.state.answer;
    console.log(ans);
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

    })
  }
  addResistor = () => {
    this.setState(state => ({
      resistances: [...state.resistances, 0]
    }))
  }

  handleSelect = (event) => {
    this.setState({
      type: event.target.value
    })
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
