import React from 'react';

function Option_(props: {label: string}): JSX.Element {
  const id = `customCheckbox${props.label}`;
  return (
    <div className="col-xl-4 col-xxl-6 col-6">
      <div className="custum-control custom-checkbox mb-3">
        <input type="checkbox" className="custom-control-input" id={id} />
        <label className="custom-control-label" htmlFor={id}>
          {props.label}
        </label>
      </div>
    </div>
  );
}

export default function SelectOptions(props: {
  options: Array<string>;
}): JSX.Element {
  const allOptions = props.options;

  const components = allOptions.map((option) => (
    <Option_ label={option} key={option} />
  ));
  return <div className="row">{components}</div>;
}
