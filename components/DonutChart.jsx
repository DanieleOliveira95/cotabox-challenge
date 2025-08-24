import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    } from "recharts";
    
    
    const COLORS = [
    "#3B82F6", // azul
    "#10B981", // teal
    "#8B5CF6", // roxo
    "#9CA3AF", // cinza
    "#EF4444", // vermelho
    "#F59E0B",
    "#14B8A6",
    ];
    
    
    export default function DonutChart({ rows }) {
        const data = rows.map((r) => ({
        name: `${r.firstName} ${r.lastName}`,
        value: r.participation,
        }));

        return (
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={320}>
        <PieChart>
        <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        innerRadius={60}
        outerRadius={100}
        paddingAngle={2}
        >
        {data.map((_, i) => (
        <Cell key={i} fill={COLORS[i % COLORS.length]} />)
        )}
        </Pie>
        <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
                </ResponsiveContainer>
            </div>
        );
        }