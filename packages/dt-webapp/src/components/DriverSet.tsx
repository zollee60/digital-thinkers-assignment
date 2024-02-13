import React, { useCallback } from 'react';
import { DriverContext } from './DriverProvider';
import { DriverCard } from './DriverCard';
import { Flex, notification } from 'antd';

export const DriverSet: React.FC = () => {
  const { drivers, isLoading, fetchDrivers } = React.useContext(DriverContext)!;

  const [api, contextHolder] = notification.useNotification();

  const overtake = useCallback(
    async (driverId: number) => {
      try {
        const res = await fetch(`/api/drivers/${driverId}/overtake`, {
          method: 'POST',
        });
        const data = await res.json();
        if (res.status !== 200) {
          api.error({
            message: 'Error',
            description: data.message,
          });
          return;
        }
        fetchDrivers();
      } catch (error) {
        api.error({
          message: 'Error',
          description: 'Unknown error occurred',
        });
      }
    },
    [fetchDrivers]
  );

  return (
    <>
      {contextHolder}
      <Flex justify="space-evenly">
        <Flex vertical gap="large">
          {drivers
            .filter((driver) => driver.place % 2 !== 0)
            .sort((a, b) => a.place - b.place)
            .map((driver) => {
              return (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  overtake={overtake}
                />
              );
            })}
        </Flex>
        <Flex vertical style={{ marginTop: '3rem' }} gap="large">
          {drivers
            .filter((driver) => driver.place % 2 === 0)
            .sort((a, b) => a.place - b.place)
            .map((driver) => {
              return (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  overtake={overtake}
                />
              );
            })}
        </Flex>
      </Flex>
    </>
  );
};
