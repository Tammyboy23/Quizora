import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LiaArrowRightSolid } from "react-icons/lia";
import { LuFileStack } from "react-icons/lu";

function Explore() {
  const [quizy, setquizy] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/explore")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : Array.isArray(data?.quizes) ? data.quizes : [];
        setquizy(list);
      })
      .catch(() => setquizy([]));
  }, []);

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
        {quizy.length === 0 ? (
          <p className="empty">No Quiz Available</p>
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

                <Link to={`/quiz/${quiz.id}`} className="quizy-link">
                  Start Quiz <LiaArrowRightSolid className="quizy-arrow" />
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