import { DashboardHome } from '@/screens/Dashboard/DashboardHome';
import axios from 'axios';
import { Suspense } from 'react';

export default async function Dashboard() {
  const response = await fetch('http://localhost:3001/issues', {
    headers: {
      'x-api-key': 'dsadsadsa',
    },
  });

  const data = await response.json();

  return (
    <>
      <DashboardHome issues={data} />;
    </>
  );
}
