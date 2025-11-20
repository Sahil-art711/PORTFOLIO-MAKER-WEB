import { User, Zap, Github, FileDown, Palette, Eye } from 'lucide-react';

type HomeProps = {
  onNavigate: (page: string) => void;
};

export const Home = ({ onNavigate }: HomeProps) => {
  return (
    <main>
      <div className="max-w-[1150px] mx-auto my-10 px-5 py-12">
        <div className="grid md:grid-cols-[1fr_420px] gap-7 items-center bg-gradient-to-b from-white/5 to-white/[0.02] p-9 rounded-2xl border border-white/[0.04] shadow-2xl">
          <div>
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
              AI · Live Preview · HD Upload
            </div>
            <h1 className="text-5xl font-black leading-tight mb-3 bg-gradient-to-r from-[#56ccf2] via-[#7b61ff] to-[#ff6bcb] bg-clip-text text-transparent">
              Portfolio Hub
            </h1>
            <p className="text-white/60 text-lg mb-5">
              Design a beautiful developer portfolio in minutes. AI-assisted bios, live preview, GitHub import, themes and export — all built with modern UI and performance in mind.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => onNavigate('builder')}
                className="bg-gradient-to-r from-[#56ccf2] to-[#7b61ff] text-gray-900 px-5 py-3 rounded-xl font-bold hover:shadow-lg transition-shadow"
              >
                Get started
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="bg-transparent border border-white/10 text-white/60 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                Open Dashboard
              </button>
            </div>
            <div className="mt-5 text-white/60 text-xs">
              Trusted by developers • 12k+ portfolios created
            </div>
          </div>

          <aside className="p-5 bg-gradient-to-b from-white/5 to-transparent rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-extrabold text-lg">Your Name</div>
                <div className="text-white/60 text-xs mt-1.5">
                  Fullstack Developer • React · Django
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block px-2.5 py-1.5 rounded-full bg-white/[0.03] text-white/60 text-xs mr-2">
                  GitHub
                </div>
                <div className="inline-block px-2.5 py-1.5 rounded-full bg-white/[0.03] text-white/60 text-xs">
                  PDF Export
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-lg overflow-hidden bg-gradient-to-b from-black/20 to-transparent p-3 text-white/60 text-xs">
              <strong className="text-white block mb-2">Latest Projects</strong>
              <ul className="ml-4 space-y-1">
                <li>Portfolio Builder — React + Django</li>
                <li>AI Resume Parser</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <section className="max-w-[1150px] mx-auto mt-8 px-5 grid md:grid-cols-3 gap-5">
        <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.03]">
          <Zap className="w-6 h-6 mb-3 text-[#56ccf2]" />
          <h4 className="font-bold mb-2">AI Bio & Copy</h4>
          <p className="text-white/60 text-sm">
            Generate professional bios and project descriptions instantly with AI templates.
          </p>
        </div>
        <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.03]">
          <Eye className="w-6 h-6 mb-3 text-[#7b61ff]" />
          <h4 className="font-bold mb-2">Live Preview</h4>
          <p className="text-white/60 text-sm">
            Edit and see changes in real time — no reloads, no guessing.
          </p>
        </div>
        <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.03]">
          <User className="w-6 h-6 mb-3 text-[#ff6bcb]" />
          <h4 className="font-bold mb-2">HD Media</h4>
          <p className="text-white/60 text-sm">
            Upload high-resolution images for profile and project galleries.
          </p>
        </div>
        <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.03]">
          <Github className="w-6 h-6 mb-3 text-[#56ccf2]" />
          <h4 className="font-bold mb-2">GitHub Sync</h4>
          <p className="text-white/60 text-sm">
            Import repositories and display top projects automatically.
          </p>
        </div>
        <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.03]">
          <Palette className="w-6 h-6 mb-3 text-[#7b61ff]" />
          <h4 className="font-bold mb-2">Custom Themes</h4>
          <p className="text-white/60 text-sm">
            Switch theme presets: Minimal, Glass, Neon, Corporate with one click.
          </p>
        </div>
        <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.03]">
          <FileDown className="w-6 h-6 mb-3 text-[#ff6bcb]" />
          <h4 className="font-bold mb-2">Export & Host</h4>
          <p className="text-white/60 text-sm">
            Export static HTML/PDF or host directly on the platform.
          </p>
        </div>
      </section>

      <section className="max-w-[1150px] mx-auto mt-9 px-5">
        <h3 className="text-white text-xl font-bold mb-4">What developers say</h3>
        <div className="flex gap-5 flex-wrap">
          <div className="flex-1 min-w-[260px] bg-white/[0.03] p-5 rounded-xl border border-white/[0.03]">
            <p className="text-white/60 mb-2.5">
              "The AI made my entire portfolio. Unreal!"
            </p>
            <strong className="text-white text-sm">Aayush Singh</strong>
          </div>
          <div className="flex-1 min-w-[260px] bg-white/[0.03] p-5 rounded-xl border border-white/[0.03]">
            <p className="text-white/60 mb-2.5">
              "It looks premium and updates instantly."
            </p>
            <strong className="text-white text-sm">Sneha Verma</strong>
          </div>
          <div className="flex-1 min-w-[260px] bg-white/[0.03] p-5 rounded-xl border border-white/[0.03]">
            <p className="text-white/60 mb-2.5">
              "GitHub auto-import is a lifesaver."
            </p>
            <strong className="text-white text-sm">Rohit Mehra</strong>
          </div>
        </div>
      </section>
    </main>
  );
};
