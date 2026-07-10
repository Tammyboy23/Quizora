import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowLeftToLine, LuBookMarked, LuBookOpenText } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import {BeatLoader, ClipLoader, DotLoader, HashLoader, MoonLoader, PropagateLoader, PulseLoader, RingLoader, RiseLoader, ScaleLoader, SyncLoader} from 'react-spinners'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

function Note(){
    const {id} = useParams();
    const [notes, setnotes] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);

    useEffect(() => {
        setloading(true);
        setnotes(null);
        seterror(false);
        fetch(`https://quizora-r3li.onrender.com/note/${id}`)
        .then(res => res.json())
        .then((data) => {
            setnotes(data);
            setloading(false);
        })
        .catch(() => {
            seterror(true);
            setloading(false);
        })
    },[id])

    if (loading) {
        return (
            <div className="note">
                <Link to="/explore"><button><LuArrowLeft /> Back</button></Link>
                <div className="loader">
                    <p>Loading in Progress</p>
                    <p><ScaleLoader color="#bd4dfe" size={30}/></p>
                </div>
                
            </div>
        )
    }

    if (error || !notes) {
        return (
            <div className="note">
                <Link to="/explore"><button><LuArrowLeft /> Back</button></Link>
                <p>Couldn't load this note. Please try again.</p>
            </div>
        )
    }

return(
    <>
    <div className="note">
        <Link to="/explore"><button className="back"><LuArrowLeft /> Back</button></Link>
        <h1>{notes.title}</h1>
        <div className="quiz-note">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    table: ({node, ...props}) => (
                        <div className="table-wrapper">
                            <table className="note-table" {...props} />
                        </div>
                    ),
                    h2: ({node, ...props}) => <h2 className="note-h2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="note-h3" {...props} />,
                    ul: ({node, ...props}) => <ul className="note-list" {...props} />,
                    ol: ({node, ...props}) => <ol className="note-list" {...props} />,
                    p: ({node, ...props}) => <p className="note-paragraph" {...props} />,
                }}
            >
                {notes.note}
            </ReactMarkdown>
        </div>
        <div className="down">
            <Link to={`/quiz/${notes.id}`}><button className="quizy-link"><p>Take Quiz</p> <LuBookOpenText /></button></Link>
        </div>
    </div>
    </>
)
}
export default Note;