// src/components/AIImpactSummaryCard.jsx
import { useEffect, useState } from 'react';
import { generateImpactSummary } from '../utils/generateSummary';
import { useImpactStats } from '../hooks/useImpactStats';

export default function AIImpactSummaryCard() {
  const { stats, loading } = useImpactStats();
  const [summary, setSummary] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!loading && stats.reports > 0) {
        setAiLoading(true);
        const aiText = await generateImpactSummary(stats);
        setSummary(aiText);
        setAiLoading(false);
      }
    };

    fetchSummary();
  }, [loading, stats]);

  return (
    <div className="mt-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-indigo-800 mb-2">💡 AI Insight</h3>
      {aiLoading ? (
        <p className="text-sm text-gray-600 italic">Generating insight...</p>
      ) : (
        <p className="text-sm text-indigo-700">{summary}</p>
      )}
    </div>
  );
}
