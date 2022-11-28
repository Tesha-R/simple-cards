function Home() {
  return (
    <div className="container is-widescreen">
      <div className="columns is-vcentered mt-7">
        <div className="column is-two-thirds">
          <h2 className="hero-content">
            <span>
              1. Create a <span className="pink-txt">deck</span>
            </span>
            <span>
              2. Add <span className="purple-txt">cards</span>
            </span>
            <span>
              3. Keep <span className="blue-txt">learning</span>
            </span>
          </h2>
        </div>
        <div className="column">
          <img src="/images/flashcards.png" alt="flashcards" />
        </div>
      </div>
    </div>
  );
}

export default Home;
