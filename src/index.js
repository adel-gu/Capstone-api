import './style.css';
import showMeals from './modules/showMeals';
import { addLike } from './modules/fetchLikes';
import showlike from './modules/showLike';

// Constants
const mealsListContainer = document.querySelector('.f-list');
const mealsNav = document.querySelector('.control');

// Populate the meals cards items
document.addEventListener('DOMContentLoaded', async () => {
  await showMeals(mealsListContainer, 0);
  // Select all likes element
  const textLikes = document.getElementsByClassName('card-likes-txt');
  [...textLikes].forEach(async (textLike) => {
    await showlike(textLike);
  });
});

// Populate according to the meals-nav
mealsNav.addEventListener('click', async (e) => {
  e.preventDefault();
  // Get the clicked nav link index data.
  const navIndex = e.target.getAttribute('data-index');
  // Empty the list meals container from the previous cards
  mealsListContainer.innerHTML = '';
  // Generate new 9 items
  await showMeals(mealsListContainer, navIndex);
});

// Post Likes
window.addEventListener('click', async (e) => {
  // Select the like button
  const likeBtn = e.target;
  if (likeBtn.classList.contains('card-likes')) {
    // Update numbers of likes on the API
    const mealId = likeBtn.getAttribute('data-id');
    await addLike(mealId);
    // Update numbers of likes on the screen
    const txtlike = likeBtn.nextElementSibling;
    await showlike(txtlike);
  }
});
