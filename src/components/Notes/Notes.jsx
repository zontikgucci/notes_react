import { useState } from "react"
import "./notes.scss"



export const Notes = () => {
  const [input, setInput] = useState('')
  const [button, setButton] = useState(false)
  const [notes, setNotes] = useState([])

  const inputHandler = (e) => {
    setInput(e.target.value)
  }

  const inputKeyHandler = (e) => {
    if (e.key === 'Enter') {
      addNote()
    }
  }

  const formatDate = num => num < 10 ? `0${num}` : num
  const parseDate = date => {
    const createDate = new Date(date)

    const day = formatDate(createDate.getDay())
    const month = formatDate(createDate.getMonth() + 1)
    const year = createDate.getFullYear()
    const hours = formatDate(createDate.getHours())
    const minutes = formatDate(createDate.getMinutes())
    const seconds = formatDate(createDate.getSeconds())

    return `${hours}:${minutes}:${seconds} ${day}:${month}:${year}`
  }

  const addNote = () => {
    if (input.trim() !== '') {
      const note = {
        id: Date.now(),
        value: input,
        date: parseDate(Date.now()),
        completed: false,
      }

      setNotes(prevNotes => [...prevNotes, note])
      setButton(true)
    }

    setInput('')
    setTimeout(() => {
      setButton(false)
    }, 500)
  }

  const checkHandler = id => {
    setNotes(prevNotes =>
      prevNotes.map(element =>
        element.id === id ? {...element, completed: !element.completed} : element
      )
    )
  }

  const removeHandler = id => {
    setNotes(prevNotes => prevNotes.filter(element => element.id !== id))
  }

  return (
    <div className="container">
        <div className="notes">
            <h1 className="notes__title">Заметки</h1>
            <input type="text"
              placeholder="Название..."
              className="notes__input"
              value={input}
              onChange={inputHandler}
              onKeyDown={inputKeyHandler}
            />
            <button
              className={`notes__add ${button ? 'active' : ''}`}
              onClick={addNote}
            >
              Добавить
            </button>
            <ul className="notes__list">
              {notes.map(element => (
                <li className="notes__item" key={element.id}>
                  <div
                    className={`notes__wrapper-title ${element.completed ? 'done' : ''}`}
                    onClick={() => checkHandler(element.id)}
                  >
                    <span className="notes__item-title">{element.value}</span>
                    <span className="notes__date">{element.date}</span>
                  </div>
                  <span className="notes__height">
                    <button
                      className="notes__check"
                      onClick={() => checkHandler(element.id)}
                    >
                      &#10003;
                    </button>
                    <button
                      className="notes__remove"
                      onClick={() => removeHandler(element.id)}
                    >
                      &#10007;
                    </button>
                  </span>
                </li>
              ))}
            </ul>
        </div>
    </div>
  )
}