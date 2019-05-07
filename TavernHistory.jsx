import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Tavern from './Tavern';

const styles = {
  root: {},
};

class TavernHistory extends React.Component {

  render() {
    const { history } = this.props;

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
}

TavernHistory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withWidth()(withStyles(styles)(TavernHistory));
