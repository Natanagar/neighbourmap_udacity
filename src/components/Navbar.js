import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import Facebook from './img/facebook.svg';



export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Alert color="dark">
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">Welcome to Kielce Poland!</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse isOpen={!this.state.collapsed} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink href="/components/">Login with 
                                  <img src={Facebook} width="24" height="24" alt="FB" />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Natanagar/neighbourhood-map">Code in GitHub</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
            </Navbar>
        </Alert>
      </div>
    );
  }
}
NavbarToggler.propTypes = {
    type: PropTypes.string,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
  }
  