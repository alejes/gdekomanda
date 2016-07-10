import React from 'react'
import ReactDOM from 'react-dom'

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

export default () => (
  <div className="container">
    <section className="jumbotron text-center">
      <h1 className="page-header">Команда ГдеКоманда</h1>
      <hr />
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <section style={ chatStyle }>
            <i>Чат пуст</i>
          </section>
          <footer>
            <button type="button" className="btn btn-primary">Отправить сообщение</button>
          </footer>
        </div>
        <div className="col-xs-12 col-md-4" style={ partStyle }>
          <h4>Участники</h4>
          <ul className="list-group text-left">
            <li className="list-group-item">
              Петр, Фронтенд
              <button type="button" className="close">&times;</button>
            </li>
            <li className="list-group-item">
              Василий, Бэкенд
              <button type="button" className="close">&times;</button>
            </li>
            <li className="list-group-item">
              Жанна, Дизайн
              <button type="button" className="close">&times;</button>
            </li>
            <li className="list-group-item">
              Мобильная разработка - не найден
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
)
