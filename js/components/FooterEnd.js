import React from 'react';
import classNames from 'classnames';

export default function FooterEnd({modifier}) {
  return (
        <div className={classNames('footer-end', {[`footer-end__${modifier}`]: modifier})}>
            <div className="footer-social">
                <div className="footer-social__label">
                    <p>Follow us:</p>
                </div>
                <div className="footer-social__links">
                    <a className="social-links-icon" href="https://www.facebook.com/aoepeople" target="_blank"><i className="socicon-facebook social-icon"></i></a>
                    <a className="social-links-icon" href="https://twitter.com/aoepeople" target="_blank"><i className="socicon-twitter social-icon"></i></a>
                    <a className="social-links-icon" href="https://www.linkedin.com/company/aoe" target="_blank"><i className="socicon-linkedin social-icon"></i></a>
                    <a className="social-links-icon" href="https://www.xing.com/company/aoe" target="_blank"><i className="socicon-xing social-icon"></i></a>
                    <a className="social-links-icon" href="https://www.youtube.com/user/aoepeople" target="_blank"><i className="socicon-youtube social-icon"></i></a>
                    <a className="social-links-icon" href="https://github.com/aoepeople" target="_blank"><i className="socicon-github social-icon"></i></a>
                </div>
            </div>
            <div className="footer-copyright">
                <p><a href="https://www.aoe.com/en/copyright-meta/legal-information.html" target="_blank">Legal Information</a></p>
            </div>
        </div>
  );
}
