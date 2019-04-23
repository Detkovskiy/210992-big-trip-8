import {renderFilter} from './filters/render-filters';
import {statisticOnInit} from '../src/statistic.js';
import {sortingPointsOnInit} from './filters/sorting-points';
import {newPointOnInit} from './point/new-point';
import {model} from './utils/model';

renderFilter();

model.init();

model.update();

statisticOnInit();

newPointOnInit();

sortingPointsOnInit();
