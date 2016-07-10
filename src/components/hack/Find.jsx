import React from 'react'
import ReactDOM from 'react-dom'
import Preloader from '../framework/Preloader.jsx'
import SkillSelect from './SkillSelect.jsx'
import API from '../../api.js'
import { Link } from 'react-router'

export default class HackFind extends React.Component {
  constructor(props) {
    super(props);
    this.loadSkills();
  }

  state = {
    isLoading: true
  }

  render () {
    return this.state.isLoading ? (
      <Preloader />
    ) : (
      <div className="container">
        <section className="jumbotron text-center">
          <h1 className="page-header">GeekDay: поиск команды</h1>
          <p>Оставьте свои данные и капитан команды найдет Вас</p>

          <form className="row" onSubmit={ this.onSubmit.bind(this) }>
            <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
              <input type="text" ref="name" className="form-control" placeholder="Ваше имя" />
            </div>
            <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
              <input type="email" ref="email" className="form-control" placeholder="Адрес электронной почты" />
            </div>
            <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
              <SkillSelect
                options={ this.state.skills }
                selected={ this.state.selectedSkill }
                onChange={ this.onChangeSkill.bind(this) }
              />
            </div>
            <div className="form-group col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
              <Link className="btn btn-primary btn-lg btn-block" to="/geekday/user">Отправить</Link>
            </div>
          </form>
        </section>
      </div>
    )
  }

  onChangeSkill (event) {
    let value = Number(event.target.value);
    let skill = this.state.skills.find(({ id }) => id === value);

    this.setState({
      selectedSkill: skill
    });
  }

  onSubmit (event) {
    event.preventDefault();
    
    let data = {
      hackaton_id: location.pathname.split('/')[1],
      name: this.refs.name.value,
      email: this.refs.email.value,
      skill: this.state.selectedSkill.id
    };

    // @todo Интегрировать с АПИ
    console.log(data);
  }

  loadSkills () {
    fetch(API.skills)
      .then((response) => {
        response.json()
          .then((skills) => this.setState({
            skills: skills.map((data) => Object.assign({}, data, { id: Number(data.id) })),
            selectedSkill: skills[0],
            isLoading: false
          }));
      });
  }
}
