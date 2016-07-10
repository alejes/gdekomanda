import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

export default () => (
  <div className="container">
    <section className="jumbotron text-center">
      <h1 className="page-header">GeekDay</h1>
      <p className="text-center">
        Вы успешно зарегистрировались на хакатоне.<br />
        Ожидайте, пока Вас пригласят в команду<br />
        или <Link to="/geekday/create">создайте свою</Link>
      </p>
    </section>
  </div>
)
