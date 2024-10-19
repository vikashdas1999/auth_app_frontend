import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const GetQuiz = () => {
    const quizId = useParams();
    console.log(quizId.id,'quizId')
    const [quizzes, setQuizzes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuizzesByUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/quizzes/${userId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            setQuizzes(response.data[0].quesAns);
            console.log(response.data[0].quesAns);
            
        } catch (error) {
            // console.error('Error fetching quizzes:', error);
            setError('Failed to fetch quizzes data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(quizId.id){
            console.log('New User play');
            return;
        }
        fetchQuizzesByUser(quizId.id);
    }, [quizId.id]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Quiz</h1>
            {quizzes && (
                <div>
                    {quizzes.map((item, index) => (
                        <div key={index}>
                            <h3>{item.question}</h3>
                            <ul>
                                {item.options.map((option, idx) => (
                                    <li key={idx}>{option}</li>
                                ))}
                            </ul>
                            <b>Correct Answer: {item.correctAnswer}</b>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GetQuiz