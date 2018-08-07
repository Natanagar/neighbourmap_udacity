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
                                value ={this.props.query}
                                onChange ={(event) => {this.props.onUpdate(event.target.value)}} 
                                />
                    </InputGroup>
                    <br/>
                </Alert>            
            </div>
        )
    }
} 
export default SearchBar;