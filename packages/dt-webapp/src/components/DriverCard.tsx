import { Driver } from '../models/Driver';
import { Card, Flex, Image, Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

type DriverCardProps = {
  driver: Driver;
  overtake: (driverId: number) => Promise<void>;
};

export const DriverCard: React.FC<DriverCardProps> = ({ driver, overtake }) => {
  return (
    <Card
      title={`${driver.firstname} ${driver.lastname}`}
      extra={
        <Button
          type="primary"
          style={{ width: '3rem' }}
          onClick={() => overtake(driver.id)}
        >
          <ArrowUpOutlined style={{ color: 'white' }} />
        </Button>
      }
    >
      <Flex justify="space-evenly" gap="middle">
        <Flex vertical>
          <p>{driver.team}</p>
          <p>{driver.country}</p>
          <p>Place: {driver.place}</p>
        </Flex>
        <Image width={150} src={driver.imgUrl}></Image>
      </Flex>
    </Card>
  );
};
