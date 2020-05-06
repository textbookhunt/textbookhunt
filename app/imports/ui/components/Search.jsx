import React from 'react';
import {  Button, input } from 'semantic-ui-react';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Search extends React.Component {
  state = { isSearch: false, search: '' };
  search;
  constructor(props){
    super(props);
    this.state = { isSearch: false, search: '' };
    this.search = '';
  }
  lookFor(){
    //this.setState({isFilter: true, major : major});
    console.log(this.search);
    //this.props.sendSearch(this.search);



  }



  render() {


    return (
        <div>
          <input type="text" ref={input => this.search = input} placeholder="Search..." />
          <Button icon ="search" onClick={()=>this.lookFor()}>Search for the book name</Button>

        </div>
    );
  }
}
export default withRouter(Search);
