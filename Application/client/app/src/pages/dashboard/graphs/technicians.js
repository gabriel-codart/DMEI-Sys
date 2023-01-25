import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function TechnicianGraph() {
  const data = [
    {
      name: 'Tec A',
      Concluídos: 2400,
    },
    {
      name: 'Tec B',
      Concluídos: 2210,
    },
    {
      name: 'Tec C',
      Concluídos: 2290,
    },
    {
      name: 'Tec D',
      Concluídos: 2000,
    },
    {
      name: 'Tec E',
      Concluídos: 2181,
    },
  ];

  return (
    <ResponsiveContainer width={500} height={300}>
      <BarChart
        layout='vertical'
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' layout={'vertical'} />
        <XAxis dataKey="Concluídos" type='number'/>
        <YAxis dataKey="name" type="category"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="Concluídos" fill="#0070BC" />
      </BarChart>
    </ResponsiveContainer>
  );
}
