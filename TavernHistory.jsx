import React from 'react';

import Tavern from './Tavern';

const TavernHistory = ({ history }) => {
  const histories = history.map((h, i) => {
    const { name, general, service, guests } = h;
    return <Tavern key={i}
      name={name}
      general={general}
      service={service}
      guests={guests}
     />;
  });

  return <div>{histories}</div>;
}

export default TavernHistory;
