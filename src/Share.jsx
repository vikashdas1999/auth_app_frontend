import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { handleError, handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';

const Share = () => {

  // const quizId = localStorage.getItem('userId');
  const gameId = useParams();
  const [pageurl, setPageurl] = useState('')
  useEffect(() => {
    console.log(gameId.id, 'gameId');
    setPageurl(window.location.href + gameId.id)
  })
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        handleSuccess('URL Copy Successfully!');
      })
      .catch((error) => {
        handleError('Failed to copy text: ' + error);
      });
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${pageurl}`;
    window.open(whatsappUrl, '_blank');
  };
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageurl}`;
    window.open(facebookUrl, '_blank'); // Open in a new tab
  };
  return (
    <main>
      <div className='main-box'>
        <div className='inner_bx_white'>
          <h1 className='share_title'>Your Quiz Created Successfully</h1>
          <div className='share_quiz_box'>
            <input defaultValue={pageurl} placeholder='share url' />
            <button onClick={() => copyToClipboard(pageurl)} className='copy_btn'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="stroke" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default Share