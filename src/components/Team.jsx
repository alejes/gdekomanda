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

const Participant = ({ id, name, skill, onClickDelete }) => {
  if (id) {
    return <li className="list-group-item">
      {name}, {skill.title}
      <button
        type="button"
        className="close"
        data-id={ id }
        onClick={ onClickDelete }
      >
        &times;
      </button>
    </li>
  } else {
    return <li className="list-group-item text-muted">
      {skill.title}
    </li>
  }
}

const Participants = ({ participants, onClickDelete }) => {
  return <ul className="list-group text-left">
    { participants.map((participant, index) => <Participant
        key={ index }
        onClickDelete={ onClickDelete }
        {...participant}
      />
    ) }
  </ul>
}

export default class Chat extends React.Component {
  constructor (props) {
    super(props);
    this.loadData();
  }

  state = {
    messages: [],
    isLoading: true
  }

  loadData () {
    Promise.all([
      this.loadMessages(),
      this.loadParticipants()
    ]).then(() => this.setState({
      isLoading: false
    }))
  }

  loadMessages () {
    return fetch(API.messages)
      .then(response => response.json())
      .then(messages => this.setState({
        messages
      }))
  }

  loadParticipants () {
    return fetch(API.participants)
      .then(response => response.json())
      .then(participants => this.setState({
        participants
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
              <Participants
                onClickDelete={ this.onClickDeleteParticipant.bind(this) }
                participants={ this.state.participants }
              />
              <div style={ bottomStyle }>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={ this.loadParticipants.bind(this) }
                >
                  Подобрать
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    }
  }

  onClickDeleteParticipant (event) {
    let deletedId = Number(event.target.dataset.id);
    let newParts = this.state.participants.map(part => deletedId === part.id ? ({
      id: null,
      name: null,
      skill: part.skill
    }) : part);

    this.setState({
      participants: newParts
    });
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
