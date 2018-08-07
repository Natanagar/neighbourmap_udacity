import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import PropTypes from 'prop-types';



class SearchBar extends Component {
    static propTypes = {
        query: PropTypes.string.isRequired,
        onUpdate: PropTypes.func.isRequired
    }
    state = {
        query: ''
    }
    updateQuery = (query)=>{
        this.setState({query : query})
    }
    render(){
        return(
    
            <div>
                <Alert>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className="bar" >Go to markers</InputGroupText>
                        </InputGroupAddon>
                                <Input 
                                className='input' 
                                type="text" 
                                placeholder="Seach"
                                value ={this.state.query}
                                onChange ={(event) => {this.updateQuery(event.target.value)}} 
                                />
                    </InputGroup>
                    <br/>
                </Alert>            
            </div>
        )
    }
} 
export default SearchBar;