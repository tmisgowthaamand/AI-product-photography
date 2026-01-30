const PortfolioFooter = () => {
  return (
    <footer className="max-w-[1600px] mx-auto px-3 md:px-5 pb-16">
      <div className="text-center text-[10px] uppercase tracking-widest font-inter text-muted-foreground">
        <a
          href="mailto:gowthaamankrishna1998@gmail.com"
          className="hover:text-foreground transition-colors"
        >
          E: gowthaamankrishna1998@gmail.com
        </a>
        <span className="mx-2">/</span>
        <a
          href="tel:+918903162114"
          className="hover:text-foreground transition-colors"
        >
          M: +91 8903162114
        </a>
        <span className="mx-2">/</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-foreground transition-colors uppercase"
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
