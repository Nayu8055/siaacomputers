const elements = document.querySelectorAll(".animate");
const counters = document.querySelectorAll(".count");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

counters.forEach(counter => {
  let started = false;
  observer.observe(counter);
  counter.addEventListener("transitionend", () => {
    if (!started) {
      started = true;
      let target = +counter.dataset.target;
      let count = 0;
      let step = target / 60;
      let interval = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.innerText = target;
          clearInterval(interval);
        } else {
          counter.innerText = Math.floor(count);
        }
      }, 20);
    }
  });
});
