import './save-button.scss';
import React from 'react';

export default function SaveButton(props: {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={props.onClick}
      className="btn btn-solid-primary rounded ml-2 btn-sm px-4"
    >
      {' '}
      Save{' '}
    </div>
  );
}
