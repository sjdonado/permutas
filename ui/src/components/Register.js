import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';
import {COLOMBIA_REGION_LIST} from '../constants/colombia';
import _ from 'lodash';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  //onChange: (key,value) =>
    //dispatch({type: UPDATE_FIELD_AUTH, key, value}),  
  onSubmit: newUser => {
    const payload = agent.Auth.register(newUser);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    //this.onChange = ev => this.props.onChangeField(ev.target.name, ev.target.value);
    this.submitForm = newUser => ev => {
      ev.preventDefault();
      this.props.onSubmit(newUser);
    }    
    
    this.state = {
      email: '',
      password: '',
      dni: '',
      name: '',
      telephone: '',
      mobile: '',
      department: 'Atlántico',
      city: 'Barranquilla',
      school: '', 
      teachingLadder: 1,
      appointmentArea: '',
      barterDepartment: 'Atlántico'
    }        
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  filterRegionListByState = department => {
    return COLOMBIA_REGION_LIST.filter(element => element.departamento === department);
  }

  fetchDepartments = () => {    
    return _.uniqBy(COLOMBIA_REGION_LIST, element => element.departamento);
  }

  onChange = (e) => {        
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm('df')}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      required
                      name = "email"
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                      value={this.state.password}
                      required
                      name = "password"
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre completo"
                      value={this.state.name}
                      required
                      name = "name"
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Cédula"
                      value={this.state.dni}
                      required
                      name = "dni"
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Teléfono"
                      value={this.state.telephone}
                      required
                      name = "telephone"
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Celular"
                      value={this.state.mobile}
                      required
                      name = "mobile"
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <label for = "department">Departamento</label>
                    <select
                      className="form-control"
                      value={this.state.department}
                      required
                      name = "department"                      
                      onChange={this.onChange} >
                      {this.fetchDepartments().map( element => 
                        <option
                          key = {element.c_digo_dane_del_departamento}
                          value = {element.departamento}> {element.departamento}
                        </option>
                      )}
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <label for="city">Ciudad</label>
                    <select
                      className="form-control"
                      value={this.state.city}
                      required
                      name = "city"
                      onChange={this.onChange}>
                        {this.filterRegionListByState(this.state.department).map( el => 
                          <option
                            key = {el.c_digo_dane_del_municipio}
                            value = {el.municipio}> {el.municipio} 
                          </option> 
                        )}
                    </select>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Institución educativa"
                      required
                      name = "school"
                      value={this.state.school}
                      onChange={this.onChange} />
                  </fieldset>
                  
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Escalafón"
                      required
                      name = "teachingLadder"
                      value={this.state.teachingLadder}
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Área de nombramiento"
                      required
                      name = "appointmentArea"
                      value={this.state.appointmentArea}
                      onChange={this.onChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <label for="barterDepartment">Departamento que desea la permuta</label>
                    <select
                      className="form-control"
                      required
                      value={this.state.barterDepartment}
                      name = "barterDepartment"
                      onChange={this.onChange}>
                      {this.fetchDepartments().map( element => 
                        <option 
                          key = {element.c_digo_dane_del_departamento} 
                          value = {element.departamento}> {element.departamento} 
                        </option>
                      )}
                    </select>
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
