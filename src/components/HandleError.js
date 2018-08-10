import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
export default class ErrorBoundary extends Component { 
    state = {
        hasError : false
    }
    componentDidCatch(error, info) {
        console.log(`error  ${error}`)
        console.log(`info ${info}`)
        this.setState({ hasError : true })
    }
    render(){
        if(this.state.hasError) {
            return(
                <Container>
                    <Row>
                     <Col ml="4" xl="4">
                         <Alert color="danger">
                         Something went wrong!
                         </Alert>
                     </Col>
                     <Col ml="8" xl="8">
                         <Alert color="warning">
                         <i className="fas fa-exclamation-triangle" />
                         </Alert>
                     </Col>
                    </Row>
                </Container>
             )
        } else {return this.props.children}
    }
}