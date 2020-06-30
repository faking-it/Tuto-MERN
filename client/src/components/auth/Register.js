import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { CirclePicker } from 'react-color';
import PropTypes from "prop-types";

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [color, setColor] = useState('#ff0000');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    color,
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password, color });
    }
  };

  // Redirige vers la page d'acceuil une fois authentifié
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Create your account</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-field"
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          //required
          />
        </div>
        <div className="form-group">
          <input
            className="form-field"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          //required
          />
        </div>
        <div className="form-group">
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          //minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            className="form-field"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          //minLength="6"
          />
        </div>

        <div className="form-group colorpicker">
          <h2>Select your color</h2>
          <CirclePicker
            color={color}
            onChangeComplete={(color) => { setColor(color.hex) }}
          />
        </div>
        {console.log(color)}
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool

};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
