import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <div id="error-page">
        <img src="/images/blitz_question.png" alt="" />
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <Link to="/" className="button">
          Retour à l'acceuil {">"}
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <img src="/images/blitz_question.png" alt="" />
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
        <button>Retour à l'acceuil</button>
      </div>
    );
  } else {
    return <></>;
  }
}
