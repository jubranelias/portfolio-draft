import { site } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Hero3D } from '../components/hero3d/Hero3D';
import { Button } from '../components/Button';
import { ClientMarquee } from '../components/ClientMarquee';
import { StudioIntro } from '../components/StudioIntro';
import { ProjectGrid } from '../components/ProjectGrid';
import { ScrollWords } from '../components/ScrollWords';
import { Reveal } from '../components/Reveal';
import { ServiceThumb } from '../components/ServiceThumb';
import { SplitText } from '../components/SplitText';
import { CreativeTeaser } from '../components/CreativeTeaser';

export default function Home() {
  useDocumentMeta(undefined);

  return (
    <>
      <Hero3D nextSectionId="clients" />

      <section id="clients" className="section clients" aria-labelledby="clients-title">
        <div className="container clients__head clients__head--strip">
          <h2 id="clients-title" className="clients__label">Trusted by teams at</h2>
        </div>
        <ClientMarquee />
      </section>

      <StudioIntro />

      <section className="section cv-auto" aria-labelledby="work-title">
        <div className="container">
          <h2 id="work-title" className="section-title">
            Work
          </h2>
          <ProjectGrid limit={4} />
          <div className="center-row">
            <Button to="/works" variant="outline">See all work</Button>
          </div>
        </div>
      </section>

      <CreativeTeaser />

      <section className="section services cv-auto" aria-labelledby="services-title">
        <div className="container">
          <SplitText id="services-title" text="Services" className="section-title" />
          <ScrollWords text={site.home.servicesStatement} className="services__statement" />
          <ul className="services__list">
            {site.services.map((s, i) => (
              <Reveal as="li" key={s.title} className="service" delay={i * 110}>
                <div className="media service__media">
                  <ServiceThumb kind={s.thumb} />
                </div>
                <h3 className="service__title">{s.title}</h3>
                <p className="muted">{s.line}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
