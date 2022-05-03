import './create-button.scss';
import React from 'react';

export default function CreateButton(props: {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element {
  return (
    <div className="create-btn">
      <div className="vertical"></div>
      <div className="horizontal"></div>
      <div className="create-btn-text">
        <strong>{props.text ?? 'Create'}</strong>
      </div>
    </div>
  );
}
