import React from 'react';

import { ImSad } from 'react-icons/im';

import './not_founded.css';

export default function NotFounded() {
    return(
        <div className='not-founded'>
            <ImSad/>
            <hr/>
            <h1>404</h1>
            <h3>Página não encontrada!</h3>
        </div>
    )
};