document.addEventListener('DOMContentLoaded', function() {
  const object = document.querySelector('.timeline-svg-container object');
  object.addEventListener('load', function() {
    const svgDoc = object.contentDocument;
    svgDoc.querySelectorAll('circle[r="8"]').forEach(dot => {
      dot.addEventListener('mouseenter', function(e) {
        const descElem = document.getElementById('desc-' + dot.id);
        if (descElem) {
          const popup = document.getElementById('svg-popup');
          popup.innerHTML = `<div class="itinerary-tooltip">${descElem.innerHTML}</div>`;
          popup.style.display = 'block';

          const objectRect = object.getBoundingClientRect();
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          popup.style.left = (objectRect.left + e.offsetX + 20 + scrollLeft) + 'px';
          popup.style.top = (objectRect.top + e.offsetY - 40 + scrollTop) + 'px';
        }
        // Highlight activity text
        const textId = 'text-' + dot.id.replace('dot-', '');
        const textElem = svgDoc.getElementById(textId);
        if (textElem) textElem.classList.add('highlight-text');

        // Highlight time text
        const timeId = 'time-' + dot.id.replace('dot-', '');
        const timeElem = svgDoc.getElementById(timeId);
        if (timeElem) timeElem.classList.add('highlight-text');
      });
      dot.addEventListener('mouseleave', function() {
        document.getElementById('svg-popup').style.display = 'none';

        // Remove highlight from activity text
        const textId = 'text-' + dot.id.replace('dot-', '');
        const textElem = svgDoc.getElementById(textId);
        if (textElem) textElem.classList.remove('highlight-text');

        // Remove highlight from time text
        const timeId = 'time-' + dot.id.replace('dot-', '');
        const timeElem = svgDoc.getElementById(timeId);
        if (timeElem) timeElem.classList.remove('highlight-text');
      });
    });
  });
});
