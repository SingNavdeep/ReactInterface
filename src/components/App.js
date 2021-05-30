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
      myAppointments: []
    };

    this.removeAppointment = this.removeAppointment.bind(this);
  }

  removeAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);
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
                  <AddAppointments />
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
