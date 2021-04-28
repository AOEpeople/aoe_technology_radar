import React from 'react';
import Link from '../Link/Link';

export default function IconLink({icon, pageName, text}) {
    return (
        <Link className="icon-link" pageName={pageName}>
            <span className={`icon icon--${icon} icon-link__icon`} />
            {text}
        </Link>
    );
}