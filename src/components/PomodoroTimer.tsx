import { useEffect, useState } from "react";

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

type SessionType = "work" | "break";

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>("work");
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, sessionType]);

  function handleSessionComplete() {
    // Play notification sound (optional - browser API)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(
        sessionType === "work" ? "Work session complete!" : "Break complete!",
        {
          body: sessionType === "work" 
            ? "Time for a 5-minute break!" 
            : "Ready for another work session?",
        }
      );
    }

    // Switch session type and update time
    if (sessionType === "work") {
      setSessionType("break");
      setTimeLeft(BREAK_TIME);
      setCompletedSessions((prev) => prev + 1);
    } else {
      setSessionType("work");
      setTimeLeft(WORK_TIME);
    }
  }

  function start() {
    // Request notification permission on first start
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setTimeLeft(sessionType === "work" ? WORK_TIME : BREAK_TIME);
  }

  function skipSession() {
    setIsRunning(false);
    if (sessionType === "work") {
      setSessionType("break");
      setTimeLeft(BREAK_TIME);
    } else {
      setSessionType("work");
      setTimeLeft(WORK_TIME);
    }
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section>
      <h2>Pomodoro Timer</h2>
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "1rem",
        marginBottom: "1rem" 
      }}>
        <span style={{ 
          fontSize: "0.9rem", 
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: sessionType === "work" ? "#f59e0b" : "#10b981"
        }}>
          {sessionType === "work" ? "Work Session" : "Break Time"}
        </span>
        {completedSessions > 0 && (
          <span style={{ 
            fontSize: "0.8rem", 
            opacity: 0.6 
          }}>
            ({completedSessions} completed)
          </span>
        )}
      </div>

      <p style={{ fontSize: "2rem" }}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </p>

      <div>
        {!isRunning ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={reset}>Reset</button>
        <button onClick={skipSession}>Skip</button>
      </div>
    </section>
  );
}

export default PomodoroTimer;
