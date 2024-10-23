import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../utils';
import QuizPlay from './QuizPlay';
import Result from './Result';

const GetQuiz = () => {
    const gameId = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const [newUserId,setNewUserId] = useState('')
    const [quizIdUrl, setQuizIdUrl] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [quizNum, setQuizNum] = useState(0);
    // const [isCorrect, setIsCorrect] = useState([]);
    const [userName, setUserName] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
    const [errorName, setErrorName] = useState(false);

    const question = ['What is your birth month?', 'What is your favorite drink?', 'What is your favourite season?', 'What is your favorite color?', 'What is your favorite type of music?'];
    const [quesAns, setQuesAns] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const submitName = () => {
        if (userName == '')
            setErrorName(true)
        else
            setShowQuiz(true)
    }

    const handleSaveAnswer = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true)
        try {
            const username = userName;
            const userId = gameId.id;
            const quizId = quizIdUrl;

            const answers = quesAns;
            const newQuiz = { username, userId, answers,quizId };
            const response = await axios.post('http://localhost:8080/api/submit-quiz', newQuiz);
            console.log(response.data, 'Response');
            setNewUserId(response.data.id)
            sessionStorage.setItem('newUser', response.data.id);
        } catch (error) {
            handleError(`Error adding quiz: ${error}`);
        } finally {
            setIsSubmitting(false)
        }
    };

    useEffect(() => {
        if (gameId.id) {
            const fetchQuizzesByUser = async (userId) => {
                try {
                    console.log(userId, 'userId here')
                    const response = await axios.get(`http://localhost:8080/api/quizzes/${userId}`);
                    console.log(response.data[0],'data game play');
                    setQuizzes(response.data[0].quesAns);
                    setQuizIdUrl(response.data[0]._id)
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching quizzes:', error);
                    // navigate('/');
                    handleError('Data Not Found')
                    setError('Failed to fetch quizzes data');
                } finally {
                    setLoading(false);
                }
            };
            fetchQuizzesByUser(gameId.id);
        }
        if(error){
            console.log("Error Found");
            
            // navigate('/')
        }
    }, [gameId.id]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <main>
                {
                    !showQuiz ?
                        <div className='main-box'>
                            <div className='inner_bx_white'>
                                <div className='question_bx-quiz'>
                                    <h1 className='quiz_question'>Enter Your Name</h1>
                                    <div className='name_field_box'>
                                        <input value={userName} onChange={(e) => setUserName(e.target.value)} id="username" type="text" placeholder="Enter your name" />
                                        {errorName ? <p>Please Enter Name</p> : ''}
                                    </div>

                                    <button type="button" onClick={() => submitName()} className="btn_submit_name">Submit</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='main-box'>
                            <QuizPlay newUserId={newUserId} quizzes={quizzes} handleSaveAnswer={handleSaveAnswer} setQuizNum={setQuizNum} setQuesAns={setQuesAns} quizNum={quizNum} />
                        </div>
                }
            </main>
        </>
    );
}

export default GetQuiz