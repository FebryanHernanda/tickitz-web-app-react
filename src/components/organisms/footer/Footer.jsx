const Footer = () => {
  return (
    <>
      <footer className="p-5 lg:p-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-5">
            <img
              src="/src/assets/icons/logo/tickitz-logo-blue.svg"
              alt="Tickitz Logo"
              className="w-50"
            />
            <p className="text-small font-light">
              Stop waiting in line. Buy tickets conveniently, watch movies
              quietly.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-bold">Explore</h3>
            <ul className="flex flex-wrap gap-5 lg:flex-col lg:flex-nowrap lg:items-start">
              <a href="#">
                <li>Cinemas</li>
              </a>
              <a href="#">
                <li>Movies List</li>
              </a>
              <a href="#">
                <li>My Ticket</li>
              </a>
              <a href="#">
                <li>Notifications</li>
              </a>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-bold">Our Sponsor</h3>
            <ul className="flex flex-wrap items-end justify-between gap-10 md:justify-normal lg:flex-col lg:flex-nowrap lg:items-start">
              <li>
                <img
                  src="/src/assets/icons/sponsor/ebv-logo.svg"
                  alt="EBV Sponsor Logo"
                />
              </li>
              <li>
                <img
                  src="/src/assets/icons/sponsor/CineOne-logo.svg"
                  alt="CineOne Sponsor Logo"
                />
              </li>
              <li>
                <img
                  src="/src/assets/icons/sponsor/hiflix-logo.svg"
                  alt="hiflix Sponsor Logo"
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-bold">Follow Us</h3>
            <ul className="flex flex-wrap gap-5 lg:flex-col">
              <li className="flex items-center gap-2">
                <img
                  src="/src/assets/icons/socialmedia/facebook-icon.svg"
                  alt="Facebook Logo"
                />
                <a href="#">Tickitz Cinema id</a>
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="/src/assets/icons/socialmedia/instagram-icon.svg"
                  alt="Instagram Logo"
                />
                <a href="#">tickitz.id</a>
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="/src/assets/icons/socialmedia/twitter-icon.svg"
                  alt="twitter Logo"
                />
                <a href="#">tickitz.id</a>
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="/src/assets/icons/socialmedia/youtube-icon.svg"
                  alt="Youtube Logo"
                />
                <a href="#">Tickitz Cinema id</a>
              </li>
            </ul>
          </div>
        </div>
        <h5 className="mt-10 text-center">
          © 2020 Tickitz. All Rights Reserved.
        </h5>
      </footer>
    </>
  );
};

export default Footer;
