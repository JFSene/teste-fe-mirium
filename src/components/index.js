import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const divStyle = {
    margin:'290px',
  };

class Index extends Component {
    

    render() {
        return(
            <div className="center-div">
            <div className="example3">
                <Link to="/new-user" className="btn btn-primary">
                    Cadastro
                </Link>
            </div>
            </div>
        );
    }
}

export default Index;