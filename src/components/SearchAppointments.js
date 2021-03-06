import React, {Component} from 'react';

class SearchAppointments extends Component {
    render () {
        return (
            <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              onChange={(e)=>this.props.setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">
                <button 
                  href="#" 
                  className={
                  "sort-by dropdown-item" + (this.props.orderBy === 'petName' ? ' active' : '')
                  }
                  onClick={(e) => this.props.handleOrderChange('petName', this.props.orderDir)}>
                  Pet Name
                </button>
                <button href="#" className={
                  "sort-by dropdown-item" + (this.props.orderBy === 'aptDate' ? ' active' : '')
                  }
                  onClick={(e) => this.props.handleOrderChange('aptDate', this.props.orderDir)}>
                  Date
                </button>
                <button href="#" className={
                  "sort-by dropdown-item" + (this.props.orderBy === 'ownerName' ? ' active' : '')
                  }
                  onClick={(e) => this.props.handleOrderChange('ownerName', this.props.orderDir)}>
                  Owner
                </button>
                <div role="separator" className="dropdown-divider" />
                <button href="#" className={
                  "sort-by dropdown-item" + (this.props.orderDir === 1 ? ' active' : '')
                  }
                  onClick={(e) => this.props.handleOrderChange(this.props.orderBy, 1)}>
                  Asc
                </button>
                <button href="#" className={
                  "sort-by dropdown-item" + (this.props.orderDir === -1 ? ' active' : '')
                  }
                  onClick={(e) => this.props.handleOrderChange(this.props.orderBy, -1)}>
                  Desc
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        )
    }
}

export default SearchAppointments;