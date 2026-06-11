import { quiz1 } from "./Quiz1"
import { quiz2 } from "./Quiz2"
import { quiz3 } from "./Quiz3"

export const quizes = [
    {
        name: "Physics",
        img: "https://www.svgrepo.com/show/288275/physics-science.svg",
        desc: "Physics is a subject involving the physical world",
        length: quiz1.length,
        quiz: "quiz1",
    },
    {
        name: "Maths",
        img: "https://www.svgrepo.com/show/178066/maths-technology.svg",
        desc: "Maths is a complicated subject but is compulsory for all people",
        length: quiz2.length,
        quiz: "quiz2",
    },
    {
        name: "Statistics",
        img: "https://www.svgrepo.com/show/453478/statistics.svg",
        desc: "Statistics is a complex and disturbig subject but it make you look smarter",
        length: quiz3.length,
        quiz: "quiz3",
    },
]