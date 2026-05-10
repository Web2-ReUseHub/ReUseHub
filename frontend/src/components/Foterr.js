function Foterr(){
    return(
        <>
        <footer style={{ backgroundColor: "#1a2a5e", color: "#fff" }}>
  <div className="container py-4 ">
    <div className="row g-4 d-flex justify-content-center mt-2">

      <div className="col-12 col-md-4">
        <h6 className="fw-bold mb-2">Reuse Hub</h6>
        <p className="small mb-0" style={{ color: "#99aed4" }}>
          A smarter way to give things a second life. Connecting communities through sustainable exchange.
        </p>
      </div>

      <div className="col-6 col-md-2">
        <h6 className="small fw-semibold text-uppercase mb-2" style={{ color: "#e8a020", letterSpacing: "1px" }}>Links</h6>
        <ul className="list-unstyled small mb-0">
          <li className="mb-1"><a href="#" style={{ color: "#99aed4", textDecoration: "none" }}>Browse Items</a></li>
          <li className="mb-1"><a href="#" style={{ color: "#99aed4", textDecoration: "none" }}>Post an Item</a></li>
          <li className="mb-1"><a href="#" style={{ color: "#99aed4", textDecoration: "none" }}>How It Works</a></li>
        </ul>
      </div>

      <div className="col-6 col-md-2">
        <h6 className="small fw-semibold text-uppercase mb-2" style={{ color: "#e8a020", letterSpacing: "1px" }}>Support</h6>
        <ul className="list-unstyled small mb-0">
          <li className="mb-1"><a href="#" style={{ color: "#99aed4", textDecoration: "none" }}>About Us</a></li>
          <li className="mb-1"><a href="#" style={{ color: "#99aed4", textDecoration: "none" }}>Contact Us</a></li>
          <li className="mb-1"><a href="#" style={{ color: "#99aed4", textDecoration: "none" }}>Privacy Policy</a></li>
        </ul>
      </div>

    </div>

    <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />

    <p className="small mb-0 text-center" style={{ color: "#6b85b8" }}>
      © {new Date().getFullYear()} Reuse Hub. All rights reserved.
    </p>
  </div>
</footer>

        </>
    )
}
export default Foterr;