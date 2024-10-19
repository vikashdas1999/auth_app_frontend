import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMonthQuestion from './AddMonthQuestion';
import AddDrinkQuestion from './AddDrinkQuestion';
import AddSeasonQuestion from './AddSeasonQuestion';
import AddColorQuestion from './AddColorQuestion';
import AddMusicQuestion from './AddMusicQuestion';
import ShareQuestion from './ShareQuestion';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AddQuiz = () => {
    const quizId = localStorage.getItem('userId');
    const question = ['What is your birth month?', 'What is your favorite drink?', 'What is your favourite season?', 'What is your favorite color?', 'What is your favorite type of music?'];
    const [quesAns, setQuesAns] = useState([]);
    const [currectQuestion, setCurrentQuestion] = useState(0)
    const [quizzes, setQuizzes] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true); 
        try {
            const newQuiz = { quesAns };
            console.log(newQuiz, 'newQuiz');

            const response = await axios.post('http://localhost:8080/api/quizzes', newQuiz, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const quizId = response.data._id; // Adjust according to your API response structure
            const shareableUrl = `http://localhost:8080/play-quiz/${quizId}`; // Construct the shareable URL

            console.log(shareableUrl,'shareableUrl');

            handleSuccess('Quiz added successfully!')
            setTimeout(() => navigate(`/share/${quizId}`), 1000);
        } catch (error) {
            handleError(`Error adding quiz: ${error}`)
        }
    };



    const fetchQuizzesByUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/quizzes/${userId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            setQuizzes(response.data[0].quesAns);
            console.log(response.data[0].quesAns);
            
            handleSuccess('You have already Quiz');
            setTimeout(() => {                
                navigate(`/Share/${quizId}`)
            }, 500);

        } catch (error) {
            // handleError('Failed to fetch quizzes data');
        }
    };

    
    useEffect(() => {
        fetchQuizzesByUser(quizId);
    }, []); 

    return (
        <main>

            <div className='max-w-2xl m-auto rounded-lg border bg-card bg-white text-card-foreground shadow-sm'>
                <form>
                    {
                        currectQuestion == 0 ? <AddMonthQuestion currectQuestion={currectQuestion} setCurrentQuestion={setCurrentQuestion} question={question[0]} setQuesAns={setQuesAns} />
                            : ''
                    }
                    {
                        currectQuestion == 1 ? <AddDrinkQuestion currectQuestion={currectQuestion} setCurrentQuestion={setCurrentQuestion} question={question[1]} quesAns={quesAns} setQuesAns={setQuesAns} />
                            : ''
                    }
                    {
                        currectQuestion == 2 ? <AddSeasonQuestion currectQuestion={currectQuestion} setCurrentQuestion={setCurrentQuestion} question={question[2]} quesAns={quesAns} setQuesAns={setQuesAns} />
                            : ''
                    }
                    {
                        currectQuestion == 3 ? <AddColorQuestion currectQuestion={currectQuestion} setCurrentQuestion={setCurrentQuestion} question={question[3]} quesAns={quesAns} setQuesAns={setQuesAns} />
                            : ''
                    }
                    {
                        currectQuestion == 4 ? <AddMusicQuestion currectQuestion={currectQuestion} setCurrentQuestion={setCurrentQuestion} question={question[4]} quesAns={quesAns} setQuesAns={setQuesAns} />
                            : ''
                    }
                    {
                        currectQuestion == 5? 
                        <>
                            <button onClick={handleSubmit}>Save Question</button>
                        </>
                        :''
                    }
                </form>
            </div>
            <ToastContainer/>
        </main>
    );
};

export default AddQuiz;