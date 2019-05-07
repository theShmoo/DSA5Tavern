import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import DSAInfoBox from '../controls/DSAInfoBox';
import DSAItemList from '../controls/DSAItemList';

import {QS} from '../utils/DSATextElements';

const styles = {
  root: {},
};

class Tavern extends React.Component {

  getGeneralItems(general) {
    const { seats, beds, qs, price, type, special } = general;
    return [
      {name: "Art des Gebäudes", value: type.name},
      {name: "Plätze", value: seats},
      {name: "Betten", value: beds},
      {name: "Ausstattung", value: qs.name + "(" + QS(qs.qs)  + ")"},
      {name: "Preis", value: QS(price)},
      {name: "Besonderheit", value: special},
    ];
  }

  getServiceItems(service) {
    const {chef, staff} = service;
    return [
      {name: "Wirt", value: chef},
      {name: "Angestellte", value: staff},
    ];
  }

  getGuestItems(guests) {
    const {num, qs, special, occasion} = guests;
    return [
      {name: "Anzahl an Gästen", value: num},
      {name: "Qualität der Gäste", value: qs},
      {name: "Besonderer Gast", value: special},
      {name: "Besonderer Anlass", value: occasion}
    ];
  }

  render() {
    const {name, general, guests, service } = this.props;

    const items = [{
      title: "Aussehen und Ausstattung",
      items: this.getGeneralItems(general)
    },
    {
      title: "Angestellte",
      items: this.getServiceItems(service)
    },
    {
      title: "Gäste",
      items: this.getGuestItems(guests)
    },
    ];

    return <DSAInfoBox title={name}>
      <DSAItemList items={items} />
    </DSAInfoBox>;
  }
}

Tavern.propTypes = {
  name: PropTypes.string.isRequired,
  service: PropTypes.object.isRequired,
  general: PropTypes.object.isRequired,
  guests: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(Tavern));
