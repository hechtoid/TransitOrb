import React from 'react';
import AnyStop from './anyStop';

function AA() {
  return (
        <div className='transit-on'>
            <AnyStop title='Twenty Fourth Street BART' agency='BA' stopCode='24TH' filterIN={['YL-S', 'RD-S']} />
            <AnyStop title='Millbrae BART' agency='BA' stopCode='MLBR' />
            <AnyStop title='CalTrain MillBrae' agency='CT' stopCode='70062' />
            <AnyStop title='CalTrain San Mateo' agency='CT' stopCode='70091' />
        </div>
  );
}

export default AA;
