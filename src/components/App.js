import React, {Component} from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
class App extends Component {
  constructor() {
    super();
    this.state = {
      myName: 'Navdeep',
      myAppointments: []
    };
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => (item));
        this.setState({
          myAppointments: apts
        });
      });
  }
  render() {
    const listPets = this.state.myAppointments.map(apt => {
      return <div>{apt.petName}</div>
    });
    return (
      <main className="page bg-white" id="petratings">
          <div className="container">
            <div className="row">
              <div className="col-md-12 bg-white">
                <div className="container">
                  {listPets}
                  <AddAppointments />
                  <SearchAppointments />
                  <ListAppointments />
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }
}

export default App;
