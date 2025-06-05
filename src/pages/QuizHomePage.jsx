import { useDispatch, useSelector } from "react-redux";
import { fetchSkillQuizFlow, fetchGlobalQuiz } from "../store/quizSlice";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizData, status } = useSelector((state) => state.quiz);

  const handleJoin = async (type) => {
    const action = type === "skill" ? fetchSkillQuizFlow() : fetchGlobalQuiz();
    const res = await dispatch(action);
    console.log(res);
    if (res.meta.requestStatus === "fulfilled") {
      const quizId = res.payload.quizId;
      navigate(`/applicant/quiz/${quizId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Choose Quiz Type</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleJoin("skill")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Skill-Based Quiz
        </button>
        <button
          onClick={() => handleJoin("global")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Global Quiz
        </button>
      </div>
      {status === "loading" && <p className="mt-4">Loading questions...</p>}
    </div>
  );
};

export default Landing;
