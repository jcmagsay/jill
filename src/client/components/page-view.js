import React from 'react';
import DocumentTitle from 'react-document-title';

export default class PageView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { title, children } = this.props;

    return (
      //Set the page title
      <DocumentTitle title={`${title} | Jill Magsaysay`}>
        {children}
      </DocumentTitle>
    );
  }
}
