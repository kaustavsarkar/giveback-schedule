import './edit-button.scss';
import React from 'react';

export default function EditButton(props: {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={props.onClick}
      className="btn btn-outline-primary rounded ml-2 btn-sm px-4"
    >
      {' '}
      {props.text ?? 'Edit'}{' '}
    </div>
  );
}
