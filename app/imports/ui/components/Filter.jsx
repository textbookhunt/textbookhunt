import React from 'react';
import { Menu, Dropdown, Header, Sticky } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListBook from '../pages/ListBook';


export class Filter extends React.Component {

  major;
  constructor(props){
    super(props);
    this.major='empty';
  }
  select(major){
    this.major = major;
    console.log(this.major);

  }

  getmajor(){
    console.log("new"+this.major);
    return this.major;
  }
  renderMajor(){
    const dataArray = this.props.majors;
    return dataArray.map((major,i) => <Dropdown.Item key={i} onClick={() => this.select(major)} >{major}</Dropdown.Item>)
  }
  render() {

    const menuStyle = { marginBottom: '10px' };
    return (
        <Sticky>

          <div>

            <Dropdown text="major" clearable >
            <Dropdown.Menu>
            {this.renderMajor()}
            </Dropdown.Menu>
            </Dropdown>
          </div>

        </Sticky>
    );
  }
}
Filter.propTypes = {
  majors: PropTypes.array,
  major: PropTypes.string,

};
export default withRouter(Filter);
