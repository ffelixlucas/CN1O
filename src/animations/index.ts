import { animateHeader } from './headerAnimation';
import { animateAbout } from './aboutAnimation';
import { animateClasses } from './classesAnimation';

export function initAnimations() {
  animateHeader();
  animateAbout();
  animateClasses();
  // etc
}
