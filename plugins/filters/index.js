import Vue from 'vue';
import formatThousands from './formatThousands';

Vue.filter('formatThousands', formatThousands);