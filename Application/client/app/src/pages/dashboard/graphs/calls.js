import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function CallsGraph(){
    const callsData = [
        { name: 'Entrada', value: 40, fill: '#B40000' },
        { name: 'Concluído', value: 30, fill:'#0070BC' },
        { name: 'Em Andamento', value: 30, fill: '#FF7450' },
    ];
    return (
        <ResponsiveContainer width={300} height={300}>
            <PieChart>
            <Pie
                dataKey="value"
                data={callsData}
                outerRadius={100}
                cx="50%"
                cy="50%"
                label
            />
            <Legend />
            <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}