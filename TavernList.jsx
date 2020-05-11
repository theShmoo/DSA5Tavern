import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TavernHistory from './TavernHistory';
import Tavern from './Tavern';
import DSAMediaCard from '../controls/DSAMediaCard';
import DSAButton from '../controls/DSAButton';
import DSADialog from '../controls/DSADialog';
import { DSAGrid, DSAGridItem} from '../controls/DSAGrid';

import {NamePrefix,
  Moniker,
  TavernBeds,
  TavernSeats,
  TavernPrices,
  TavernQS,
  TavernTypes,
  TavernSpecial,
  Shrine,
  Staff,
  Chef,
  SpecialOccasion,
  ClosedCompany,
  GuestsNum,
  GuestQSExamples,
  GuestQS,
  GuestFamous} from '../data/DSATavern';

import {pickRandom, throwDice, createSeed} from '../utils/RandomUtils';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function getRandomName(seed) {
  const namePrefix = pickRandom(NamePrefix, seed);
  const moniker = pickRandom(Moniker[namePrefix.reference], seed);
  let prefix = namePrefix.name[moniker.male ? 0 : 1];
  if(prefix.length > 0)
    prefix += " "
  return prefix + moniker.name[namePrefix.plural ? 1 : 0];
}

function generateService(seed) {
  return {
    chef: pickRandom(Chef, seed).name,
    staff: pickRandom(Staff, seed).name,
  };
}

function generateGuests(environment, general, seed) {
  const guestqs = pickRandom(GuestQS, seed);
  const qs = Math.max(Math.min(general.qs.qs+guestqs.qs, 6), 1);
  let occasion = pickRandom(SpecialOccasion, seed).name;
  if(occasion === "Geschlossene Gesellschaft")
    occasion = pickRandom(ClosedCompany, seed).name;
  return {
    num: pickRandom(GuestsNum.guests, seed).name,
    qs: GuestQSExamples[environment][qs-1],
    special: pickRandom(GuestFamous, seed).name,
    occasion: occasion
  };
}

function generateSpecial(seed) {
  let special = pickRandom(TavernSpecial, seed).name;
  if(special === "Schrein")
    special = pickRandom(Shrine, seed).name + special;
  return special;
}

function generateGeneral(seed) {
  const qs = pickRandom(TavernQS, seed);
  const price = pickRandom(TavernPrices, seed);
  return {
    type: pickRandom(TavernTypes.types, seed),
    qs: qs,
    price: Math.max(Math.min(qs.qs + price.qs, 6), 1),
    seats: throwDice(pickRandom(TavernSeats, seed).seats, seed),
    beds: throwDice(pickRandom(TavernBeds, seed).beds, seed),
    special: generateSpecial(seed),
  };
}


class TavernList extends React.Component {

  state = {
    open: false,
    history: [],
    environment: "city"
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
    this.generateTavern();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  generateTavern = () => {
    let seed = createSeed();
    const general = generateGeneral(seed);
    const tavern = {
      name: getRandomName(seed),
      general: general,
      guests: generateGuests(this.state.environment, general, seed),
      service: generateService(seed)
    };
    this.setState((state) => {
      const history = [tavern, ...state.history];
      return state.history = history;
    });
  }

  render() {
    const { classes } = this.props;
    const { history } = this.state;
    const current = history.length > 0 ? history[0] : undefined;

    const MediaAction = (
      <DSAButton size="small" onClick={this.handleClickOpen}>
        Generiere eine neue Taverne
      </DSAButton>
    );

    const DialogAction = (
      <DSAButton onClick={this.handleClose}>
        Schließen
      </DSAButton>
    );

    return <DSAGrid className={classes.root}>
      <DSAGrid>
        <DSAGridItem xs={12} md={12} lg={12}>
          <DSAMediaCard
            imagesrc="img/Zwergenfest.jpg"
            imagetitle="Zwergenfest"
            title="Tavernen"
            content="Generiere eine neue Taverne"
            actions={MediaAction} />
        </DSAGridItem>
      </DSAGrid>
      {current ? <div>
        <TavernHistory history={history} />
        <DSADialog
          handleClose={this.handleClose}
          open={this.state.open}
          actions={DialogAction}
          title={current.name}>
          <Tavern name={current.name}
            guests={current.guests}
            general={current.general}
            service={current.service} />
        </DSADialog>
        </div> : ""}
    </DSAGrid>
  }
}

TavernList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TavernList);
