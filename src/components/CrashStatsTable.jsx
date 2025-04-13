export default function CrashStatsTable({ data }) {
    return (
      <div className="bg-white text-black p-4 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">📄 Crash Stats Table</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b py-2 px-3">Year</th>
              <th className="border-b py-2 px-3">Fatal Accidents</th>
              <th className="border-b py-2 px-3">Fatalities</th>
              <th className="border-b py-2 px-3">Pedestrian Fatalities</th>
            </tr>
          </thead>
          <tbody>
            {data.crash_stats.map((row) => (
              <tr key={row.year} className="hover:bg-gray-50">
                <td className="py-2 px-3">{row.year}</td>
                <td className="py-2 px-3">{row.fatal_accidents}</td>
                <td className="py-2 px-3">{row.fatalities}</td>
                <td className="py-2 px-3">{row.pedestrian_fatalities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  