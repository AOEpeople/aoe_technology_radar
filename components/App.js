import React from 'react';
import { connect } from 'react-redux';

function App({ items, releses, pageName }) {
  return (
    <div className="js--body">
      <div className="page">
        <div className="page__header">
          <div className="branding">
            <a className="branding__logo" href="/"><img src="/assets/logo.svg"/></a>
            <div className="branding__content">
              <div className="nav">
                <div className="nav__item"><a className="icon-link" href="/howto.html"><span className="icon icon--question icon-link__icon"></span>How to Use Technology Radar?</a></div>
                <div className="nav__item"><a className="icon-link" href="/overview.html"><span className="icon icon--overview icon-link__icon"></span>Technologies Overview</a></div>
                <div className="nav__item"><a className="icon-link" href="#todo"><span className="icon icon--search icon-link__icon"></span>Search</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="page__content">
          <div className="headline-group">
            <div className="hero-headline">Technology Radar<span className="hero-headline__alt"> Mar 2017</span></div>
          </div>
          <div className="quadrant-grid">
            <div className="quadrant-grid__quadrant">
              <div className="quadrant-section">
                <div className="quadrant-section__header">
                  <div className="split">
                    <div className="split__left">
                      <h4 className="headline">Platforms and AOE Services</h4>
                    </div>
                    <div className="split__right"><a className="icon-link" href="/platforms-and-aoe-services.html"><span className="icon icon--pie icon-link__icon"></span>Quadrant Overview</a></div>
                  </div>
                </div>
                <div className="quadrant-section__rings">
                  <div className="quadrant-section__ring">
                    <div className="ring-list">
                      <div className="ring-list__header"><span className="badge badge--assess">assess</span></div>
                      <span className="ring-list__item"><a className="link" href="/platforms-and-aoe-services/bar.html">Bar</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="quadrant-grid__quadrant">
              <div className="quadrant-section">
                <div className="quadrant-section__header">
                  <div className="split">
                    <div className="split__left">
                      <h4 className="headline">Methods &amp; Patterns</h4>
                    </div>
                    <div className="split__right"><a className="icon-link" href="/methods-and-patterns.html"><span className="icon icon--pie icon-link__icon"></span>Quadrant Overview</a></div>
                  </div>
                </div>
                <div className="quadrant-section__rings">
                  <div className="quadrant-section__ring">
                    <div className="ring-list">
                      <div className="ring-list__header"><span className="badge badge--trial">trial</span></div>
                      <span className="ring-list__item"><a className="link" href="/methods-and-patterns/foo.html">Foo</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="quadrant-grid__quadrant">
              <div className="quadrant-section">
                <div className="quadrant-section__header">
                  <div className="split">
                    <div className="split__left">
                      <h4 className="headline">Tools</h4>
                    </div>
                    <div className="split__right"><a className="icon-link" href="/tools.html"><span className="icon icon--pie icon-link__icon"></span>Quadrant Overview</a></div>
                  </div>
                </div>
                <div className="quadrant-section__rings">
                  <div className="quadrant-section__ring">
                    <div className="ring-list">
                      <div className="ring-list__header"><span className="badge badge--hold">hold</span></div>
                      <span className="ring-list__item"><a className="link" href="/tools/grunt.html">Grunt 2</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="quadrant-grid__quadrant">
              <div className="quadrant-section">
                <div className="quadrant-section__header">
                  <div className="split">
                    <div className="split__left">
                      <h4 className="headline">Languages &amp; Frameworks</h4>
                    </div>
                    <div className="split__right"><a className="icon-link" href="/languages-and-frameworks.html"><span className="icon icon--pie icon-link__icon"></span>Quadrant Overview</a></div>
                  </div>
                </div>
                <div className="quadrant-section__rings">
                  <div className="quadrant-section__ring">
                    <div className="ring-list">
                      <div className="ring-list__header"><span className="badge badge--trial">trial</span></div>
                      <span className="ring-list__item"><a className="link" href="/languages-and-frameworks/react.html">React</a></span>
                    </div>
                  </div>
                  <div className="quadrant-section__ring">
                    <div className="ring-list">
                      <div className="ring-list__header"><span className="badge badge--assess">assess</span></div>
                      <span className="ring-list__item"><a className="link" href="/languages-and-frameworks/react123.html">This is a long title</a></span><span className="ring-list__item"><a className="link" href="/languages-and-frameworks/vue123.html">Vue 123</a></span>
                    </div>
                  </div>
                  <div className="quadrant-section__ring">
                    <div className="ring-list">
                      <div className="ring-list__header"><span className="badge badge--adopt">adopt</span></div>
                      <span className="ring-list__item"><a className="link" href="/languages-and-frameworks/vue.html">Vue</a></span>
                    </div>
                  </div>
                  <div className="quadrant-section__ring">
                    <div className="ring-list">
                      <div className="ring-list__header"><span className="badge badge--hold">hold</span></div>
                      <span className="ring-list__item"><a className="link" href="/languages-and-frameworks/vue1230.html">Something else</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page__footer">
          <div className="branding">
            <span className="branding__logo"><img src="/assets/logo.svg"/></span>
            <div className="branding__content"><span className="footnote">AOE is a leading provider of Enterprise Open Source web solutions.
              Using current agile development methods, more than 250+ developers
              and consultants in 8 global locations develop customized Open Source
              solutions for global companies and corporations.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(({ items, releases, pageName }) => ({ items, releases, pageName }))(App);
