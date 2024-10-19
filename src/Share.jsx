import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Share = () => {
    
    // const quizId = localStorage.getItem('userId');
    const gameId = useParams();

    useEffect(()=>{
        console.log(gameId.id,'gameId');
    })

  return (
    <main>
        <div className='max-w-2xl m-auto rounded-lg border bg-card bg-white text-card-foreground shadow-sm'>

        </div>
    </main>
  )
}

export default Share