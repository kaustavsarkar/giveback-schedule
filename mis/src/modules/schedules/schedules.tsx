import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import CreateButton from 'shared/create-button/create-buton';

export default function Schedules(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <CreateButton onClick={() => navigate(`${location.pathname}/create`)} />
    </div>
  );
}
