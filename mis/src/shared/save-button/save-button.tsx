import './save-button.scss';
import React from 'react';

export default function SaveButton(props: {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={props.onClick}
      className="btn btn-solid-primary rounded ml-2 btn-sm px-4"
    >
      {' '}
      {props.text ?? 'Save'}{' '}
    </div>
  );
}
