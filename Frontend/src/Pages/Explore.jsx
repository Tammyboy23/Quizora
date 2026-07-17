import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LiaArrowRightSolid } from "react-icons/lia";
import { LuBadgeAlert, LuBookCheck, LuBookImage, LuLayers, LuLogIn, LuNewspaper, LuRefreshCcw, LuShieldQuestion } from "react-icons/lu";
import { useAuth } from "../config/auth-context.jsx";
import { ScaleLoader } from "react-spinners";

function Explore() {
  const [load, setload] = useState(true);
  const [quizy, setquizy] = useState([]);
  const { user, isSignedIn } = useAuth();
  const [filter, setfilter] = useState("all");

  useEffect(() => {
    setload(true);
    fetch("https://quizora-r3li.onrender.com/explore",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filter })
    })
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
  }, [filter]);

  const refresh = () => {
    window.location.reload();
  };
  const filters = ["all", "Lesson", "QuizOnly"];
  const filterIcons = {
    all: <LuLayers size={14} />,
    Lesson: <LuBookCheck size={14} />,
    QuizOnly: <LuNewspaper size={14} />,
  };
  const filterLabels = {
    all: "All",
    Lesson: "Lessons",
    QuizOnly: "Quizzes",
  };
  return (
    <div className="explore">
      <div className="explore-header">
        <div className="explore-eyebrow">Explore Page</div>
        <h1 className="explore-title">What do you want to test today?</h1>
        <p className="explore-subtitle">
          Pick a category and put your knowledge to the test.
        </p>
      </div>
      <div className="filter-bar">
        {filters.map((fil) => (
          <button
            className={`filter-btn${filter === fil ? " filter-btn--active" : ""}`}
            key={fil}
            onClick={() => setfilter(fil)}
          >
            {filterIcons[fil]}
            {filterLabels[fil]}
          </button>
        ))}
      </div>

      <div className="quizes">
        {load ? (
          <div className="load">
            <h1>Content Loading</h1>
            <ScaleLoader size={30} color="#5da9ff" />
          </div>
        ) : !isSignedIn ? (
          <div className="need">
            <p>You Need to Sign In First</p>
            <LuLogIn size={50} color="red" />
            <Link to="/signup">
              <button>SIGN IN</button>
            </Link>
          </div>
        ) : quizy.length === 0 ? (
          <div className="empty">
            <p className="empty">No Quiz Available</p> <br />
            <button className="reload" onClick={refresh}>
              Reload <LuRefreshCcw />
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
                    {quiz.quizType === "QuizOnly" ? <LuNewspaper /> : <LuBookCheck />}
                    {quiz.quizType}
                  </span>
                </div>

                <div className="quizy-body">
                  <h2 className="quizy-name">{quiz.name}</h2>
                  <p className="quizy-desc">{quiz.desc}</p>
                </div>

                <Link
                  to={`/${quiz.quizType === "Lesson" ? "note" : "quiz"}/${quiz.id}`}
                  className="quizy-link"
                >
                  Start <LiaArrowRightSolid className="quizy-arrow" />
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