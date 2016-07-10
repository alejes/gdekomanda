import React from 'react'
import ReactDOM from 'react-dom'
import Preloader from '../framework/Preloader.jsx'
import API from '../../api.js'

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
          <h1 className="page-header">GeekDay</h1>
          <p>
            Здесь можно будет найти команду
          </p>
        </section>
      </div>
    )
  }

  loadSkills () {
    fetch(API.skills)
      .then((response) => {
        response.json()
          .then((skills) => this.setState({
            skills,
            isLoading: false
          }));
      });
  }
}
