import React from 'react';

import { DSAGrid, DSAGridItem} from '../controls/DSAGrid';
import DSAInfoBox from '../controls/DSAInfoBox';

import {Alcoholica} from '../data/DSAAlcohol';

import Alcohol from './Alcohol';
import AlcoholFilter from './AlcoholFilter';

// returns true if the first string contains the second (in lower case)
function fuzzyStringCompare(str1, str2) {
  return str1.toLowerCase().includes(str2.toLowerCase());
}

function filterForName(filter_name, name) {
  return fuzzyStringCompare(name, filter_name);
}

function filterForRegion(filter_regions, regions) {
  if(filter_regions.length > 0) {
    return regions.some(r=> filter_regions.includes(r));
  }
  else
    return true;
}

function filterForType(filter_types, type) {
  if(filter_types.length > 0) {
    return filter_types.indexOf(type) > -1;
  }
  else
    return true;
}

function filterForQuality(filter, quality) {
  return true;
}

function filterAlc(filter, alc) {
  if(!filterForName(filter.name, alc.name)) {
    return false;
  }
  if(!filterForRegion(filter.regions, alc.region)){
    return false;
  }
  if(!filterForType(filter.types, alc.type)){
    return false;
  }
  if(!filterForQuality(filter, alc.quality)){
    return false;
  }
  return true;
}

const AlcoholGrid = ({ alcoholica, filter, onFilterChanged }) => {
    const renderedAlc = alcoholica.map((a, i) => {
      return (
        <DSAGridItem xs={12} sm={12} md={6} lg={4} key={i}>
          <Alcohol alcohol={a} />
        </DSAGridItem>);
    })

    return <DSAGrid>
      <DSAInfoBox title="Getränke">
        <AlcoholFilter filter={filter} onFilterChanged={onFilterChanged} />
        <DSAGrid>{renderedAlc}</DSAGrid>
      </DSAInfoBox>
    </DSAGrid>;
}

class AlcoholList extends React.Component {

  state = {
    "filter": {
      "name": "",
      "types": [],
      "regions": []
    }
  }

  onFilterChanged = (property, value) => {
    debugger;
    this.setState(prevState => {
      let newFilter = prevState.filter;
      newFilter[property] = value;
      return {
        filter: newFilter
      };
    });
  }

  render() {
    const {filter} = this.state;
    const alcoholica = Alcoholica.filter((a) => {
      return filterAlc(filter, a);
    }).sort((a,b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    return <AlcoholGrid
      alcoholica={alcoholica}
      filter={filter}
      onFilterChanged={this.onFilterChanged}/>
  }
}

export default AlcoholList;
