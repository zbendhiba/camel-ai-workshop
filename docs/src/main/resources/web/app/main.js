import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import './_hljs-dark.css';

hljs.highlightAll();

// Content tab switching
document.querySelectorAll('.roq-content-tabs-bar').forEach(function(tabBar) {
    var container = tabBar.closest('.roq-content-tabs');
    var tabs = container.querySelectorAll('.roq-content-tab');
    var panes = container.querySelectorAll('.roq-content-pane');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var index = tab.getAttribute('data-tab');
            tabs.forEach(function(t) { t.classList.remove('active'); });
            panes.forEach(function(p) { p.classList.remove('active'); });
            tab.classList.add('active');
            container.querySelector('.roq-content-pane[data-tab="' + index + '"]').classList.add('active');
        });
    });
});
