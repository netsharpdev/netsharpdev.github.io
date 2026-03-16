import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About me | Paweł Pindel',
  description: 'Couple of words about me and the reason why I write.',
};

export default function AboutPage() {
  return (
    <article>
      <header className="post-header">
        <div className="container">
          <h1 className="post-header__title">About me</h1>
          <p className="post-header__meta" style={{ display: 'block', textAlign: 'center' }}>
            Couple of words about me and the reason why I write.
          </p>
        </div>
      </header>

      <div className="page-content">
        <h3>Contact me</h3>
        <p>
          You can contact me via this email:{' '}
          <a href="mailto:pawel.pindel@netsharpdev.com">
            <strong>pawel.pindel@netsharpdev.com</strong>
          </a>
        </p>

        <h3>Who am I?</h3>
        <p>
          My name is Pawe&#322; Pindel, I am Software Engineer and Tech Lead
          from Poland, Certified Azure Developer, currently working at{' '}
          <a href="https://gravity9.com/">gravity9</a>. As a developer I have
          over 8 years of professional experience. I am Microsoft Technologies
          enthusiast but also open for other tech stacks. Trying to pick language
          adequate to the problem - not to solve all problems with one language
          or framework. I love to automate stuff.
        </p>
        <p>My motto is:</p>
        <blockquote>
          <p>
            Try to learn something about everything and everything about
            something.{' '}
            <cite>&mdash; Thomas Henry Huxley</cite>
          </p>
        </blockquote>
        <p>
          Besides development, I am amateur chef and also really enjoy
          travelling and hiking around the world but especially in love with
          polish countryside and nature. I love spending time in a forest.
        </p>

        <h3>Why do I write?</h3>
        <p>
          I write this blog to share my knowledge about development but also to
          learn. It is a great opportunity to improve skills when I have to
          prepare professional text about a chosen topic.
          <br />
          Being open for discussion, I also want to learn from you! So please
          leave a comment if you have something to say on what I wrote.
        </p>
        <p>
          <em>Enjoy the reading!</em>
        </p>
      </div>
    </article>
  );
}
