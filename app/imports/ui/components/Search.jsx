import React from 'react';
import { Button, Input, Icon, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
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
    if (this.search.value!=='')
    {

      console.log(this.search.value);
      this.props.sendSearch(this.search.value);
    }
    //this.props.sendSearch(this.search);



  }



  render() {


    return (
        <div>
          <input  style={{marginLeft:20+'px',  height:40+'px', width:200+'px', borderRadius: 10+'px', outline: "none"}} type="search" ref={input => this.search = input} placeholder="please enter the book name" required />

          <Button style={{marginRight: "20px", backgroundColor:"black", color: "white"}} onClick={()=>this.lookFor()}>Search</Button>

        </div>
    );
  }
}
Search.propTypes = {
  search: PropTypes.string,


};
export default withRouter(Search);
