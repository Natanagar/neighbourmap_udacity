import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Alert } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

class SearchBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Alert>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>To the Left!</InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Seach"/>
                    </InputGroup>
                    <br/>
                </Alert>            
            </div>
        )
    }
}


export default SearchBar;