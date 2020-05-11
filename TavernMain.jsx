import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TavernList from './TavernList';
import AlcoholList from './AlcoholList';
import { DSAGrid, DSAGridItem} from '../controls/DSAGrid';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class TavernMain extends React.Component {

  render() {
    const { classes } = this.props;
    return <main className={classes.root}>
      <DSAGrid>
        <DSAGridItem xs={12} md={6} lg={6}>
          <TavernList />
        </DSAGridItem>
        <DSAGridItem xs={12} md={6} lg={6}>
          <AlcoholList />
        </DSAGridItem>
      </DSAGrid>
    </main>
  }
}

TavernMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TavernMain);
