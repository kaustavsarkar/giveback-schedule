import './languages.scss';
import React from 'react';

function Language_(props: {language: string}): JSX.Element {
  return (
    <a className="text-muted pr-3 f-s-16">
      <i className="flag-icon flag-icon-us" /> {props.language}{' '}
    </a>
  );
}

export default function Languages(props: {
  languages: Array<string>;
}): JSX.Element {
  const langaugeComps = props.languages.map((langauge, index) => (
    <Language_ language={langauge} key={index} />
  ));
  return (
    <div className="profile-lang  mb-5">
      <h4 className="text-primary mb-2"> Language </h4> {langaugeComps}
    </div>
  );
}
