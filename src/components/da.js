import React from 'react';
import AnyStop from './anyStop';

function AA() {
  return (
    <div>
      <div className="busemoji">
      </div>
      <div className="transit">
        <div className='transit-on'>
            <AnyStop agency='BA' stop='NBRK' />
            <AnyStop agency='AC' stop='56144' />
            <AnyStop agency='AC' stop='55327' />
            <AnyStop agency='AC' stop='59600' />
            <AnyStop agency='AC' stop='55165' />
        </div>
      </div>
      </div>
  );
}

export default AA;
