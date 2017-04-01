import React from 'react';
import classNames from 'classnames';
import { getItemPageNames } from '../../common/config';

export default function FooterEnd({ items, pageName }) {
  return (
        <div className={classNames('footer-end', {'footer-end-left': getItemPageNames(items).includes(pageName)})} >
            <div className="footer-social">
                <div className="footer-social-label">
                    <p>Follow us:</p>
                </div>
                <div className="footer-social-links">

                    <a class="social-links-icon" href="https://www.facebook.com/aoepeople" target="_blank"><i className="socicon-facebook social-icon"></i></a>
                    <a class="social-links-icon" href="https://twitter.com/aoepeople" target="_blank"><i className="socicon-twitter social-icon"></i></a>
                    <a class="social-links-icon" href="https://www.linkedin.com/company/aoe" target="_blank"><i className="socicon-linkedin social-icon"></i></a>
                    <a class="social-links-icon" href="https://www.xing.com/company/aoe" target="_blank"><i className="socicon-xing social-icon"></i></a>
                    <a class="social-links-icon" href="https://www.youtube.com/user/aoepeople" target="_blank"><i className="socicon-youtube social-icon"></i></a>

                </div>
            </div>
            <div className="footer-copyright">
                <p><a href="https://www.aoe.com/en/copyright-meta/legal-information.html" target="_blank">Legal Information</a></p>
            </div>
        </div>
  );
}
