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
                  }
                  <ListAppointments appointments={this.state.myAppointments}/>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
  }
}

export default App;
