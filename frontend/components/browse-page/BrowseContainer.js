import React from 'react';
import { ajax } from 'jquery';
import Categories from './Categories';
import IndividualWork from './IndividualWork';

const Browse = React.createClass({
  getInitialState() {
    return {
      workList: [],
    };
  },
  componentDidMount() {
    ajax({
      url: '/api/documents',
      type: 'GET',
    })
    .done((response) => {
      this.setState({ workList: response });
    });
  },
  render() {
    return (
      <div>
        {console.log(this.state)}
        <Categories />
        <div className="work-list-div">
          {
            this.state.workList.map((ele, idx) => {
              return (
                <div key={idx}>
                  <IndividualWork work={ele} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  },
});

export default Browse;
