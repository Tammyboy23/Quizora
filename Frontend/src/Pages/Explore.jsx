import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LiaArrowRightSolid } from "react-icons/lia";
import { LuBadgeAlert, LuCircleAlert, LuFileStack, LuRefreshCcw } from "react-icons/lu";
import { ScaleLoader } from "react-spinners";
import { useAuth } from "../config/auth-context.jsx";

function Explore() {
  const [quizy, setquizy] = useState([]);
  const [load, setload] = useState(false);
  const { user, isSignedIn } = useAuth();

  useEffect(() => {
    setload(true);
    fetch("http://localhost:3000/explore")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.quizes)
          ? data.quizes
          : [];
        setquizy(list);
      })
      .catch(() => setquizy([]))
      .finally(() => setload(false));
  }, [load]);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="explore">
      <div className="explore-header">
        <div className="explore-eyebrow">All Quizzes</div>
        <h1 className="explore-title">What do you want to test today?</h1>
        <p className="explore-subtitle">
          Pick a category and put your knowledge to the test.
        </p>
      </div>

      <div className="quizes">
        {!isSignedIn ? (
          <div className="need">
            <p>You Need to Sign In First</p>
            <LuBadgeAlert size={50} color="red"/>
            <Link to="/signup"><button>SIGN IN</button></Link>
          </div>
        ) : quizy.length === 0 ? (
          <div className="empty">
            <p className="empty">No Quiz Available</p>
            <button className="refresh" onClick={refresh}>
              Refresh <LuRefreshCcw />
            </button>
          </div>
        ) : (
          quizy.map((quiz, i) => (
            <div
              className="quizy"
              key={quiz.id ?? `${quiz.name || "quiz"}-${i}`}
              style={{ "--delay": `${i * 60}ms` }}
            >
              <div className="quizy-inner">
                <div className="quizy-top">
                  <div className="quizy-img-wrap">
                    <img src={quiz.img} alt={quiz.name} />
                  </div>
                  <span className="quizy-count">
                    <LuFileStack />
                    {quiz.queue.length} Qs
                  </span>
                </div>

                <div className="quizy-body">
                  <h2 className="quizy-name">{quiz.name}</h2>
                  <p className="quizy-desc">{quiz.desc}</p>
                </div>

                <Link to={`/note/${quiz.id}`} className="quizy-link">
                  Begin Lesson <LiaArrowRightSolid className="quizy-arrow" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Explore;