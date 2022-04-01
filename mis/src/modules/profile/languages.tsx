import './languages.scss';
import React from 'react';
import EditButton from 'shared/edit-button/edit-button';

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
  let languages = props.languages as Array<string>;

  // If the user has not selected any of the languages assign a default value
  // to it.
  if (!languages) {
    languages = [];
  }
  const langaugeComps = languages.map((langauge, index) => (
    <Language_ language={langauge} key={index} />
  ));
  return (
    <div className="profile-lang  mb-5">
      <h4 className="text-primary mb-2">
        {' '}
        Languages <EditButton />
      </h4>{' '}
      {langaugeComps}
    </div>
  );
}
