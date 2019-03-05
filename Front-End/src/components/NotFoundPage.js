import React from 'react';
import '../styles/notfoundpage.css';

const NotFoundPage = () => {
  return (
    <div>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404 animated flipInX">
                    <h1>404</h1>
                </div>
                <h2>Oops! Nothing was found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily
                    unavailable. <a href="/">Return to homepage</a></p>
            </div>
        </div>
    </div>
  );
};

export default NotFoundPage;
