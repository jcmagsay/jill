import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import FadeInChild from '~/src/client/components/animations/fade-in-child';

export default class FadeIn extends React.Component {
  render() {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}
