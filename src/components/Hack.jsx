import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

export default () => (
  <div className="container">
    <section className="jumbotron text-center">
      <h1 className="page-header">GeekDay</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quidem voluptatem eaque, ab sint assumenda distinctio saepe
        alias perspiciatis repudiandae, velit, reprehenderit recusandae
        quis veritatis illo esse!
        Ut aperiam officiis magni quis, cupiditate, delectus dicta soluta.
        Numquam quibusdam maxime repudiandae quis, autem voluptatibus assumenda vel ea.
        Similique itaque saepe sapiente consequuntur!
      </p>

      <hr />
      <div className="row">
        <p className="col-xs-12"><big>
          Если у Вас есть идея проекта, то Вам
        </big></p>
      </div>
      <div className="row">
        <div className="col-xs-offset-1 col-xs-10 col-md-offset-4 col-md-4">
          <Link className="btn btn-primary btn-lg btn-block" to="/geekday/create">Создать команду</Link>
        </div>
      </div>

      <hr />
      <div className="row">
        <p className="col-xs-12"><big>
          Если Вы умеете что-то крутое и хотите участвовать в хакатоне, то Вам
        </big></p>
      </div>
      <div className="row">
        <div className="col-xs-offset-1 col-xs-10 col-md-offset-4 col-md-4">
          <Link className="btn btn-primary btn-lg btn-block" to="/geekday/find">Найти команду</Link>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-offset-1 col-xs-10 col-md-offset-4 col-md-4">
          <Link to="/geekday/team/1">
            <small className="text-muted">
              Управлять командой
            </small>
          </Link>
        </div>
      </div>
    </section>
  </div>
)
