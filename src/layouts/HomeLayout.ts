import { Header } from '../components/Header';
import { AboutSection } from '../sections/AboutSection';
import { ClassesSection } from '../sections/ClassesSection';
import { EventsSection } from '../sections/EventsSection';
import { NoticesSection } from '../sections/NoticesSection';
import { StoreTeaserSection } from '../sections/StoreTeaserSection';
import { LocationSection } from '../sections/LocationSection';
import { Footer } from '../components/Footer';

export function HomeLayout() {
  return `
    ${Header()}
    ${AboutSection()}
    ${ClassesSection()}
    ${EventsSection()}
    ${NoticesSection()}
    ${StoreTeaserSection()}
    ${LocationSection()}
    ${Footer()}
  `;
}
