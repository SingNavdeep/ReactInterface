import React, {Component} from 'react';

class ListAppointments extends Component {
    render () {
        return (
            <div className="appointment-list item-list mb-3">
                {this.props.appointments.map(apt => (
                    <div className="pet-item col media py-3" key={apt.aptId}>
                    <div className="mr-3">
                      <button className="pet-delete btn btn-sm btn-danger"
                        onClick={() => this.props.deleteAppointment(apt)}>X</button>
                    </div>
        
                    <div className="pet-info media-body">
                      <div className="pet-head d-flex">
                        <span className="pet-name" 
                          contentEditable
                          onBlur={
                            (e) => this.props.updateInfo('petName', e.target.innerText, apt.aptId) 
                          }>{apt.petName}</span>
                        <span className="apt-date ml-auto">{apt.aptDate}</span>
                      </div>
        
                      <div className="owner-name">
                        <span className="label-item">Owner: </span>
                        <span 
                          contentEditable
                          onBlur={
                            (e) => this.props.updateInfo('ownerName', e.target.innerText, apt.aptId) 
                          }>{apt.ownerName}</span>
                      </div>
                      <div className="apt-notes" contentEditable
                          onBlur={
                            (e) => this.props.updateInfo('aptNotes', e.target.innerText, apt.aptId) 
                          }>{apt.aptNotes}</div>
                    </div>
                  </div>
                ))};
        </div>
        );
    }
}

export default ListAppointments;