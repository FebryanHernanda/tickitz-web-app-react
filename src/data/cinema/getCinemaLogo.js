import cineOneLogo from "/src/assets/icons/sponsor/CineOne-logo.svg";
import ebvLogo from "/src/assets/icons/sponsor/ebv-logo.svg";
import hiflixLogo from "/src/assets/icons/sponsor/hiflix-logo.svg";

/* Cinemas Icon Data */
const cinemaLogos = {
  EBV: ebvLogo,
  CineOne: cineOneLogo,
  Hiflix: hiflixLogo,
};

const getCinemaLogo = (cinemaName) => {
  if (!cinemaName) return null;

  const brand = cinemaName.split(" ")[0];
  return cinemaLogos[brand] || null;
};

export default getCinemaLogo;
