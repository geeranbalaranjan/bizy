import { useState } from 'react';
import type { BusinessProfile, ViabilityResult } from '@/types';

export function useViabilityScore() {
  const [result, setResult] = useState<ViabilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runScan(profile: BusinessProfile) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/viability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText || 'Viability scan failed');
      }
      const data: ViabilityResult = await res.json();
      setResult(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Viability scan failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, runScan };
}
