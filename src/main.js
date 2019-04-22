import {renderFilter} from './filters/render-filters';
import {statisticInit} from '../src/statistic.js';
import {sortingPointsInit} from './sortingPoints';
import {newPointInit} from './point/new-point';
import {model} from './model';


renderFilter();

model.init();
model.update();

statisticInit();

newPointInit();

sortingPointsInit();
