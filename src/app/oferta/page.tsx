import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transformacja AI dla MŚP | Paweł Pindel',
  description:
    'Praktyczny consulting AI dla małych i średnich firm — audyt gotowości, szkolenia, wdrożenie i doradztwo strategiczne. Wprowadź AI do swoich procesów.',
  alternates: {
    canonical: '/oferta/',
    languages: {
      'x-default': '/offer/',
      pl: '/oferta/',
      en: '/offer/',
    },
  },
  openGraph: {
    title: 'Transformacja AI dla MŚP | Paweł Pindel',
    description:
      'Praktyczny consulting AI dla małych i średnich firm — audyt gotowości, szkolenia, wdrożenie i doradztwo strategiczne.',
    url: '/oferta/',
  },
};

export default function OfertaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paweł Pindel',
    jobTitle: 'Principal Software Engineer',
    url: 'https://netsharpdev.com/',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi Transformacji AI',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audyt Gotowości na AI',
            description:
              'Mapowanie procesów i identyfikacja obszarów o największym potencjale AI przed jakimikolwiek wydatkami na wdrożenie.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Warsztaty AI i Szkolenie Zespołu',
            description:
              'Praktyczne warsztaty z użytkowania narzędzi AI, promptowania i bezpiecznej integracji z codziennymi procesami.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Integracja i Wdrożenie AI',
            description:
              'Projektowanie i wdrażanie funkcji opartych na AI: integracje LLM, automatyzacja procesów, asystenci AI dla klientów.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stałe Doradztwo AI',
            description:
              'Miesięczny retainer: doradztwo strategiczne, ocena narzędzi i wsparcie w decyzjach architektonicznych.',
          },
        },
      ],
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Nagłówek */}
      <header className="post-header">
        <div className="container">
          <span className="offer-eyebrow">Transformacja AI</span>
          <h1 className="post-header__title">
            Transformacja AI<br />dla Twojego Biznesu
          </h1>
          <p className="post-header__meta" style={{ display: 'block', textAlign: 'center' }}>
            Praktyczny consulting AI dla małych i średnich firm —<br />
            od pierwszych kroków do pełnego wdrożenia.
          </p>
        </div>
      </header>

      <div className="page-content">

        {/* 2 · Problem */}
        <h3>Luka AI się Powiększa</h3>
        <p>
          Każdego tygodnia firmy na całym świecie zastępują ręczne procesy
          automatyzacją opartą na AI. Piszą e-maile szybciej, odpowiadają na pytania
          klientów natychmiast, przetwarzają dane bez udziału człowieka i podejmują
          lepsze decyzje dzięki analizie wspieranej przez sztuczną inteligencję.
        </p>
        <p>
          Większość małych i średnich firm wie, że AI jest ważne. Ale między szumem
          informacyjnym, żargonem technicznym a ogromną liczbą dostępnych narzędzi
          trudno wiedzieć, od czego zacząć — i czy w ogóle warto dla firmy takiej
          jak Twoja.
        </p>
        <p>Warto. I nie musi to być skomplikowane.</p>
        <blockquote>
          <p>
            Nie musisz przebudowywać swojego biznesu wokół AI. Musisz znaleźć
            odpowiednie miejsca, gdzie AI oszczędza Twój czas, poprawia doświadczenie
            klienta i daje Ci przewagę konkurencyjną.
          </p>
        </blockquote>

        {/* 3 · Podejście */}
        <h3>Jak Pracuję</h3>
        <div className="offer-grid-3" style={{ marginBottom: '3rem' }}>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">🔍</div>
            <h4>Najpierw Zrozumienie</h4>
            <p>
              Zanim cokolwiek zarekomenduję, poświęcam czas na zrozumienie Twojego
              biznesu — procesów, zespołu i ograniczeń. Żadnych gotowych rozwiązań.
            </p>
          </div>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">⚡</div>
            <h4>Praktyczność, nie Hype</h4>
            <p>
              Skupiam się na narzędziach i technikach, które rozwiązują prawdziwe
              problemy już dziś. Bez buzzwordów, bez nadmiernie skomplikowanych
              systemów, bez uzależnienia od dostawcy.
            </p>
          </div>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">🤝</div>
            <h4>Zbudowane na Lata</h4>
            <p>
              Wszystko, co buduję lub rekomenduję, Twój zespół może zrozumieć,
              utrzymać i rozwijać. Przekazanie wiedzy jest częścią każdego
              zaangażowania.
            </p>
          </div>
        </div>

        {/* 4 · Usługi */}
        <h3>Co Oferuję</h3>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #00D4AA' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem' }}>Usługa 01</span>
          <h4>Audyt Gotowości na AI</h4>
          <p>
            Gdzie AI pasuje do Twojego biznesu? Na to pytanie odpowiada to zaangażowanie.
          </p>
          <p>
            Mapuję Twoje obecne procesy, identyfikuję powtarzalne zadania, przeglądam
            dane i narzędzia, i wskazuję możliwości o największym wpływie — zanim
            wydasz złotówkę na wdrożenie. Wychodzisz z jasnym obrazem, gdzie AI może
            zrobić różnicę, w jakiej kolejności i co to wymaga.
          </p>
          <div className="offer-what-you-get">
            <strong>Co otrzymujesz:</strong> pisemny raport, priorytetyzowaną mapę
            możliwości i rozmowę z rekomendacjami.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #3B82F6' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem', color: '#3B82F6' }}>Usługa 02</span>
          <h4>Warsztaty AI i Szkolenie Zespołu</h4>
          <p>
            Twój zespół to Twój największy atut. Te warsztaty zamykają lukę między
            wiedzą o istnieniu AI a codziennym korzystaniem z niej.
          </p>
          <p>
            Niezależnie od tego, czy Twój zespół korzysta z narzędzi AI pasywnie czy
            wcale, projektuję warsztaty dostosowane do Twojej branży i procesów.
            Omawiamy praktyczne promptowanie, wybór narzędzi, bezpieczne i odpowiedzialne
            użytkowanie oraz budowanie nawyków AI.
          </p>
          <div className="offer-what-you-get" style={{ borderLeftColor: '#3B82F6' }}>
            <strong style={{ color: '#3B82F6' }}>Co otrzymujesz:</strong> dostosowane
            warsztaty na pół lub cały dzień, materiały uzupełniające i sesję Q&amp;A.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #00D4AA' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem' }}>Usługa 03</span>
          <h4>Integracja i Wdrożenie AI</h4>
          <p>
            Czasem potrzebujesz czegoś więcej niż porady — potrzebujesz czegoś
            zbudowanego.
          </p>
          <p>
            Projektuję i wdrażam funkcje i przepływy pracy oparte na AI, dopasowane
            do Twojego biznesu: integracje LLM, zautomatyzowane procesy wewnętrzne,
            asystentów AI dla klientów, agentic workflows i więcej. Zbudowane pod Twój
            istniejący stack, udokumentowane tak, by Twój zespół mógł to przejąć.
          </p>
          <div className="offer-what-you-get">
            <strong>Co otrzymujesz:</strong> działające rozwiązanie, pełną dokumentację,
            sesję przekazania i 30 dni wsparcia po uruchomieniu.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '3rem', borderLeft: '4px solid #3B82F6' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem', color: '#3B82F6' }}>Usługa 04</span>
          <h4>Stałe Doradztwo AI</h4>
          <p>
            AI rozwija się szybko. To, co jest najlepszym rozwiązaniem dziś, może
            być przestarzałe za sześć miesięcy. Retainer pozwala Ci być o krok do przodu.
          </p>
          <p>
            Jako Twój stały partner AI pomagam oceniać nowe narzędzia, podejmować
            właściwe decyzje architektoniczne, unikać kosztownych błędów i stale
            poprawiać adopcję AI. To jak posiadanie starszego inżyniera AI na
            telefon — bez kosztów pełnego etatu.
          </p>
          <div className="offer-what-you-get" style={{ borderLeftColor: '#3B82F6' }}>
            <strong style={{ color: '#3B82F6' }}>Co otrzymujesz:</strong> miesięczne
            rozmowy strategiczne, asynchroniczne Q&amp;A, ocenę narzędzi i
            priorytetowy dostęp.
          </div>
        </div>

        {/* 5 · Referencje */}
        <h3>Dlaczego Warto Współpracować</h3>
        <div className="offer-grid-2" style={{ marginBottom: '3rem' }}>
          <div>
            <h4>Doświadczenie</h4>
            <ul>
              <li>10+ lat budowania produktów cloud-native</li>
              <li>Principal Software Engineer w Verisk Analytics</li>
              <li>Azure, AWS, .NET, TypeScript</li>
              <li>
                Projekty AI od 2019 — współtwórca IqScreen
                (Polska Nagroda Innowacyjności 2019)
              </li>
            </ul>
          </div>
          <div>
            <h4>Ostatnie Szkolenia</h4>
            <ul>
              <li>Developer Jutra — edu.devstyle.pl</li>
              <li>Architekt Jutra — edu.devstyle.pl</li>
              <li>Building Agentic Platforms with AWS</li>
            </ul>
          </div>
        </div>

      </div>

      {/* 6 · CTA */}
      <div className="offer-cta-section">
        <div className="container">
          <h2>Gotowy na AI w swoim biznesie?</h2>
          <p>
            Porozmawiajmy o Twojej sytuacji. Bez zobowiązań, bez sprzedaży —
            tylko szczera rozmowa.
          </p>
          <Link href="/contact" className="offer-btn">
            Skontaktuj się →
          </Link>
        </div>
      </div>

    </article>
  );
}
