import React, {Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import {without} from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myName: 'Navdeep',
      myAppointments: [],
      formDisplay: true
    };

    this.removeAppointment = this.removeAppointment.bind(this);
    this.switchFormDisplay = this.switchFormDisplay.bind(this);
    this.saveAppointment = this.saveAppointment.bind(this);
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
    
    return (
      <main className="page bg-white" id="petratings">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
                  <AddAppointments 
                  formDisplay = {this.state.formDisplay} toggleForm={this.switchFormDisplay}
                  addAppointment = {this.saveAppointment}/>
                  <SearchAppointments />
                  {
                    //pass state variable data to ListAppointments component
                    //deleteAppointment refers to a function, when deleteAppointment is passed as props to
                    //ListAppointments component, the component can call removeAppointment function which 
                    //actually removes an appointment.
                  }
                  <ListAppointments appointments={this.state.myAppointments}
                    deleteAppointment={this.removeAppointment}/>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }
}

export default App;
