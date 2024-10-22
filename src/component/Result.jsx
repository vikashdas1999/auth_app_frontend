import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Result = () => {
    const userId = useParams();
    const newUser = localStorage.getItem('newUser')
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questionList, setQuestionList] = useState([])

    const [userDetails, setUserDetails] = useState([])
    useEffect(() => {
        console.log(newUser, 'newUser');
        const fetchUserDetails = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
                return response.data;
            } catch (error) {
                setError(`Error fetching Quiz By Data: ${error.message}`);
                return null;
            }
        };



        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/results/${userId.id}`);
                setResults(response.data[0]);
                setQuestionList(response.data[0].answers)
                console.log(response.data[0], 'Result Data');

                const userDetails = await fetchUserDetails(response.data[0].userId);
                setUserDetails(userDetails[0]); 
                console.log(userDetails[0], 'user Details');

            } catch (error) {
                setError(`Error fetching results: ${error.message}`);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };
        fetchResults();
    }, [newUser]);





    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='main_parent_result'>
            <div className='result_box'>
                <div className='inner_result_bx'>
                    <div className='created_by_detail'>
                        <p>Question Created By:<span> {userDetails.name} </span></p>
                        <p>Your Score :<span> 0{results.score} </span>/ 05</p>
                        <p>Your Name:<span> {results.username}</span></p>
                    </div>
                    {
                        questionList?.map((data, index) => {
                            return (
                                <div key={index} className='right_wrong_ques'>
                                    <div className='width_90_per'>
                                        <div className='question_header'>
                                            <h6>{index+1}.</h6>
                                            <span>{data.question}</span>
                                        </div>
                                        <div className='options_list_q'>
                                            <ul>
                                                {
                                                    data.options.map((optiondata, index) => {
                                                        let dynamiClass = '';
                                                        if (data.correctAnswer === optiondata) {
                                                            dynamiClass = 'right_answer';
                                                        } else if (data.userAnswer === optiondata) {
                                                            dynamiClass = 'wrong_answer';
                                                        }
                                                        return (
                                                            <li className={dynamiClass} key={index}>
                                                                <span>{index+1}.</span>
                                                                {optiondata}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <span>Score 0</span> */}
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Result