import PomodoroTimer from "./components/PomodoroTimer";
import TodoList from "./components/TodoList";
import NotesList from "./components/NotesList";
import "./App.css";

function App() {
  return (
    <main className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Productivity Suite</h1>
          <p className="header-subtitle">Focus • Organize • Create</p>
        </div>
      </header>
      
      <div className="main-layout">
        <div className="timer-wrapper">
          <PomodoroTimer />
        </div>
        
        <div className="content-grid">
          <TodoList />
          <NotesList />
        </div>
      </div>
    </main>
  );
}

export default App;
