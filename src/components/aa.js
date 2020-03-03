import React from 'react';
import AnyStop from './anyStop';

function AA() {
  return (
    <div className="transit-master">
    <div className="transit-switcher">
      <div className="busemoji">
      </div>
      <div className="transit">
        <div className='transit-on'>
            <AnyStop title='Twenty Fourth Street BART' agency='BA' stop='24TH' />
            <AnyStop title='Millbrae BART' agency='BA' stop='MLBR' />
            <AnyStop title='CalTrain MillBrae' agency='CT' stop='70062' />
            <AnyStop title='CalTrain San Mateo' agency='CT' stop='70091' />
        </div>
      </div>
    </div>
    </div>
  );
}

export default AA;
