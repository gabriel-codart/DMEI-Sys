import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function HistoryGraph() {
    const data = [
    {
        name: 'Janeiro',
        Saída: 4000,
        Entrada: 5000,
    },
    {
        name: 'Fevereiro',
        Saída: 3000,
        Entrada: 1398,
    },
    {
        name: 'Março',
        Saída: 2000,
        Entrada: 9800,
    },
    {
        name: 'Abril',
        Saída: 2780,
        Entrada: 3908,
    },
    {
        name: 'Maio',
        Saída: 1890,
        Entrada: 4800,
    },
    {
        name: 'Junho',
        Saída: 5132,
        Entrada: 2222,
    },
    {
        name: 'Julho',
        Saída: 1523,
        Entrada: 4326,
    },
    ];
    return (
      <ResponsiveContainer width={900} height={400}>
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 30,
            right: 50,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Saída" stroke="#85d" />
          <Line type="monotone" dataKey="Entrada" stroke="#826" />
        </LineChart>
      </ResponsiveContainer>
    );
}