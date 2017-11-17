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
                    <a className="social-links-icon" href="https://www.facebook.com/haufegroup.careers/" target="_blank"><i className="socicon-facebook social-icon"></i></a>
                    <a className="social-links-icon" href="https://twitter.com/HaufeDev" target="_blank"><i className="socicon-twitter social-icon"></i></a>
                    <a className="social-links-icon" href="https://www.linkedin.com/company/haufe-gruppe/" target="_blank"><i className="socicon-linkedin social-icon"></i></a>
                    <a className="social-links-icon" href="https://www.xing.com/company/haufegroup" target="_blank"><i className="socicon-xing social-icon"></i></a>
                    <a className="social-links-icon" href="https://www.youtube.com/channel/UCykmR2_ClOME5rau9LHnFYQ" target="_blank"><i className="socicon-youtube social-icon"></i></a>
                    <a className="social-links-icon" href="https://github.com/Haufe-Lexware" target="_blank"><i className="socicon-github social-icon"></i></a>
                    <a className="social-links-icon" href="https://www.slideshare.net/HaufeDev" target="_blank"><i className="socicon-slideshare social-icon"></i></a>
                </div>
            </div>
            <div className="footer-copyright">
                <p><a href="https://www.haufegroup.com/de/impressum" target="_blank">Legal Information</a></p>
            </div>
        </div>
  );
}
