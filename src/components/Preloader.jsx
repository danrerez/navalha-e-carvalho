export default function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__panel preloader__panel--a" />
      <div className="preloader__panel preloader__panel--b" />
      <div className="preloader__inner">
        <svg className="preloader__mark" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="60" r="49" stroke="currentColor" strokeWidth="0.6" />
          <path d="M34 82V38l24 44V38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
          <path d="M88 46c-3-5-8-8-14-8-10 0-16 9-16 22s6 22 16 22c6 0 11-3 14-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
        </svg>
        <p className="preloader__name">Navalha <span>&amp;</span> Carvalho</p>
        <p className="preloader__since">Barbearia desde 2009</p>
      </div>
      <span className="preloader__count">0</span>
    </div>
  );
}
