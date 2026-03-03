import { animateHeader } from './headerAnimation';
import { animateAbout } from './aboutAnimation';
import { animateClasses } from './classesAnimation';
import { animateNotices } from './noticesAnimation';

export function initAnimations() {
  animateHeader();
  animateAbout();
  animateClasses();
  animateNotices();
  // etc
}
