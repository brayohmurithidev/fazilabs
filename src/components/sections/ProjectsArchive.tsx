import { useProjects } from '../../hooks/useProjects';
import { SEO } from '../SEO';

export default function ProjectsArchive() {
  const {
    projects,
    types,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
  } = useProjects();

  return (
    <>
      <SEO 
        title="Projects | Fazilabs - Web Development Portfolio"
        description="Explore our portfolio of web development projects, including custom web applications, WordPress sites, and e-commerce solutions."
        type="website"
        url="https://fazilabs.com/projects"
      />
      <section className="py-16 bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#0034EF]">Projects</h1>
            <p className="text-[#384470] text-base">A showcase of Fazilabs custom and WordPress projects.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            {/* Type Tabs */}
            <div className="flex gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                    ${selectedType === type
                      ? 'bg-[#0034EF] text-white border-[#0034EF]'
                      : 'bg-white text-[#384470] border-[#384470]/20 hover:bg-[#0034EF]/10'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-3 py-1.5 rounded-lg border border-[#384470]/20 text-[#384470] bg-white focus:border-[#0034EF] focus:ring-2 focus:ring-[#0034EF]/10 outline-none"
            />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map(project => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-[#e5e7eb] rounded-xl shadow-sm hover:shadow-md transition-shadow p-0 overflow-hidden group"
                >
                  <div className="h-40 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#0034EF]/10 text-[#0034EF] text-xs font-semibold">
                        {project.type}
                      </span>
                      {project.featured && (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#F0CC00]/20 text-[#706838] text-xs font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-[#384470] mb-1 truncate">{project.title}</h2>
                    <p className="text-[#706838] text-sm mb-2 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-2 py-0.5 rounded bg-[#384470]/5 text-[#384470] text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-[#0034EF]">{project.date}</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-semibold text-[#0034EF] mb-2">No projects found</h3>
                <p className="text-[#384470]">Try adjusting your filters or search.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
} 