import React from 'react'
import {Link} from 'react-router-dom';


function Header() {
    return (


        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {/* <a className="nav-link active" aria-current="page" href="#"></a> */}
                            <Link to="/client" className="nav-link">Order List</Link>
                            <Link to="/order" className="nav-link">Client List</Link>
                            {/* <Link to="/client" className="nav-link">Quotation</Link> */}
                            {/* <a className="nav-link" href="#"></a> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Header;