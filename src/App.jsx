import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  Check,
  ChefHat,
  Copy,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  Phone,
  Send,
  Sparkles,
  Sofa,
  X,
  ZoomIn,
} from 'lucide-react';
import { business, processSteps, projects, services } from './data/site.js';

const iconMap = {
  layers: Layers3,
  chef: ChefHat,
  cabinet: PanelsTopLeft,
  sofa: Sofa,
  bed: BedDouble,
  building: Building2,
};

const serviceEnquiryOptions = {
  'Turnkey interiors': 'Complete home interiors',
  'Modular kitchens': 'Modular kitchen',
  'Modular furniture': 'Modular furniture / wardrobes',
  'Living & dining': 'Living or bedroom interiors',
  'Bedroom interiors': 'Living or bedroom interiors',
  'Commercial & civil works': 'Commercial / civil works',
};

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services.html' },
  { label: 'Projects', href: '/projects.html' },
  { label: 'About', href: '/about.html' },
  { label: 'Experience', href: '/experience.html' },
  { label: 'Contact', href: '/contact.html' },
];

const filters = ['All spaces', 'Living spaces', 'Kitchens', 'Bedrooms', 'Storage', 'Commercial'];

const whatsappUrl = (message = '') =>
  `https://wa.me/${business.phoneDigits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(business.email)}`;
const googleMapsSearchUrl = business.mapsUrl;
const googleMapsDirectionsUrl = business.mapsUrl;

async function copyTextToClipboard(value) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Continue to the fallback for browsers that deny Clipboard API access.
  }

  try {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    field.style.pointerEvents = 'none';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  } catch {
    return false;
  }
}

function Reveal({ children, className = '', delay = 0, amount = 0.14, ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, dark = false }) {
  return (
    <span className={`section-label ${dark ? 'section-label--dark' : ''}`}>
      <span className="section-label__dot" />
      {children}
    </span>
  );
}

function PageIntro({ eyebrow, title, emphasis, description, image, className = '' }) {
  return (
    <section className={`page-intro ${className}`.trim()}>
      <div className="container page-intro__grid">
        <div className="page-intro__copy">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1>{title} <em>{emphasis}</em></h1>
          <p>{description}</p>
        </div>
        {image && <img src={image} alt="" className="page-intro__image" />}
      </div>
    </section>
  );
}

function Logo({ footer = false }) {
  if (footer) {
    return (
      <a href="/" className="footer-brand" aria-label="Bright Space Interiors home">
        <img src="/images/bright-space-mark.png" alt="" className="footer-brand__mark" />
        <span className="footer-brand__text">
          <strong>BRIGHT SPACE</strong>
          <span>INTERIORS</span>
          <small>DESIGN · DETAIL · DELIVER</small>
        </span>
      </a>
    );
  }
  return (
    <a href="/" className="header-brand" aria-label="Bright Space Interiors home">
      <img src="/images/bright-space-wordmark.png" alt="Bright Space Interiors — Design, Detail, Deliver" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="topline">
        <div className="container topline__inner">
          <span>Thoughtful interiors, made personal.</span>
          <a href={whatsappUrl('Hello Bright Space Interiors, I would like to discuss an interior project.')} target="_blank" rel="noopener noreferrer" aria-label={`Message Bright Space Interiors on WhatsApp at ${business.phoneDisplay}`}><MessageCircle size={12} strokeWidth={1.8} /> WhatsApp · {business.phoneDisplay}</a>
          <span className="topline__location"><MapPin size={12} strokeWidth={1.8} /> {business.locationLabel}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} aria-current={window.location.pathname === item.href || (item.href === '/' && window.location.pathname === '/index.html') ? 'page' : undefined}>{item.label}</a>)}
          </nav>
          <a className="button button--dark header-cta" href="/contact.html">
            Plan your space <ArrowUpRight size={15} />
          </a>
          <button className="mobile-menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item, index) => (
              <motion.a key={item.href} href={item.href} onClick={closeMenu} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }}>
                <span>{item.label}</span><ArrowUpRight size={18} />
              </motion.a>
            ))}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mobile-nav__call"><MessageCircle size={16} /> WhatsApp · {business.phoneDisplay}</a>
            <a href={`tel:+${business.phoneDigits}`} className="mobile-nav__call mobile-nav__call--secondary"><Phone size={16} /> Call {business.phoneDisplay}</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero__grid">
        <div className="hero__copy">
          <Reveal>
            <SectionLabel>Interiors · Hyderabad</SectionLabel>
          </Reveal>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            A space that feels like <em>you.</em>
          </motion.h1>
          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Thoughtful interiors. Considered details. Spaces designed around the way you live, work and feel.
          </motion.p>
          <motion.div className="hero__actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, delay: 0.27 }}>
            <a className="button button--gold" href="/contact.html">Let’s talk about your space <ArrowUpRight size={16} /></a>
            <a className="text-link" href="/projects.html">Explore our work <ArrowDownRight size={16} /></a>
          </motion.div>
          <motion.div className="hero__footnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.6 }}>
            <p>Design-led. Detail-minded.<br /><strong>Built around you.</strong></p>
          </motion.div>
        </div>
        <motion.div className="hero__visual" initial={{ opacity: 0, scale: 0.975 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hero__image-wrap">
            <img className="hero__image" src="/images/hero-living.webp" alt="Bright, contemporary living and dining space with warm timber details" fetchPriority="high" />
            <div className="hero__image-shade" />
            <div className="hero__image-caption"><span>Featured space</span><span>Considered living</span></div>
          </div>
          <div className="hero__orbit" aria-hidden="true">
            <svg viewBox="0 0 120 120" role="presentation">
              <defs><path id="orbitText" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs>
              <text><textPath href="#orbitText">DESIGN · DETAIL · DELIVER · </textPath></text>
            </svg>
            <span className="hero__orbit-center">BS</span>
          </div>
          <div className="hero__note">
            <span className="hero__note-mark"><Sparkles size={17} /></span>
            <div><strong>Made for real life.</strong><span>Finished with intention.</span></div>
            <ArrowUpRight className="hero__note-arrow" size={17} />
          </div>
          <span className="hero__vertical-label">BRIGHT SPACE INTERIORS · HYDERABAD</span>
        </motion.div>
      </div>
      <div className="hero__bottom-rule" />
    </section>
  );
}

function SignatureStrip() {
  const words = ['Design with purpose', 'Details that matter', 'Spaces that work', 'Design with purpose', 'Details that matter', 'Spaces that work'];
  return (
    <div className="signature-strip" aria-label="Our approach: design, detail, deliver">
      <div className="signature-strip__track">
        {words.map((word, i) => <span key={`${word}-${i}`}>{word}<i>✳</i></span>)}
      </div>
    </div>
  );
}

function About({ pageHeading = false }) {
  const Heading = pageHeading ? 'h1' : 'h2';
  return (
    <section className="about section-pad" id="about">
      <div className="container about__grid">
        <Reveal className="about__visual">
          <div className="about__image-frame">
            <img src="/images/living-classic.webp" alt="A calm living room with layered lighting and coordinated furnishings" loading="lazy" />
            <div className="about__image-caption"><span>Thoughtful by design</span><ArrowUpRight size={17} /></div>
          </div>
          <div className="about__index"><span>01</span><span>THE BRIGHT SPACE APPROACH</span></div>
          <div className="about__accent" aria-hidden="true" />
        </Reveal>
        <div className="about__copy">
          <Reveal><SectionLabel>About Bright Space</SectionLabel></Reveal>
          <Reveal delay={0.05}><Heading>Good design is felt in the <em>everyday.</em></Heading></Reveal>
          <Reveal delay={0.1}>
            <p className="lead-copy">Your space should be more than beautiful. It should make sense for the way you live.</p>
            <p className="body-copy">At Bright Space Interiors, we bring design thinking and practical detailing together to shape personal, functional and welcoming spaces. From a kitchen that works harder to a home that feels unmistakably yours, we approach every detail with care.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="about__principles">
              <div><span className="principle-icon"><Check size={15} /></span><div><strong>Considered design</strong><span>Ideas shaped around your lifestyle.</span></div></div>
              <div><span className="principle-icon"><Check size={15} /></span><div><strong>Quality in the details</strong><span>Materials, finishes and function in balance.</span></div></div>
              <div><span className="principle-icon"><Check size={15} /></span><div><strong>Coordinated execution</strong><span>A clear path from concept to completion.</span></div></div>
            </div>
          </Reveal>
          <Reveal delay={0.2}><a className="text-link text-link--dark" href="/about.html#process">See how we work <ArrowRight size={16} /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="about-preview section-pad">
      <div className="container about-preview__grid">
        <div className="about-preview__copy">
          <SectionLabel>A considered approach</SectionLabel>
          <h2>Designed around real <em>everyday life.</em></h2>
          <p>Good interiors balance the way a room looks with the way it works. We bring layout, materials and practical details together around your needs.</p>
          <a className="text-link text-link--dark" href="/about.html">Meet Bright Space <ArrowRight size={16} /></a>
          <div className="about-preview__experience"><strong>17 years</strong><span>in modular interior design</span><a href="/experience.html">Explore our experience <ArrowRight size={15} /></a></div>
        </div>
        <figure className="about-preview__image"><img src="/images/living-warm.webp" alt="A warm living space with considered lighting and timber detailing" loading="lazy" /><figcaption>DESIGN · DETAIL · DELIVER</figcaption></figure>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon] || Layers3;
  const enquiryOption = serviceEnquiryOptions[service.title] || 'Something else';
  return (
    <Reveal delay={(index % 3) * 0.055} className="service-card">
      <a href={`/contact.html?service=${encodeURIComponent(enquiryOption)}`} className="service-card__link" aria-label={`Enquire about ${service.title}`}>
        <div className="service-card__image-wrap">
          <img src={service.image} alt={service.alt} loading="lazy" />
          <span className="service-card__number">{service.number}</span>
          <span className="service-card__icon"><Icon size={20} strokeWidth={1.5} /></span>
        </div>
        <div className="service-card__content">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <span className="service-card__more">Discuss this service <ArrowUpRight size={15} /></span>
        </div>
      </a>
    </Reveal>
  );
}

function Services({ preview = false, page = false }) {
  return (
    <section className={`services section-pad${page ? ' services--page' : ''}`} id="services">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div><Reveal><SectionLabel>What we do</SectionLabel></Reveal><Reveal delay={0.04}><h2>Thoughtful solutions.<br /><em>Beautifully realised.</em></h2></Reveal></div>
          <Reveal delay={0.1} className="section-heading__aside"><p>From individual rooms to complete interiors, bring the big picture and the little details together.</p><a className="text-link text-link--dark" href={preview ? '/services.html' : '/contact.html'}>{preview ? 'Explore all services' : 'Tell us what you need'} <ArrowUpRight size={16} /></a></Reveal>
        </div>
        <div className="services-grid">{(preview ? services.slice(0, 3) : services).map((service, index) => <ServiceCard key={service.number} service={service} index={index} />)}</div>
      </div>
    </section>
  );
}

function ServicePlanning() {
  const prompts = [
    { number: '01', title: 'Which space?', detail: 'A full home, one room, a kitchen, storage or a commercial interior.' },
    { number: '02', title: 'What matters most?', detail: 'Tell us what needs to work better and what you want the space to feel like.' },
    { number: '03', title: 'Any references?', detail: 'Share inspiration, existing plans or room photos if you have them.' },
  ];
  return (
    <section className="service-planning section-pad">
      <div className="container">
        <div className="service-planning__heading"><SectionLabel>Start with the essentials</SectionLabel><h2>A good brief starts with <em>your priorities.</em></h2><p>You don’t need every detail figured out. These are useful things to think about before we talk.</p></div>
        <div className="service-planning__grid">{prompts.map((item) => <article key={item.number} className="service-planning__item"><span>{item.number}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
        <a className="button button--dark" href="/contact.html">Tell us about your space <ArrowUpRight size={15} /></a>
      </div>
    </section>
  );
}

function Experience() {
  const focusAreas = [
    { number: '01', title: 'Layout before finishes', text: 'Begin with measurements, movement and clearances, then shape a layout that feels natural to use.' },
    { number: '02', title: 'Storage with a purpose', text: 'Plan drawers, shelves and hanging space around what belongs in the room and how you reach it.' },
    { number: '03', title: 'Materials that fit', text: 'Choose colours, textures and surfaces in the context of the room and the way it is used.' },
  ];
  const steps = [
    { number: '01', title: 'Understand the space', text: 'Talk through your routines, priorities, measurements and what you want to improve.' },
    { number: '02', title: 'Plan the modules', text: 'Bring the layout, storage and proportions together around the room.' },
    { number: '03', title: 'Resolve the details', text: 'Review finishes, fittings and the details that make the design feel complete.' },
    { number: '04', title: 'Coordinate the fit', text: 'Carry the agreed design through execution and installation.' },
  ];
  return (
    <>
      <PageIntro
        className="page-intro--experience"
        eyebrow="17 years in modular interior design"
        title="Experience that makes every"
        emphasis="detail count."
        description="Seventeen years in modular interior design have shaped a practical way of thinking about layout, storage and the details people use every day."
        image="/images/kitchen-sage.webp"
      />
      <section className="experience-detail section-pad">
        <div className="container">
          <div className="experience-detail__heading">
            <SectionLabel>Experience, applied</SectionLabel>
            <h2>Good modular design starts with <em>how you live.</em></h2>
            <p>A cabinet is part of a room, but it is also part of a routine. We look at the space, what needs to be stored and how each area will be used before settling on the design.</p>
          </div>
          <div className="experience-focus-grid">
            {focusAreas.map((item) => (
              <article className="experience-focus" key={item.number}>
                <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="experience-method section-pad">
        <div className="container experience-method__grid">
          <div className="experience-method__intro">
            <SectionLabel dark>From first conversation to final fit</SectionLabel>
            <h2>Thoughtful at every <em>stage.</em></h2>
            <p>Experience helps connect the early ideas to the finished details. Each step gives the next one a clearer foundation.</p>
            <a className="button button--light" href="/contact.html">Plan your space <ArrowUpRight size={15} /></a>
          </div>
          <div className="experience-method__steps">
            {steps.map((step) => (
              <article className="experience-method__step" key={step.number}>
                <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Portfolio({ onOpen, preview = false, standalone = false }) {
  const [filter, setFilter] = useState('All spaces');
  const filteredProjects = useMemo(() => filter === 'All spaces' ? projects : projects.filter((project) => project.category === filter), [filter]);
  const visibleProjects = preview ? projects.slice(0, 4) : filteredProjects;
  return (
    <section className={`portfolio section-pad${standalone ? ' portfolio--standalone' : ''}`} id="work">
      <div className="container">
        <div className="section-heading portfolio__heading">
          <Reveal><SectionLabel>{standalone ? 'The portfolio' : 'Selected spaces'}</SectionLabel></Reveal>
        <div className="portfolio__title-row"><Reveal>{standalone ? <h1>Spaces made for <em>everyday life.</em></h1> : <h2>Made to live in.<br /><em>Made to last.</em></h2>}</Reveal><Reveal delay={0.08}><p>{standalone ? 'Browse interiors by room and use. Explore the spaces, then get in touch to discuss your own.' : preview ? 'A few spaces to start with. Explore the full collection of interiors, kitchens, bedrooms and details.' : 'Explore a selection of living spaces, kitchens, bedrooms and details designed for everyday life.'}</p></Reveal></div>
        </div>
        {!preview && <div className="portfolio__filters" role="group" aria-label="Filter portfolio projects">
          {filters.map((item) => <button key={item} type="button" className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}
        </div>}
        <motion.div className="portfolio-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.button
                key={project.id}
                className={`project-card project-card--${project.ratio}${index === 0 ? ' project-card--featured' : ''}`}
                type="button"
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.34, delay: Math.min(index * 0.025, 0.15) }}
                onClick={() => onOpen(project)}
                aria-label={`View ${project.title}`}
              >
                <span className="project-card__image"><img src={project.image} alt={project.alt} loading="lazy" /><span className="project-card__zoom"><ZoomIn size={18} /></span></span>
                <span className="project-card__details"><span><small>{project.category}</small><strong>{project.title}</strong></span><ArrowUpRight size={18} /></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="portfolio__bottom"><span>A selection of Bright Space interiors</span><a href={preview ? '/projects.html' : '/contact.html'} className="button button--outline">{preview ? 'View all projects' : 'Have a project in mind?'} <ArrowUpRight size={15} /></a></div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section-pad" id="process">
      <div className="process__grain" aria-hidden="true" />
      <div className="container process__container">
        <div className="process__heading">
          <Reveal><SectionLabel dark>How it works</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2>Clear thinking.<br /><em>Considered making.</em></h2></Reveal>
          <Reveal delay={0.1}><p>Good spaces start with listening. Then the details fall into place, one thoughtful decision at a time.</p></Reveal>
          <Reveal delay={0.16}><a href="/contact.html" className="button button--light">Start a conversation <ArrowUpRight size={15} /></a></Reveal>
        </div>
        <div className="process__steps">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.07} className="process-step">
              <span className="process-step__number">{step.number}</span>
              <div className="process-step__body"><h3>{step.title}</h3><p>{step.description}</p></div>
              <ArrowUpRight className="process-step__arrow" size={18} />
            </Reveal>
          ))}
          <div className="process__line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function PromiseStrip() {
  const points = [
    { number: '01', title: 'Made for you', text: 'Personalised to the way you live.' },
    { number: '02', title: 'Thought through', text: 'A balance of beauty and function.' },
    { number: '03', title: 'Detail conscious', text: 'Finishes matter. So do the small things.' },
  ];
  return (
    <section className="promise-strip">
      <div className="container promise-strip__grid">
        {points.map((point, index) => <Reveal delay={index * 0.05} key={point.number} className="promise-point"><span>{point.number}</span><div><strong>{point.title}</strong><p>{point.text}</p></div><ArrowDownRight size={17} /></Reveal>)}
      </div>
    </section>
  );
}

function ContactTeaser({ variant = 'home' }) {
  const copy = {
    home: { eyebrow: 'Have a project in mind?', heading: <>Let’s make room for <em>what matters.</em></>, text: 'Tell us what you’re planning. We’ll help you take the next step.', action: 'Talk with our team' },
    services: { eyebrow: 'Planning an interior project?', heading: <>Let’s find the right <em>service for you.</em></>, text: 'Share what you need help with and we can start with a conversation.', action: 'Discuss your project' },
    projects: { eyebrow: 'Inspired by these spaces?', heading: <>Let’s talk about <em>your project.</em></>, text: 'Tell us what you’re planning and what matters most in your space.', action: 'Start an enquiry' },
    about: { eyebrow: 'A thoughtful space starts with a conversation', heading: <>Tell us about the space you’d like to <em>make your own.</em></>, text: 'Share your ideas, priorities and questions with Bright Space Interiors.', action: 'Get in touch' },
    experience: { eyebrow: '17 years in modular interior design', heading: <>Let’s shape a space that works for <em>your everyday.</em></>, text: 'Tell us about your room, your routines and what you would like to change.', action: 'Discuss your space' },
  }[variant];
  return (
    <section className="contact-teaser">
      <div className="container contact-teaser__inner">
        <div><SectionLabel dark>{copy.eyebrow}</SectionLabel><h2>{copy.heading}</h2><p>{copy.text}</p></div>
        <a className="button button--light" href="/contact.html">{copy.action} <ArrowUpRight size={16} /></a>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, label, children }) {
  return (
    <div className="contact-card">
      <span className="contact-card__icon"><Icon size={19} strokeWidth={1.6} /></span>
      <div className="contact-card__copy"><small>{label}</small>{children}</div>
    </div>
  );
}

function Contact() {
  const serviceOptions = ['Complete home interiors', 'Modular kitchen', 'Modular furniture / wardrobes', 'Living or bedroom interiors', 'Commercial / civil works', 'Something else'];
  const [form, setForm] = useState(() => {
    const requestedService = new URLSearchParams(window.location.search).get('service');
    return { name: '', phone: '', service: serviceOptions.includes(requestedService) ? requestedService : serviceOptions[0], message: '' };
  });
  const [copyFeedback, setCopyFeedback] = useState('');
  const [whatsappFallback, setWhatsappFallback] = useState('');
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const copyContact = async (value, label) => {
    const copied = await copyTextToClipboard(value);
    setCopyFeedback(copied ? `${label} copied to clipboard.` : `Copy ${label.toLowerCase()} manually: ${value}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = [
      'Hello Bright Space Interiors, I would like to discuss a project.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.service}`,
      `Project details: ${form.message || 'I would like to discuss my requirements.'}`,
    ].join('\n');
    const url = whatsappUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setWhatsappFallback(url);
  };

  return (
    <section className="contact section-pad" id="contact">
      <div className="container">
        <div className="contact__intro">
          <div><Reveal><SectionLabel>Let’s make a start</SectionLabel></Reveal><Reveal delay={0.04}><h1>Let’s talk about<br />your <em>space.</em></h1></Reveal></div>
          <Reveal delay={0.1} className="contact__intro-copy"><p>Tell us a little about what you have in mind. We’ll take it from there, together.</p><span className="contact__intro-mark">BS<span>✳</span></span></Reveal>
        </div>
        <nav className="contact-quick-actions" aria-label="Quick contact options">
          <a href={`tel:+${business.phoneDigits}`}><Phone size={16} /> Call us</a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a>
          <a href="#project-enquiry"><ArrowDownRight size={16} /> Send an enquiry</a>
        </nav>
        <div className="contact__grid">
          <div className="contact__details">
            <Reveal><span className="contact__mini-label">GET IN TOUCH</span><h2 className="contact__details-heading">Good things start<br />with a conversation.</h2></Reveal>
            <Reveal delay={0.04}>
              <ContactCard icon={Phone} label="Call or message us">
                <strong className="contact-card__value">{business.phoneDisplay}</strong>
                <div className="contact-card__actions">
                  <a className="contact-action contact-action--call" href={`tel:+${business.phoneDigits}`}><Phone size={14} /> Call</a>
                  <a className="contact-action contact-action--primary" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> WhatsApp</a>
                  <button className="contact-action" type="button" onClick={() => copyContact(business.phoneDisplay, 'Phone number')}><Copy size={13} /> Copy</button>
                </div>
              </ContactCard>
              <ContactCard icon={Mail} label="Email us">
                <strong className="contact-card__value">{business.email}</strong>
                <div className="contact-card__actions">
                  <a className="contact-action contact-action--primary" href={gmailComposeUrl} target="_blank" rel="noopener noreferrer"><Mail size={14} /> Compose in Gmail <ArrowUpRight size={13} /></a>
                  <button className="contact-action" type="button" onClick={() => copyContact(business.email, 'Email address')}><Copy size={13} /> Copy email</button>
                </div>
              </ContactCard>
              <ContactCard icon={MapPin} label="Office address">
                <strong className="contact-card__value">{business.address}</strong>
                <div className="contact-card__actions">
                  <a className="contact-action contact-action--primary" href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={14} /> Get directions <ArrowUpRight size={13} /></a>
                  <a className="contact-action" href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer">Search on Maps <ArrowUpRight size={13} /></a>
                  <button className="contact-action" type="button" onClick={() => copyContact(business.address, 'Office address')}><Copy size={13} /> Copy address</button>
                </div>
              </ContactCard>
            </Reveal>
            {copyFeedback && <p className="contact-copy-feedback" role="status" aria-live="polite"><Check size={14} /> {copyFeedback}</p>}
            <Reveal delay={0.1} className="contact__contact-person"><span className="contact__person-mark">{business.contactName.split(' ').map((name) => name[0]).slice(0, 2).join('')}</span><div><strong>{business.contactName}</strong><span>{business.role}</span></div></Reveal>
          </div>
          <Reveal delay={0.1} className="enquiry-card" id="project-enquiry">
            <div className="enquiry-card__head"><span>PROJECT ENQUIRY</span><span className="enquiry-card__live"><i /> We’re listening</span></div>
            <h3>Tell us what you’re imagining.</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label>Your name<input name="name" type="text" autoComplete="name" placeholder="Name" value={form.name} onChange={update} required /></label>
                <label>Phone number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" pattern="(?=(?:\D*\d){8,})[+0-9() .-]{8,20}" title="Enter a valid phone number with at least 8 digits" placeholder="Your number" value={form.phone} onChange={update} required /></label>
              </div>
              <label>What are you looking for?
                <select name="service" value={form.service} onChange={update}>
                  <option>Complete home interiors</option><option>Modular kitchen</option><option>Modular furniture / wardrobes</option><option>Living or bedroom interiors</option><option>Commercial / civil works</option><option>Something else</option>
                </select>
              </label>
              <label>A little about your project<textarea name="message" rows="3" placeholder="Room, timeline, ideas, or anything helpful…" value={form.message} onChange={update} /></label>
              <button className="button button--gold enquiry-card__submit" type="submit">Continue on WhatsApp <Send size={15} /></button>
              <p className="enquiry-card__note"><MessageCircle size={13} /> WhatsApp opens with your enquiry ready to send. Your details are not stored on this website.</p>
              {whatsappFallback && <p className="enquiry-card__fallback" role="status">If WhatsApp did not open, <a href={whatsappFallback} target="_blank" rel="noopener noreferrer">open your enquiry here <ArrowUpRight size={13} /></a>.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand-col"><Logo footer /><p>Thoughtful interiors, considered details, spaces designed around you.</p><a href="/contact.html" className="footer-cta">Start a project <ArrowUpRight size={15} /></a></div>
          <div className="site-footer__nav-col"><span className="footer-heading">EXPLORE</span><div className="footer-links">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}<ArrowUpRight size={13} /></a>)}</div></div>
          <div className="site-footer__contact-col"><span className="footer-heading">CONTACT</span><span>Phone · {business.phoneDisplay}</span><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp us <ArrowUpRight size={13} /></a><a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer">{business.email}</a><a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={13} /></a><span>{business.locationLabel}</span></div>
          <div className="site-footer__signature"><span>DESIGN</span><i /><span>DETAIL</span><i /><span>DELIVER</span></div>
        </div>
        <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Bright Space Interiors. All rights reserved.</span><a href="/">Back to home ↑</a><span>Made with intention.</span></div>
      </div>
    </footer>
  );
}

function ProjectLightbox({ project, onClose, returnFocusRef }) {
  const closeButtonRef = useRef(null);
  useEffect(() => {
    if (!project) return undefined;
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const focusable = [...document.querySelectorAll('.lightbox a[href], .lightbox button:not([disabled])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('lightbox-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('lightbox-open');
      returnFocusRef.current?.focus();
    };
  }, [project?.id, returnFocusRef]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={project.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
          <motion.div className="lightbox__panel" initial={{ opacity: 0, scale: 0.96, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}>
            <button ref={closeButtonRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close image"><X size={21} /></button>
            <img src={project.image} alt={project.alt} />
            <div className="lightbox__caption"><div><small>{project.category}</small><strong>{project.title}</strong></div><a href="/contact.html" onClick={onClose}>Discuss a similar space <ArrowUpRight size={15} /></a></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={whatsappUrl('Hello Bright Space Interiors, I would like to discuss an interior project.')} target="_blank" rel="noopener noreferrer" aria-label="Chat with Bright Space Interiors on WhatsApp"><MessageCircle size={20} /><span>Let’s chat</span></a>;
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const lightboxTriggerRef = useRef(null);
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  const pageTitles = {
    home: 'Interior Designers in Hyderabad | Bright Space Interiors',
    services: 'Interior Design Services | Bright Space Interiors',
    projects: 'Interior Design Projects | Bright Space Interiors',
    about: 'About Bright Space Interiors | Design · Detail · Deliver',
    experience: '17 Years of Modular Interior Design | Bright Space Interiors',
    contact: 'Contact Bright Space Interiors | Hyderabad',
  };
  useEffect(() => { document.title = pageTitles[page] || pageTitles.home; }, [page]);

  let content;
  if (page === 'services') {
    content = <><PageIntro className="page-intro--services" eyebrow="Our services" title="Thoughtful spaces," emphasis="beautifully realised." description="From complete home interiors to a single room, find the support your project needs." image="/images/kitchen-minimal.webp" /><Services page /><ServicePlanning /><ContactTeaser variant="services" /></>;
  } else if (page === 'projects') {
    content = <><Portfolio onOpen={(project) => { lightboxTriggerRef.current = document.activeElement; setActiveProject(project); }} standalone /><ContactTeaser variant="projects" /></>;
  } else if (page === 'about') {
    content = <><About pageHeading /><PromiseStrip /><Process /><ContactTeaser variant="about" /></>;
  } else if (page === 'experience') {
    content = <><Experience /><ContactTeaser variant="experience" /></>;
  } else if (page === 'contact') {
    content = <Contact />;
  } else {
    content = <><Hero /><SignatureStrip /><AboutPreview /><Services preview /><Portfolio onOpen={(project) => { lightboxTriggerRef.current = document.activeElement; setActiveProject(project); }} preview /><ContactTeaser /></>;
  }
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <main id="main-content">{content}</main>
      <Footer />
      <FloatingWhatsApp />
      <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} returnFocusRef={lightboxTriggerRef} />
    </>
  );
}
