import React, {Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import {without, findIndex} from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myName: 'Navdeep',
      myAppointments: [],
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 1,
      queryText: ''
    };

    this.removeAppointment = this.removeAppointment.bind(this);
    this.switchFormDisplay = this.switchFormDisplay.bind(this);
    this.saveAppointment = this.saveAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.editRecord = this.editRecord.bind(this);
  }

  /*
    toggle display of AddAppointments form component.
  */
  switchFormDisplay() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  removeAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);
    this.setState({
      myAppointments: tempApts
    });
  }

  saveAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = tempApts.length;
    tempApts.unshift(apt);

    this.setState({
      myAppointments: tempApts
    });
  }

  changeOrder(orderField, orderDirec) {
    this.setState({
      orderBy: orderField,
      orderDir: orderDirec
    });
  }

  searchApts(query) {
    this.setState({
      queryText: query
    });
  }

  editRecord(fieldName, value, id) {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {aptId: id});
    tempApts[aptIndex][fieldName] = value;

    this.setState({
      myAppointments: tempApts
    });
  }

  componentDidMount() {
    let index = 0;
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = index++;
          return item;
        });
        this.setState({
          myAppointments: apts
        });
      });
  }
  render() {
    let filteredApts = this.state.myAppointments;

    filteredApts = filteredApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
        return -1 * this.state.orderDir;
      } else {
        return 1 * this.state.orderDir;
      }
    }).filter(anApt => {
      return(
        anApt['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) || 
        anApt['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) || 
        anApt['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      )
    });
    return (
      <main className="page bg-white" id="petratings">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
                  <AddAppointments 
                  formDisplay = {this.state.formDisplay} toggleForm={this.switchFormDisplay}
                  addAppointment = {this.saveAppointment}/>
                  <SearchAppointments 
                    orderBy={this.state.orderBy} 
                    orderDir={this.state.orderDir} 
                    handleOrderChange={this.changeOrder}
                    setSearchQuery={this.searchApts}/>
                  {
                    //pass state variable data to ListAppointments component
                    //deleteAppointment refers to a function, when deleteAppointment is passed as props to
                    //ListAppointments component, the component can call removeAppointment function which 
                    //actually removes an appointment.
                  }
                  <ListAppointments appointments={filteredApts}
                    deleteAppointment={this.removeAppointment}
                    updateInfo={this.editRecord}/>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }
}

export default App;
