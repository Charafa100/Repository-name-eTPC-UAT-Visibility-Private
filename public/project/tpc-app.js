/* TPC SolutionHub — app interactions */

const TPC = (() => {
  const i18n = {
    en: {
      'nav.platform': 'Platform',
      'nav.dashboard': 'Dashboard',
      'nav.requests': 'My Requests',
      'nav.solutions': 'Solutions',
      'nav.chemical': 'Safety Data',
      'nav.cash': 'Cash Advance',
      'nav.expense': 'Daily Expense',
      'nav.security': 'Security Escort',
      'nav.admin': 'Administration',
      'nav.users': 'Users',
      'nav.approvals': 'Approvals',
      'nav.settings': 'Settings',
      'nav.help': 'Help & Guide',
      'topbar.search': 'Search requests, chemicals, users…',
      'page.dashboard.title': 'Dashboard',
      'page.dashboard.sub': 'Overview of your activity and pending actions',
      'page.chemical.title': 'Safety Data Management',
      'page.chemical.sub': 'Chemical inventory, SDS, PPE and HSE approvals',
      'page.newchem.title': 'New chemical request',
      'page.newchem.sub': 'Submit a new chemical for HSE review and approval',
      'page.requests.title': 'My requests',
      'page.requests.sub': 'Track all requests you have submitted',
      'page.users.title': 'User management',
      'page.users.sub': 'Roles, permissions and team members',
      'page.approvals.title': 'Approvals inbox',
      'page.approvals.sub': 'Items across all TPC modules awaiting your review',
      'page.settings.title': 'System settings',
      'page.settings.sub': 'Azure integration, SSO, data sources',
      'queue.title': 'Your queue',
      'queue.sub': 'Items waiting on you today',
      'queue.viewall': 'View all',
      'news.title': 'News & announcements',
      'news.sub': 'Actualités TPC',
      'news.viewall': 'View archive',
      'quick.title': 'Quick actions',
      'stats.pending': 'Pending requests',
      'stats.approved': 'Approved this month',
      'stats.active': 'Active users',
      'stats.sync': 'Azure sync',
      'stats.chemicals': 'Active chemicals',
      'stats.manufacturers': 'Manufacturers',
      'stats.storage': 'Storage locations',
      'btn.newrequest': 'New request',
      'btn.export': 'Export',
      'btn.filter': 'Filter',
      'btn.submit': 'Submit request',
      'btn.savedraft': 'Save draft',
      'btn.back': 'Back',
      'btn.approve': 'Approve',
      'btn.reject': 'Reject',
      'btn.viewall': 'View all',
      'role.label': 'Demo role',
      'live': 'Live · Synced',
      'badge.live': 'Live',
      'badge.dev': 'In development',
    },
    fr: {
      'nav.platform': 'Plateforme',
      'nav.dashboard': 'Tableau de bord',
      'nav.requests': 'Mes demandes',
      'nav.solutions': 'Solutions',
      'nav.chemical': 'Données de sécurité',
      'nav.cash': 'Avance de fonds',
      'nav.expense': 'Note de frais',
      'nav.security': 'Escorte de sécurité',
      'nav.admin': 'Administration',
      'nav.users': 'Utilisateurs',
      'nav.approvals': 'Approbations',
      'nav.settings': 'Paramètres',
      'nav.help': 'Aide & Guide',
      'topbar.search': 'Rechercher demandes, produits chimiques, utilisateurs…',
      'page.dashboard.title': 'Tableau de bord',
      'page.dashboard.sub': 'Vue d\'ensemble de votre activité et actions en attente',
      'page.chemical.title': 'Gestion des données de sécurité',
      'page.chemical.sub': 'Inventaire chimique, FDS, EPI et approbations HSE',
      'page.newchem.title': 'Nouvelle demande de produit chimique',
      'page.newchem.sub': 'Soumettre un nouveau produit chimique pour examen HSE',
      'page.requests.title': 'Mes demandes',
      'page.requests.sub': 'Suivre toutes les demandes que vous avez soumises',
      'page.users.title': 'Gestion des utilisateurs',
      'page.users.sub': 'Rôles, permissions et membres de l\'équipe',
      'page.approvals.title': 'Boîte d’approbation',
      'page.approvals.sub': 'Éléments à examiner à travers tous les modules TPC',
      'page.settings.title': 'Paramètres système',
      'page.settings.sub': 'Intégration Azure, SSO, sources de données',
      'queue.title': 'Votre file d\'attente',
      'queue.sub': 'Éléments en attente de votre action aujourd\'hui',
      'queue.viewall': 'Voir tout',
      'news.title': 'Actualités & annonces',
      'news.sub': 'Communications internes TPC',
      'news.viewall': 'Voir les archives',
      'quick.title': 'Actions rapides',
      'stats.pending': 'Demandes en attente',
      'stats.approved': 'Approuvées ce mois',
      'stats.active': 'Utilisateurs actifs',
      'stats.sync': 'Synchro Azure',
      'stats.chemicals': 'Produits chimiques actifs',
      'stats.manufacturers': 'Fabricants',
      'stats.storage': 'Lieux de stockage',
      'btn.newrequest': 'Nouvelle demande',
      'btn.export': 'Exporter',
      'btn.filter': 'Filtrer',
      'btn.submit': 'Soumettre la demande',
      'btn.savedraft': 'Enregistrer brouillon',
      'btn.back': 'Retour',
      'btn.approve': 'Approuver',
      'btn.reject': 'Rejeter',
      'btn.viewall': 'Tout voir',
      'role.label': 'Rôle démo',
      'live': 'En direct · Synchronisé',
      'badge.live': 'En direct',
      'badge.dev': 'En développement',
    }
  };

  const roleConfig = {
    ga:    { name: 'Cherif Hassan',  badge: 'Global Admin',  badgeFr: 'Admin global',   av: 'CH', hidden: [],                                                                                    denied: false },
    admin: { name: 'Cherif Hassan',  badge: 'Safety Admin',  badgeFr: 'Admin. sécurité', av: 'CH', hidden: ['nav-settings','nav-users'],                                                       denied: false },
    she:   { name: 'Mariam Deby',    badge: 'HSE Reviewer',  badgeFr: 'Réviseur HSE',   av: 'MD', hidden: ['nav-users','nav-settings'],                                                          denied: false },
    sm:    { name: 'Fatima Moussa',  badge: 'Store Manager', badgeFr: 'Resp. magasin',  av: 'FM', hidden: ['nav-users','nav-approvals','nav-settings','nav-quick-review','nav-manufacturers'],   denied: false },
    user:  { name: 'Ahmed Mahamat',  badge: 'Field User',    badgeFr: 'Utilisateur',    av: 'AM', hidden: ['nav-users','nav-approvals','nav-settings','nav-quick-review','nav-manufacturers'],   denied: false }
  };

  const SITES = [
    { key: 'kome5',      label: 'Kome 5'     },
    { key: 'moundouli',  label: 'Moundouli'  },
    { key: 'douala',     label: 'Douala'     },
    { key: 'ps2dompta',  label: 'PS2-Dompta' },
    { key: 'ps3belabo',  label: 'PS3-Belabo' },
  ];

  const STORAGE_LOCATIONS = [
    { id: 'loc-001', site: 'kome5',     label: 'AIRPORT',                          active: true },
    { id: 'loc-002', site: 'kome5',     label: 'BAKER',                            active: true },
    { id: 'loc-003', site: 'kome5',     label: 'BIBO Store',                       active: true },
    { id: 'loc-004', site: 'kome5',     label: 'CIS Store',                        active: true },
    { id: 'loc-005', site: 'kome5',     label: 'Clinic',                           active: true },
    { id: 'loc-006', site: 'kome5',     label: 'Fuel Station',                     active: true },
    { id: 'loc-007', site: 'kome5',     label: 'IT Store',                         active: true },
    { id: 'loc-008', site: 'kome5',     label: 'Kome Waste Management Facilities', active: true },
    { id: 'loc-009', site: 'kome5',     label: 'LAB/TOTCO',                        active: true },
    { id: 'loc-010', site: 'kome5',     label: 'Low',                              active: true },
    { id: 'loc-011', site: 'kome5',     label: 'TES',                              active: true },
    { id: 'loc-012', site: 'kome5',     label: 'TES/LAB',                          active: true },
    { id: 'loc-013', site: 'kome5',     label: 'TPC Construction',                 active: true },
    { id: 'loc-014', site: 'kome5',     label: 'TPC Laboratory',                   active: true },
    { id: 'loc-015', site: 'kome5',     label: 'TPC Maintenance',                  active: true },
    { id: 'loc-016', site: 'kome5',     label: 'TPC Warehouse',                    active: true },
    { id: 'loc-017', site: 'moundouli', label: 'laboratory',                       active: true }
  ];

  const USERS = [
    { id:'usr-001', name:'Cherif Hassan',  initials:'CH', email:'cherif.hassan@tpc-tchad.td',  jobTitle:'',               platformRole:'ga',    moduleAccess:['safety'], site:'kome5',     stagesScope:null,                             active:true,  createdAt:'2026-01-15', deactivatedAt:null, deactivatedBy:null },
    { id:'usr-002', name:'Mariam Deby',    initials:'MD', email:'mariam.deby@tpc-tchad.td',    jobTitle:'HSE Officer',    platformRole:'she',   moduleAccess:['safety'], site:'douala',    stagesScope:['IH Review','EMP Review'],       active:true,  createdAt:'2026-01-15', deactivatedAt:null, deactivatedBy:null },
    { id:'usr-003', name:'Oumar Cheikh',   initials:'OC', email:'oumar.cheikh@tpc-tchad.td',   jobTitle:'Safety Reviewer', platformRole:'she',  moduleAccess:['safety'], site:'ps2dompta', stagesScope:['Safety Review'],               active:true,  createdAt:'2026-01-15', deactivatedAt:null, deactivatedBy:null },
    { id:'usr-004', name:'Fatima Moussa',  initials:'FM', email:'fatima.moussa@tpc-tchad.td',  jobTitle:'',               platformRole:'sm',    moduleAccess:['safety'], site:'ps2dompta', stagesScope:null,                             active:true,  createdAt:'2026-01-15', deactivatedAt:null, deactivatedBy:null },
    { id:'usr-005', name:'Ibrahim Saleh',  initials:'IS', email:'ibrahim.saleh@tpc-tchad.td',  jobTitle:'IT Technician',  platformRole:'user',  moduleAccess:['safety'], site:'ps3belabo', stagesScope:null,                             active:true,  createdAt:'2026-01-15', deactivatedAt:null, deactivatedBy:null },
    { id:'usr-006', name:'Ahmed Mahamat',  initials:'AM', email:'ahmed.mahamat@tpc-tchad.td',  jobTitle:'',               platformRole:'user',  moduleAccess:['safety'], site:'douala',    stagesScope:null,                             active:true,  createdAt:'2026-01-15', deactivatedAt:null, deactivatedBy:null },
  ];

  const MANUFACTURERS = [
    { id:'mfr-001', name:'AZO Active', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-002', name:'Synergy Health (UK) Ltd', email:'', phone:'', addr:'1 Western Avenue  Matrix Park  Chorley  Lancashire  PR7 7NB  UK', active:true, notes:'' },
    { id:'mfr-003', name:'Stearns Packaging Corporation', email:'stearns@stearnspkg.com', phone:'8006555008', addr:'4200 Sycamore Avenue (53714)', active:true, notes:'' },
    { id:'mfr-004', name:'Diversey Europe Operations', email:'commandes.directparis@diversey.com', phone:'145147676', addr:'Diversey France SAS  201, rue Carnot 94120 Fontenay sous Bois', active:true, notes:'' },
    { id:'mfr-005', name:'Diversey Europe Operations BV, Maarssenbroeksedijk 2, 3542DN Utrecht, The Netherlands', email:'commandes.directparis@diversey.com', phone:'145147676', addr:'Diversey France SAS  201, rue Carnot 94120 Fontenay sous Bois', active:true, notes:'' },
    { id:'mfr-006', name:'Wilhelmsen Ships Service AS', email:'wss.norway.cs@wilhelmsen.com', phone:'4767584000', addr:'Strandveien 20 Lysaker 1366 Norway', active:true, notes:'' },
    { id:'mfr-007', name:'ECOLAB', email:'', phone:'1094003', addr:'', active:true, notes:'' },
    { id:'mfr-008', name:'ELCO PHARMA', email:'info@elcopharma.com', phone:'33386876363', addr:'ZI - 20 RUE EDOUARD BOUTHIER.89500.VILLENEUVE/YONNE.FRANCE', active:true, notes:'' },
    { id:'mfr-009', name:'ROYAL SANDERS', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-010', name:'NECTRA', email:'qualite-nectra@notilia.com', phone:'466021616', addr:'Zone Industrielle de Grézan.30034.NIMES.FRANCE', active:true, notes:'' },
    { id:'mfr-011', name:'Reckitt Benckiser Italy', email:'Service.consommateurs@reckittbenckiser.com', phone:'', addr:'Reckitt Benckiser Italy  Via Sant\'Antonio, 5 30034 MIRA, VENICE  ITALY', active:true, notes:'SAP phone: 3.90416E+11' },
    { id:'mfr-012', name:'Meso Scale Diagnostics', email:'', phone:'2403142600', addr:'1601 Research Blvd Rockville, MD 20850‐3128', active:true, notes:'' },
    { id:'mfr-013', name:'Chemiclean Products Ltd', email:'technical@chemiclean.co.uk', phone:'', addr:'PO Box 2487, Hockley. Birmingham. B18 5JN', active:true, notes:'SAP phone: 4.41215E+11' },
    { id:'mfr-014', name:'Cooper', email:'', phone:'18002556730', addr:'Remel 12076 Santa Fe Drive Lenexa, KS 66', active:true, notes:'' },
    { id:'mfr-015', name:'RECKITT BENCKISER', email:'', phone:'', addr:'RECKITT BENCKISER FRANCE - 15 rue Ampère, 91748 MASSY CEDEX', active:true, notes:'' },
    { id:'mfr-016', name:'Laboratoires Anios', email:'fds@anios.com', phone:'', addr:'Pavé du Moulin.59260.LILLE - HELLEMMES.FRANCE.', active:true, notes:'SAP phone: 3.30321E+11' },
    { id:'mfr-017', name:'Acros Organics N.V.', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-018', name:'Gilbert Laboratories', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-019', name:'Quimias Oro S.A.', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-020', name:'Colgate Palmolive', email:'fr@colpal.com', phone:'33147686000', addr:'60 avenue de l\'Europe 92270-Bois Colombes France', active:true, notes:'' },
    { id:'mfr-021', name:'Premier Products', email:'laboratory@premiereproducts.co.uk', phone:'11242537103', addr:'Oakley Gardens, Bouncers Lane, Cheltenham, GLOS GL52 5JD', active:true, notes:'' },
    { id:'mfr-022', name:'Jeyes Ltd.', email:'contact@jeyes.com', phone:'', addr:'Brunel Way Thetford Norfolk IP24 1HF UK', active:true, notes:'SAP phone: 4.41843E+11' },
    { id:'mfr-023', name:'JohnsonDiversey', email:'', phone:'118119000', addr:'', active:true, notes:'' },
    { id:'mfr-024', name:'Clinical Diagnostic Solutions', email:'', phone:'19547911773', addr:'Clinical Diagnostic Solutions, Inc. 1800 NW 65th Avenue Plantation FL, 33313, USA', active:true, notes:'' },
    { id:'mfr-025', name:'Urit', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-026', name:'Unilever UK Limited', email:'', phone:'', addr:'Springfield drive Leatherhead survey KT227GR 08007839426/EIRE 1850388399', active:true, notes:'Truncated email: unileversds@unileverconsumerlink.c' },
    { id:'mfr-027', name:'BASF SE', email:'Produktinformation-Pflanzenschutz@basf.com', phone:'', addr:'67056 Ludwigshafen GERMANY Operating Division Crop Protection', active:true, notes:'SAP phone: 4.96216E+11' },
    { id:'mfr-028', name:'Clarke Mosquito Control Products, Inc.', email:'Clarke@clarke.com', phone:'16308942000', addr:'675 Sidwell Court   St. Charles, IL 60174 U.S.A', active:true, notes:'' },
    { id:'mfr-029', name:'Syngenta Crop Protection AG', email:'sds.ch@syngenta.com', phone:'41613231111', addr:'Postfach  CH-4002 Basel  Suisse', active:true, notes:'' },
    { id:'mfr-030', name:'Nisus Corporation', email:'', phone:'', addr:'Nisus Corporation  100 Nisus Drive  Rockford, TN 37853', active:true, notes:'' },
    { id:'mfr-031', name:'Garrards Pty Ltd', email:'', phone:'738811693', addr:'Garrards Pty Ltd  PO Box 5477  Brendale, Queensland 4500', active:true, notes:'Website: www.garrards.com.au' },
    { id:'mfr-032', name:'FMC chemicals', email:'', phone:'220929423', addr:'FMC Chemicals (Malaysia) Sdn Bhd Regus Kuala Lumpur 1 Sentral, Level 16, 1 Sentral Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470, Kuala Lumpur Malaysia', active:true, notes:'' },
    { id:'mfr-033', name:'Bayer', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-034', name:'PelGar International Ltd', email:'christine.unsworth@pelgar.co.uk', phone:'', addr:'PelGar International Ltd Unit 13 Newman Lane Alton Hampshire GU34 2QR United Kingdom', active:true, notes:'SAP phone: 4.40142E+11' },
    { id:'mfr-035', name:'Orfila', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-036', name:'Total', email:'rm.mkefr-fds@total.com', phone:'', addr:'TOTAL MARKETING France 562avenueduparcdel’île 92000 Nanterre FRANCE Tel: +33 (0)1 41 35 40 00', active:true, notes:'SAP phone: 3.30141E+11' },
    { id:'mfr-037', name:'ABBROS INDUSTRIES', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-038', name:'Ametron Refrigerants', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-039', name:'Packaging Service Co.Inc', email:'', phone:'12814851458', addr:'1904 Mykawa Road Pearland', active:true, notes:'' },
    { id:'mfr-040', name:'DOW SILICONES CORPORATION', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-041', name:'E-Z WELD Group L.I,C', email:'', phone:'3108867600', addr:'IPS Corporation (E-Z WELD) 100 Trousdale Way Hartsville Tennessee  United State', active:true, notes:'Website: www.e-zweld.com' },
    { id:'mfr-042', name:'National Refrigerants, Inc.', email:'', phone:'18002620012', addr:'National Refrigerants, Inc.  661 Kenyon Avenue  Bridgeton, New Jersey 08302', active:true, notes:'' },
    { id:'mfr-043', name:'DUPONT', email:'SDSQuestion-NA@dupont.com', phone:'8833387668', addr:'DDP SPECIALTY ELECTRONIC MATERIALS US 9, LLC 974 Centre Road Wilmington DE 19805 UNITED STATES', active:true, notes:'' },
    { id:'mfr-044', name:'GORILLA', email:'', phone:'5132713300', addr:'Company  The 2101 E. Kemper Road Cincinnati, Ohio 45241', active:true, notes:'Website: www.gorillatough.com' },
    { id:'mfr-045', name:'BASEKİM KİMYASAL ÜRÜNLE', email:'', phone:'', addr:'İlkbahar Mah. Galip Erdem Cd. Güneypark Küme Evleri Sinpaş Altınoran,Kule 2 Kat.20 No.146,Çankaya/Ankara/Turkey', active:true, notes:'SAP phone: 9.03125E+11' },
    { id:'mfr-046', name:'ALCEA FRANCE EURL', email:'', phone:'33385323530', addr:'ZONE INDUSTRIELLES DE JONCS 71700  TOURNUS', active:true, notes:'' },
    { id:'mfr-047', name:'INODA INDUSTRIES SARL', email:'bolelli.b@gmail.com', phone:'', addr:'Route de Japoma (proche de I.P.D.) Ndogsimbi Douala', active:true, notes:'SAP phone: 2.37233E+11' },
    { id:'mfr-048', name:'Jotun Paints (Europe) Ltd.', email:'SDSJotun@jotun.no', phone:'', addr:'Jotun Paints (Europe) Ltd. Stather Road Flixborough, Scunthorpe North Lincolnshire DN15 8RR  England', active:true, notes:'SAP phone: 4.41724E+11' },
    { id:'mfr-049', name:'Krylon Products Group', email:'', phone:'8004243266', addr:'Krylon Products Group 101 Prospect Avenue NW Cleveland, OH 44115', active:true, notes:'' },
    { id:'mfr-050', name:'Carlisle SynTec', email:'', phone:'18004796832', addr:'1285 Ritner Highway  Carlisle, PA 17013 USA', active:true, notes:'' },
    { id:'mfr-051', name:'MINWAX Company', email:'', phone:'8004249300', addr:'MINWAX Company 101 W. Prospect Ave Cleveland, Ohio 44115', active:true, notes:'' },
    { id:'mfr-052', name:'Franklin International', email:'SDS@FranklinInternational.com', phone:'8008774583', addr:'Franklin International 2020 Bruck Street Columbus OH', active:true, notes:'' },
    { id:'mfr-053', name:'MAPEI INC.', email:'RDProductSafety@mapei.com', phone:'14506621212', addr:'MAPEI INC. (Canada) 2900 Francis-Hughes Avenue H7L 3J5 - Laval - QC - CAN', active:true, notes:'' },
    { id:'mfr-054', name:'Weld-On', email:'EHSInfo@ipscorp.com', phone:'13108983300', addr:'Weld-On 17109 S. Main Gardena CA 90248-3127 United States', active:true, notes:'' },
    { id:'mfr-055', name:'WD-40 Company', email:'', phone:'18883247596', addr:'9715 Businesspark Avenue San Diego, California, USA 92131', active:true, notes:'' },
    { id:'mfr-056', name:'Univar Solutions UK Ltd', email:'SDS.EMEA@univarsolutions.com', phone:'', addr:'Univar Solutions UK Ltd Aquarius House 6 Mid Point Business Park Bradford BD3 7AY', active:true, notes:'SAP phone: 4.41274E+11' },
    { id:'mfr-057', name:'Axiall, LLC', email:'SDSinfo@westlake.com', phone:'7139609111', addr:'Axiall, LLC 2801 Post Oak Blvd. Suite 600 Houston, TX 77056', active:true, notes:'' },
    { id:'mfr-058', name:'RX Marine International', email:'123@rxmarine.com', phone:'9122278155', addr:'RX Marine International 105, A Wing, BSEL,  TECK PARK. VASHI NEW BAMBY 400703 INDIA', active:true, notes:'' },
    { id:'mfr-059', name:'REDOX', email:'', phone:'6129333000', addr:'2 Swettenham Road Minto NSW 2566 Australia', active:true, notes:'' },
    { id:'mfr-060', name:'Exxon Mobil', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-061', name:'HD Chemicals LTD', email:'contact@hdchemicals.co.uk', phone:'', addr:'HD Chemicals LTD  UNIT 9 Scott Business Park  PL2 2PB Plymouth UK', active:true, notes:'' },
    { id:'mfr-062', name:'Hach Company', email:'', phone:'13036235716', addr:'Manufacturer Address Hach Company, P.O.Box 389, Loveland, CO 80539, USA, +1(970', active:true, notes:'' },
    { id:'mfr-063', name:'Chemours Netherlands B.V.', email:'sds-support@chemours.com', phone:'', addr:'Chemours Netherlands B.V. Baanhoekweg 22 3313 LA Dordrecht Netherlands', active:true, notes:'SAP phone: 3.10786E+11' },
    { id:'mfr-064', name:'Norweco, Inc', email:'', phone:'8006679326', addr:'220 Republic St. Norwalk, OH USA 44857', active:true, notes:'' },
    { id:'mfr-065', name:'Sunshine Makers Inc.', email:'info@simplegreen.com', phone:'8002280709', addr:'Sunshine Makers, Inc. 15922 Pacific Coast Highway Huntington Beach, CA 92649 USA', active:true, notes:'' },
    { id:'mfr-066', name:'Baker Petrolite LLC', email:'', phone:'8002313606', addr:'Baker Petrolite LLC 12645 W. Airport Blvd. Sugar Land, TX 77478', active:true, notes:'' },
    { id:'mfr-067', name:'3M', email:'', phone:'18883643577', addr:'3M Center, St. Paul, MN 55144-1000, USA', active:true, notes:'' },
    { id:'mfr-068', name:'Fisher Scientific UK', email:'begel.sdsdesk@thermofisher.com', phone:'', addr:'Bishop Meadow Road, Loughborough, Leicestershire LE11 5RG', active:true, notes:'' },
    { id:'mfr-069', name:'U.S. Battery Manufacturing Company', email:'', phone:'8005355053', addr:'1675 Sampson Ave. Corona, CA 92879 1895 Tobacco Rd. Augusta, GA 30906', active:true, notes:'' },
    { id:'mfr-070', name:'Schlumberger', email:'', phone:'', addr:'', active:true, notes:'' },
    { id:'mfr-071', name:'Mississippi Lime Company', email:'', phone:'', addr:'Mississippi Lime Company 16147 US Highway 61, Ste Genevieve, MO 63670', active:true, notes:'' },
    { id:'mfr-072', name:'Sigma-Aldrich Chemie GmbH', email:'technischerservice@merckgroup.com', phone:'', addr:'Sigma-Aldrich Chemie GmbH Eschenstrasse 5 D-82024 TAUFKIRCHEN', active:true, notes:'SAP phone: 4.90897E+12' },
    { id:'mfr-073', name:'Breedon Cement Ireland Ltd.', email:'cement@breedongroup.com', phone:'', addr:'Killaskillen, Kinnegad, Co Westmeath, ROI', active:true, notes:'SAP phone: 3.53449E+11' },
    { id:'mfr-074', name:'CRC Industries, Inc', email:'', phone:'2156744300', addr:'CRC I 885 Louis Dr. Warminster, PA 18974 US', active:true, notes:'' },
    { id:'mfr-075', name:'Five Star Products, Inc.', email:'', phone:'2033367900', addr:'Five Star Products, Inc. 60 Parrott Drive Shelton, CT 06484 USA', active:true, notes:'' },
    { id:'mfr-076', name:'Damar Worldwide 4 LLC', email:'', phone:'8002389080', addr:'805 N Carnation Dr Aurora, MO 65605', active:true, notes:'' },
    { id:'mfr-077', name:'POPS Group', email:'office@poolpro.com.au', phone:'61732097884', addr:'10-12 Cairns Street Loganholme QLD 4129 Australia', active:true, notes:'' },
    { id:'mfr-078', name:'Pirtek UK Ltd', email:'info@pirtek.co.uk', phone:'2087498444', addr:'Pirtek UK Ltd 199 The Vale Acton London W3 7QS', active:true, notes:'' },
    { id:'mfr-079', name:'GENYK Inc.', email:'', phone:'8197290395', addr:'GENYK Inc. 1701, 3rd Avenue, Shawinigan, QC, G9T2W6', active:true, notes:'' },
    { id:'mfr-080', name:'CHRYSO INDIA PRIVATE LTD', email:'', phone:'', addr:'D-30/7, TTC Industrial Area, MIDC, Turbhe.400705.Navi Mumbai,', active:true, notes:'SAP phone: 9.12228E+11' },
    { id:'mfr-081', name:'Akzo Nobel Functional Chemicals AB', email:'RegulatoryAffairs@akzonobel.com', phone:'4630385000', addr:'Akzo Nobel Functional Chemicals AB Ethylene Amines  ANC Stenungsund  Stenunge Allé 3  SE 444 85 Stenungsund  Sweden', active:true, notes:'' },
    { id:'mfr-082', name:'Soilworks®, LLC', email:'info@soilworks.com', phone:'80054552420', addr:'7580 N Dobson Rd, Ste 320   Scottsdale, Arizona 85256 USA', active:true, notes:'' },
    { id:'mfr-083', name:'Fuchs Lubricants (Australasia) Pty Ltd', email:'', phone:'61393006400', addr:'49 McIntyre Road Sunshine VIC 3020', active:true, notes:'' },
    { id:'mfr-084', name:'MATHESON TRI-GAS, INC.', email:'', phone:'18004162505', addr:'MATHESON TRI-GAS, INC. 909 Lake Carolyn Parkway Suite 1300 Irving, TX 7503', active:true, notes:'' },
    { id:'mfr-085', name:'CNPC International (Chad), Ltd, Co', email:'', phone:'', addr:'CNPC International (Chad), Ltd, Co. B.P 1742, Rue 1031,Avenue De Brazza, N’Djamena,Chad', active:true, notes:'' },
    { id:'mfr-086', name:'OPIC Africa Chad Branch', email:'', phone:'23522522563', addr:'OPIC Africa Chad Branch B.P 1155, N’Djamena, Tchad', active:true, notes:'' },
    { id:'mfr-087', name:'PetroChad Limited', email:'', phone:'23595950158', addr:'', active:true, notes:'' },
    { id:'mfr-088', name:'Carl Roth GmbH + Co KG', email:'sicherheit@carlroth.de', phone:'', addr:'Carl Roth GmbH + Co KG Schoemperlenstr. 3-5 D-76185 Karlsruhe German', active:true, notes:'' },
    { id:'mfr-089', name:'Honeywell', email:'SafetyDataSheet@Honeywell.com', phone:'4951379990', addr:'Honeywell Specialty  Chemicals Seelze GmbH Wunstorfer Straße 40 30926 Seelze Germany', active:true, notes:'' },
    { id:'mfr-090', name:'Greenlee Trextron', email:'', phone:'8002553924', addr:'', active:true, notes:'' },
    { id:'mfr-091', name:'Angus Fire Ltd', email:'general.enquiries@angusuk.co.uk', phone:'4401524', addr:'Station Road, Bentham, Lancaster, LA2 7NA, UK', active:true, notes:'' },
    { id:'mfr-092', name:'Tyco Fire Protection Products', email:'psra@tycofp.com', phone:'17157357411', addr:'One Stanton Street Marinette, WI 54143-2542', active:true, notes:'' },
    { id:'mfr-093', name:'AMEREX CORPORATION', email:'info@amerex-fire.com', phone:'2056553271', addr:'7595 Gadsden Highway, P.O. Box 81 Trussville, AL 35173-0081', active:true, notes:'' },
    { id:'mfr-094', name:'Airgas', email:'', phone:'17035273887', addr:'259 North Radnor-Chester Road Suite 100 Radnor, PA 19087-5283 1-610-687-5253', active:true, notes:'' },
    { id:'mfr-095', name:'Swagelok', email:'', phone:'4404495600', addr:'Swagelok 29495 F.A. Lennon Drive Solon, OH 44139 - United States', active:true, notes:'Website: WWW.SWAGELOK.COM' },
    { id:'mfr-096', name:'THE ESAB GROUP INC', email:'Productstewardship@esab.com', phone:'17176378911', addr:'ESAB Welding & Cutting Products 801 Wilson Ave. PA 17331 Hanover USA', active:true, notes:'' },
    { id:'mfr-097', name:'AMERICAN FILLER METALS COMPANY', email:'', phone:'7136498785', addr:'6015 Murphy Street, Houston, TX 77033', active:true, notes:'Website: http://www.amfiller.com' },
    { id:'mfr-098', name:'OXFORD ALLOYS INC', email:'technical@oxfordalloys.com', phone:'2252734800', addr:'2632 Tee Dr.  Baton Rouge, LA 70814', active:true, notes:'' },
    { id:'mfr-099', name:'EUROGRIT', email:'', phone:'3106546770', addr:'PO Box 184 – NL-3350 AD Papendrecht   Noordhoek 7 – NL-3351 LD Papendrecht', active:true, notes:'' },
    { id:'mfr-100', name:'Cargill Bioindustrial', email:'Indiaenvirotemp@cargill.com', phone:'', addr:'Y‐65, Ground Floor, Hauz Khas, New Delhi ‐110016,  India', active:true, notes:'SAP phone: 1.18132E+11' },
    { id:'mfr-101', name:'ABB Installation Products Inc.', email:'', phone:'18888623289', addr:'860 Ridge Lake Blvd. Memphis, TN 38120, US', active:true, notes:'' },
    { id:'mfr-102', name:'ITW Performance Polymers', email:'customerservice.shannon@itwpp.com', phone:'35361771500', addr:'Bay 150 Shannon Industrial Estate Co. Clare Ireland V14 DF8', active:true, notes:'' },
    { id:'mfr-103', name:'Vitol SA', email:'xreach@vitol.com', phone:'31104987200', addr:'Place des Bergues 3  1201 Geneva  Switzerland', active:true, notes:'' },
    { id:'mfr-104', name:'Keson LLC', email:'', phone:'18003453766', addr:'810 Commerce St., Aurora, Il. 60504', active:true, notes:'' },
    { id:'mfr-105', name:'Crown Paint Company', email:'crownpaint@polyglasscoatings.com', phone:'14052328580', addr:'1801 W. Sheridan Oklahoma City, 73106 - United States', active:true, notes:'' },
    { id:'mfr-106', name:'IDEAL INDUSTRIES, INC', email:'IDEAL@IDEALINDUSTRIES.COM', phone:'8158955181', addr:'Becker Place,   Sycamore, IL 60178', active:true, notes:'' },
    { id:'mfr-107', name:'Energizer Brands, LLC', email:'customersupport@energizer.com', phone:'18003837323', addr:'533 Maryville University  Drive St. Louis, MO 63141', active:true, notes:'' },
    { id:'mfr-108', name:'Johns Manville', email:'productsafety@jm.com', phone:'13039782000', addr:'P.O. Box 5108 Denver, CO USA 80127', active:true, notes:'' },
    { id:'mfr-109', name:'ERICO International Corporation', email:'erico.compliance@nvent.com', phone:'4402480100', addr:'ERICO International Corporation 34600 Solon Road Solon, Ohio 44139', active:true, notes:'' },
    { id:'mfr-110', name:'GOJO Industries, Inc.', email:'', phone:'1302256000', addr:'One GOJO Plaza, Suite 500 Akron, Ohio 44311', active:true, notes:'' },
    { id:'mfr-111', name:'DDP SPECIALTY ELECTRONIC MATERIALS US 9,', email:'SDSQuestion-NA@dupont.com', phone:'18004249300', addr:'US 9, LLC 974 Centre Road Wilmington DE 19805 UNITED STATE', active:true, notes:'' },
    { id:'mfr-112', name:'DDP SPECIALTY ELECTRONIC MATERIALS US 9, LLC', email:'SDSQuestion-NA@dupont.com', phone:'18004249300', addr:'US 9, LLC 974 Centre Road Wilmington DE 19805 UNITED STATES', active:true, notes:'' },
    { id:'mfr-113', name:'Rust-Oleum Corporation', email:'', phone:'18473677700', addr:'11 Hawthorn Parkway Vernon Hills, IL 60061 USA', active:true, notes:'' },
    { id:'mfr-114', name:'BURNDY LLC', email:'', phone:'8003233500', addr:'47 East Industrial Park Drive  Manchester, NH 03109USA', active:true, notes:'' },
    { id:'mfr-115', name:'Polyguard Products Inc', email:'', phone:'2415155000', addr:'4101 South Interstate 45 Ennis, TX 75119', active:true, notes:'Website: ww.polyguard.com' },
    { id:'mfr-116', name:'Continental Cement', email:'', phone:'5732211740', addr:'10107 HWY 79 South Hannibal, MO 63401', active:true, notes:'Website: www.continentalcement.com' },
    { id:'mfr-117', name:'ANTI SEIZE TECHNOLOGY', email:'', phone:'8474552300', addr:'2345N. 17th Ave. Franklin Park, IL 60131', active:true, notes:'Website: antiseize.com' },
    { id:'mfr-118', name:'Sika Corporation', email:'ehs@sika-corp.com', phone:'2019338800', addr:'201 Polito Avenue Lyndhurst, NJ 07071 USA', active:true, notes:'' },
    { id:'mfr-119', name:'TEXOL Lubritech FZC', email:'', phone:'9716513000', addr:'P.O. Box 50802 Plot 2B-12 Hamriyah Free Zone, Phase 1,  Sharjah, United Arab Emirates.', active:true, notes:'' },
    { id:'mfr-120', name:'ZRC Worldwide', email:'info@zrcworldwide.com', phone:'7813190400', addr:'145 Enterprise Drive, Marshfield, MA 02050', active:true, notes:'' },
    { id:'mfr-121', name:'Henkel Australia Pty Ltd', email:'', phone:'61397246444', addr:'135-141 Canterbury Road Kilsyth, Victoria, 3137 Australia', active:true, notes:'' },
    { id:'mfr-122', name:'International Farg AB', email:'sdsfellinguk@akzonobel.com', phone:'46031928500', addr:'Holmedalen 3 Aspereds Industriomrade SE-424 22 Angered Sweden', active:true, notes:'' },
    { id:'mfr-123', name:'Specialty Polymer Coatings, Inc', email:'', phone:'1800424900', addr:'48 Bury Court Brantford, ON, N3S 0B1 Canada', active:true, notes:'' },
    { id:'mfr-124', name:'International Paint LLC', email:'', phone:'8005891267', addr:'International Paint 6001 Antoine Drive Houston, Texas 77091', active:true, notes:'' },
    { id:'mfr-125', name:'AMKUS RESCUE SYSTEMS, INC', email:'', phone:'', addr:'4201 Montdale Drive Valparaiso, IN 46383-4098 USA', active:true, notes:'SAP phone: 8.00425E+11' },
    { id:'mfr-126', name:'Kano Laboratories LLC', email:'', phone:'6158334101', addr:'1000 E. Thompson Lane Nashville, TN 37211', active:true, notes:'Website: www.kroil.com' },
    { id:'mfr-127', name:'SUEZ Water Technologies & Solutions Middle East FZE', email:'emea.productregulatory@veolia.com', phone:'97148101700', addr:'P.O. Box 261939 Plot S20143 Jebel Ali Free Zone South Dubai , UAE', active:true, notes:'' },
    { id:'mfr-128', name:'TotalEnergies', email:'ms.ap-sds@totalenergies.com', phone:'6568792200', addr:'182 Cecil Street  #27-01 Frasers Tower  Singapore 069547', active:true, notes:'' },
    { id:'mfr-129', name:'Atlas Copco Romania S.R.L', email:'info.lubricants.cts@atlascopco.com', phone:'', addr:'Sos. Bucuresti - Ploiesti, nr. 135, Bucuresti 013686 Romania', active:true, notes:'SAP phone: 4.00724E+11' },
    { id:'mfr-130', name:'ITW Pro Brands', email:'lpssds@itwprobrands.com', phone:'7702438800', addr:'4647 Hugh Howell Rd. Tucker, GA 30084 United States', active:true, notes:'' },
    { id:'mfr-131', name:'PPG Industries, Inc.', email:'', phone:'1888774', addr:'One PPG Place Pittsburgh, PA 15272', active:true, notes:'' },
    { id:'mfr-132', name:'Avocado Research Chemicals Ltd. (Part of Thermo Fisher Scientific)', email:'begel.sdsdesk@thermofisher.com', phone:'', addr:'Shore Road, Heysham Lancashire, LA3 2XY, Unite', active:true, notes:'SAP phone: 4.40152E+12' },
    { id:'mfr-133', name:'Thermo Fisher Scientific', email:'begel.sdsdesk@thermofisher.com', phone:'', addr:'Janssen Pharmaceuticalaan 3a 2440 Geel,', active:true, notes:'SAP phone: 4.10566E+11' },
    { id:'mfr-134', name:'Alconox Inc.', email:'cleaning@alconox.com', phone:'9149484040', addr:'Alconox Inc.  30 Glenn St., Suite 309  White Plains, NY 10603 USA', active:true, notes:'' },
    { id:'mfr-135', name:'CHEMetrics, Inc', email:'technical@chemetrics.com', phone:'15407889026', addr:'4295 Catlett Road Midland VA 22728 United States', active:true, notes:'' },
    { id:'mfr-136', name:'Cargill Meat Solutions', email:'Techsvs_Requests@cargill.com', phone:'3162912500', addr:'825 E. Douglas  Witchita, KS 67201 US US', active:true, notes:'' },
    { id:'mfr-137', name:'Linde Inc.', email:'', phone:'18006454633', addr:'0 Riverview Drive Danbury, CT 06810-6268, USA', active:true, notes:'Website: www.lindeus.com' },
    { id:'mfr-138', name:'CONOSTAN', email:'', phone:'1800616820', addr:'21 800 Clark-Graham Baie d\'Urfé, (Montréal) Québec, H9X 4B6 Canada', active:true, notes:'Website: www.scpscience.com' },
    { id:'mfr-139', name:'AMETEK Spectro Scientific', email:'service.spectrosci@ametek.com', phone:'19784860123', addr:'1 Executive Dr.  Chelmsford, MA 01824-2563 UNITED STATES OF AMER', active:true, notes:'' },
    { id:'mfr-140', name:'LGC Limited', email:'gb@lgcstandards.com', phone:'', addr:'Queens Road  Teddington  Middlesex TW11 0LY UNITED KINGDOM', active:true, notes:'SAP phone: 4.40209E+12' },
    { id:'mfr-141', name:'Ecolink', email:'info@ecolink.com', phone:'18005355053', addr:'PO Box 9 · Tucker, GA 30085', active:true, notes:'' },
    { id:'mfr-142', name:'Johnson Controls', email:'psra@jci.com', phone:'18888887838', addr:'Canadian Distribution Centre 8480 Hwy 50 Brampton ON L6T 0', active:true, notes:'' },
    { id:'mfr-143', name:'Fisher Scientific Company', email:'', phone:'', addr:'One Reagent Lane Fair Lawn, NJ 074', active:true, notes:'' },
    { id:'mfr-144', name:'Avantor Performance Materials Poland S.A.', email:'SDS@avantorsciences.com', phone:'4832392000', addr:'Street Sowinskiego 11str. Postal code/City 44-101 Gliwice', active:true, notes:'' },
    { id:'mfr-145', name:'Ricca Chemical Company', email:'', phone:'8884674222', addr:'48 West Fork Drive Arlington, TX 76012 USA', active:true, notes:'' },
    { id:'mfr-146', name:'Avocado Research Chemicals L (Part of Thermo Fisher Scientific)', email:'begel.sdsdesk@thermofisher.com', phone:'', addr:'Shore Road, Heysham Lancashire, LA3', active:true, notes:'SAP phone: 4.41522E+13' },
    { id:'mfr-147', name:'Hess Tower', email:'', phone:'7134964000', addr:'1501 McKinney Houston, TX 77010', active:true, notes:'Website: Hess.com' },
    { id:'mfr-148', name:'Aqua Solutions, Inc.', email:'sherman@aquasolutions.org', phone:'8002562586', addr:'6913 Highway 225 DEER PARK, TX 77536 USA', active:true, notes:'' },
    { id:'mfr-149', name:'Nalco Canada ULC', email:'', phone:'9056331000', addr:'1055 Truman Street Burlington, Ontario L7R 3Y9 Canada', active:true, notes:'' },
    { id:'mfr-150', name:'3313045 NOVA SCOTIA COMPANY', email:'SDSQuestion-NA@dupont.com', phone:'18004249300', addr:'6925 Century Avenue, Suite 700 MISSISSAUGA ON L5N 7K2 CANADA', active:true, notes:'' },
    { id:'mfr-151', name:'S.C. Johnson & Son, Inc.', email:'', phone:'18005585252', addr:'1525 Howe Street  Racine WI 53403-2236', active:true, notes:'' },
    { id:'mfr-152', name:'Soilworks®, LLC – Soil Stabilization & Dust Control', email:'', phone:'14805455454', addr:'7580 N Dobson Rd, Ste 320   Scottsdale, Arizona 85256 USA   (800) 545-5420 USA', active:true, notes:'Website: www.soilworks.com' },
    { id:'mfr-153', name:'SPECIALTY POLYMER COATINGS, INC.', email:'', phone:'6139966666', addr:'#101 – 20529 – 62nd Avenue City/Province: Langley, BC', active:true, notes:'' },
    { id:'mfr-154', name:'LE JOINT FRANCAIS', email:'hse.ljf@hutchinson.fr', phone:'', addr:'SEALING SYSTEMS - LJF - 84 rue Salvador ALLENDE. 95870. BEZONS . FRANCE.', active:true, notes:'SAP phone: 3.30134E+11' },
    { id:'mfr-155', name:'HACH LANGE GmbH', email:'SDS@hach-lange.de', phone:'', addr:'Willstätterstr. 11 D-40549 Düsseldor', active:true, notes:'SAP phone: 4.90212E+12' },
    { id:'mfr-156', name:'Henkel Corporation', email:'', phone:'', addr:'1001 Trout Brook Crossing  Rocky Hill, Connecticut 06067', active:true, notes:'' },
    { id:'mfr-157', name:'THE SHERWIN-WILLIAMS COMPANY', email:'', phone:'8002473266', addr:'KRYLON PRODUCTS GROUP Cleveland, OH 44115', active:true, notes:'Website: www.kpg-industrial.com' },
    { id:'mfr-158', name:'AllChem Performance Products, LP', email:'', phone:'3523789696', addr:'6010 NW First Place  Gainesville, FL 32607', active:true, notes:'' },
    { id:'mfr-159', name:'MAP YACHTING.', email:'sales@map-yachting.com', phone:'', addr:'ZI ATHELIA IV – 296 Av de la Tramontane – 13705 LA CIOTAT - France', active:true, notes:'SAP phone: 3.30443E+11' },
    { id:'mfr-160', name:'Idemitsu Lubricants America Corporation', email:'sds@ilacorp.com', phone:'8122858234', addr:'701 Port Rd. Jeffersonville, IN. 47130s', active:true, notes:'' },
    { id:'mfr-161', name:'TURBO-K International Limited', email:'info@turbo-k.biz', phone:'', addr:'13a Brindley Close. Holly Lane Industrial Estate.  Atherstone, Warwickshire CV9 2QZ  United Kingdom', active:true, notes:'SAP phone: 4.40183E+12' },
    { id:'mfr-162', name:'Cortec Corporation', email:'regulatory@cortecvci.com', phone:'6514291100', addr:'4119 White Bear Parkway St. Paul, MN 55110 USA', active:true, notes:'' },
    { id:'mfr-163', name:'Atlas Copco Compressors Australia', email:'info.lubricants.cts@atlascopco.com', phone:'', addr:'3 Bessemer Street, Blacktown NSW 2148 Australia', active:true, notes:'SAP phone: 6.10296E+11' },
    { id:'mfr-164', name:'The Chemours Company FC, LLC', email:'', phone:'13027731000', addr:'1007 Market Street Wilmington, DE 19801 United States of America (USA)', active:true, notes:'' },
    { id:'mfr-165', name:'Jangro Ltd', email:'enquiries@jangrohq.net', phone:'8454585223', addr:'Jangro House Worsley Road Farnworth BL4 9LU', active:true, notes:'' },
    { id:'mfr-166', name:'LS-QHC', email:'prodsafe@merckgroup.com', phone:'1159430840', addr:'Merck Chemicals Ltd * Boulevard Industrial Park * Padge Road *  Beeston * Nottingham * NG9 2JR * Tel. 01159 430840 *', active:true, notes:'' },
    { id:'mfr-167', name:'Diversity Technologies Corp.', email:'', phone:'7804404923', addr:'8750 – 53rd Ave. Edmonton, AB T6E 5G2', active:true, notes:'' },
    { id:'mfr-168', name:'SUNCOR ENERGY INC.', email:'', phone:'19058044752', addr:'P.O. Box 2844, 150 - 6th Avenue South-West Calgary Alberta T2P 3E3 Canad', active:true, notes:'' },
    { id:'mfr-169', name:'Petrochemical Corporation of Singapore (Private) Limited', email:'', phone:'', addr:'100 Ayer Merbau Road, Singapore 628277   : +65 68672102', active:true, notes:'SAP phone: 4.40124E+11' },
    { id:'mfr-170', name:'ITW Perma', email:'mail@permatex.com', phone:'8002553924', addr:'6875 Parkland Blvd. Solon, OH 44139', active:true, notes:'' },
    { id:'mfr-171', name:'Burwell Abrasive Blasting Equipment Pty Ltd', email:'', phone:'297922733', addr:'291 Milperra Road, Revesby, NSW, 2212', active:true, notes:'' },
    { id:'mfr-172', name:'Chemtool Incorporated', email:'', phone:'8159574140', addr:'801 West Rockton Road  Rockton, IL 61072 U.S.A', active:true, notes:'' },
    { id:'mfr-173', name:'Albemarle Corporation', email:'HSE@Albemarle.com', phone:'2253447147', addr:'451 Florida Street Baton Rouge, LA 70801', active:true, notes:'' },
    { id:'mfr-174', name:'Bio-Lab, Inc.', email:'', phone:'8008597946', addr:'BioGuard  P.O. Box 300002    Lawrenceville, GA    30049-1002', active:true, notes:'' },
    { id:'mfr-175', name:'Monument Chemical', email:'sds@monumentchemical.com', phone:'2704226860', addr:'2450 Olin Road Brandenburg, KY 40108 - USA', active:true, notes:'' },
    { id:'mfr-176', name:'Imperial Oil Downstream', email:'', phone:'18862329563', addr:'P.O. Box 2480, Station M  Calgary, ALBERTA T2P 3M9 Canada', active:true, notes:'' },
    { id:'mfr-177', name:'Ted Pella, Inc.', email:'', phone:'17037415970', addr:'P.O. Box 492477, Redding, CA 96049-2477', active:true, notes:'' },
    { id:'mfr-178', name:'Sunshine Makers, Inc', email:'info@simplegreen.com', phone:'8002280709', addr:'15922 Pacific Coast Highway Huntington Beach, CA 92649 USA', active:true, notes:'' },
    { id:'mfr-179', name:'Shell Oil Products US', email:'', phone:'18772767285', addr:'PO Box 4427 Houston TX 77210-4427 USA', active:true, notes:'' },
    { id:'mfr-180', name:'Gardner Denver Limited', email:'', phone:'', addr:'Claybrook Drive B98 0DS UK', active:true, notes:'SAP phone: 4.40334E+12' },
    { id:'mfr-181', name:'HPC Compressed Air Systems', email:'msds@hpcplc.co.uk', phone:'441444', addr:'Victoria Gardens Burgess Hill West Sussex RH15 9RQ', active:true, notes:'' },
    { id:'mfr-182', name:'Howden Roots LLC', email:'', phone:'7658279332', addr:'900 West Mount Street Connersville, Indiana 47331', active:true, notes:'' },
    { id:'mfr-183', name:'TLSP', email:'contact@tlsp-trucks.com', phone:'', addr:'6 avenue Henri Germain 69800 Saint Pries', active:true, notes:'SAP phone: 3.30438E+11' },
    { id:'mfr-184', name:'Cyndan Chemicals', email:'', phone:'180081209', addr:'Unit 1, 1 Prosperity Parade Warriewood  NSW 2102  Australia', active:true, notes:'' },
    { id:'mfr-185', name:'Calumet Branded Products, LLC', email:'', phone:'17035273887', addr:'2780 Waterfront Pkwy E. Drive Suite 200 Indianapolis, IN 46214  USA', active:true, notes:'' },
    { id:'mfr-186', name:'Thomas & Betts Corporation', email:'', phone:'', addr:'8155 T & B Boulevard Memphis, TN 38125 USA', active:true, notes:'' },
    { id:'mfr-187', name:'Jet-Lube, Inc.', email:'', phone:'7136705700', addr:'4849 Homestead Rd.  Suite 232', active:true, notes:'' },
    { id:'mfr-188', name:'Jet-Lube, Inc', email:'', phone:'7136705700', addr:'4849 Homestead Rd.  Suite 232', active:true, notes:'' },
    { id:'mfr-189', name:'Cross Oil Refining & Marketing, Inc.', email:'', phone:'800424900', addr:'484 E. 6th Street Smackover, AR, US, 71762', active:true, notes:'' },
    { id:'mfr-190', name:'THE DOW CHEMICAL COMPANY', email:'SDSQuestion@dow.com', phone:'8002582436', addr:'2030 WILLARD H DOW CENTER MIDLAND MI 48674-0000 UNITED STATE', active:true, notes:'' },
    { id:'mfr-191', name:'Bernadini Pty Ltd', email:'perth@lsaoils.com.au', phone:'61862547777', addr:'Trading as LUBRICANT SPECIALISTS AUSTRALIA (LSA)Unit 2, 1110 Abernethy Road High Wycombe WA 6057', active:true, notes:'' },
    { id:'mfr-192', name:'Chevron Products Company', email:'lubemsds@chevron.com', phone:'8002310623', addr:'a division of Chevron U.S.A. Inc. 6001 Bollinger Canyon Rd. San Ramon, CA 94583 United States of America', active:true, notes:'' },
    { id:'mfr-193', name:'Fuchs Lubricants Co', email:'sds@fuchsus.com', phone:'7083338900', addr:'17050 Lathrop Avenue Harvey, Illinois 60426', active:true, notes:'' },
    { id:'mfr-194', name:'Deep South Chemical, Inc.', email:'', phone:'7038379931', addr:'229 Millstone Road Broussad, LA 70518', active:true, notes:'' },
    { id:'mfr-195', name:'William H. Harvey Company', email:'info@oatey.com', phone:'4023311175', addr:'4334 South 67th Street Omaha, NE 68117', active:true, notes:'' },
    { id:'mfr-196', name:'Columbus Chemical Industries, Inc', email:'', phone:'8004243900', addr:'N4335 Temkin Rd.  Columbus, WI. 53925', active:true, notes:'Website: www.columbuschemical.com' },
    { id:'mfr-197', name:'4TRADE', email:'', phone:'', addr:'Lodge Way House Lodge Way Harlestone Road Northampton NN5 7UG', active:true, notes:'Website: www.4tradeproducts.co.uk' },
    { id:'mfr-198', name:'Aervoe Industries Incorporated', email:'mailbox@aervoe.com', phone:'18002270193', addr:'1100 Mark Circle Gardnerville, Nevada 89410', active:true, notes:'' },
    { id:'mfr-199', name:'Badger Fire Protection', email:'', phone:'70352273887', addr:'8767 Seminole Trail, Suite 202 Ruckersville, VA 22968', active:true, notes:'' },
    { id:'mfr-200', name:'Hoehn Plastics Inc', email:'', phone:'18004243900', addr:'11481 West, County Road 925 South, Poseyville, IN 47633 (812) 874‐2612', active:true, notes:'' },
    { id:'mfr-201', name:'Paint Master', email:'Sales@paintmaster.co.uk', phone:'', addr:'Units 12-17 Bingswood Industrial Estate, Whaley  Bridge, High Peak, Derbyshire, SK237LY', active:true, notes:'SAP phone: 4.41664E+11' },
    { id:'mfr-202', name:'TAIWAN YUASA BATTERY CO.,LTD', email:'', phone:'', addr:'No.11, Ln. 227, Fuying Rd., Xinzhuang District, New Taipei City, Taiwan', active:true, notes:'SAP phone: 8.86229E+11' },
    { id:'mfr-203', name:'Phillips', email:'', phone:'', addr:'66 Lubricants P.O. Box 4428 Houston, TX 77210', active:true, notes:'' },
    { id:'mfr-204', name:'Nu-Calgon', email:'', phone:'1800429300', addr:'2611 Schuetz Road St. Louis, MO 63043', active:true, notes:'' },
    { id:'mfr-205', name:'Kidde-Fenwal, Inc.', email:'', phone:'', addr:'400 Main Street Ashland, MA 01721 USA', active:true, notes:'' },
    { id:'mfr-206', name:'AquaPhoenix Scientific', email:'', phone:'', addr:'09 Barnhart Drive, Hanover, PA 17331', active:true, notes:'' },
    { id:'mfr-207', name:'HSI Fire and Safety Group, LLC', email:'tbarakat@hsifriesafety.com', phone:'18474278340', addr:'107 Garlisch Drive Elk Grove Village, IL - U.S.A', active:true, notes:'' },
    { id:'mfr-208', name:'Cheminova A/S', email:'', phone:'', addr:'PO Box 9 DK-7620 Lemvig, Denmark', active:true, notes:'' },
    { id:'mfr-209', name:'FMC Corporation', email:'msdsinfo@fmc.com', phone:'', addr:'2929 Walnut Street Philadelphia, PA 19104', active:true, notes:'' },
    { id:'mfr-210', name:'RS COMPONENTS', email:'RCustomerServicesUK@rs-components.com', phone:'', addr:'BIRCHINGTON ROAD CORBY NORTHANTS NN17 9RS UK', active:true, notes:'SAP phone: 4.40153E+13' },
    { id:'mfr-211', name:'Turbotect Limited', email:'turbotect@turbotect.com', phone:'', addr:'CH-5401 Baden Switzerland', active:true, notes:'' },
    { id:'mfr-212', name:'SIP (Industrial Products) Ltd', email:'technical@sip-group.com', phone:'', addr:'Gelders Hall Road  Shepshed  Leicestershire  LE12 9NH  United Kingdom', active:true, notes:'SAP phone: 4.40151E+12' },
    { id:'mfr-213', name:'SKF MAINTENANCE PRODUCTS', email:'sebastien.david@skf.com', phone:'31306307200', addr:'P.O. Box 2350 3430 DT Nieuwegein NETHERLANDS', active:true, notes:'' },
    { id:'mfr-214', name:'Jet-Lube, LLC', email:'', phone:'9727711000', addr:'930 Whitmore Dr. Rockwall, Texas 75087', active:true, notes:'' },
    { id:'mfr-215', name:'MOONEY CHEMICALS, INC.', email:'', phone:'2167818383', addr:'2301 STRANTON ROAD, CLEVELAND, OH 44113', active:true, notes:'' },
    { id:'mfr-216', name:'Bluestar Siliconi Italia S.P.A.', email:'fds.sil@bluestarsilicones.com', phone:'3902964141', addr:'via Archimede, 602  I-21042 Caronno Pertusella', active:true, notes:'' },
    { id:'mfr-217', name:'Huntsman Advanced Materials (Europe)BVBA', email:'Global_Product_EHS_AdMat@huntsman.com', phone:'41612992041', addr:'Everslaan 45 3078 Everberg / Belgium', active:true, notes:'' },
    { id:'mfr-218', name:'Nanoshel LLC', email:'', phone:'15322539878', addr:'3422 Old Capitol Suit 1305   Willmington DE – 19808   United States', active:true, notes:'' },
    { id:'mfr-219', name:'RESIPLAST NV', email:'info@resiplast.be', phone:'33200211', addr:'Gulkenrodestraat 3 B2160 Womm', active:true, notes:'' },
    { id:'mfr-220', name:'Barrettine', email:'sales@barrettine.co.uk', phone:'1179600600', addr:'Barrettine Works St Ivel Way Warmley Bristol BS30 8TY', active:true, notes:'' },
    { id:'mfr-221', name:'Summit Industrial Products', email:'', phone:'9035348021', addr:'9010 County Road 2120 Tyler, Texas 75707', active:true, notes:'' },
    { id:'mfr-222', name:'Central Drug House (P) Ltd', email:'care@cdhfinechemical.com', phone:'', addr:'7/28 Vardaan House New Delhi-10002 INDIA', active:true, notes:'SAP phone: 9.11149E+11' },
    { id:'mfr-223', name:'ORAPI', email:'fds@orapi.com', phone:'', addr:'PARC INDUSTRIEL DE LA PLAINE DE L\'AIN - 225 ALLEE DES CEDRES.01150.SAINT-VULBAS.FRANCE.', active:true, notes:'SAP phone: 3.30474E+11' },
    { id:'mfr-224', name:'Morris Lubricants', email:'sds@morris-lubricants.co.uk', phone:'', addr:'Castle Foregate Shrewsbury Shropshire sy1 2EL', active:true, notes:'SAP phone: 4.40174E+12' }
  ];

  /* ====== REQUESTS STORE ====== */
  const SAFETY_STAGES = ['Safety Review', 'EMP Review', 'IH Review'];
  let REQUESTS = {};
  let _reqCounter = 157; // starts above highest MOCK_REQUESTS key (CHM-156)

  function _persistRequests() {
    try {
      localStorage.setItem('tpc_requests',    JSON.stringify(REQUESTS));
      localStorage.setItem('tpc_req_counter', String(_reqCounter));
    } catch (e) { /* storage full or unavailable — session-only mode */ }
  }

  function _loadRequests() {
    try {
      const raw = localStorage.getItem('tpc_requests');
      if (raw) Object.assign(REQUESTS, JSON.parse(raw));
      const cnt = localStorage.getItem('tpc_req_counter');
      if (cnt) { const n = parseInt(cnt, 10); if (n > _reqCounter) _reqCounter = n; }
    } catch (e) { /* corrupt storage — start fresh */ }
  }

  function _pad(n) { return String(n).padStart(3, '0'); }

  function buildChemicalPayload() {
    const get = id => { const el = document.getElementById(id); return el ? el.value : ''; };
    const mfrEl = document.getElementById('mfr-select');
    const mfrId = mfrEl ? mfrEl.value : '';
    const mfr   = (MANUFACTURERS || []).find(m => m.id === mfrId) || {};
    const aouEl = document.getElementById('aou-select');
    const hazards = Array.from(document.querySelectorAll('.hazard-opt.selected')).map(el => el.getAttribute('data-haz'));
    const ppe     = Array.from(document.querySelectorAll('#ppe-strip .ppe-chip')).map(el => el.textContent.trim());
    const esdsEl  = document.getElementById('esds-drop');
    return {
      chemicalName:     get('chem-name'),
      intendedUse:      get('chem-use'),
      handlingMethod:   get('handling-method'),
      whereUsed:        '',
      expectedQty:      '',
      storageKey:       get('aou-select'),
      storageLabel:     aouEl ? (aouEl.selectedOptions[0] ? aouEl.selectedOptions[0].text : '') : '',
      storageLoc:       get('storage-select'),
      esdsDate:         get('esds-date'),
      esdsFileName:     esdsEl && esdsEl._esdsFile ? esdsEl._esdsFile.name : '',
      manufacturerId:   mfrId,
      manufacturerName: mfr.name || (mfrEl ? (mfrEl.selectedOptions[0] ? mfrEl.selectedOptions[0].text : '') : ''),
      mfrEmail:         get('mfr-email'),
      mfrPhone:         get('mfr-phone'),
      mfrAddr:          get('mfr-addr'),
      hazards,
      hazardClass:      '',
      ppe
    };
  }

  function addRequest(payload) {
    const padded = _pad(_reqCounter++);
    const key    = 'CHM-' + padded;
    const now    = new Date();
    const r      = roleConfig[state.role] || { name: 'Unknown' };
    const timeLabel = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const dateLabel = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    REQUESTS[key] = {
      platformId:    'TPC-' + now.getFullYear() + '-' + padded,
      id:            '#' + key,
      moduleKey:     'safety',
      type:          payload.type || 'new-chemical',
      title:         payload.chemicalName || 'Untitled',
      submittedBy:   r.name,
      submitterRole: state.role,
      site:          payload.storageLabel || payload.storageKey || '',
      date:          dateLabel,
      manufacturer:  payload.manufacturerName || '',
      use:           payload.intendedUse || '',
      hazards:       payload.hazards || [],
      hazardClass:   payload.hazardClass || '',
      ppe:           payload.ppe || [],
      currentStage:  SAFETY_STAGES[0],
      submittedAt:   now.toISOString(),
      updatedAt:     now.toISOString(),
      status:        'submitted',
      slaStatus:     'ok',
      timeline: [
        { status: 'done', stage: 'Submission', by: r.name, date: timeLabel,
          note: payload.esdsFileName ? 'eSDS attached: ' + payload.esdsFileName : '' }
      ],
      payload
    };
    delete renderedPages['requests'];
    delete renderedPages['approvals'];
    delete renderedPages['dashboard'];
    syncNavBadges();
    _persistRequests();
    return key;
  }

  function syncNavBadges() {
    const all       = Object.values(REQUESTS);
    const myName    = (roleConfig[state.role] || {}).name || '';
    const myPending = all.filter(r => r.submittedBy === myName && (r.status === 'submitted' || r.status === 'under_review' || r.status === 'revision_requested')).length;
    const forReview = all.filter(r => r.status === 'submitted' || r.status === 'under_review').length;
    const reqBadge  = document.querySelector('#nav-requests .nav-badge');
    const appBadge  = document.querySelector('#nav-approvals .nav-badge');
    if (reqBadge)  { reqBadge.textContent = myPending; reqBadge.style.display = myPending ? '' : 'none'; }
    if (appBadge)  { appBadge.textContent = forReview;  appBadge.style.display = forReview ? '' : 'none'; }
  }

  let state = {
    page: 'dashboard',
    role: 'ga',
    lang: 'en',
    theme: 'light',
    density: 'comfortable',
    accent: 'red',
    nav: 'expanded',
    tweaksOpen: false
  };

  // Lazy-render registry: modules register a renderer keyed by page id.
  // The renderer runs the first time goPage(id) is called.
  const lazyRenderers = {};
  const renderedPages = {};
  function registerLazy(pageId, fn) {
    lazyRenderers[pageId] = fn;
  }
  function triggerLazy(pageId) {
    if (renderedPages[pageId]) return;
    const fn = lazyRenderers[pageId];
    if (fn) {
      renderedPages[pageId] = true;
      try { fn(); } catch (e) { console.warn('lazy render failed for', pageId, e); }
    }
  }
  function resetLazy(pageId) { delete renderedPages[pageId]; }

  /* ====== NAV GROUPS (collapsible) ====== */
  const navGroupMap = {
    'navg-safety': ['master-sheet', 'manufacturers', 'storage', 'add-to-site', 'ppe']
  };

  function bindNavGroups() {
    document.querySelectorAll('.nav-group-parent').forEach(parent => {
      parent.addEventListener('click', () => {
        const groupId = parent.getAttribute('data-group');
        const group = document.getElementById(groupId);
        if (group) group.classList.toggle('expanded');
      });
    });
  }

  function expandGroupForPage(page) {
    Object.entries(navGroupMap).forEach(([groupId, children]) => {
      if (children.includes(page)) {
        const group = document.getElementById(groupId);
        if (group) group.classList.add('expanded');
      }
    });
  }

  /* ====== INIT ====== */
  function init() {
    _loadRequests();
    TPCIconHydrate(document);
    bindNav();
    bindNavGroups();
    bindTopbar();
    bindRoleSwitch();
    bindFormHelpers();
    bindTweaks();
    // P2-C: start collapsed on tablet so sidebar begins off-screen
    if (window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches) {
      state.nav = 'collapsed';
    }
    applyState();
    applyLang();
  }

  /* ====== PAGE NAV ====== */
  function bindNav() {
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', e => {
        const page = el.getAttribute('data-page');
        goPage(page);
      });
    });
  }

  function goPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pg = document.getElementById('page-' + page);
    if (pg) pg.classList.add('active');
    state.page = page;
    document.querySelectorAll('.nav-item[data-page]').forEach(n => {
      n.classList.toggle('active', n.getAttribute('data-page') === page);
    });
    updateBreadcrumb(page);
    expandGroupForPage(page);
    // Lazy: render the module the first time we visit its page
    triggerLazy(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function updateBreadcrumb(id) {
    const bc = document.getElementById('breadcrumb');
    if (!bc) return;
    const trail = {
      dashboard:      [['nav.dashboard', null]],
      'safety-home':  [['nav.dashboard','dashboard'], ['nav.chemical', null]],
      chemical:       [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['Safety Dashboard', null]],
      'new-chemical': [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['page.newchem.title', null]],
      'master-sheet': [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['Master Sheet', null]],
      manufacturers:  [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['Manufacturers', null]],
      storage:        [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['Storage', null]],
      'add-to-site':  [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['Add to my site', null]],
      ppe:            [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['PPE', null]],
      'user-guide':   [['nav.dashboard','dashboard'], ['nav.chemical','safety-home'], ['User Guide', null]],
      cash:        [['nav.dashboard','dashboard'], ['nav.cash', null]],
      'new-cash':  [['nav.dashboard','dashboard'], ['nav.cash','cash'], ['New advance', null]],
      'my-advances': [['nav.dashboard','dashboard'], ['nav.cash','cash'], ['My advances', null]],
      reconciliation: [['nav.dashboard','dashboard'], ['nav.cash','cash'], ['Reconciliation', null]],
      expense:     [['nav.dashboard','dashboard'], ['nav.expense', null]],
      'new-expense': [['nav.dashboard','dashboard'], ['nav.expense','expense'], ['New expense', null]],
      escort:      [['nav.dashboard','dashboard'], ['nav.security', null]],
      'new-escort': [['nav.dashboard','dashboard'], ['nav.security','escort'], ['Request escort', null]],
      requests:    [['nav.dashboard','dashboard'], ['nav.requests', null]],
      'safety-admin': [['nav.dashboard','dashboard'], ['Safety Data Admin', null]],
      users:       [['nav.dashboard','dashboard'], ['nav.users', null]],
      approvals:   [['nav.dashboard','dashboard'], ['nav.approvals', null]],
      settings:    [['nav.dashboard','dashboard'], ['nav.settings', null]]
    }[id] || [['nav.dashboard', null]];

    bc.innerHTML = trail.map((node, i) => {
      const [key, target] = node;
      const text = t(key);
      const sep = i < trail.length - 1 ? '<span class="sep" data-icon="chevron-right"></span>' : '';
      if (target) return `<span class="crumb" data-page="${target}">${text}</span>${sep}`;
      return `<span class="current">${text}</span>${sep}`;
    }).join('');

    TPCIconHydrate(bc);
    bc.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', () => goPage(el.getAttribute('data-page')));
    });
  }

  /* ====== TOPBAR ====== */
  function bindTopbar() {
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) navToggle.addEventListener('click', () => {
      state.nav = state.nav === 'expanded' ? 'collapsed' : 'expanded';
      document.querySelector('.app').setAttribute('data-nav', state.nav);
    });
    // P2-C: tap outside sidebar closes the overlay on tablet
    const appEl = document.querySelector('.app');
    if (appEl) {
      appEl.addEventListener('click', e => {
        if (state.nav === 'expanded'
            && window.innerWidth >= 768
            && window.innerWidth <= 1024
            && !e.target.closest('.sidebar')) {
          state.nav = 'collapsed';
          appEl.setAttribute('data-nav', 'collapsed');
        }
      });
    }
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.addEventListener('click', () => {
      state.lang = state.lang === 'en' ? 'fr' : 'en';
      applyLang();
    });
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      applyState();
    });
    const tweaksBtn = document.getElementById('tweaks-btn');
    if (tweaksBtn) tweaksBtn.addEventListener('click', () => {
      state.tweaksOpen = !state.tweaksOpen;
      document.getElementById('tweaks-panel').classList.toggle('open', state.tweaksOpen);
    });

    // Search button → open command palette
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.addEventListener('click', () => {
      const cmdk = document.getElementById('cmdk-backdrop');
      const input = document.getElementById('cmdk-input');
      if (cmdk) { cmdk.classList.add('open'); if (input) input.focus(); }
    });

    // User profile dropdown
    const userChipBtn = document.getElementById('user-chip-btn');
    const userDropdown = document.getElementById('user-dropdown');
    if (userChipBtn && userDropdown) {
      userChipBtn.addEventListener('click', e => {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
        if (window.TPCIconHydrate) window.TPCIconHydrate(userDropdown);
      });
      document.addEventListener('click', () => userDropdown.classList.remove('open'));
    }
  }

  /* ====== ROLE ====== */
  function bindRoleSwitch() {
    const sel = document.getElementById('role-select');
    if (sel) sel.addEventListener('change', () => switchRole(sel.value));
  }

  function switchRole(rid) {
    state.role = rid;
    const r = roleConfig[rid];
    document.getElementById('user-avatar').textContent = r.av;
    document.getElementById('user-name').textContent = r.name;
    document.getElementById('user-role').textContent = state.lang === 'fr' ? r.badgeFr : r.badge;
    ['nav-users', 'nav-approvals', 'nav-settings', 'nav-quick-review', 'nav-manufacturers'].forEach(nid => {
      const el = document.getElementById(nid);
      if (el) el.style.display = r.hidden.includes(nid) ? 'none' : 'flex';
    });
    const banner = document.getElementById('access-banner');
    if (banner) banner.style.display = r.denied ? 'flex' : 'none';
    toast(`${state.lang === 'fr' ? 'Rôle' : 'Role'} → ${state.lang === 'fr' ? r.badgeFr : r.badge}`);
  }

  /* ====== FORM HELPERS ====== */
  function bindFormHelpers() {
    const mfr = document.getElementById('mfr-select');
    if (mfr) {
      // Populate dropdown from MANUFACTURERS repository
      const active = MANUFACTURERS.filter(m => m.active !== false)
        .sort((a, b) => a.name.localeCompare(b.name));
      const placeholder = mfr.querySelector('option[value=""]');
      const addNew = mfr.querySelector('option[value="__new"]');
      mfr.innerHTML = '';
      if (placeholder) mfr.appendChild(placeholder);
      active.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.name;
        mfr.appendChild(opt);
      });
      if (addNew) mfr.appendChild(addNew);

      mfr.addEventListener('change', () => {
        if (mfr.value === '__new') { goPage('manufacturers'); return; }
        const m = MANUFACTURERS.find(e => e.id === mfr.value) || { email: '', phone: '', addr: '' };
        const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
        set('mfr-email', m.email);
        set('mfr-phone', m.phone);
        set('mfr-addr', m.addr);
        updateSummary();
      });
    }
    // Storage location sub-dropdown is wired by tpc-v5.js (populateLocDropdown),
    // which correctly assigns l.id as option value. No second listener needed here.
    document.querySelectorAll('[data-summary]').forEach(el => {
      el.addEventListener('input', updateSummary);
      el.addEventListener('change', updateSummary);
    });
    let esdsFile = null;
    const esdsDrop = document.getElementById('esds-drop');
    if (esdsDrop) {
      const showFile = file => {
        esdsFile = file;
        esdsDrop._esdsFile = file;
        esdsDrop.querySelector('.file-drop-title').textContent = file.name;
        esdsDrop.querySelector('.file-drop-hint').textContent = (file.size / 1024).toFixed(0) + ' KB';
        esdsDrop.classList.add('has-file');
      };
      esdsDrop.addEventListener('dragover', e => { e.preventDefault(); esdsDrop.classList.add('drag-over'); });
      esdsDrop.addEventListener('dragleave', () => esdsDrop.classList.remove('drag-over'));
      esdsDrop.addEventListener('drop', e => {
        e.preventDefault();
        esdsDrop.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) showFile(file);
      });
      esdsDrop.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = '.pdf,.doc,.docx';
        input.onchange = () => { if (input.files[0]) showFile(input.files[0]); };
        input.click();
      });
    }

    const submit = document.getElementById('form-submit');
    if (submit) submit.addEventListener('click', e => {
      e.preventDefault();
      const _fieldError = el => {
        el.style.borderColor = 'var(--error, #F04438)';
        el.style.boxShadow   = '0 0 0 3px rgba(240,68,56,0.12)';
        el.focus();
        el.addEventListener('input',  () => { el.style.borderColor = ''; el.style.boxShadow = ''; }, { once: true });
        el.addEventListener('change', () => { el.style.borderColor = ''; el.style.boxShadow = ''; }, { once: true });
      };
      const nameEl = document.getElementById('chem-name');
      if (!nameEl || !nameEl.value.trim() || nameEl.value.trim().length < 3) {
        if (nameEl) _fieldError(nameEl);
        return;
      }
      const useEl = document.getElementById('chem-use');
      if (!useEl || !useEl.value) {
        if (useEl) _fieldError(useEl);
        return;
      }
      const hmEl = document.getElementById('handling-method');
      if (!hmEl || !hmEl.value) {
        if (hmEl) _fieldError(hmEl);
        return;
      }
      const mfrSelEl = document.getElementById('mfr-select');
      if (!mfrSelEl || !mfrSelEl.value || mfrSelEl.value === '__new') {
        if (mfrSelEl && mfrSelEl.value !== '__new') _fieldError(mfrSelEl);
        if (mfrSelEl && mfrSelEl.value === '__new') {
          toast(state.lang === 'fr' ? 'Veuillez sélectionner un fabricant valide' : 'Please select a valid manufacturer');
        }
        return;
      }
      const payload = buildChemicalPayload();
      addRequest(payload);
      toast(state.lang === 'fr' ? '✓ Demande soumise — Routage vers réviseur HSE' : '✓ Request submitted — Routing to HSE reviewer');
      setTimeout(() => goPage('safety-home'), 1200);
    });
    const saveDraft = document.getElementById('form-draft');
    if (saveDraft) saveDraft.addEventListener('click', e => {
      e.preventDefault();
      toast(state.lang === 'fr' ? '✓ Brouillon enregistré' : '✓ Draft saved');
    });
  }

  function updateSummary() {
    const get = id => (document.getElementById(id) || {}).value || '';
    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (v) { el.textContent = v; el.classList.remove('empty'); }
      else { el.textContent = state.lang === 'fr' ? 'Non renseigné' : 'Not set'; el.classList.add('empty'); }
    };
    setVal('sum-name', get('chem-name'));
    setVal('sum-use',  document.getElementById('chem-use')?.selectedOptions[0]?.text);
    setVal('sum-mfr',  document.getElementById('mfr-select')?.selectedOptions[0]?.text);
    setVal('sum-site', document.getElementById('aou-select')?.selectedOptions[0]?.text);
  }

  /* ====== TWEAKS ====== */
  function bindTweaks() {
    document.querySelectorAll('[data-tweak]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-tweak');
        const val = btn.getAttribute('data-val');
        state[key] = val;
        applyState();
        // update group active
        btn.parentElement.querySelectorAll('[data-tweak]').forEach(s => s.classList.toggle('active', s === btn));
      });
    });
  }

  function applyState() {
    const html = document.documentElement;
    html.setAttribute('data-theme', state.theme);
    html.setAttribute('data-density', state.density);
    html.setAttribute('data-accent', state.accent);
    const app = document.querySelector('.app');
    if (app) app.setAttribute('data-nav', state.nav);
    // theme icon
    const tBtn = document.getElementById('theme-btn');
    if (tBtn) {
      tBtn.innerHTML = '';
      tBtn.setAttribute('data-icon', state.theme === 'light' ? 'moon' : 'sun');
      delete tBtn.dataset.iconRendered;
      TPCIconHydrate(tBtn);
    }
  }

  /* ====== I18N ====== */
  function t(key) {
    return (i18n[state.lang] && i18n[state.lang][key]) || (i18n.en[key]) || key;
  }

  function applyLang() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-t]').forEach(el => {
      el.textContent = t(el.getAttribute('data-t'));
    });
    document.querySelectorAll('[data-tph]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-tph'));
    });
    document.getElementById('lang-btn').textContent = state.lang.toUpperCase();
    switchRole(state.role); // refresh role label
    updateBreadcrumb(state.page);
  }

  /* ====== TOAST ====== */
  let toastTimer;
  function toast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.querySelector('.toast-msg').textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ====== APPROVAL ACTIONS ====== */
  let _modalAction = null;
  let _modalId     = null;

  function _afterApprovalAction() {
    syncNavBadges();
    resetLazy('requests');
    resetLazy('approvals');
    triggerLazy('approvals');
  }

  function bindApprovalRows() {
    document.querySelectorAll('[data-approve]').forEach(b => b.addEventListener('click', () => {
      const id    = b.getAttribute('data-approve');
      const actor = currentUser().name;
      updateRequestStatus(id, 'approved', actor, '');
      toast(`✓ ${state.lang === 'fr' ? 'Approuvé' : 'Approved'} — ${id}`);
      const row = b.closest('tr');
      if (row) {
        row.style.transition = 'opacity 0.3s';
        row.style.opacity = '0';
        setTimeout(() => { row.remove(); _afterApprovalAction(); }, 300);
      } else {
        _afterApprovalAction();
      }
    }));
    document.querySelectorAll('[data-reject]').forEach(b => b.addEventListener('click', () => {
      openReasonModal('reject', b.getAttribute('data-reject'));
    }));
    document.querySelectorAll('[data-return]').forEach(b => b.addEventListener('click', () => {
      openReasonModal('revision', b.getAttribute('data-return'));
    }));
  }

  function openReasonModal(action, requestId) {
    _modalAction = action;
    _modalId     = requestId;
    const isReject = action === 'reject';
    const fr       = state.lang === 'fr';
    document.getElementById('reason-modal-title').textContent =
      isReject ? (fr ? 'Rejeter la demande'      : 'Reject request')
               : (fr ? 'Retourner pour révision' : 'Return for revision');
    document.getElementById('reason-modal-label').innerHTML =
      (fr ? 'Motif' : 'Reason') + ' <span style="color:var(--danger)">*</span>';
    const confirmBtn = document.getElementById('reason-modal-confirm');
    confirmBtn.className = isReject ? 'btn btn-danger' : 'btn btn-warning';
    confirmBtn.innerHTML = isReject
      ? '<span data-icon="x"></span>'           + (fr ? 'Confirmer le rejet'   : 'Confirm reject')
      : '<span data-icon="refresh-cw"></span>'  + (fr ? 'Confirmer le retour'  : 'Confirm return');
    confirmBtn.disabled = true;
    document.getElementById('reason-modal-text').value = '';
    document.getElementById('reason-backdrop').classList.add('open');
    document.getElementById('reason-modal').classList.add('open');
    if (window.TPCIconHydrate) window.TPCIconHydrate(document.getElementById('reason-modal'));
    setTimeout(() => document.getElementById('reason-modal-text').focus(), 50);
  }

  function closeReasonModal() {
    document.getElementById('reason-backdrop').classList.remove('open');
    document.getElementById('reason-modal').classList.remove('open');
    document.getElementById('reason-modal-text').value = '';
    _modalAction = null;
    _modalId     = null;
  }

  function bindReasonModal() {
    const backdrop   = document.getElementById('reason-backdrop');
    const textarea   = document.getElementById('reason-modal-text');
    const confirmBtn = document.getElementById('reason-modal-confirm');
    if (!backdrop || !textarea || !confirmBtn) return;
    textarea.addEventListener('input', () => {
      confirmBtn.disabled = textarea.value.trim().length < 3;
    });
    confirmBtn.addEventListener('click', () => {
      if (!_modalId) return;
      const note      = textarea.value.trim();
      const actor     = currentUser().name;
      const newStatus = _modalAction === 'reject' ? 'rejected' : 'revision_requested';
      updateRequestStatus(_modalId, newStatus, actor, note);
      const fr    = state.lang === 'fr';
      const label = _modalAction === 'reject'
        ? (fr ? 'Rejeté'                  : 'Rejected')
        : (fr ? 'Retourné pour révision'  : 'Returned for revision');
      toast(`${label} — ${_modalId}`);
      closeReasonModal();
      _afterApprovalAction();
    });
    document.getElementById('reason-modal-cancel').addEventListener('click', closeReasonModal);
    document.getElementById('reason-modal-close').addEventListener('click',  closeReasonModal);
    backdrop.addEventListener('click', closeReasonModal);
  }

  /* ====== STATUS TRANSITIONS ====== */
  function updateRequestStatus(requestId, newStatus, actor, note) {
    const key = requestId.replace('#', '');
    const req = REQUESTS[key];
    if (!req) return;
    if (req.status === 'review_complete' || req.status === 'approved' || req.status === 'rejected' || req.status === 'archived') return;

    const now   = new Date();
    const stamp = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                + ', '
                + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    let tlStatus   = 'done';
    let stageLabel = req.currentStage;

    if (newStatus === 'approved') {
      const idx = SAFETY_STAGES.indexOf(req.currentStage);
      if (idx >= 0 && idx < SAFETY_STAGES.length - 1) {
        req.status       = 'under_review';
        req.currentStage = SAFETY_STAGES[idx + 1];
      } else {
        req.status       = 'review_complete';
        req.currentStage = 'Review Complete';
      }
      tlStatus = 'done';
    } else if (newStatus === 'rejected') {
      req.status       = 'rejected';
      req.currentStage = '—';
      tlStatus         = 'rejected';
    } else if (newStatus === 'revision_requested') {
      req.revisionStage = req.currentStage;
      req.status        = 'revision_requested';
      req.currentStage  = 'Revision needed';
      tlStatus          = 'returned';
    } else {
      req.status = newStatus;
    }

    req.updatedAt = now.toISOString();
    req.timeline.push({ status: tlStatus, stage: stageLabel, by: actor, date: stamp, note: note || '' });

    delete renderedPages['requests'];
    delete renderedPages['approvals'];
    delete renderedPages['dashboard'];
    syncNavBadges();
    _persistRequests();
  }

  /* ====== MANUFACTURER ADMIN ====== */
  function addManufacturer(data) {
    const padded = String(MANUFACTURERS.length + 1).padStart(3, '0');
    const entry  = {
      id: 'mfr-' + padded, name: (data.name || '').trim(),
      email: data.email || '', phone: data.phone || '',
      addr: data.addr || '', active: true, notes: data.notes || ''
    };
    MANUFACTURERS.push(entry);
    if (window.TPCv2 && window.TPCv2.refreshMfrGrid)     window.TPCv2.refreshMfrGrid();
    if (window.TPCv2 && window.TPCv2.refreshMfrDropdown) window.TPCv2.refreshMfrDropdown();
    return entry.id;
  }

  function updateManufacturer(id, data) {
    const entry = MANUFACTURERS.find(m => m.id === id);
    if (!entry) return;
    ['name','email','phone','addr','notes'].forEach(k => { if (data[k] !== undefined) entry[k] = data[k]; });
    if (window.TPCv2 && window.TPCv2.refreshMfrGrid)     window.TPCv2.refreshMfrGrid();
    if (window.TPCv2 && window.TPCv2.refreshMfrDropdown) window.TPCv2.refreshMfrDropdown();
  }

  function deactivateManufacturer(id) {
    const entry = MANUFACTURERS.find(m => m.id === id);
    if (!entry) return;
    entry.active = false;
    delete renderedPages['safety-admin'];
    if (window.TPCv2 && window.TPCv2.refreshMfrGrid)     window.TPCv2.refreshMfrGrid();
    if (window.TPCv2 && window.TPCv2.refreshMfrDropdown) window.TPCv2.refreshMfrDropdown();
  }

  function reactivateManufacturer(id) {
    const entry = MANUFACTURERS.find(m => m.id === id);
    if (!entry) return;
    entry.active = true;
    delete renderedPages['safety-admin'];
    if (window.TPCv2 && window.TPCv2.refreshMfrGrid)     window.TPCv2.refreshMfrGrid();
    if (window.TPCv2 && window.TPCv2.refreshMfrDropdown) window.TPCv2.refreshMfrDropdown();
  }

  /* ====== STORAGE LOCATION ADMIN ====== */
  function _nextLocId() {
    const nums = STORAGE_LOCATIONS
      .map(l => { const m = l.id.match(/^loc-(\d+)$/); return m ? parseInt(m[1], 10) : 0; })
      .filter(n => n > 0);
    return 'loc-' + String((nums.length ? Math.max(...nums) : 0) + 1).padStart(3, '0');
  }

  function addLocation(data) {
    const label = (data.label || '').trim();
    const site  = (data.site  || '').trim();
    if (!label) return { error: 'Location name is required' };
    if (label.length > 60) return { error: 'Location name exceeds 60 characters' };
    if (!site || !SITES.find(s => s.key === site)) return { error: 'A valid site is required' };
    const dup = STORAGE_LOCATIONS.some(
      l => l.site === site && l.label.trim().toLowerCase() === label.toLowerCase()
    );
    if (dup) return { error: 'A location with this name already exists at this site' };
    const entry = { id: _nextLocId(), site, label, active: true };
    STORAGE_LOCATIONS.push(entry);
    if (window.TPCv5 && window.TPCv5.refreshStorageGrid) window.TPCv5.refreshStorageGrid();
    return { id: entry.id };
  }

  function updateLocation(id, data) {
    const entry = STORAGE_LOCATIONS.find(l => l.id === id);
    if (!entry) return { error: 'Location not found' };
    const label = (data.label || '').trim();
    if (!label) return { error: 'Location name is required' };
    if (label.length > 60) return { error: 'Location name exceeds 60 characters' };
    const dup = STORAGE_LOCATIONS.some(
      l => l.id !== id && l.site === entry.site && l.label.trim().toLowerCase() === label.toLowerCase()
    );
    if (dup) return { error: 'A location with this name already exists at this site' };
    entry.label = label;
    if (window.TPCv5 && window.TPCv5.refreshStorageGrid) window.TPCv5.refreshStorageGrid();
    return { id };
  }

  function deactivateLocation(id) {
    const entry = STORAGE_LOCATIONS.find(l => l.id === id);
    if (!entry) return;
    entry.active = false;
    if (window.TPCv5 && window.TPCv5.refreshStorageGrid) window.TPCv5.refreshStorageGrid();
  }

  function reactivateLocation(id) {
    const entry = STORAGE_LOCATIONS.find(l => l.id === id);
    if (!entry) return;
    entry.active = true;
    if (window.TPCv5 && window.TPCv5.refreshStorageGrid) window.TPCv5.refreshStorageGrid();
  }

  /* ====== USER MANAGEMENT ====== */
  function addUser(data) {
    const seq = USERS.length + 1;
    const id  = 'usr-' + String(seq).padStart(3, '0');
    USERS.push({
      id,
      name          : data.name,
      initials      : (data.initials || '').toUpperCase().slice(0, 2) || data.name.split(/\s+/).map(w => w[0] || '').join('').toUpperCase().slice(0, 2),
      email         : data.email.toLowerCase(),
      jobTitle      : data.jobTitle || '',
      platformRole  : data.platformRole,
      moduleAccess  : data.moduleAccess || ['safety'],
      site          : data.site,
      stagesScope   : data.stagesScope || null,
      active        : true,
      createdAt     : new Date().toISOString().slice(0, 10),
      deactivatedAt : null,
      deactivatedBy : null,
    });
    if (window.TPCv6 && window.TPCv6.refreshUserGrid) window.TPCv6.refreshUserGrid();
  }

  function updateUser(id, data) {
    const u = USERS.find(x => x.id === id);
    if (!u) return;
    u.name         = data.name;
    u.initials     = (data.initials || '').toUpperCase().slice(0, 2) || u.initials;
    u.jobTitle     = data.jobTitle !== undefined ? data.jobTitle : u.jobTitle;
    u.platformRole = data.platformRole;
    u.moduleAccess = data.moduleAccess || u.moduleAccess;
    u.site         = data.site;
    u.stagesScope  = data.stagesScope !== undefined ? data.stagesScope : u.stagesScope;
    if (window.TPCv6 && window.TPCv6.refreshUserGrid) window.TPCv6.refreshUserGrid();
  }

  function deactivateUser(id) {
    const u = USERS.find(x => x.id === id);
    if (!u) return;
    u.active        = false;
    u.deactivatedAt = new Date().toISOString().slice(0, 10);
    u.deactivatedBy = currentUser().name;
    if (window.TPCv6 && window.TPCv6.refreshUserGrid) window.TPCv6.refreshUserGrid();
  }

  function reactivateUser(id) {
    const u = USERS.find(x => x.id === id);
    if (!u) return;
    u.active        = true;
    u.deactivatedAt = null;
    u.deactivatedBy = null;
    if (window.TPCv6 && window.TPCv6.refreshUserGrid) window.TPCv6.refreshUserGrid();
  }

  function resubmitRequest(requestId) {
    const key = requestId.replace('#', '');
    const req = REQUESTS[key];
    if (!req || req.status !== 'revision_requested') return;
    const now   = new Date();
    const stamp = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                + ', '
                + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    req.status       = 'submitted';
    req.currentStage = req.revisionStage || SAFETY_STAGES[0];
    delete req.revisionStage;
    req.updatedAt    = now.toISOString();
    req.timeline.push({ status: 'done', stage: 'Resubmission', by: currentUser().name, date: stamp, note: 'Resubmitted for review.' });
    resetLazy('requests');
    resetLazy('approvals');
    triggerLazy('requests');
    syncNavBadges();
    _persistRequests();
  }

  function afterApprovalAction() { _afterApprovalAction(); }

  function currentUser() {
    const rc   = roleConfig[state.role] || {};
    const user = USERS.find(u => u.active !== false && u.platformRole === state.role) || {};
    return { ...rc, role: state.role, stagesScope: user.stagesScope ?? null, userId: user.id ?? null };
  }

  return { init, goPage, switchRole, toast, bindApprovalRows, bindReasonModal, openReasonModal, afterApprovalAction, registerLazy, triggerLazy, resetLazy, manufacturers: MANUFACTURERS, sites: SITES, storageLocations: STORAGE_LOCATIONS, requests: REQUESTS, users: USERS, addRequest, currentUser, updateRequestStatus, resubmitRequest, addManufacturer, updateManufacturer, deactivateManufacturer, reactivateManufacturer, addLocation, updateLocation, deactivateLocation, reactivateLocation, addUser, updateUser, deactivateUser, reactivateUser };
})();

// Expose to other modules (top-level `const` doesn't attach to window in classic scripts)
window.TPC = TPC;

document.addEventListener('DOMContentLoaded', () => {
  TPC.init();
  TPC.bindApprovalRows();
  TPC.bindReasonModal();
});
