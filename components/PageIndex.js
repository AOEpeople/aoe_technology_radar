import React from 'react';
import HeroHeadline from './HeroHeadline';

export default function PageIndex() {
  return (
    <div>
      <div className="headline-group">
        <HeroHeadline alt="Mar 2017">AOE Technology Radar</HeroHeadline>
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
  );
}
