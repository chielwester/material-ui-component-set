import * as Core from '@material-ui/core';
import * as Lab from '@material-ui/lab';
import * as Pickers from '@material-ui/pickers';
import * as Styles from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import nlLocale from 'date-fns/locale/nl';
import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from '@babylonjs/core';
import { icons } from './icons';

window.Babylon = {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
};

export default {
  Core,
  Icons: icons,
  Lab,
  Pickers,
  Styles,
  DateFnsUtils,
  DateLocales: { enLocale, nlLocale },
};
