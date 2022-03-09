import { useState } from 'react';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import CreateNew from './components/Createnew';

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)


const AnecdoteLone = ({ anecdotes }) => {
  const anecID = Number(useParams().id);
  const anecdote = anecdotes.find(anec => anec.id === anecID);
  
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {<li key={anecdote.id} >{anecdote.content}</li>}
    </ul>
  </div>
)}



const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const notif = (notif) => {
    setNotification(notif);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        {notification}
      </div>      
      <Router>
        <Menu />
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
          <Route path='/anecdote/:id' element={<AnecdoteLone anecdotes={anecdotes} />}/>
          <Route path='/about'  element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} notif={notif} />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  )
}

export default App
