import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

export default () => (
  <div className="container">
    <section className="jumbotron text-center">
      <h1 className="page-header">Где команда?</h1>
      <p>
        Создай сервис для поиска команд на своем хакатоне
        в два клика!
      </p>
      <form className="row">
        <div className="form-group col-xs-offset-3 col-xs-6">
          <input type="text" className="form-control" placeholder="Название" />
        </div>
        <div className="form-group col-xs-offset-3 col-xs-6">
          <textarea className="form-control" rows="6" placeholder="Описание"></textarea>
        </div>
        <div className="form-group col-xs-offset-4 col-xs-4">
          <Link className="btn btn-primary btn-lg btn-block" to="/geekday">Создать</Link>
        </div>
      </form>
    </section>
  </div>
)
