import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Clock from "react-live-clock";


const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <div>
          <i className="fa fa-tree" aria-hidden="true" />{" "}
          <span className="hide-sm">{user && user.trees}</span>
        </div>
      </li>
      <li>
        <div>
          <i className="fas fa-leaf" />{" "}
          <span className="hide-sm">{user && user.leaves}</span>
        </div>
      </li>
      <li>
        <div>
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">{user && user.name}</span>
        </div>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const mwenbwaAuthLink = (
    <Link to="/dashboard">
      <i className="fas fa-code"></i> Mwenbwa{" "}
    </Link>
  );

  const mwenbwaGuestLink = (
    <Link to="/">
      <i className="fas fa-code"></i> Mwenbwa{" "}
    </Link>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        {!loading && (
          <Fragment>
            {" "}
            {isAuthenticated ? mwenbwaAuthLink : mwenbwaGuestLink}
          </Fragment>
        )}
      </h1>
      <Clock
      className={"clock"}
      format={"HH:mm:ss"}
      interval={1000}
      ticking={true}
      />
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
