import { Header } from '../components/Header';
import { AboutSection } from '../sections/AboutSection';
import { ClassesSection } from '../sections/ClassesSection';
import { NoticesSection } from '../sections/NoticesSection';
//import { EventsSection } from '../sections/EventsSection';
//import { LocationSection } from '../sections/LocationSection';
//import { Footer } from '../components/Footer';

export function HomeLayout() {
  return `
    ${Header()}
    ${AboutSection()}
    ${NoticesSection()}
    ${ClassesSection()}
  `;
}
