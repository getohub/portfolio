"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const skills = [
  { src: "/figma.svg", alt: "Figma" },
  { src: "/ai.svg", alt: "Illustrator" },
  { src: "/ps.svg", alt: "Photoshop" },
  { src: "/inkscape.svg", alt: "Inkscape" },
  { src: "/canva.svg", alt: "Canva" },
  { src: "/figma.svg", alt: "Figma" },
  { src: "/ai.svg", alt: "Illustrator" },
  { src: "/ps.svg", alt: "Photoshop" },
  { src: "/inkscape.svg", alt: "Inkscape" },
  { src: "/canva.svg", alt: "Canva" },
];

function CustomCursor({ text }: { text?: string }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);
  return (
    <div
      ref={cursorRef}
      className="fixed z-[9999] pointer-events-none w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 bg-white/60 animate-pulse shadow-lg cursor-none select-none"
      style={{ transform: "translate(-50%, -50%)", transition: "background 0.2s, border 0.2s" }}
    >
      {text && (
        <span className="text-gray-700 text-xs font-medium text-center leading-tight pointer-events-none select-none whitespace-nowrap">
          {text}
        </span>
      )}
    </div>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorText, setCursorText] = useState<string | undefined>(undefined);
  const timelineRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mainRef.current) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          mainRef.current.scrollLeft += e.deltaY;
        }
      }
    };
    const main = mainRef.current;
    if (main) {
      main.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (main) {
        main.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const handleScroll = () => {
      setShowBackToTop(main.scrollLeft > 100);
    };
    main.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => {
      main.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    const contact = contactRef.current;
    if (!timeline && !contact) return;
    const handleText = () => {
      setCursorText(undefined);
    };
    let timelineEntry = false;
    let contactEntry = false;
    const updateText = () => {
      if (contactEntry) setCursorText("contact me");
      else if (timelineEntry) setCursorText("hover the years");
      else setCursorText(undefined);
    };
    const observers: IntersectionObserver[] = [];
    if (timeline) {
      const observerTimeline = new window.IntersectionObserver(
        ([entry]) => {
          timelineEntry = entry.isIntersecting;
          updateText();
        },
        {
          root: mainRef.current,
          threshold: 0.3,
        }
      );
      observerTimeline.observe(timeline);
      observers.push(observerTimeline);
    }
    if (contact) {
      const observerContact = new window.IntersectionObserver(
        ([entry]) => {
          contactEntry = entry.isIntersecting;
          updateText();
        },
        {
          root: mainRef.current,
          threshold: 0.3,
        }
      );
      observerContact.observe(contact);
      observers.push(observerContact);
    }
    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, []);

  const handleBackToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <main ref={mainRef} className="bg-[#edf3f7] flex items-center px-0 overflow-x-auto">
        <CustomCursor text={cursorText} />
        {/* Bouton retour première page */}
        {showBackToTop && (
          <button
            onClick={handleBackToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-white border-2 border-gray-400 shadow-lg flex items-center justify-center transition hover:bg-gray-100"
            aria-label="Retour à la première page"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 9l-3 3 3 3" />
              <path d="M7 12h10" />
            </svg>
          </button>
        )}
        <div className="flex gap-0 py-0 w-full">
          {/* Section 1: Intro */}
          <section className="flex flex-col justify-center items-center min-w-screen w-screen px-8 sm:px-20">
            <div className="grid grid-cols-2 gap-6 w-full max-w-6xl">
              {/* Title Card */}
              <div className="bg-white rounded-3xl p-10 flex flex-col justify-center">
                <h1 className="text-5xl font-bold text-gray-800">Getoar LIMANI</h1>
                <h2 className="text-3xl font-semibold text-gray-500 mt-2">Product Owner</h2>
              </div>
              {/* Profile Avatar */}
              <div className="rounded-3xl flex items-center justify-center p-10">
                <div className="relative w-52 h-52 flex items-center justify-center left-[-2rem]">
                  {/* Texte circulaire autour */}
                  <svg viewBox="0 0 290 290" className="absolute pointer-events-none select-none" style={{width: '30rem', height: '20rem', top: '1.5rem', left: '9rem', position: 'absolute'}}>
                    <defs>
                      <path id="circlePath" d="M110,10 a100,100 0 1,1 -0.1,0" />
                    </defs>
                    <text fill="#9ca3af" fontSize="15" fontFamily="sans-serif" letterSpacing="2" textLength="630">
                      <textPath xlinkHref="#circlePath" startOffset="0" dominantBaseline="middle" textAnchor="middle">
                        AVAILABLE FOR WORK • AVAILABLE FOR WORK •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute rounded-full overflow-hidden w-52 h-52" style={{left: '14rem', top: '2.6rem', position: 'absolute'}}>
                    <Image
                      src="/profil.jpg"
                      alt="Profile"
                      fill
                      className="object-cover rounded-full"
                      priority
                    />
                  </div>
                </div>
              </div>
              {/* Bio */}
              <div className="bg-white rounded-3xl p-10 col-span-1">
                <p className="text-lg font-semibold text-gray-800">
                  Futur diplômé d'un Master Expert en Ingénierie Informatique et aguerri d'une solide expérience en développement web, je suis prêt à relever un nouveau défi dès novembre 2025. <br/><br/>
                </p>
                <p className="text-lg text-gray-800">Mon objectif est d'accompagner et piloter des projets agiles en faisant le lien entre les équipes techniques et les besoins métiers, afin de maximiser la création de valeur.</p>
                <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
                  <span className="text-gray-500">About Me</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-800"
                    onClick={() => {
                      const el = document.getElementById('section2');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex flex-col gap-4 justify-center justify-self-right flex-none">
                {[
                  { text: "See my latest", subtext: "work", bg: "bg-gray-300", to: "works-section" },
                  { text: "Expériences", subtext: "Formations", bg: "bg-white", to: "timeline-section" },
                  { text: "Let's Work", subtext: "Together", bg: "bg-gray-300", to: "contact-section" },
                ].map(({ text, subtext, bg, to }, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center px-6 py-3 rounded-full ${bg} cursor-pointer`}
                    onClick={() => {
                      if (to) {
                        const el = document.getElementById(to);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                      }
                    }}
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {text} <span className="text-gray-500 font-normal">{subtext}</span>
                    </span>
                    <div className="w-6 h-6 flex items-center justify-center bg-gray-800 text-white rounded-full text-xs">
                      →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Tout le contenu demandé */}
          <section id="section2" className="flex flex-col justify-center items-center min-w-screen w-screen px-4 sm:px-12">
            <div className="flex flex-row gap-8 w-full max-w-[1600px] mx-auto">
              {/* Bloc Stats & What I Do */}
              <div className="flex flex-col gap-8 w-1/3 min-w-[350px]">
                <div className="bg-white rounded-3xl p-10 flex flex-col gap-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-5xl font-bold text-gray-800">7+</h3>
                      <p className="text-sm text-gray-500 mt-1">Years Of Experience<br/>in developpement</p>
                    </div>
                    <div>
                      <h3 className="text-5xl font-bold text-gray-800">30+</h3>
                      <p className="text-sm text-gray-500 mt-1">Projects</p>
                    </div>
                    <div>
                      <h3 className="text-5xl font-bold text-gray-800">4.9</h3>
                      <p className="text-sm text-gray-500 mt-1">Average Rating</p>
                    </div>
                    <div>
                      <h3 className="text-5xl font-bold text-gray-800">60</h3>
                      <p className="text-sm text-gray-500 mt-1">Case Studies</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-3xl p-10">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    What <span className="text-gray-500 font-medium">I Do</span>
                  </h2>
                  <ul className="mt-2 space-y-4 text-gray-800 font-medium">
                    <li className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-base font-semibold"><span className="text-lg">»</span> Technical Analysis</span>
                      <span className="text-gray-500 text-sm font-normal ml-6">Analyse des besoins techniques à partir des demandes métier.</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-base font-semibold"><span className="text-lg">»</span> Feature Specification</span>
                      <span className="text-gray-500 text-sm font-normal ml-6">Rédaction de spécifications fonctionnelles et techniques</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-base font-semibold"><span className="text-lg">»</span> Backend Development</span>
                      <span className="text-gray-500 text-sm font-normal ml-6">Développement, base de données, logique métier</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-base font-semibold"><span className="text-lg">»</span> UI Integration</span>
                      <span className="text-gray-500 text-sm font-normal ml-6">Intégration d'interfaces</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-base font-semibold"><span className="text-lg">»</span> Bug Tracking & Prioritization</span>
                      <span className="text-gray-500 text-sm font-normal ml-6">Suivi des bugs et gestion des priorités</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-base font-semibold"><span className="text-lg">»</span> Collaboration with Stakeholders</span>
                      <span className="text-gray-500 text-sm font-normal ml-6">Échange régulier avec les clients/utilisateurs pour affiner les besoins</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Bloc Compétences */}
              <div className="bg-white rounded-3xl p-10 flex-1 flex flex-col items-center min-w-[350px]">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Compétences <span className="text-gray-500 font-medium">| Skills</span>
                </h2>
                <div className="w-full flex flex-col justify-between mt-8 h-full">
                  {/* Analyse & Gestion de Projet */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Analyse & Gestion de Projet</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Analyse des besoins</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Gestion agile</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Spécifications</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Product Owner</span>
                    </div>
                  </div>
                  
                  {/* Développement */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Développement</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">React/Next.js</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">SQL</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">API REST</span>
                    </div>
                  </div>
                  
                  {/* Outils & Méthodes */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Outils & Méthodes</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Git/GitHub</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Jira</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Tests unitaires</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">CI/CD</span>
                    </div>
                  </div>
                  
                  {/* Design & UX */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Design & UX</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">UI/UX Design</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Responsive</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Figma</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Accessibilité</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bloc Présentation */}
              <div className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center min-w-[400px] max-w-[500px] mx-auto">
                <div className="flex flex-col items-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4">
                    <Image
                      src="/profil.jpg"
                      alt="Profile"
                      width={112}
                      height={112}
                      className="w-28 h-28 rounded-full object-cover mb-4"
                      priority
                    />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-2">
                    I'm <span className="text-gray-500">Getoar</span>, a developper<br/>based in <span className="text-gray-500">Lyon</span>.
                  </h2>
                  <p className="text-base text-gray-600 text-center mb-6">
                    Lyon-based developper specializing in creating engaging social media content and eye-catching print designs. Works freelance, bringing your vision to life.
                  </p>
                  <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" 
                  className="mt-2 px-10 py-4 rounded-full bg-gray-100 text-gray-500 font-semibold text-lg flex items-center gap-2 hover:bg-gray-200 transition">
                    Voir mon CV <span className="text-xl">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: My latest Works */}
          <section id="works-section" className="flex flex-col justify-center items-center min-w-screen w-screen px-4 sm:px-12 py-12" style={{height: '98vh'}}>
            <div className="w-full max-w-[1400px] mx-auto flex flex-col h-full justify-center">

                  {/* Grille des projets centrée verticalement */}
                  <div className="grid grid-cols-5 grid-rows-2 gap-8 items-start justify-items-start" style={{ margin: '10rem 0rem' }}>
                    {/* Premier projet, plus grand carré */}
                    {/* <div className="row-span-2 col-span-1 bg-gray-300 rounded-2xl flex items-end p-4 relative aspect-square min-w-[300px] min-h-[300px]">
                      <span className="text-sm text-black absolute left-4 bottom-4">Name project</span>
                    </div> */}
                    {/* 7 autres projets, carrés */}
                    {Array(9  ).fill(0).map((_, i) => (
                      <div key={i} className="bg-gray-300 rounded-2xl flex items-end p-4 relative aspect-square min-w-[260px] min-h-[260px]">
                        <span className="text-sm text-black absolute left-4 bottom-4">Name project</span>
                      </div>
                    ))}
                  </div>
                  {/* Titre en haut à gauche */}
                  <div className="mb-8">
                    <h2 className="text-5xl font-bold text-black leading-none py-4">
                      My latest <span className="text-gray-400 font-semibold">Works</span>
                    </h2>
                  </div>
              </div>
            </section>

            {/* Section 4: Timeline Expériences / Formations */}
            <section ref={timelineRef} id="timeline-section" data-timeline className="flex flex-col justify-center items-center min-w-screen w-screen px-4 sm:px-12 py-12 cursor-none relative" style={{cursor: 'none', height: '98vh'}}>
              <div className="w-full max-w-[1400px] mx-auto flex flex-col h-full justify-between relative">
                {/* Hashtag au-dessus du rond 'now' */}
                <div className="absolute z-20" style={{left: 'calc(0% + 8px)', top: 'calc(40% - 20px)'}}>
                  <span className="text-gray-600 font-semibold text-sm">#OPENTOWORK</span>
                </div>
                {/* Timeline horizontale */}
                <div className="relative flex-1 flex flex-col justify-center">
                  {/* Axe horizontal */}
                  <div className="absolute top-1/2 bg-gray-400 rounded-full -translate-y-1/2 z-0" style={{height:'10px', left: '-40px', right: '-10vw', width: '130rem'}} />
                  {/* Flèche à droite de la ligne */}
                  <div className="absolute top-1/2 -translate-y-1/2 z-10" style={{height:'24px', width:'24px', left: '127rem'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12h16m0 0l-6-6m6 6l-6 6" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Repères */}
                  <div className="absolute left-0 right-0 top-1/2 flex items-center -translate-y-1/2 z-10 px-8">
                    <div className="flex flex-row" style={{gap: 'calc(var(--spacing) * 45)'}}>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700">
                          now
                        </div>
                      </div>
                      <div className="relative flex flex-col items-center group">
                        {/* Carré du haut pour 2025 */}
                        <div className="absolute z-20" style={{top: '-15rem;'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Diplome Niveau 7<br/>Expert en ingénierie informatique
                            ESGI Master 2<br /> 
                            Ingénierie du web <br/>
                            août 2023 - août 2025
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2025 au hover */}
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-sm italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Octobre 2023 à Octobre 2025
                        </span>
                        {/* Le rond 2025 */}
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          2025
                        </div>
                        {/* Carré du bas pour 2025 */}
                        <div className="absolute z-20" style={{top: '8rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Intégrateur, développeur en informatique de gestion
                            Université de Lyon · Contrat en alternance
                            oct. 2023 - aujourd’hui · 1 an 10 mois
                            Lyon, Auvergne-Rhône-Alpes, France · Sur site
                            Je participe à une ou plusieurs phases du cycle de vie des logiciels : analyse, développement, qualification, intégration, déploiement d’applications.
                            Actuellement, je développe un logiciel de A à Z pour la gestion des formations destiné à l'UDL.
                          </div>
                        </div>
                      </div>
                      {/* Nouveau rond 2023 avec carré au-dessus */}
                      <div className="relative flex flex-col items-center group">
                        {/* Carré du haut pour 2023 */}
                        <div className="absolute z-20" style={{top: '-15rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Développeur informatique chez Findis Desamais
                            Groupe Findis · CDD
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2023 au hover */}
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-sm italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Janvier 2023 à Août 2023
                        </span>
                        {/* Le rond 2023 */}
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          2023
                        </div>
                      </div>
                      {/* Nouveau rond 2022 avec deux carrés */}
                      <div className="relative flex flex-col items-center group">
                        {/* Carré du haut pour 2022 */}
                        <div className="absolute z-20" style={{top: '-15rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Licence Professionnelle Métiers du Numérique
                            Université Clermont Auvergne

                          </div>
                        </div>
                        {/* Le rond 2022 */}
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          2022
                        </div>
                        {/* Carré du bas pour 2022 */}
                        <div className="absolute z-20" style={{top: '8rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Développeur informatique
                            TECHNOPLANE • Contrat en alternance
                            Moulins, Auvergne-Rhône-Alpes, France
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2022 au hover */}
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-xs italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Sept 2021 à Juin 2022
                        </span>
                      </div>
                      {/* Nouveau rond 2021 bis avec deux carrés en bas et un en haut, comme 2022 */}
                      <div className="relative flex flex-col items-center group">
                        {/* Carré du haut pour 2022 */}
                        <div className="absolute z-20" style={{top: '-15rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Développeur web
                            Lenka Créations
                            Indépendant
                          </div>
                        </div>
                        {/* Le rond 2021 bis */}
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          2021
                        </div>
                        {/* Carré du bas pour 2021 bis */}
                        <div className="absolute z-20" style={{top: '8rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Employé de magasin
                            E.Leclerc • CDI
                            Commander, réceptionner, mise en rayon, renseigner les clients, suivre l'état des stocks, préparer les commandes click&collect, formation de collaborateurs
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2021 bis au hover */}
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-xs italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Janvier 2019 à Juillet 2021
                        </span>
                      </div>
                      {/* Nouveau rond 2018 avec deux carrés en bas et un en haut, comme 2022 */}
                      <div className="relative flex flex-col items-center group">
                        {/* Carré du haut pour 2018 */}
                        <div className="absolute z-20" style={{top: '-15rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Cite scolaire Albert Londres
                            BTS SIO (Services informatiques aux organisations)
                            Parcours SLAM (Solutions logicielles et applications métiers)
                          </div>
                        </div>
                        {/* Le rond 2018 */}
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          2018
                        </div>
                        {/* Carré du bas pour 2018 */}
                        <div className="absolute z-20" style={{top: '8rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            • Développeur web
                            YANSYS CDD <br />
                            Juin - sept. 2018 <br />
                            • Étudiant stagiaire 
                            Groupe SEGUIN <br />
                            • Étudiant stagiaire
                            Lingerie Fantaisie
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2018 au hover */}
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-xs italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Sept 2016 à Juin 2018
                        </span>
                      </div>
                      {/* Nouveau rond 2015 avec deux carrés en bas et un en haut, comme 2018 */}
                      <div className="relative flex flex-col items-center group">
                        {/* Carré du haut pour 2015 */}
                        <div className="absolute z-20" style={{top: '-15rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            La maîtrise de la langue française de manière autonome, diplômé par Cavilam Vichy
                          </div>
                        </div>
                        {/* Le rond 2015 */}
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          2015
                        </div>
                        {/* Carré du bas pour 2015 */}
                        <div className="absolute z-20" style={{top: '8rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Arrivée en France
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2015 au hover */}
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-xs italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Sept 2014 à Juin 2015
                        </span>
                      </div>
                      {/* Nouveau rond 2014 avec deux carrés en bas et un en haut, comme 2015 */}
                      <div className="relative flex flex-col items-center group">
                        {/* Carré du haut pour 2014 */}
                        <div className="absolute z-20" style={{top: '-15rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Riinvest Université <br />
                            Licence en Informatique <br />
                            Faculté des Sciences Informatiques <br />
                            Kosovo
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2014 au hover */}
                        <div className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-xs italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Sept 2013 à Juin 2014
                        </div>
                        {/* Le rond 2014 */}
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          2014
                        </div>
                        {/* Carré du bas pour 2014 */}
                        <div className="absolute z-20" style={{top: '8rem'}}>
                          <div className="bg-gray-300 rounded-2xl aspect-square min-w-[180px] max-w-[220px] flex flex-col items-center justify-center text-center p-4 text-sm text-gray-800 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                            Lycée 'Kuvendi i Arbërit' Ferizaj <br />
                            Baccalauréat Mathématiques et informatique
                          </div>
                        </div>
                        {/* Texte au-dessus du rond 2014 au hover */}
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 text-gray-700 text-xs italic font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none" style={{top: '5rem'}}>
                          Sept 2013 à Juin 2014
                        </span>
                      </div>
                      {/* Rond 'born' sans carré ni span */}
                      <div className="relative flex flex-col items-center group">
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-base font-semibold border-2 border-gray-400 shadow text-gray-700 cursor-pointer transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                          born
                        </div>
                      </div>
                    </div>
                    {/* Espace réservé pour d'autres ronds à droite */}
                    <div className="flex-1" />
                  </div>
                </div>
                {/* Titre en bas à gauche */}
                <div className="flex items-end">
                  <h2 className="text-5xl font-bold text-black leading-none">
                    Expériences <span className="text-gray-400 font-semibold">Formations</span>
                  </h2>
                </div>
              </div>
            </section>

            {/* Section Contact */}
            <section ref={contactRef} id="contact-section" className="flex flex-col justify-center items-center min-w-screen w-screen px-4 sm:px-12 py-12 bg-[#edf3f7]" style={{height: '98vh'}}>
              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch" style={{marginLeft: '30rem'}}>
                {/* Bloc infos */}
                <div className="bg-white rounded-2xl border border-gray-300 p-10 flex flex-col justify-between shadow-sm">
                  <h2 className="text-4xl font-bold text-gray-300 mb-8">Contact<br/>Information</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15.75v-7.5A2.25 2.25 0 015.25 6.75h13.5A2.25 2.25 0 0121 8.25z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25l-9 6-9-6" /></svg>
                    <span className="font-bold text-gray-800 text-lg">limanigetoar@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z" />
                      <circle cx="12" cy="11" r="3" />
                    </svg>
                    <span className="font-semibold text-gray-800 text-base">Lyon</span>
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92V21a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h4.09a2 2 0 012 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0122 16.92z"/>
                    </svg>
                    <span className="font-semibold text-gray-800 text-base">+33 6 12 34 56 78</span>
                  </div>
                  <div className="flex gap-4 mt-auto">
                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.25 2.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm-4.25 1.5a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm0 1.5a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5z" /></svg></a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded bg-[#0077b5]"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" /></svg></a>
                  </div>
                </div>
                {/* Formulaire */}
                <form className="bg-white rounded-2xl p-10 flex flex-col justify-between shadow-sm border border-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-gray-500 font-semibold mb-1">First Name</label>
                      <input type="text" className="border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent py-2" placeholder="" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-500 font-semibold mb-1">Last Name</label>
                      <input type="text" className="border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent py-2" placeholder="" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-500 font-semibold mb-1">Email</label>
                      <input type="email" className="border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent py-2" placeholder="" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-500 font-semibold mb-1">Phone Number</label>
                      <input type="tel" className="border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent py-2" placeholder="+33" />
                    </div>
                  </div>
                  <div className="flex flex-col mt-6">
                    <label className="text-gray-500 font-semibold mb-1">Message</label>
                    <textarea className="border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent py-2 min-h-[80px]" placeholder="Write your message.." />
                  </div>
                  <div className="flex justify-end mt-8">
                    <button type="submit" className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-semibold px-10 py-3 rounded-xl transition shadow-sm">Send Message</button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </main>
        <style jsx global>{`
          body, * {
            cursor: none !important;
          }
          .jsx-137523449f51d9bd.w-full.space-y-8.flex.flex-col.justify-center > div {
            margin-bottom: 4rem;
          }
        `}</style>
      </>
    );
  }
