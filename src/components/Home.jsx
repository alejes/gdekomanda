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
        <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
          <input type="text" className="form-control" placeholder="Название" />
        </div>
        <div className="form-group col-xs-12 col-md-offset-3 col-md-6">
          <textarea className="form-control" rows="6" placeholder="Описание"></textarea>
        </div>
        <div className="form-group col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
          <Link className="btn btn-primary btn-lg btn-block" to="/geekday">Создать</Link>
        </div>
      </form>
    </section>
  </div>
)
