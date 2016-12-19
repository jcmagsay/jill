import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import FadeIn from '~/src/client/components/animations/fade-in';
import PageView from '~/src/client/components/page-view';

export default class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <PageView title="Home">
        <FadeIn>
          <div className="content">
            HOME CONTENT
          </div>
        </FadeIn>
      </PageView>
    );
  }
}
