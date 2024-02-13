import React from 'react';
import { Driver } from '../models/Driver';

export type DriverContextType = {
  drivers: Driver[];
  isLoading: boolean;
  fetchDrivers: () => void;
};

export const DriverContext = React.createContext<DriverContextType | undefined>(
  undefined
);

export const DriverProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchDrivers = React.useCallback(() => {
    setIsLoading(true);
    fetch('/api/drivers')
      .then((res) => res.json())
      .then((data) => setDrivers(data.drivers))
      .then(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  return (
    <DriverContext.Provider value={{ drivers, isLoading, fetchDrivers }}>
      {children}
    </DriverContext.Provider>
  );
};
