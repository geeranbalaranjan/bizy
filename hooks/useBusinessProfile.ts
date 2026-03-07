import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import type { BusinessProfile } from '@/types';

export function useBusinessProfile() {
  const { user } = useUser();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch business profile from database when user is authenticated
    setLoading(false);
  }, [user]);

  return { businessProfile, loading, error, setBusinessProfile };
}
