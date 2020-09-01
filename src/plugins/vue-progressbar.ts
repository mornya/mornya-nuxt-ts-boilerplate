import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
  color: '#f00078', // primary color,
  failedColor: 'red',
  thickness: '4px',
  transition: {
    speed: '0.5s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'bottom',
  inverse: false,
});
