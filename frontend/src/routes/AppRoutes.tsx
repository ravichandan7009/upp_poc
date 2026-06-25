import {
  Routes,
  Route,
} from 'react-router-dom';

import EventForm
  from '../pages/EventForm';

import Confirmation
  from '../pages/Confirmation';

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<EventForm />}
      />

      <Route
        path="/confirmation"
        element={<Confirmation />}
      />

    </Routes>
  );
};

export default AppRoutes;