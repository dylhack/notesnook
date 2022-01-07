import React, {createRef} from 'react';
import {eSubscribeEvent, eUnSubscribeEvent} from '../../services/EventManager';
import {eClosePremiumDialog, eOpenPremiumDialog} from '../../utils/Events';
import BaseDialog from '../Dialog/base-dialog';
import {Component} from './component';

class PremiumDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      promo: null
    };
    this.actionSheetRef = createRef();
  }

  componentDidMount() {
    eSubscribeEvent(eOpenPremiumDialog, this.open.bind(this));
    eSubscribeEvent(eClosePremiumDialog, this.close.bind(this));
  }

  componentWillUnmount() {
    eUnSubscribeEvent(eOpenPremiumDialog, this.open.bind(this));
    eUnSubscribeEvent(eClosePremiumDialog, this.close.bind(this));
  }

  open(promoInfo) {
    this.setState({
      visible: true,
      promo: promoInfo
    });
  }

  close = () => {
    this.setState({
      visible: false,
      promo: null
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return !this.state.visible ? null : (
      <BaseDialog
        background={this.props.colors.bg}
        onRequestClose={this.onClose}>
        <Component
          getRef={() => this.actionSheetRef}
          promo={this.state.promo}
          close={this.close}
        />
      </BaseDialog>
    );
  }
}

export default PremiumDialog;
