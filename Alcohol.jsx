import React from 'react';

import DSAItemList from '../controls/DSAItemList';

function getAlcItems({name,
    effect,
    pricePerLitre,
    pricePerUnit,
    quality,
    region,
    type,
    unit}) {

  if(!region)
    debugger;

  const items = [
    {title: "Wirkung", items: [{name: "gelungen", value: effect[0]}, {name: "misslungen", value: effect[1]}]},
    {name: "Kosten pro Maß", value: pricePerLitre},
    {name: "Kosten pro " + unit, value: pricePerUnit},
    {name: "Qualität der Taverne", value: quality},
    {name: "Region", value: region.join(", ")},
    {name: "Typ", value: type}
  ];
  return [{title: name, items: items}];
}

const Alcohol = ({alcohol}) => {
  return <DSAItemList
    collapse={true}
    items={getAlcItems(alcohol)}
    />;
};

export default Alcohol;
