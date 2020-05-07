import React from 'react';
import {  Dropdown, Header} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';




export class Filter extends React.Component {
  state = { isFilter: false, major: 'All Majors' };
  major;
  constructor(props){
    super(props);
    this.state = { isFilter: false, major: 'All Majors' };
    this.major = 'All Major';
  }
  select(major){
    //this.setState({isFilter: true, major : major});
    this.major = major;
    this.props.sendMajor(this.major);
    //console.log("this is "+ this.major);


  }


  renderMajor(){
    const dataArray = this.props.majors;

    return dataArray.map((major,i) => <Dropdown.Item key={i} onClick={() => this.select(major)} >{major}</Dropdown.Item>)
  }
  render() {


    return (
        <div>
          <Header>Major: </Header>
          <p>{ this.major }</p>

          <div>
            <Dropdown text="please pick a major" clearable >
            <Dropdown.Menu>
            {this.renderMajor()}
            </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
    );
  }
}

export default withRouter(Filter);
