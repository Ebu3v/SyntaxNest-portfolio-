'use strict';

// set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Sticky navigation
const sectionHeroEl = document.querySelector('.section-hero');
const headerEl = document.querySelector('.header');
const headerHeight = headerEl.getBoundingClientRect().height;
const btnNavEl = document.querySelector('.btn-mobile-nav');

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    document.body.classList.add('sticky');
  } else {
    document.body.classList.remove('sticky');
  }
};

const obs = new IntersectionObserver(stickyNav, {
  //in the viewport
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
obs.observe(sectionHeroEl);

///////////////////////////////////////////////
/////Smooth scrolling animation

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
    headerEl.classList.toggle('nav-open');
  }
});
btnNavEl.addEventListener('click', () => {
  headerEl.classList.toggle('nav-open');
});

//Reveal Section
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  console.log(entries);
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////////////
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });
