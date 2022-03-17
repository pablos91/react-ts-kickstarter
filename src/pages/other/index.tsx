import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface OtherPageRouteProps {
  id?: string;
}

export const OtherPage = withRouter(({ match }: RouteComponentProps<OtherPageRouteProps>) => {
  return (
    <>
      <h1>Other page</h1>
      <p>Parameter from get is: {match.params.id ?? "NOT FOUND"}</p>
    </>
  )
})