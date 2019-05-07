import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

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

import {pickRandom, throwDice} from '../utils/RandomUtils';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class TavernMain extends React.Component {

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

  getRandomName() {
    const namePrefix = pickRandom(NamePrefix);
    const moniker = pickRandom(Moniker[namePrefix.reference]);
    let prefix = namePrefix.name[moniker.male ? 0 : 1];
    if(prefix.length > 0)
      prefix += " "
    return prefix + moniker.name[namePrefix.plural ? 1 : 0];
  }

  generateService() {
    return {
      chef: pickRandom(Chef).name,
      staff: pickRandom(Staff).name,
    };
  }

  generateGuests(general) {
    const guestqs = pickRandom(GuestQS);
    const qs = Math.max(Math.min(general.qs.qs+guestqs.qs, 6), 1);
    let occasion = pickRandom(SpecialOccasion).name;
    if(occasion === "Geschlossene Gesellschaft")
      occasion = pickRandom(ClosedCompany).name;
    return {
      num: pickRandom(GuestsNum.guests).name,
      qs: GuestQSExamples[this.state.environment][qs-1],
      special: pickRandom(GuestFamous).name,
      occasion: occasion
    };
  }

  generateSpecial() {
    let special = pickRandom(TavernSpecial).name;
    if(special === "Schrein")
      special = pickRandom(Shrine).name + special;
    return special;
  }

  generateGeneral() {
    const qs = pickRandom(TavernQS);
    const price = pickRandom(TavernPrices);
    return {
      type: pickRandom(TavernTypes.types),
      qs: qs,
      price: Math.max(Math.min(qs.qs + price.qs, 6), 1),
      seats: throwDice(pickRandom(TavernSeats).seats),
      beds: throwDice(pickRandom(TavernBeds).beds),
      special: this.generateSpecial(),
    };
  }

  generateTavern = () => {
    const general = this.generateGeneral();
    const tavern = {
      name: this.getRandomName(),
      general: general,
      guests: this.generateGuests(general),
      service: this.generateService()
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

    return <main className={classes.root}>
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
    </main>
  }
}

TavernMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(TavernMain));
