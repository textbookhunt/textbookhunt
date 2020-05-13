import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Filter extends React.Component {
  state = { isFilter: false, major: 'All Majors' };

  major;

  constructor(props) {
    super(props);
    this.state = { isFilter: false, major: 'All Majors' };
    this.major = 'All Major';
  }

  select(major) {
    this.major = major;
    // eslint-disable-next-line react/prop-types
    this.props.sendMajor(this.major);


  }

  renderMajor() {
    // eslint-disable-next-line react/prop-types
    const dataArray = this.props.majors;

    // eslint-disable-next-line react/prop-types
    return dataArray.map((major, i) => <Dropdown.Item key={i} onClick={() => this.select(major)} >
      {major}
    </Dropdown.Item>);
  }

  render() {

    return (
        <div>
          <div>
            <Dropdown text="Pick a major" clearable >
            <Dropdown.Menu>
            {this.renderMajor()}
            </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
    );
  }
}
Filter.propTypes = {
  search: PropTypes.array,


};
export default withRouter(Filter);
