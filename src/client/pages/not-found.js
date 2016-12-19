import React from 'react';
import { Link } from 'react-router';
import FadeIn from '~/src/client/components/animations/fade-in';
import PageView from '~/src/client/components/page-view';

export default class NotFound extends React.Component {
  constructor() {
    super();
  }

  render() {

    return(
      <PageView title="Home">
        <FadeIn>
          <div>Not Found</div>
        </FadeIn>
      </PageView>
    );
  }
}
