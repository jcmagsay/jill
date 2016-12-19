import React from 'react';

export default class FadeInChild extends React.Component  {
  constructor() {
    super();
  }

  componentWillAppear() {
    let fadeInTransition = new TimelineMax();
    fadeInTransition
      .set(this.node, {
        'opacity': 0
      })
      .from(this.node, 0.5, {
        'opacity': 0
      })
      .to(this.node, 2, {
        'ease': Power2.easeOut,
        'opacity': 1
      });
  }

  render() {
    return(
      <div ref={node => this.node = node}>
        {this.props.children}
      </div>
    );
  }
}
