import React from 'react'
import ReactDOM from 'react-dom'
import Preloader from '../framework/Preloader.jsx'
import SkillSelect from './SkillSelect.jsx'
import API from '../../api.js'
import { browserHistory } from 'react-router'

const CodersSelector = ({ count, skills, onChangeCount, selectedSkills, onChangeSkill }) => {
  if (count > 0) {
    let numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(i);
    }

    return <section>
      <div className="col-xs-12"><b>Выберите скиллы, необходимые для проекта</b></div>
      { numbers.map(number => (
        <div key={ number } className="form-group col-xs-12 col-md-offset-3 col-md-6">
          <SkillSelect
            key={ number }
            index={ number }
            options={ skills }
            onChange={ onChangeSkill }
            selected={ selectedSkills[number] }
          />
        </div>
      )) }
    </section>
  } else {
    let numbers = [1, 2, 3, 4];

    return <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
      <select className="form-control" onChange={ onChangeCount }>
        { numbers.map(number => <option key={ number } value={ number }>{ number }</option>) }
      </select>
    </div>
  }
}

export default class CreateFind extends React.Component {
  constructor(props) {
    super(props);
    this.loadSkills();
  }

  state = {
    isLoading: true,
    count: 0
  }

  render () {
    return this.state.isLoading ? (
      <Preloader />
    ) : (
      <div className="container">
        <section className="jumbotron text-center">
          <h1 className="page-header">GeekDay: создать команду</h1>
          <form className="row" onSubmit={ this.onSubmit.bind(this) }>
            <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
              <input type="text" ref="title" className="form-control" placeholder="Название проекта" />
            </div>
            <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
              <input type="email" ref="email" className="form-control" placeholder="Адрес электронной почты" />
            </div>
            <CodersSelector
              count={ this.state.count }
              skills={ this.state.skills }
              selectedSkills={ this.state.selectedSkills }
              onChangeCount={ this.onChangeCodersCount.bind(this) }
              onChangeSkill={ this.onChangeCoderSkill.bind(this) }
            />
            <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
              <textarea className="form-control" ref="description" rows="6" placeholder="Описание проекта"></textarea>
            </div>
            <div className="form-group col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
              <button type="submit" className="btn btn-primary btn-lg btn-block">Создать</button>
            </div>
          </form>
        </section>
      </div>
    )
  }

  onSubmit (event) {
    event.preventDefault();

    let data = {
      method: 'PUT',
      hackaton_id: 1,
      title: this.refs.title.value,
      email: this.refs.email.value,
      description: this.refs.description.value,
      skills: this.state.selectedSkills.map(({ id }) => id)
    };

    // @todo Интегрировать с АПИ
    console.log(data);

    fetch(API.capitan, {  
        method: 'PUT', 
        headers: {  
          'Content-type': 'application/json; charset=UTF-8'  
        },  
        body: JSON.stringify(data)
      })
      .then(response => {
        console.log('SUCCESS');
        response.json()
          .then(data => {
            console.log(data);
            browserHistory.push(`/geekday/team/${data.answer}`);
          });
      })
      .catch(error => console.log('ERROR'));
  }

  onChangeCodersCount (event) {
    let selectedSkills = [];
    let count = event.target.value;
    for (let i = 0; i < count; i++) {
      selectedSkills.push(this.state.skills[0]);
    }

    this.setState({
      count,
      selectedSkills
    });
  }

  onChangeCoderSkill (event) {
    // id кодера (участника)
    let index = Number(event.target.dataset.index);
    // id скилла
    let value = Number(event.target.value);

    let skill = this.state.skills.find(({ id }) => id === value);
    let selectedSkills = this.state.selectedSkills;
    selectedSkills[index] = skill;

    this.setState({
      selectedSkills
    });
  }

  loadSkills () {
    fetch(API.skills)
      .then((response) => {
        response.json()
          .then((skills) => this.setState({
            skills: skills.map((data) => Object.assign({}, data, { id: Number(data.id) })),
            isLoading: false
          }));
      });
  }
}
