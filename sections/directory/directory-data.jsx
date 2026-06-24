/* global React */
// ============ Our People — directory data ============
// Generated from reference/people.csv (50 people).
// Names use the CSV's preferred_name (a single display name).
//
// Employee Type, the eight department groups (Academic Departments, CAES
// Collaborators, Centers and Institutes, College Administration, Extension, Labs &
// Programs, Research and Education Centers, Support Units), and Locations are all
// wired to the data — the `department` field maps into exactly one group via
// DEPT_GROUPS. Employee Type consolidates source groups: "Faculty" → Faculty,
// "Staff" → Staff, "Extension"/"County …" → Extension, and the Dean/Department
// Head groups → Leadership.
//
// campus_location_id → CAES campus location (the "Locations" facet). BEST-GUESS
// mapping (replace with the real lookup): 1 Tifton · 2 Athens · 3 Griffin.
// Ids that aren't a CAES campus (e.g. 4 FVSU, 6 county/extension) → no location.
const CAMPUS = { 1: "Tifton, CAES Campus", 2: "Athens, CAES Campus", 3: "Griffin, CAES Campus" };
const PROGRAM = { "4H": "4-H", "ANR": "Agriculture and Natural Resources", "FACS": "Family and Consumer Sciences", "Support": "Support", "Admin": "Administration" };

// raw: [name, title, employee_group, department, program_area, campusId, expertise, imageUrl]
const RAW = [
  ["Sonia M Altizer", "Department Head/Professor", "Department Head", "Entomology", "Admin", 2, "Ecology; Zoology; Evolutionary Biology; Ecological Applications; Anthropology", "https://secure.caes.uga.edu/personnel/photos/2025_SoniaAltizer4.jpg"],
  ["Jennifer H Waldeck", "Professor and Department Head", "Department Head", "Agricultural Leadership, Education and Communication", "Admin", 2, "", "https://secure.caes.uga.edu/personnel/photos/2022_JenniferWaldeck1.jpg"],
  ["Michael D Toews", "Associate Dean for Extension, Professor", "Associate Dean", "Office of the Associate Dean for Extension", "Admin", 2, "Zoology; Crop and Pasture Production; Ecological Applications", "https://secure.caes.uga.edu/personnel/photos/2025_MichaelToews.jpg"],
  ["Harshavardhan Thippareddi", "Associate Dean for Research, John Bekkers Professor in Poultry Science", "Associate Dean", "Office of the Associate Dean for Research", "Admin", 2, "Food Sciences; Microbiology; Animal Production; Chemical Engineering; Industrial Biotechnology; Nutrition and Dietetics", "https://secure.caes.uga.edu/personnel/photos/2020_HarshavardhaThippareddi.jpg"],
  ["Lawton Stewart", "Assistant Dean for Extension, Professor – Agriculture and Natural Resources Program Leader", "Assistant Dean", "Office of the Associate Dean for Extension", "Admin", 2, "Animal Production; Crop and Pasture Production; Food Sciences; Soil Sciences; Microbiology; Animal Nutrition; Agriculture, Land and Farm Management", "https://secure.caes.uga.edu/personnel/photos/2025_LawtonStewart.jpg"],
  ["Manpreet Singh", "Professor and Associate Dean", "Associate Dean", "Office of the Associate Dean for Academic and Faculty Affairs", "ANR", 2, "Food Sciences; Animal Production; Microbiology; Chemical Engineering", "https://secure.caes.uga.edu/personnel/photos/2021_ManpreetSingh1.jpg"],
  ["Connie J Rogers", "Department Head and Professor", "Department Head", "Family and Consumer Sciences", "FACS", 2, "", "https://secure.caes.uga.edu/personnel/photos/2023_ConnieRogers.jpg"],
  ["Nick Place", "CAES Dean and Director", "Dean", "Dean and Directors Office", "Admin", 2, "", "https://secure.caes.uga.edu/personnel/photos/2021_NickPlace.jpg"],
  ["Allisen Penn", "FACS Associate Dean for Extension and Outreach", "Associate Dean", "Family and Consumer Sciences", "FACS", 2, "", "https://secure.caes.uga.edu/personnel/photos/2019_AllisenPenn.jpg"],
  ["Michael J. Martin", "Director of Extension County Operations", "Assistant Dean", "Office of the Associate Dean for Extension", "Admin", 2, "", "https://secure.caes.uga.edu/personnel/photos/2024_MichaelMartin4.jpg"],
  ["Leonardo Lombardini", "Professor and Head, Department of Horticulture", "Department Head", "Horticulture", "ANR", 2, "Horticultural Production; Plant Physiology", "https://secure.caes.uga.edu/personnel/photos/2019_LeonardoLombardini.jpg"],
  ["Dean Kopsell", "Associate Dean for Academic and Faculty Affairs", "Associate Dean", "Office of the Associate Dean for Academic and Faculty Affairs", "Admin", 2, "", "https://secure.caes.uga.edu/personnel/photos/2024_DeanKopsell.jpg"],
  ["Whitney Jones", "Senior Academic Advisor", "Associate Dean", "Office of the Associate Dean for Academic and Faculty Affairs", "", 2, "", "https://secure.caes.uga.edu/personnel/photos/2020_WhitneyJones4.jpg"],
  ["Caroline Hinton", "Director of Experiential Learning", "Associate Dean", "Office of the Associate Dean for Academic and Faculty Affairs", "Support", 2, "", "https://secure.caes.uga.edu/personnel/photos/2021_CarolineHinton.jpg"],
  ["Debbie Hargrave", "Academic Advisor", "Associate Dean", "Office of the Associate Dean for Academic and Faculty Affairs", "", 2, "", "https://secure.caes.uga.edu/personnel/photos/2025_DebraHargrave.jpg"],
  ["Katie Hammond", "Research Center Superintendent", "Department Head", "Northwest Research and Education Center", "Admin", 6, "", "https://secure.caes.uga.edu/personnel/photos/2024_KristyHammond1.jpg"],
  ["Francis Fluharty", "Department Head Academic", "Department Head", "Animal and Dairy Science", "Admin", 2, "Animal Production; Food Sciences; Agriculture, Land and Farm Management; Veterinary Sciences", "https://secure.caes.uga.edu/personnel/photos/2022_FrancisFluharty.jpg"],
  ["April Few-Demo", "Dept Chair / Head Ac", "Department Head", "Family and Consumer Sciences", "FACS", 2, "", "https://secure.caes.uga.edu/personnel/photos/2022_AprilFew-Demo.jpg"],
  ["Sarwan Dhir", "Professor of Plant Biotechnology and Plant Sciences Program Coordinator - FVSU", "Department Head", "Fort Valley State University - Research", "Admin", 4, "", ""],
  ["Swarnankur Chatterjee", "Department Head and Bluerock Professor of Financial Planning", "Department Head", "Family and Consumer Sciences", "FACS", 2, "Banking, Finance and Investment; Applied Economics; Marketing; Other Economics; Accounting, Auditing and Accountability; Business and Management", "https://secure.caes.uga.edu/personnel/photos/2021_SwarnankurChatterjee1.jpg"],
  ["Todd Applegate", "Assistant Dean for International Programs; Department Head and R. Harold and Patsy Harrison Distinguished Chair in Poultry Science", "Assistant Dean", "Poultry Science", "Admin", 2, "Animal Production; Animal Nutrition", "https://secure.caes.uga.edu/personnel/photos/2020_ToddApplegate.jpg"],
  ["Daniel L. Jackson", "Laboratory Manager", "State Staff", "Agricultural and Environmental Services Lab (AESL)", "Support", 2, "Agronomy; Environmental Sciences; Food Sciences; Analytical Chemistry; Horticultural Production; Crop and Pasture Production", "https://secure.caes.uga.edu/personnel/photos/2015_DJackson.jpg"],
  ["Laura Ney", "County Agent", "County Extension Agent", "Northeast District", "ANR", 6, "", "https://secure.caes.uga.edu/personnel/photos/2019_LauraNey.jpg"],
  ["Gajanan S Bhat", "Dept Chair / Head Ac", "", "Family and Consumer Sciences", "", 2, "Manufacturing Engineering; Materials Engineering; Other Chemical Sciences; Mechanical Engineering; Polymers and Plastics; Textile Technology", "https://secure.caes.uga.edu/personnel/photos/2025_GajananBhat.jpg"],
  ["Eric D. Rubenstein", "Associate Professor", "State Faculty - Tenure Track", "Agricultural Leadership, Education and Communication", "Support", 2, "Curriculum and Pedagogy; Education Systems", "https://secure.caes.uga.edu/personnel/photos/2017_EricRubenstein.jpg"],
  ["Melanie Biersmith", "State 4-H Leader", "State Faculty - Public Service Track", "4-H and Youth", "4H", 2, "Information Systems; Psychology; Cognitive Sciences", "https://secure.caes.uga.edu/personnel/photos/2024_MelanieBiersmith.jpg"],
  ["Romdhane Rekaya", "Professor", "State Faculty - Tenure Track", "Animal and Dairy Science", "ANR", 2, "Animal Production; Food Sciences; Microbiology; Genetics", "https://secure.caes.uga.edu/personnel/photos/2019_RomdhaneRekaya.jpg"],
  ["Ellen McCullough", "Assistant Professor", "State Faculty - Tenure Track", "Agricultural and Applied Economics", "ANR", 2, "Agriculture, Land and Farm Management; Food Sciences; Policy and Administration", "https://secure.caes.uga.edu/personnel/photos/2019_EllenMcCullough.jpg"],
  ["Glen C. Rains", "Professor", "State Faculty - Tenure Track", "Entomology", "ANR", 1, "Agriculture, Land and Farm Management; Crop and Pasture Production; Other Engineering; Food Sciences; Plant Biology; Zoology", "https://secure.caes.uga.edu/personnel/photos/2020_GlenRains.jpg"],
  ["James D. Dutcher", "Professor Emeritus", "Emeritus Faculty", "Entomology", "Support", 6, "Zoology; Crop and Pasture Production; Ecological Applications", "https://secure.caes.uga.edu/personnel/photos/2022_JamesDutcher.jpg"],
  ["Maria Navarro", "Josiah Meigs Distinguished Teaching Professor", "State Faculty - Tenure Track", "Agricultural Leadership, Education and Communication", "Support", 2, "Education Systems; Curriculum and Pedagogy; Specialist Studies in Education; Public Health and Health Services", "https://secure.caes.uga.edu/personnel/photos/2022_MariaNavarro.jpg"],
  ["Bodie V. Pennisi", "Professor and Vincent J. Dooley Endowed Chair of Ornamental Horticulture", "State Faculty - Tenure Track", "Horticulture", "ANR", 3, "Agro-ecosystem Function and Prediction; Genetically Modified Horticulture Plants; Environmental Education and Extension; Environmental Sciences", "https://secure.caes.uga.edu/personnel/photos/2020_SvobodaPennisi.jpg"],
  ["Robert C Kemerait Jr", "Professor", "State Faculty - Tenure Track", "Plant Pathology", "ANR", 1, "Crop and Pasture Production; Microbiology; Plant Biology; Zoology", "https://secure.caes.uga.edu/personnel/photos/2023_RobertKemerait3.jpg"],
  ["Mohamed Mergoum", "Georgia Seed Development UGAF Professor in Wheat Breeding and Genetics (Plant Breeding, Genetics, and Genomics)", "State Faculty - Tenure Track", "Crop and Soil Sciences", "Support", 3, "Crop and Pasture Production; Plant Biology; Genetics; Food Sciences", "https://secure.caes.uga.edu/personnel/photos/2020_MohamedMergoum.jpg"],
  ["Kylee Jo Duberstein", "Professor", "State Faculty - Tenure Track", "Animal and Dairy Science", "ANR", 2, "Veterinary Sciences; Neurosciences; Clinical Sciences; Cardiorespiratory Medicine and Haematology; Animal Production; Psychology", "https://secure.caes.uga.edu/personnel/photos/2019_KyleeDuberstein.jpg"],
  ["Jeffrey L. Jordan", "Emeritus Faculty and Director of Sustainable Agriculture Research and Education (SARE) Program-Southern Region", "Emeritus Faculty", "Agricultural and Applied Economics", "ANR", 3, "Applied Economics; Horticultural Production; Environmental Engineering; Food Sciences; Environmental Science and Management; Chemical Engineering", "https://secure.caes.uga.edu/personnel/photos/2024_JeffreyJordan.jpg"],
  ["Mark R. Brown", "Professor Emeritus", "Emeritus Faculty", "Entomology", "ANR", 2, "Zoology; Physiology; Medicinal and Biomolecular Chemistry; Biochemistry and Cell Biology; Pharmacology and Pharmaceutical Sciences; Medical Physiology", "https://secure.caes.uga.edu/personnel/photos/2016_MarkBrown1.jpg"],
  ["Michael R. Strand", "Professor/H.M. Pulliam Chair", "State Faculty - Tenure Track", "Entomology", "ANR", 2, "Zoology; Genetics; Physiology; Ecology; Biochemistry and Cell Biology; Ecological Applications", "https://secure.caes.uga.edu/personnel/photos/2020_MichaelStrand.jpg"],
  ["Mussie Habteselassie", "Professor of Soil Microbiology", "State Faculty - Tenure Track", "Crop and Soil Sciences", "ANR", 3, "Microbiology; Food Sciences; Horticultural Production; Animal Production; Environmental Science and Management; Soil Sciences", "https://secure.caes.uga.edu/personnel/photos/2016_MussieHabteselassie.jpg"],
  ["Sha Tao", "Associate Professor", "State Faculty - Tenure Track", "Animal and Dairy Science", "ANR", 2, "Animal Production; Food Sciences", "https://secure.caes.uga.edu/personnel/photos/2019_ShaTao.jpg"],
  ["Scott NeSmith", "Professor Emeritus", "Emeritus Faculty", "Horticulture", "", 3, "Horticultural Production; Crop and Pasture Production; Plant Biology", "https://secure.caes.uga.edu/personnel/photos/2015_DNesmith.jpg"],
  ["Sammy E. Aggrey", "Distinguished Research Professor | Richard B. Russell Endowed Chair and Professor", "State Faculty - Tenure Track", "Poultry Science", "ANR", 2, "Animal Production; Food Sciences; Microbiology; Genetics; Zoology; Veterinary Sciences", "https://secure.caes.uga.edu/personnel/photos/2020_SamuelAggrey.jpg"],
  ["Lenny Wells", "Professor and Pecan Extension Specialist; Emphasis: Pecans", "State Faculty - Tenure Track", "Horticulture", "ANR", 1, "Horticultural Production; Zoology; Plant Biology; Crop and Pasture Production", "https://secure.caes.uga.edu/personnel/photos/2022_MarvinWells.jpg"],
  ["Nandita Gaur", "Assistant Professor - Soil Physics", "State Faculty - Tenure Track", "Crop and Soil Sciences", "ANR", 2, "Physical Geography and Environmental Geoscience; Civil Engineering; Environmental Engineering; Applied Economics; Crop and Pasture Production", "https://secure.caes.uga.edu/personnel/photos/2020_NanditaGaur.jpg"],
  ["Clint Waltz", "Extension Specialist - Turfgrass", "State Faculty - Tenure Track", "Crop and Soil Sciences", "ANR", 3, "Horticultural Production; Crop and Pasture Production; Plant Biology; Zoology; Education Systems", "https://secure.caes.uga.edu/personnel/photos/2025_FreddieWaltz.jpg"],
  ["Joseph LaForest", "Senior Public Service Associate", "State Faculty - Public Service Track", "Entomology", "ANR", 1, "Environmental Science and Management; Crop and Pasture Protection (Pests, Diseases and Weeds); Animal Protection (Pests and Pathogens); Forestry Pests, Health and Diseases; Horticultural Crop Protection (Pests, Diseases and Weeds); Farm Management, Rural Management and Agribusiness; Records and Information Management (excl. Business Records and Information Management); Database Management; Data Communications; Data Structures; Information Systems; Web Technologies (excl. Web Search)", "https://secure.caes.uga.edu/personnel/photos/2015_JLaForest.jpg"],
  ["Greg Huber", "Assistant Superintendent of Plant Operations", "State Staff", "Facilities Management - Griffin", "Support", 3, "Horticultural Production", "https://secure.caes.uga.edu/personnel/photos/2016_GregoryHuber.jpg"],
  ["Lisa Baxter", "Associate Professor and State Forage Specialist", "State Faculty - Tenure Track", "Crop and Soil Sciences", "ANR", 1, "Crop and Pasture Production; Horticultural Production; Civil Engineering; Environmental Science and Management; Plant Biology; Zoology", "https://secure.caes.uga.edu/personnel/photos/2023_LisaBaxter1.jpg"],
  ["Patrick J. Conner", "Professor and Tifton REI Coordinator; Emphasis: Pecan and muscadine breeding", "State Faculty - Tenure Track", "Horticulture", "ANR", 1, "Horticultural Production; Crop and Pasture Production; Plant Biology", "https://secure.caes.uga.edu/personnel/photos/2017_PatrickConner.jpg"],
  ["Henry Y. Sintim", "Associate Professor", "State Faculty - Tenure Track", "Crop and Soil Sciences", "ANR", 1, "Crop and Pasture Production; Horticultural Production; Other Agricultural and Veterinary Sciences; Civil Engineering; Environmental Engineering; Materials Engineering", "https://secure.caes.uga.edu/personnel/photos/2019_HenrySintim1.jpg"],
];

// Consolidate the source employee groups into a few buckets. Dean-level and
// department-head groups roll up into a single "Leadership" type.
const bucketType = (t) => (!t ? null : /\b(dean|department head)\b/i.test(t) ? "Leadership" : /faculty/i.test(t) ? "Faculty" : /staff/i.test(t) ? "Staff" : /extension|county/i.test(t) ? "Extension" : t);

// Department taxonomy. The `department` field belongs to exactly one of these
// groups; each `members` list is the full canonical set, so the facets show the
// real taxonomy even where the demo data doesn't populate every option. A
// department not listed here is left unclassified (shows on the card, no facet).
const DEPT_GROUPS = [
  { key: "acad", label: "Academic Departments", members: [
    "Agricultural and Applied Economics", "Agricultural Leadership, Education and Communication",
    "Animal and Dairy Science", "Crop and Soil Sciences", "Entomology",
    "Food Science and Technology", "Horticulture", "Plant Pathology", "Poultry Science",
  ] },
  { key: "collab", label: "CAES Collaborators", members: [
    "Coastal Georgia Botanical Gardens at the Historic Bamboo Farm", "College of Engineering",
    "Fort Valley State University - Extension", "Fort Valley State University - Research",
    "Franklin College of Arts and Sciences", "Georgia Department of Agriculture",
    "Marine Extension and Georgia Sea Grant", "Mary Frances Early College of Education",
    "State Botanical Garden of Georgia",
    "Sustainable Agriculture Research and Education (SARE) Program - Southern Region",
    "Terry College of Business", "UGA College of Veterinary Medicine", "UGA Student Financial Aid",
    "United States Department of Agriculture (USDA) - Agricultural Research Service (ARS)",
    "United States Department of Agriculture (USDA) - Crop Genetics and Breeding Research Unit (CGBRU)",
    "United States Department of Agriculture (USDA) - Plant Genetic Resources Conservation Unit (PGRCU)",
    "United States Department of Agriculture (USDA) - Southeast Watershed Research Laboratory (SEWRL)",
    "United States Department of Agriculture (USDA) - Tifton Support Staff",
    "Warnell School of Forestry and Natural Resources",
  ] },
  { key: "centers", label: "Centers and Institutes", members: [
    "Center for Agribusiness and Economic Development (CAED)", "Center for Food Safety",
    "Center for Invasive Species and Ecosystem Health", "Food Product Innovation and Commercialization Center",
    "Georgia Center for Urban Agriculture (GCUA)", "Institute for Integrative Precision Agriculture",
    "Institute of Plant Breeding, Genetics and Genomics (IPBGG)",
  ] },
  { key: "colladmin", label: "College Administration", members: [
    "Academic Affairs - Tifton", "Dean and Directors Office", "Griffin Campus",
    "Office of Development and Alumni Relations", "Office of International Programs",
    "Office of Student Success", "Office of the Associate Dean for Academic and Faculty Affairs",
    "Office of the Associate Dean for Extension", "Office of the Associate Dean for Research",
    "Tifton Campus",
  ] },
  { key: "extension", label: "Extension", members: [
    "4-H and Youth", "Family and Consumer Sciences", "Northeast District",
    "Northwest District", "Southeast District", "Southwest District",
  ] },
  { key: "labs", label: "Labs and Programs", members: [
    "Agricultural and Environmental Services Lab (AESL)", "Animal Waste Awareness in Research and Extension",
    "CAES Greenhouses", "Center for Applied Genetic Technologies (CAGT)",
    "Feed the Future Innovation Lab for Peanut",
    "National Environmentally Sound Production Agriculture Laboratory (NESPAL)",
    "Southern Regional Extension Forestry (SREF)",
  ] },
  { key: "recenters", label: "Research and Education Centers", members: [
    "ADS Eatonton Beef Research Unit", "Attapulgus Research and Education Center",
    "Blueberry Research and Demonstration Farm", "C.M. Stripling Irrigation Research Park",
    "Georgia Mountain Research and Education Center", "J. Phil Campbell Sr. Research and Education Center",
    "Northwest Research and Education Center", "Southeast Research and Education Center",
    "Southwest Research and Education Center", "UGA Grand Farm", "Vidalia Onion and Vegetable Research Center",
  ] },
  { key: "support", label: "Support Units", members: [
    "Academic and Student Affairs - Griffin", "Business Office - Griffin", "CAES - Contracts and Grants",
    "CAES Business Office - Athens", "CAES Business Office - Tifton", "Campus Director's Office - Griffin",
    "Experimental Statistics - Tifton", "Facilities Management - Griffin", "Facilities Support",
    "Field Research Services - Griffin", "Field Research Services - Tifton", "Library - Griffin",
    "Office of Continuing Education - Griffin", "Office of Information Technology (OIT)",
    "Office of Learning and Organizational Development (OLOD)", "Office of Marketing and Communications (OMC)",
    "Physical Plant - Tifton", "UGA Tifton Campus Conference Center",
  ] },
];
const DEPT_TO_GROUP = {};
DEPT_GROUPS.forEach((g) => g.members.forEach((m) => { DEPT_TO_GROUP[m] = g.key; }));

// Rank within Leadership — cards force this order regardless of source order.
// Specific titles are tested first because "Associate/Assistant Dean" also
// contain "Dean"; non-leadership returns -1.
const leadRank = (t) =>
  !t ? -1
  : /\bdepartment head\b/i.test(t) ? 3
  : /\bassociate dean\b/i.test(t) ? 1
  : /\bassistant dean\b/i.test(t) ? 2
  : /\bdean\b/i.test(t) ? 0
  : -1;

const builtPeople = RAW.map(([name, title, rawType, dept, prog, campusId, expertise, img]) => {
  const p = {
    name,
    title: title || null,
    type: bucketType(rawType),
    dept: dept || null,
    campus: campusId ? CAMPUS[campusId] : null,
    // Areas of expertise — a semicolon-separated list in the source, kept as an
    // array (empty when the source has none).
    expertise: expertise ? expertise.split(";").map((s) => s.trim()).filter(Boolean) : [],
    img: img || null,
  };
  const gk = dept ? DEPT_TO_GROUP[dept] : null;
  if (gk) p[gk] = dept; // the field the matching department facet filters on
  return { p, rank: leadRank(rawType) };
});

// Force leadership card order (Dean → Associate Dean → Assistant Dean →
// Department Head), reordering only the leadership entries among the slots they
// already occupy so the rest of the directory keeps its source order. Sort is
// stable, so multiple people sharing a rank keep their relative source order.
const leadSlots = [];
const leaders = [];
builtPeople.forEach((e, i) => { if (e.rank !== -1) { leadSlots.push(i); leaders.push(e); } });
leaders.sort((a, b) => a.rank - b.rank);
leadSlots.forEach((slot, j) => { builtPeople[slot] = leaders[j]; });

window.DIR_PEOPLE = builtPeople.map((e) => e.p);

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean))).sort();
const TYPE_OPTIONS = uniq(window.DIR_PEOPLE.map((p) => p.type));
const CAMPUS_OPTIONS = uniq(window.DIR_PEOPLE.map((p) => p.campus));

window.DIR_GROUPS = [
  { key: "type", label: "Employee Type", options: TYPE_OPTIONS },
  ...DEPT_GROUPS.map((g) => ({ key: g.key, label: g.label, options: g.members })),
  { key: "campus", label: "Locations", options: CAMPUS_OPTIONS },
];

// Filter: AND across groups, OR within a group. Array fields (programs) match
// if any selected value is present. `q` matches name or title.
window.dirFilter = function dirFilter(people, q, selected) {
  const s = (q || "").trim().toLowerCase();
  return people.filter((p) => {
    if (s) {
      const hay = `${p.name} ${p.title || ""}`.toLowerCase();
      if (!hay.includes(s)) return false;
    }
    for (const g of window.DIR_GROUPS) {
      const sel = (selected && selected[g.key]) || [];
      if (!sel.length) continue;
      const val = p[g.key];
      if (Array.isArray(val)) {
        if (!val.some((v) => sel.includes(v))) return false;
      } else if (!sel.includes(val)) {
        return false;
      }
    }
    return true;
  });
};

window.dirCounts = function dirCounts(people, key) {
  const out = {};
  for (const p of people) {
    const v = p[key];
    if (Array.isArray(v)) v.forEach((x) => { if (x) out[x] = (out[x] || 0) + 1; });
    else if (v) out[v] = (out[v] || 0) + 1;
  }
  return out;
};

// Person card — image-less link card (small avatar) with initials fallback.
window.PersonCard = function PersonCard({ person }) {
  const parts = (person.name || "").trim().split(/\s+/);
  const initials = ((parts[0] || " ")[0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
  const meta = [person.dept, person.campus].filter(Boolean).join(" · ");
  return (
    <div className="dir-card">
      <span className="dir-avatar" aria-hidden="true">
        <span className="dir-initials">{initials}</span>
        {person.img && <img src={person.img} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />}
      </span>
      <h3 className="dir-name"><a href="#">{person.name}</a></h3>
      {person.title && <p className="dir-title">{person.title}</p>}
      {meta && <p className="dir-meta">{meta}</p>}
    </div>
  );
};
