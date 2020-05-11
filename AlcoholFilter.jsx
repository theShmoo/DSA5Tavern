import React from 'react';

import { DSAGrid, DSAGridItem} from '../controls/DSAGrid';
import DSASearchField from '../controls/DSASearchField';
import DSASelect from '../controls/DSASelect';

import {Regions, Types} from '../data/DSAAlcohol'

const AlcoholFilter = ({filter, onFilterChanged}) => {

  const onfilterResultToFilter = (prop, values) => {
    if(values) {
      onFilterChanged(prop, values.map(v => v.value));
    }
    else {
      onFilterChanged(prop, []);
    }
  }

  const regionsOptions = Regions.map(r => {return {value: r, label: r}});
  const typesOptions = Types.map(r => {return {value: r, label: r}});

  const {name} = filter;

  return <DSAGrid>
    <DSAGridItem xs={12} sm={12} md={12}>
      <DSASearchField
        value={name}
        label="Suche"
        helperText="Suche nach dem Namen eines Getränks."
        onChange={e => onFilterChanged("name", e)} />
    </DSAGridItem>
    <DSAGridItem xs={12} sm={12} md={12}>
      <DSASelect options={typesOptions}
        label="Alkohol Typ"
        value={filter.types}
        multi={true}
        onChange={e => onfilterResultToFilter("types", e)}
        helperText="woah" />
    </DSAGridItem>
    <DSAGridItem xs={12} sm={12} md={12}>
      <DSASelect options={regionsOptions}
        label="Regionen"
        value={filter.regions}
        multi={true}
        onChange={e => onfilterResultToFilter("regions", e)}
        helperText="woah" />
    </DSAGridItem>
  </DSAGrid>
}

export default AlcoholFilter;
