import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Profile } from '../lib/supabase';
import { Sparkles } from 'lucide-react';

type BuilderProps = {
  onNavigate: (page: string) => void;
};

export const Builder = ({ onNavigate }: BuilderProps) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<Profile>>({
    full_name: '',
    bio: '',
    skills: '',
    projects: '',
    education: '',
    linkedin_url: '',
    github_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading profile:', error);
      return;
    }

    if (data) {
      setProfile(data);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = () => {
    const name = profile.full_name || 'Alex Developer';
    const skills = profile.skills || 'JavaScript, Python';
    const generatedBio = `${name} is a software developer specializing in ${
      skills.split(',')[0]?.trim() || 'web technologies'
    }. Passionate about building elegant solutions to complex problems.`;

    setProfile({ ...profile, bio: generatedBio });
    setMessage('AI-generated content inserted!');
    setTimeout(() => setMessage(''), 3000);
  };

  const updateField = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <section className="max-w-[1150px] mx-auto my-10 px-5">
      <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.03]">
        <h2 className="text-2xl font-bold mb-3">Create your portfolio</h2>
        <p className="text-white/60 mb-6">
          Fill the fields to build and preview your portfolio in real time.
        </p>

        {message && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 font-bold mb-2">Full name</label>
            <input
              value={profile.full_name}
              onChange={(e) => updateField('full_name', e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
            />

            <label className="block text-white/70 font-bold mb-2 mt-4">Short bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              rows={3}
              placeholder="I build web apps..."
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
            />

            <label className="block text-white/70 font-bold mb-2 mt-4">
              Skills (comma separated)
            </label>
            <input
              value={profile.skills}
              onChange={(e) => updateField('skills', e.target.value)}
              placeholder="React, Django, Node"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
            />

            <label className="block text-white/70 font-bold mb-2 mt-4">
              Projects (one per line)
            </label>
            <textarea
              value={profile.projects}
              onChange={(e) => updateField('projects', e.target.value)}
              rows={4}
              placeholder="Project A - description&#10;Project B - description"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
            />

            <label className="block text-white/70 font-bold mb-2 mt-4">Education</label>
            <input
              value={profile.education}
              onChange={(e) => updateField('education', e.target.value)}
              placeholder="B.Tech in CSE, XYZ University"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
            />

            <label className="block text-white/70 font-bold mb-2 mt-4">
              LinkedIn Profile URL
            </label>
            <input
              value={profile.linkedin_url}
              onChange={(e) => updateField('linkedin_url', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
            />

            <label className="block text-white/70 font-bold mb-2 mt-4">
              GitHub Profile URL
            </label>
            <input
              value={profile.github_url}
              onChange={(e) => updateField('github_url', e.target.value)}
              placeholder="https://github.com/yourusername"
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-[#56ccf2]/50"
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#56ccf2] to-[#7b61ff] text-gray-900 px-5 py-3 rounded-xl font-bold hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleAIGenerate}
                className="bg-transparent border border-white/10 text-white/60 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white/70 font-bold mb-2">Live Preview</label>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 min-h-[220px]">
              <div className="font-extrabold text-lg">
                {profile.full_name || 'Your Name'}
              </div>
              <div className="text-white/60 mt-2">
                {profile.bio || 'Short bio will appear here.'}
              </div>
              <div className="mt-3 text-sm">
                <strong>Skills:</strong>{' '}
                {profile.skills ? profile.skills : '—'}
              </div>
              <div className="mt-3 text-sm">
                <strong>Projects:</strong>
                <div className="text-white/60 mt-1 whitespace-pre-line">
                  {profile.projects || '—'}
                </div>
              </div>
              {profile.education && (
                <div className="mt-3 text-sm">
                  <strong>Education:</strong>
                  <div className="text-white/60 mt-1">{profile.education}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
