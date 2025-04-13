import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function CrashStatsChart({ data }) {
  const chartData = data.crash_stats.map(stat => ({
    year: stat.year.toString(),
    fatal: stat.fatal_accidents,
    pedestrian: stat.pedestrian_fatalities,
  }));

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow w-full h-96">
      <h2 className="text-xl font-bold text-center mb-4">📊 Yearly Fatal Accidents</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fatal" fill="#f87171" />
          <Bar dataKey="pedestrian" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
