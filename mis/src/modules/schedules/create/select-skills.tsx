import React from 'react';

function Option_(props: {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  const id = `customCheckbox${props.label}`;
  return (
    <div className="col-xl-4 col-xxl-6 col-6">
      <div className="custum-control custom-checkbox mb-3">
        <input
          type="checkbox"
          className="custom-control-input"
          id={id}
          onChange={props.onChange}
          value={props.label}
        />
        <label className="custom-control-label" htmlFor={id}>
          {props.label}
        </label>
      </div>
    </div>
  );
}

export default function SelectOptions(props: {
  options: Array<string>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  const allOptions = props.options;

  const components = allOptions.map((option) => (
    <Option_ label={option} key={option} onChange={props.onChange} />
  ));
  return <div className="row">{components}</div>;
}
