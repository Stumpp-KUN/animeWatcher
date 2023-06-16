import React, { useState, useEffect } from 'react';
import AnimeDescription from './animeDescription.jsx';
import Head from './head.jsx';
import './receive.css';

const Receive = () => {
    const [stateData, setStateData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
  
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/receives/?page=${currentPage}&size=2`)
            .then((response) => response.json())
            .then((data) => {
                setStateData(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.log(error));
    }, [currentPage]);  
    
    const bol = (val) =>{
        if(val==true) return "Yes, I like it!";
        else return "No, I dont like it!";
    }

    const [value, setValue] = useState('');

    const filterReceive = stateData.filter((item) => {
        return item.anime.title.toLowerCase().includes(value.toLowerCase());
    });

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    return(
        <div>
        <Head/>
        <div>
        <div className='search'>
            <input type='text' placeholder='Enter Anime' onChange={(event) => setValue(event.target.value)} />
        </div>
    {filterReceive.map((receive) => (
       <div className='conta'>
       <div className='background'></div>
       <div className='content'>
           <div className='states'>
            <h1 className='stateName'>{receive.id}. {receive.anime.title}</h1>
            <h1 className='stateAuthor'>Author: {receive.receiver.nickname}</h1>
            <h1 className='stateLike'>Is like: {bol(receive.isLike)}</h1>
            <h1 className='stateAnimeDescription'>Small description: {receive.anime.description}</h1>
            <p className='stateDescription'><AnimeDescription longDescription={receive.description}/></p>
           </div>
       </div>
   </div>
    ))}

                        <div className='pagination'>
                    {filterReceive.length > 0 && (
                        <div>
                            <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </button>
                            <button disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </button>
                        </div>
                    )}
                    <span className='numPage'>Page {currentPage + 1} of {totalPages}</span>
                </div>

    </div>
    </div>)
}

export default Receive;
