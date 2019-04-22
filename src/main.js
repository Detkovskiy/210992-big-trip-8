import {renderFilter} from './filters/render-filters';
import {statisticInit} from '../src/statistic.js';
import {sortingPointsInit} from './filters/sortingPoints';
import {newPointInit} from './point/new-point';
import {model} from './utils/model';

renderFilter();

model.init();

model.update();

statisticInit();

newPointInit();

sortingPointsInit();
