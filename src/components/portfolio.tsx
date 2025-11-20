import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Profile } from '../lib/supabase';
import { Github, Linkedin, GraduationCap } from 'lucide-react';

export const Portfolio = () => {
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
        <h2 className="text-2xl font-bold mb-3">Public portfolio preview</h2>
        <p className="text-white/60 mb-6">
          How your public page will look to employers and clients.
        </p>

        <div className="p-6 rounded-xl bg-white/[0.01] border border-white/[0.02]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">
                {profile?.full_name || 'Your Name'}
              </h1>
              {profile?.skills && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.split(',').map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-[#56ccf2]/20 to-[#7b61ff]/20 border border-[#56ccf2]/30 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {profile?.bio && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">About</h3>
              <p className="text-white/60">{profile.bio}</p>
            </div>
          )}

          {profile?.projects && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Projects</h3>
              <div className="space-y-3">
                {profile.projects.split('\n').filter(Boolean).map((project, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.05]"
                  >
                    <p className="text-white/80">{project}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile?.education && (
            <div>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </h3>
              <p className="text-white/60">{profile.education}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
