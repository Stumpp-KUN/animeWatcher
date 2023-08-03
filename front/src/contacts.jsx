import React, { useEffect, useState } from 'react';
import Component from './head';
import './contact.css';

const Contact = () => {

    return(
        <div>
          <Component/>
          <div class="con">
              <div class="back"></div>
              <div class="cont">
                    <h1 className='contact'>Contacts</h1>
                    <hr className='line'></hr>
                    <div className='mail'>
                        <h1 className='types'>Email</h1>
                        <h1 className='value'>kiril.bychkov.03@mail.ru</h1>
                    </div>
                    <hr className='line'></hr>
                    <div className='telegram'>
                        <h1 className='types'>Telegram</h1>
                        <h1 className='value'>@stumppro</h1>
                    </div>
              </div>
              </div>  
        </div>
    )
}

export default Contact;