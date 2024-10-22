import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const QuizPlay = ({ quizzes, quizNum, setQuizNum, quesAns, setQuesAns, handleSaveAnswer,newUserId }) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [showModal, setShowModal] = useState(null);

    const submitAnswer = (answer) => {
        const newQuestion = {
            question: quizzes[quizNum].question,
            options: quizzes[quizNum].options,
            correctAnswer: quizzes[quizNum].correctAnswer,
            userAnswer: answer
        };
        setQuesAns(prevQuesAns => {
            const newAnswers = [...prevQuesAns];
            newAnswers[quizNum] = newQuestion;
            return newAnswers;
        });

        setSelectedOption(answer);
    };

    const nextQuiz = () => {
        if (quizNum < quizzes.length - 1) {
            setQuizNum(quizNum + 1);
            setSelectedOption(null);
        } else {
            handleSaveAnswer();
            setShowModal(true);
        }
    }
    return (
        <div className='inner_bx_white'>
            <div className='quiz_main_num'>
                <div>
                    <span className='quiz_num_act'>{quizNum + 1}</span>
                    <span className='quiz_num_total'>/05</span>
                </div>
            </div>
            <div className='question_bx-quiz'>

                <h1 className='quiz_question'>{quizzes?.[quizNum]?.question}</h1>
                <div className='options_list-wrp'>
                    {quizzes?.[quizNum]?.options.map((option, index) => (
                        <div onClick={() => submitAnswer(option)} key={index}
                            className={`option_bx ${selectedOption === option ? 'selected' : ''}`}>
                            <label>
                                <span>{index + 1}.</span>
                                <input name='question_answer' type='radio' />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='buttons-btm'>
                <button onClick={() => nextQuiz()} className="btn_next" disabled={!selectedOption} >
                    Next
                    <span>
                        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.87178 9.51297C6.8998 9.29313 6.8998 9.07068 6.87178 8.85084C6.82715 8.50072 6.65947 8.10978 6.17068 7.50115C5.6675 6.87459 4.92386 6.13514 3.83978 5.06068L1.1686 2.41324C0.72285 1.97144 0.71964 1.25195 1.16143 0.806192C1.60323 0.360437 2.32273 0.357229 2.76848 0.799023L5.48779 3.49417C6.51199 4.50923 7.34907 5.33885 7.94271 6.07805C8.56003 6.84672 9.0069 7.62694 9.12627 8.56348C9.17861 8.97412 9.17861 9.38969 9.12627 9.80033C9.0069 10.7369 8.56003 11.5171 7.94271 12.2858C7.34906 13.025 6.51198 13.8546 5.48777 14.8697L2.76848 17.5648C2.32273 18.0066 1.60323 18.0034 1.16143 17.5576C0.71964 17.1119 0.72285 16.3924 1.1686 15.9506L3.83977 13.3031C4.92386 12.2287 5.6675 11.4892 6.17068 10.8627C6.65947 10.254 6.82715 9.86309 6.87178 9.51297Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </button>
            </div>
            {
                showModal ? <div className="modal_wrp">
                    <div className="inner_bx">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_140_557)">
                                <path d="M1.5 28C1.5 13.3886 13.3886 1.5 28 1.5C42.6114 1.5 54.5 13.3886 54.5 28C54.5 42.6114 42.6114 54.5 28 54.5C13.3886 54.5 1.5 42.6114 1.5 28Z" stroke="#800080" strokeWidth="3"></path><path d="M42.1916 22.0662L27.0248 37.2325C26.5698 37.6876 25.9725 37.9166 25.3752 37.9166C24.778 37.9166 24.1807 37.6876 23.7256 37.2325L16.1425 29.6494C15.2299 28.7372 15.2299 27.2623 16.1425 26.3502C17.0546 25.4376 18.5291 25.4376 19.4416 26.3502L25.3752 32.2838L38.8925 18.767C39.8046 17.8544 41.279 17.8544 42.1916 18.767C43.1038 19.6791 43.1038 21.1536 42.1916 22.0662Z" fill="#800080"></path>
                            </g>
                            <defs><clipPath id="clip0_140_557"><rect width="56" height="56" fill="white"></rect></clipPath></defs>
                        </svg>
                        <h6 className="heaing_modal">Done!</h6>
                        <p className="sub_pera">You have attempted 05 questions in total.</p>
                        <Link to={`/result/${newUserId}`} className="show_result_btn">SHOW RESULT</Link>
                    </div>
                </div> : ''
            }

        </div>
    )
}

export default QuizPlay