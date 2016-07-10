import React from 'react'
import ReactDOM from 'react-dom'
import Preloader from './framework/Preloader.jsx'
import API from '../api.js'

const chatStyle = {
  minHeight: '400px'
};

const partStyle = {
  minHeight: '360px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  background: '#fff',
  position: 'relative'
};

const bottomStyle = {
  position: 'absolute',
  bottom: '10px',
  left: '0',
  width: '100%'
};

const msgStyle = {
  textAlign: 'left',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ddd',
  background: '#fff',
  minHeight: '60px',
  padding: '5px'
};

const Message = ({ from, text }) => (
  <div style={ msgStyle }>
    <i>{ from }:</i><br />
    { text }
  </div>
)

const Messages = ({ messages }) => {
  if (messages.length > 0) {
    return <div>
      { messages.map(({ id, ...message }) => <Message key={ id } {...message} /> ) }
    </div>
  } else {
    return <i>В чате пусто</i>
  }
}

export default class Chat extends React.Component {
  constructor (props) {
    super(props);
    this.loadMessages();
  }

  state = {
    messages: [],
    isLoading: true
  }

  loadMessages () {
    fetch(API.messages)
      .then(response => response.json())
      .then(messages => this.setState({
        messages,
        isLoading: false
      }))
  }

  render () {
    if (this.state.isLoading) {
      return <Preloader />
    } else {
      return <div className="container">
        <section className="jumbotron text-center">
          <h1 className="page-header">Команда ГдеКоманда</h1>
          <hr />
          <div className="row">
            <div className="col-xs-12 col-md-8">
              <section style={ chatStyle }>
                <Messages messages={ this.state.messages } />
              </section>
              <form onSubmit={ this.onSubmit.bind(this) }>
                <div className="form-group col-xs-12">
                  <textarea className="form-control" ref="msg" rows="3" placeholder="Введите сообщение" />
                </div>
                <div className="form-group col-xs-12">
                  <button type="submit" className="btn btn-primary">Отправить</button>
                </div>
              </form>
            </div>
            <div className="col-xs-12 col-md-4" style={ partStyle }>
              <h4>Участники</h4>
              <ul className="list-group text-left">
                <li className="list-group-item">
                  Петр, фронтендер
                  <button type="button" className="close">&times;</button>
                </li>
                <li className="list-group-item">
                  Василий, бэкендер
                  <button type="button" className="close">&times;</button>
                </li>
                <li className="list-group-item">
                  Жанна, дизайнер
                  <button type="button" className="close">&times;</button>
                </li>
                <li className="list-group-item text-muted">
                  мобильный разработчик
                </li>
              </ul>
              <div style={ bottomStyle }>
                <button type="button" className="btn btn-primary">
                  Подобрать
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    }
  }

  onSubmit (event) {
    event.preventDefault();

    let data = {
      teamId: location.pathname.split('/')[3],
      message: this.refs.msg.value
    };

    // @todo integration with api
    console.log(data);
  }
}
