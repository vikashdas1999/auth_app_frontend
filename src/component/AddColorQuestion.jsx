import React, { useState } from 'react'

const AddColorQuestion = ({question,setQuesAns,currectQuestion,setCurrentQuestion}) => {

    const [correctAns,setCorrectAns] = useState('');
    const [options,setOptions] = useState();

    const generateRandomOptions = (correct) => {
        const randomOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple','Pink','Brown','Black','White'];
        const filteredOptions = randomOptions.filter(option => option !== correct);
        const selectedOptions = new Set([correct]);
    
        while (selectedOptions.size < 4) {
            const randomIndex = Math.floor(Math.random() * filteredOptions.length);
            selectedOptions.add(filteredOptions[randomIndex]);
        }
    
        const optionsArray = Array.from(selectedOptions);
    
        for (let i = optionsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
        }
    
        return optionsArray;
    };
    const handleGenerateOptions = (e) => {
        console.log(e,'currect Answer');
        
        const correct = e;
        const generatedOptions = generateRandomOptions(correct);
        setOptions(generatedOptions);
        setCorrectAns(correct);
    };

    
    const submitAnswer = () => {
        const newQuestion = {
            question: question,
            options: options,
            correctAnswer: correctAns
        };

        setQuesAns(prevQuesAns => [...prevQuesAns, newQuestion]);

        console.log('New Question:', newQuestion);
        setCurrentQuestion(currectQuestion+1)
    };
    return (
        <>
            <div className='flex flex-col space-y-1.5 px-6 pt-6'>
                <h2 className='text-3xl text-center font-semibold leading-none tracking-tight mb-4 border-bottom'>Add New Quiz</h2>
                <h2 className='text-2xl font-semibold leading-none tracking-tight'>{question}</h2>
            </div>
            <div className='pt-0'>
                <div className="card-options p-6">
                    <select
                        onChange={(e) => handleGenerateOptions(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        {
                            ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple','Pink','Brown','Black','White'].map((option, index) => (
                                <option key={index}>{option}</option>
                            ))
                        }
                    </select>
                    <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' type="button" onClick={submitAnswer}>Continue</button>
                </div>
            </div>
        </>
    )
}

export default AddColorQuestion