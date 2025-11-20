import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Profile } from '../lib/supabase';
import { ExternalLink } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading profile:', error);
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="max-w-[1150px] mx-auto my-10 px-5">
        <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.03]">
          <p className="text-white/60">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1150px] mx-auto my-10 px-5">
      <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.03]">
        <h2 className="text-2xl font-bold mb-3">Your dashboard</h2>
        <p className="text-white/60 mb-6">
          Manage your saved portfolio, uploads, and integrations.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3">Saved profile</h3>
            {profile ? (
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-white/60">Name</div>
                  <div className="font-semibold">{profile.full_name || 'Not set'}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Bio</div>
                  <div className="text-sm">{profile.bio || 'Not set'}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Skills</div>
                  <div className="text-sm">{profile.skills || 'Not set'}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Last updated</div>
                  <div className="text-sm">
                    {new Date(profile.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-white/60">No saved profile yet.</p>
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Integrations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <div>
                  <div className="font-semibold">GitHub</div>
                  <div className="text-sm text-white/60">
                    {profile?.github_url ? (
                      <a
                        href={profile.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#56ccf2] hover:underline"
                      >
                        Connected <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      'Not connected'
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm text-white/60">
                    {profile?.linkedin_url ? (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#56ccf2] hover:underline"
                      >
                        Connected <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      'Not connected'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
